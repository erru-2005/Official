"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import { TimelineItem } from "@/components/ui/radial-orbital-timeline";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Link, ArrowRight } from "lucide-react";
import {
  Stepper,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperSeparator,
  StepperTitle,
} from "@/components/ui/stepper";

interface DevelopmentPipelineProps {
  timelineData: TimelineItem[];
  activeNodeId: number | null;
  setActiveNodeId: (id: number | null) => void;
  isTimelinePopupOpen?: boolean;
}

export function DevelopmentPipeline({
  timelineData,
  activeNodeId,
  setActiveNodeId,
  isTimelinePopupOpen = false,
}: DevelopmentPipelineProps) {
  const [autoRotate, setAutoRotate] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipLeft, setTooltipLeft] = useState<number | null>(null);

  const totalCopies = 4;

  // Measure which step is closest to the horizontal center of the viewport
  const getMiddleItem = () => {
    const container = containerRef.current;
    if (!container) return null;

    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    let closestId = null;
    let minDistance = Infinity;

    Object.keys(itemRefs.current).forEach((key) => {
      const el = itemRefs.current[parseInt(key, 10)];
      if (el) {
        const rect = el.getBoundingClientRect();
        const itemCenter = rect.left + rect.width / 2;
        const dist = Math.abs(itemCenter - containerCenter);
        if (dist < minDistance) {
          minDistance = dist;
          const actualId = parseInt(key, 10) % 10;
          closestId = actualId;
        }
      }
    });

    return closestId;
  };

  // Center an item smoothly in the horizontal scroll window
  const centerItem = (id: number) => {
    const container = containerRef.current;
    if (!container) return;

    let closestEl: HTMLDivElement | null = null;
    let minCenterDist = Infinity;

    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    for (const offset of [0, 10, 20, 30]) {
      const el = itemRefs.current[id + offset];
      if (el) {
        const rect = el.getBoundingClientRect();
        const dist = Math.abs((rect.left + rect.width / 2) - containerCenter);
        if (dist < minCenterDist) {
          minCenterDist = dist;
          closestEl = el;
        }
      }
    }

    if (!closestEl) return;

    const itemRect = closestEl.getBoundingClientRect();
    const targetScrollLeft = container.scrollLeft + (itemRect.left - containerRect.left) - (containerRect.width / 2) + (itemRect.width / 2);
    container.scrollTo({ left: targetScrollLeft, behavior: "smooth" });
  };

  // Handle scroll events and loop wrapping for infinite scroll behavior
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const singleSetWidth = container.scrollWidth / totalCopies;
    if (container.scrollLeft >= singleSetWidth) {
      container.scrollLeft -= singleSetWidth;
    } else if (container.scrollLeft <= 2) {
      container.scrollLeft += singleSetWidth;
    }

    // Only update active ID in auto mode to let users select on click
    if (autoRotate) {
      const activeId = getMiddleItem();
      if (activeId !== null && activeId !== activeNodeId) {
        setActiveNodeId(activeId);
      }
    }
  };

  // Auto-scroller loop
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !autoRotate || isHovered || isTimelinePopupOpen) return;

    let rafId: number;
    const speed = 0.55;

    const scrollLoop = () => {
      if (container) {
        container.scrollLeft += speed;
        handleScroll();
      }
      rafId = requestAnimationFrame(scrollLoop);
    };

    rafId = requestAnimationFrame(scrollLoop);
    return () => cancelAnimationFrame(rafId);
  }, [autoRotate, isHovered, activeNodeId, isTimelinePopupOpen]);

  // Clear pipeline active state and pause when timeline popup is active
  useEffect(() => {
    if (isTimelinePopupOpen) {
      setActiveNodeId(null);
    }
  }, [isTimelinePopupOpen, setActiveNodeId]);

  // Center selected item when paused/clicked
  useEffect(() => {
    if (!autoRotate && activeNodeId !== null) {
      centerItem(activeNodeId);
    }
  }, [activeNodeId, autoRotate]);

  // Click-pause timeout: resume auto-scrolling after 6s of inactivity
  useEffect(() => {
    if (autoRotate) return;
    const timer = setTimeout(() => {
      setAutoRotate(true);
      setActiveNodeId(null);
    }, 6000);
    return () => clearTimeout(timer);
  }, [autoRotate, setActiveNodeId]);

  // Update dynamic tooltip position on scroll/resize
  useEffect(() => {
    const container = containerRef.current;
    if (!container || activeNodeId === null) return;

    const updateTooltipPosition = () => {
      let closestEl: HTMLDivElement | null = null;
      let minCenterDist = Infinity;

      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      for (const offset of [0, 10, 20, 30]) {
        const el = itemRefs.current[activeNodeId + offset];
        if (el) {
          const rect = el.getBoundingClientRect();
          const dist = Math.abs((rect.left + rect.width / 2) - containerCenter);
          if (dist < minCenterDist) {
            minCenterDist = dist;
            closestEl = el;
          }
        }
      }

      if (!closestEl) return;

      const activeRect = closestEl.getBoundingClientRect();
      let left = activeRect.left - containerRect.left + activeRect.width / 2;

      // Prevent tooltip from overflowing screen width edges on mobile
      const tooltipWidth = Math.min(containerRect.width * 0.60, 192); // Matches clamp(10rem, 60vw, 12rem) approximately
      const halfWidth = tooltipWidth / 2;
      const margin = 16; // boundary margin
      const minLeft = halfWidth + margin;
      const maxLeft = containerRect.width - halfWidth - margin;
      left = Math.max(minLeft, Math.min(left, maxLeft));

      setTooltipLeft(left);
    };

    updateTooltipPosition();
    container.addEventListener("scroll", updateTooltipPosition);
    window.addEventListener("resize", updateTooltipPosition);
    return () => {
      container.removeEventListener("scroll", updateTooltipPosition);
      window.removeEventListener("resize", updateTooltipPosition);
    };
  }, [activeNodeId]);

  const activeItem = useMemo(() => {
    return timelineData.find((i) => i.id === activeNodeId);
  }, [activeNodeId, timelineData]);

  return (
    <div className="w-full max-w-6xl mx-auto mt-[clamp(0.5rem,1.5vh,1.5rem)] px-4 flex flex-col items-center relative">
      
      {/* Horizontal Moving Stepper Track */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_95%,transparent)] py-1 select-none">
        <Stepper value={activeNodeId ?? 0} onValueChange={(id) => {
          setActiveNodeId(id);
          setAutoRotate(false);
        }} className="w-auto">
          
          <div 
            ref={containerRef}
            onScroll={handleScroll}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex gap-0 overflow-x-auto w-full scrollbar-none py-10 flex-row items-center relative"
            style={{ scrollBehavior: "auto" }}
          >
            {/* Copy 1 */}
            <div className="flex gap-0 items-center flex-row shrink-0">
              {timelineData.map((item) => {
                const isActive = activeNodeId === item.id;
                return (
                  <div
                    key={`c1-${item.id}`}
                    ref={(el) => { itemRefs.current[item.id] = el; }}
                    className="shrink-0 flex items-center"
                  >
                    <StepperItem step={item.id} className="flex-row shrink-0 items-center justify-start">
                      <StepperTrigger className={`px-4 py-2 border rounded-full backdrop-blur-md transition-all duration-300 hover:scale-105 focus-visible:scale-105 ${
                        isActive 
                          ? "border-white bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.15)] scale-105" 
                          : "border-white/10 text-white/50 hover:text-white/85"
                      }`}>
                        <StepperIndicator className="size-5 text-[9px] border-white/20">
                          {item.id}
                        </StepperIndicator>
                        <StepperTitle className="text-xs font-semibold font-heading tracking-wide">
                          {item.title}
                        </StepperTitle>
                      </StepperTrigger>
                      <StepperSeparator className="w-12 md:w-20 h-0.5 bg-white/10 mx-2" />
                    </StepperItem>
                  </div>
                );
              })}
            </div>
            
            {/* Copy 2 */}
            <div className="flex gap-0 items-center flex-row shrink-0" aria-hidden="true">
              {timelineData.map((item) => {
                const isActive = activeNodeId === item.id;
                return (
                  <div
                    key={`c2-${item.id}`}
                    ref={(el) => { itemRefs.current[item.id + 10] = el; }}
                    className="shrink-0 flex items-center"
                  >
                    <StepperItem step={item.id} className="flex-row shrink-0 items-center justify-start">
                      <StepperTrigger className={`px-4 py-2 border rounded-full backdrop-blur-md transition-all duration-300 hover:scale-105 focus-visible:scale-105 ${
                        isActive 
                          ? "border-white bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.15)] scale-105" 
                          : "border-white/10 text-white/50 hover:text-white/85"
                      }`}>
                        <StepperIndicator className="size-5 text-[9px] border-white/20">
                          {item.id}
                        </StepperIndicator>
                        <StepperTitle className="text-xs font-semibold font-heading tracking-wide">
                          {item.title}
                        </StepperTitle>
                      </StepperTrigger>
                      <StepperSeparator className="w-12 md:w-20 h-0.5 bg-white/10 mx-2" />
                    </StepperItem>
                  </div>
                );
              })}
            </div>

            {/* Copy 3 */}
            <div className="flex gap-0 items-center flex-row shrink-0" aria-hidden="true">
              {timelineData.map((item) => {
                const isActive = activeNodeId === item.id;
                return (
                  <div
                    key={`c3-${item.id}`}
                    ref={(el) => { itemRefs.current[item.id + 20] = el; }}
                    className="shrink-0 flex items-center"
                  >
                    <StepperItem step={item.id} className="flex-row shrink-0 items-center justify-start">
                      <StepperTrigger className={`px-4 py-2 border rounded-full backdrop-blur-md transition-all duration-300 hover:scale-105 focus-visible:scale-105 ${
                        isActive 
                          ? "border-white bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.15)] scale-105" 
                          : "border-white/10 text-white/50 hover:text-white/85"
                      }`}>
                        <StepperIndicator className="size-5 text-[9px] border-white/20">
                          {item.id}
                        </StepperIndicator>
                        <StepperTitle className="text-xs font-semibold font-heading tracking-wide">
                          {item.title}
                        </StepperTitle>
                      </StepperTrigger>
                      <StepperSeparator className="w-12 md:w-20 h-0.5 bg-white/10 mx-2" />
                    </StepperItem>
                  </div>
                );
              })}
            </div>

            {/* Copy 4 */}
            <div className="flex gap-0 items-center flex-row shrink-0" aria-hidden="true">
              {timelineData.map((item) => {
                const isActive = activeNodeId === item.id;
                return (
                  <div
                    key={`c4-${item.id}`}
                    ref={(el) => { itemRefs.current[item.id + 30] = el; }}
                    className="shrink-0 flex items-center"
                  >
                    <StepperItem step={item.id} className="flex-row shrink-0 items-center justify-start">
                      <StepperTrigger className={`px-4 py-2 border rounded-full backdrop-blur-md transition-all duration-300 hover:scale-105 focus-visible:scale-105 ${
                        isActive 
                          ? "border-white bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.15)] scale-105" 
                          : "border-white/10 text-white/50 hover:text-white/85"
                      }`}>
                        <StepperIndicator className="size-5 text-[9px] border-white/20">
                          {item.id}
                        </StepperIndicator>
                        <StepperTitle className="text-xs font-semibold font-heading tracking-wide">
                          {item.title}
                        </StepperTitle>
                      </StepperTrigger>
                      <StepperSeparator className="w-12 md:w-20 h-0.5 bg-white/10 mx-2" />
                    </StepperItem>
                  </div>
                );
              })}
            </div>
          </div>
        </Stepper>
      </div>

      {/* Floating Description Tooltip (Premium Custom Black & White Theme) */}
      {activeNodeId !== null && activeItem && tooltipLeft !== null && !isTimelinePopupOpen && (
        <div 
          className="absolute z-40 -translate-x-1/2 flex flex-col items-center select-none pointer-events-auto transition-all duration-300 ease-out md:hidden"
          style={{
            left: `${tooltipLeft}px`,
            bottom: "calc(100% - 30px)",
            width: "clamp(10rem, 60vw, 12rem)",
          }}
        >
          <div className="border border-white/20 bg-black text-white rounded-lg p-2 shadow-[0_4px_20px_rgba(255,255,255,0.05)] w-full flex flex-col gap-1 text-center animate-fade-up">
            <span className="text-[6.5px] font-mono text-white/50 uppercase tracking-widest leading-none">
              {activeItem.date} — {activeItem.status.toUpperCase()}
            </span>
            <h4 className="text-[9.5px] font-bold text-white font-heading leading-tight">
              {activeItem.title}
            </h4>
            <p className="text-[7.5px] text-white/80 leading-normal font-light">
              {activeItem.content}
            </p>
          </div>
          {/* Pointing arrow */}
          <div className="w-1.5 h-1.5 bg-black border-r border-b border-white/20 rotate-45 -mt-1" />
        </div>
      )}
    </div>
  );
}
