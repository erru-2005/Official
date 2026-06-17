"use client"

import * as React from "react"
import { motion } from "motion/react"
import { Home, Eye, Briefcase, Layers, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

export interface MenuBarItem {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  label: string
}

interface MenuBarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: MenuBarItem[]
  scrollActiveIndex?: number
}

const springConfig = {
  duration: 0.3,
  ease: "easeInOut" as const
}

export function MenuBar({ items, scrollActiveIndex = -1, className, ...props }: MenuBarProps) {
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null)
  const menuRef = React.useRef<HTMLDivElement>(null)
  const [tooltipPosition, setTooltipPosition] = React.useState({ left: 0, width: 0 })
  const tooltipRef = React.useRef<HTMLDivElement>(null)
  const activeIndex = hoverIndex !== null ? hoverIndex : (scrollActiveIndex >= 0 ? scrollActiveIndex : null)

  const isFooter = scrollActiveIndex === -1

  React.useEffect(() => {
    if (activeIndex !== null && menuRef.current && tooltipRef.current) {
      const menuItem = menuRef.current.children[activeIndex] as HTMLElement
      const menuRect = menuRef.current.getBoundingClientRect()
      const itemRect = menuItem.getBoundingClientRect()
      const tooltipRect = tooltipRef.current.getBoundingClientRect()
    
      const left = itemRect.left - menuRect.left + (itemRect.width - tooltipRect.width) / 2
    
      setTooltipPosition({
        left: Math.max(0, Math.min(left, menuRect.width - tooltipRect.width)),
        width: tooltipRect.width
      })
    }
  }, [activeIndex])

  return (
    <div className={cn("relative", className)} {...props}>
      <motion.div
        layout
        animate={{ opacity: activeIndex !== null ? 1 : 0, y: activeIndex !== null ? 0 : 5 }}
        transition={{ ...springConfig, layout: { type: "spring", stiffness: 400, damping: 28 } }}
        className="absolute left-0 right-0 top-full mt-1 pointer-events-none z-50"
      >
        {activeIndex !== null && (
          <motion.div
            ref={tooltipRef}
            layout
            className={cn(
              "h-7 px-3 rounded-lg inline-flex justify-center items-center overflow-hidden",
              "bg-background/95 backdrop-blur",
              "border border-border/50",
              "shadow-[0_0_0_1px_rgba(0,0,0,0.08)]",
              "dark:border-border/50 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
            )}
            animate={{ x: tooltipPosition.left }}
            transition={{ ...springConfig, layout: { type: "spring", stiffness: 400, damping: 28 } }}
            style={{ width: "auto" }}
          >
            <p className="text-[13px] font-medium leading-tight whitespace-nowrap">
              {items[activeIndex].label}
            </p>
          </motion.div>
        )}
      </motion.div>
      
      <div 
        ref={menuRef}
        className={cn(
          "h-12 px-3 flex min-[500px]:inline-flex justify-center items-center gap-2 overflow-hidden z-10 w-full min-[500px]:w-auto",
          "rounded-full bg-background/95 backdrop-blur transition-all duration-300",
          isFooter
            ? "border-white/80 shadow-[0_0_0_1px_rgba(255,255,255,0.5),0_8px_16px_-4px_rgba(255,255,255,0.15)]"
            : "border-border/50 shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_8px_16px_-4px_rgba(0,0,0,0.1)] dark:border-border/50 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_8px_16px_-4px_rgba(0,0,0,0.2)]"
        )}
      >
        {items.map((item, index) => {
          const isItemActive = index === scrollActiveIndex
          return (
          <a
            key={index}
            href={`#${item.label.toLowerCase()}`}
            className={cn(
              "w-11 h-10 px-4 py-1 rounded-full flex justify-center items-center gap-2 transition-all duration-300",
              isItemActive ? "bg-white/15 text-white" : "hover:bg-muted/80 text-foreground/60"
            )}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <div className="flex justify-center items-center">
              <div className="w-5 h-5 flex justify-center items-center overflow-hidden">
                <item.icon className="w-full h-full" />
              </div>
            </div>
            <span className="sr-only">{item.label}</span>
          </a>
          )
        })}
      </div>
    </div>
  )
}

const navItems = [
  { icon: Home, label: "Home" },
  { icon: Eye, label: "Vision" },
  { icon: Briefcase, label: "Projects" },
  { icon: Layers, label: "Process" },
  { icon: Mail, label: "Contact" },
]

const sectionIds = navItems.map((item) => item.label.toLowerCase())

export function SiteNav() {
  const [scrollActiveIndex, setScrollActiveIndex] = React.useState(0)

  React.useEffect(() => {
    const vh = () => window.innerHeight

    const update = () => {
      const footerEl = document.getElementById("footer")

      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        const topThreshold = vh() * 0.3
        const bottomThreshold = vh() * 0.7
        if (rect.top <= bottomThreshold && rect.bottom >= topThreshold) {
          const idx = sectionIds.indexOf(id)
          if (idx === sectionIds.length - 1 && footerEl) {
            const fRect = footerEl.getBoundingClientRect()
            if (fRect.top < vh() && fRect.bottom > 0) {
              setScrollActiveIndex(-1)
              return
            }
          }
          setScrollActiveIndex(idx)
          return
        }
      }

      if (footerEl) {
        const fRect = footerEl.getBoundingClientRect()
        if (fRect.top < vh() && fRect.bottom > 0) {
          setScrollActiveIndex(-1)
        }
      }
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 min-[500px]:left-auto min-[500px]:-translate-x-0 min-[500px]:right-4 z-50">
      <MenuBar items={navItems} scrollActiveIndex={scrollActiveIndex} className="w-auto" />
    </div>
  )
}
