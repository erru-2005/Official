"use client";

import { useState, useEffect, useRef, useMemo, type CSSProperties } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
  className?: string;
  activeNodeId?: number | null;
  setActiveNodeId?: (id: number | null) => void;
  pipelineActiveNodeId?: number | null;
  autoRotate?: boolean;
  setAutoRotate?: (val: boolean) => void;
}

export default function RadialOrbitalTimeline({
  timelineData,
  className = "",
  activeNodeId: externalActiveNodeId,
  setActiveNodeId: externalSetActiveNodeId,
  pipelineActiveNodeId = null,
  autoRotate: externalAutoRotate,
  setAutoRotate: externalSetAutoRotate,
}: RadialOrbitalTimelineProps) {
  const viewMode = "orbital" as const;
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [internalAutoRotate, setInternalAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [internalActiveNodeId, setInternalActiveNodeId] = useState<number | null>(null);

  const activeNodeId = externalActiveNodeId !== undefined ? externalActiveNodeId : internalActiveNodeId;
  const setActiveNodeId = externalSetActiveNodeId !== undefined ? externalSetActiveNodeId : setInternalActiveNodeId;
  const autoRotate = externalAutoRotate !== undefined ? externalAutoRotate : internalAutoRotate;
  const setAutoRotate = externalSetAutoRotate !== undefined ? externalSetAutoRotate : setInternalAutoRotate;

  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const [containerSize, setContainerSize] = useState({ width: 800, height: 600 });
  const prevSizeRef = useRef({ width: 0, height: 0 });

  const DANGER_ZONE = 20;
  const NODE_SIZE = 32;

  const orbitRadius = useMemo(() => {
    const isMobile = containerSize.width < 640;
    const available = Math.min(containerSize.width, containerSize.height);
    if (isMobile) {
      return Math.min(180, containerSize.width / 2 - 20);
    }
    return Math.min(280, available / 2 - 25);
  }, [containerSize]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        const w = Math.round(width);
        const h = Math.round(height);

        const dw = Math.abs(w - prevSizeRef.current.width);
        const dh = Math.abs(h - prevSizeRef.current.height);

        // Limit updates to meaningful resizes to prevent mobile URL bar scroll jitter
        if (dw > 5 || dh > 80 || prevSizeRef.current.width === 0) {
          prevSizeRef.current = { width: w, height: h };
          setContainerSize({ width: w, height: h });
        }
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    if (activeNodeId === id && !autoRotate) {
      setAutoRotate(true);
    } else {
      setActiveNodeId(id);
      setAutoRotate(false);
      centerViewOnNode(id);
    }
  };

  // Click-pause timeout: automatically resume auto-rotation and clear active state after 6s of inactivity
  useEffect(() => {
    if (autoRotate) return;
    const timer = setTimeout(() => {
      setAutoRotate(true);
      setActiveNodeId(null);
    }, 6000);
    return () => clearTimeout(timer);
  }, [autoRotate, setActiveNodeId]);

  useEffect(() => {
    if (activeNodeId !== null && activeNodeId !== undefined) {
      setAutoRotate(false); // Pause auto-rotation when active node is selected (via click or externally)

      const relatedItems = getRelatedItems(activeNodeId);
      const newPulseEffect: Record<number, boolean> = {};
      relatedItems.forEach((relId) => {
        newPulseEffect[relId] = true;
      });
      setPulseEffect(newPulseEffect);
      
      if (mounted) {
        const timer = setTimeout(() => centerViewOnNode(activeNodeId), 50);
        return () => clearTimeout(timer);
      }
    } else {
      setPulseEffect({});
    }
  }, [activeNodeId, mounted]);

  useEffect(() => {
    if (!mounted || !autoRotate || viewMode !== "orbital") return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const updateRotation = (time: number) => {
      const deltaTime = Math.min(time - lastTime, 100);
      lastTime = time;

      // ~6 degrees per second rotation speed
      setRotationAngle((prev) => (prev + deltaTime * 0.005) % 360);

      animationFrameId = requestAnimationFrame(updateRotation);
    };

    animationFrameId = requestAnimationFrame(updateRotation);
    return () => cancelAnimationFrame(animationFrameId);
  }, [mounted, autoRotate, viewMode]);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital") return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    if (nodeIndex === -1) return;
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = orbitRadius;
    const radian = (angle * Math.PI) / 180;

    const x = Math.round(radius * Math.cos(radian) * 100) / 100;
    const y = Math.round(radius * Math.sin(radian) * 100) / 100;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity =
      Math.round(
        Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))) *
          1000,
      ) / 1000;

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-white bg-black border-white";
      case "in-progress":
        return "text-black bg-white border-black";
      case "pending":
        return "text-white bg-black/40 border-white/50";
      default:
        return "text-white bg-black/40 border-white/50";
    }
  };

  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center overflow-visible ${className}`}
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative flex h-full w-full max-w-4xl items-center justify-center">
        <div
          className="absolute flex h-full w-full items-center justify-center transition-transform duration-700 ease-out"
          ref={orbitRef}
          style={{
            perspective: "1000px",
          }}
        >
          {/* Orbital Circle Trace */}
          <div
            className="absolute rounded-full border border-white/10"
            style={{ width: orbitRadius * 2, height: orbitRadius * 2 }}
          />

          {/* Central Core */}
          <div
            className="absolute z-10 flex animate-pulse items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500"
            style={{ width: orbitRadius * 0.28, height: orbitRadius * 0.28 }}
          >
            <div
              className="absolute animate-ping rounded-full border border-white/20 opacity-70"
              style={{ width: orbitRadius * 0.36, height: orbitRadius * 0.36 }}
            />
            <div
              className="rounded-full bg-white/85 backdrop-blur-md"
              style={{ width: orbitRadius * 0.12, height: orbitRadius * 0.12 }}
            />
          </div>

          {!mounted && (
            <p className="absolute text-sm text-white/40">Loading timeline…</p>
          )}

          {mounted &&
            timelineData.map((item, index) => {
              const position = calculateNodePosition(index, timelineData.length);
              const isActive = activeNodeId === item.id;
              const isPipelineActive = pipelineActiveNodeId === item.id;
              const isRelated = isRelatedToActive(item.id);
              const isPulsing = pulseEffect[item.id];
              const Icon = item.icon;

              const nodeStyle: CSSProperties = {
                transform: `translate(${position.x}px, ${position.y}px)`,
                zIndex: isActive ? 200 : position.zIndex,
                opacity: isActive ? 1 : position.opacity,
              };

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    nodeRefs.current[item.id] = el;
                  }}
                  className={`absolute cursor-pointer flex flex-col items-center ${
                    autoRotate ? "transition-none" : "transition-all duration-700 ease-out"
                  }`}
                  style={nodeStyle}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleItem(item.id);
                  }}
                >
                  <div
                    className={`absolute -inset-1 rounded-full ${
                      isPulsing ? "animate-pulse duration-1000" : ""
                    }`}
                    style={{
                      background: `radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)`,
                      width: `${item.energy * 0.3 + 35}px`,
                      height: `${item.energy * 0.3 + 35}px`,
                      left: `-${(item.energy * 0.3 + 35 - 32) / 2}px`,
                      top: `-${(item.energy * 0.3 + 35 - 32) / 2}px`,
                    }}
                  />

                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      isActive
                        ? "scale-125 border-white bg-white text-black shadow-lg shadow-white/30"
                        : isPipelineActive
                          ? "border-transparent text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                          : isRelated
                            ? "animate-pulse border-white bg-white/40 text-black"
                            : "border-white/30 bg-black text-white/80 hover:border-white/60"
                    }`}
                    style={
                      !isActive && isPipelineActive
                        ? {
                            backgroundImage: "linear-gradient(black, black), linear-gradient(135deg, #3b82f6, #06b6d4)",
                            backgroundOrigin: "border-box",
                            backgroundClip: "padding-box, border-box",
                          }
                        : undefined
                    }
                  >
                    <Icon size={13} />
                  </div>

                  <div
                    className={`absolute top-10 whitespace-nowrap text-[9px] font-semibold tracking-wider transition-all duration-300 ${
                      isActive ? "scale-110 text-white font-bold" : "text-white/50"
                    }`}
                  >
                    {item.title}
                  </div>

                  {isActive && (
                    <Card className="absolute top-14 left-1/2 w-[clamp(11rem,75vw,15rem)] max-h-[220px] -translate-x-1/2 overflow-y-auto border-white/30 bg-black/95 text-white shadow-xl shadow-white/10 backdrop-blur-lg z-50 pointer-events-auto select-none">
                      <div className="absolute -top-3 left-1/2 h-3 w-px -translate-x-1/2 bg-white/50" />
                      <CardHeader className="pb-1 px-3 pt-3">
                        <div className="flex items-center justify-between">
                          <Badge
                            className={`px-1.5 py-0 text-[8px] font-mono leading-none ${getStatusStyles(
                              item.status,
                            )}`}
                          >
                            {item.status === "completed"
                              ? "COMPLETE"
                              : item.status === "in-progress"
                                ? "IN PROGRESS"
                                : "PENDING"}
                          </Badge>
                          <span className="font-mono text-[8px] text-white/50">
                            {item.date}
                          </span>
                        </div>
                        <CardTitle className="mt-1 text-[11px] font-semibold text-white">
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-[9px] text-white/80 px-3 pb-3 pt-0">
                        <p className="leading-snug">{item.content}</p>

                        <div className="mt-2.5 border-t border-white/10 pt-2">
                          <div className="mb-1 flex items-center justify-between text-[9px]">
                            <span className="flex items-center">
                              <Zap size={8} className="mr-1 text-yellow-500" />
                              Energy Level
                            </span>
                            <span className="font-mono">{item.energy}%</span>
                          </div>
                          <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                              style={{ width: `${item.energy}%` }}
                            />
                          </div>
                        </div>

                        {item.relatedIds.length > 0 && (
                          <div className="mt-2.5 border-t border-white/10 pt-2">
                            <div className="mb-1 flex items-center">
                              <Link size={8} className="mr-1 text-white/70" />
                              <h4 className="text-[8px] font-semibold tracking-wider text-white/70 uppercase">
                                Connected Nodes
                              </h4>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {item.relatedIds.map((relatedId) => {
                                const relatedItem = timelineData.find(
                                  (i) => i.id === relatedId,
                                );
                                return (
                                  <Button
                                    key={relatedId}
                                    variant="outline"
                                    size="sm"
                                    className="flex h-5 items-center rounded-none border-white/20 bg-transparent px-1.5 py-0 text-[8px] text-white/80 transition-all hover:bg-white/10 hover:text-white"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleItem(relatedId);
                                    }}
                                  >
                                    {relatedItem?.title}
                                    <ArrowRight
                                      size={6}
                                      className="ml-0.5 text-white/60"
                                    />
                                  </Button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
