"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Sparkles, ShieldCheck, Zap, Users, Facebook, Instagram, Youtube, Linkedin, Mail } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const INITIAL_CHIPS = [
  {
    id: 1,
    title: "Production Ready",
    description: "Fully type-safe and tested",
    icon: ShieldCheck,
  },
  {
    id: 2,
    title: "Fluid Motion",
    description: "60fps optimizations built-in",
    icon: Zap,
  },
  {
    id: 3,
    title: "Accessible",
    description: "Works perfectly for everyone",
    icon: Users,
  },
  {
    id: 4,
    title: "Modern Design",
    description: "Crafted for high-end feel",
    icon: Sparkles,
  },
];

const socialLinks = [
  {
    title: "Facebook",
    href: "https://facebook.com",
    icon: Facebook,
    hoverText: "hover:text-[#1877f2]",
    hoverIconBg: "group-hover:bg-[#1877f2]/10 group-hover:border-[#1877f2]/30 group-hover:text-[#1877f2]",
  },
  {
    title: "Instagram",
    href: "https://instagram.com",
    icon: Instagram,
    hoverText: "hover:text-[#e4405f]",
    hoverIconBg: "group-hover:bg-[#e4405f]/10 group-hover:border-[#e4405f]/30 group-hover:text-[#e4405f]",
  },
  {
    title: "Youtube",
    href: "https://youtube.com",
    icon: Youtube,
    hoverText: "hover:text-[#ff0000]",
    hoverIconBg: "group-hover:bg-[#ff0000]/10 group-hover:border-[#ff0000]/30 group-hover:text-[#ff0000]",
  },
  {
    title: "LinkedIn",
    href: "https://linkedin.com",
    icon: Linkedin,
    hoverText: "hover:text-[#0a66c2]",
    hoverIconBg: "group-hover:bg-[#0a66c2]/10 group-hover:border-[#0a66c2]/30 group-hover:text-[#0a66c2]",
  },
  {
    title: "Email",
    href: "mailto:hello@kedantra.com",
    icon: Mail,
    hoverText: "hover:text-[#ea4335]",
    hoverIconBg: "group-hover:bg-[#ea4335]/10 group-hover:border-[#ea4335]/30 group-hover:text-[#ea4335]",
  },
];

function Bucket() {
  const [items, setItems] = useState(INITIAL_CHIPS);
  const isMobile = useIsMobile();

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => {
        const [first, ...rest] = prev;
        return [...rest, first];
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative isolate w-full aspect-[655/352] select-none shrink-0"
    >
      {/* SVG Container: Bottom Matte Layer */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 655 352"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 z-0"
      >
        <foreignObject
          x="443.561"
          y="-10.5141"
          width="211.24"
          height="166.977"
        >
          <div
            style={{
              backdropFilter: "blur(11.03px)",
              clipPath: "url(#bgblur_0_51_65_clip_path)",
              height: "100%",
              width: "100%",
            }}
          ></div>
        </foreignObject>
        <g
          filter="url(#filter1_dddi_51_65)"
          data-figma-bg-blur-radius="22.0545"
        >
          <path
            d="M535.59 78.7427L487.973 42.8776L558.738 13.9516C562.902 12.2494 564.984 11.3984 567.143 11.5597C569.301 11.7211 571.233 12.8723 575.098 15.1747L590.22 24.1832C603.923 32.347 610.775 36.4289 610.372 42.0779C609.97 47.7269 602.609 50.7964 587.887 56.9354L535.59 78.7427Z"
            fill="white"
            fillOpacity="0.08"
            shapeRendering="crispEdges"
          />
        </g>
        <foreignObject
          x="-3.43323e-05"
          y="-10.9516"
          width="215.96"
          height="167.786"
        >
          <div
            style={{
              backdropFilter: "blur(11.03px)",
              clipPath: "url(#bgblur_1_51_65_clip_path)",
              height: "100%",
              width: "100%",
            }}
          ></div>
        </foreignObject>
        <g
          filter="url(#filter2_dddi_51_65)"
          data-figma-bg-blur-radius="22.0545"
        >
          <path
            d="M123.116 79.1145L171.548 42.8776L97.2715 12.5164C94.8305 11.5186 93.61 11.0197 92.3446 11.1143C91.0793 11.2089 89.9465 11.8837 87.681 13.2334L56.155 32.0149C48.1832 36.7641 44.1973 39.1386 44.4205 42.4378C44.6438 45.737 48.9132 47.553 57.4522 51.1849L123.116 79.1145Z"
            fill="white"
            fillOpacity="0.08"
            shapeRendering="crispEdges"
          />
        </g>
        <foreignObject
          x="78.7048"
          y="20.823"
          width="501.297"
          height="136.012"
        >
          <div
            style={{
              backdropFilter: "blur(11.03px)",
              clipPath: "url(#bgblur_2_51_65_clip_path)",
              height: "100%",
              width: "100%",
            }}
          ></div>
        </foreignObject>
        <g
          filter="url(#filter3_dddi_51_65)"
          data-figma-bg-blur-radius="22.0545"
        >
          <path
            d="M487.973 42.8774L171.548 42.8775L123.116 79.1144L535.59 78.7424L487.973 42.8774Z"
            fill="url(#paint0_linear_51_65)"
            fillOpacity="0.22"
            shapeRendering="crispEdges"
          />
        </g>
        <foreignObject
          x="78.7048"
          y="20.823"
          width="137.255"
          height="136.012"
        >
          <div
            style={{
              backdropFilter: "blur(11.03px)",
              clipPath: "url(#bgblur_3_51_65_clip_path)",
              height: "100%",
              width: "100%",
            }}
          ></div>
        </foreignObject>
        <g
          filter="url(#filter4_dddi_51_65)"
          data-figma-bg-blur-radius="22.0545"
        >
          <path
            d="M171.548 78.9088V42.8774L123.116 79.1144L171.548 78.9088Z"
            fill="white"
            fillOpacity="0.08"
            shapeRendering="crispEdges"
          />
        </g>

        <g
          filter="url(#filter5_dddi_51_65)"
          data-figma-bg-blur-radius="22.0545"
        >
          <path
            d="M487.973 78.9088V42.8774L536.404 79.1144L487.973 78.9088Z"
            fill="white"
            fillOpacity="0.08"
            shapeRendering="crispEdges"
          />
        </g>

        <defs>
          <filter
            id="filter0_i_51_65"
            x="123.766"
            y="79.1595"
            width="413"
            height="275.676"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="5.51362" />
            <feGaussianBlur stdDeviation="1.83787" />
            <feComposite
              in2="hardAlpha"
              operator="arithmetic"
              k2="-1"
              k3="1"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.36 0"
            />
            <feBlend
              mode="normal"
              in2="shape"
              result="effect1_innerShadow_51_65"
            />
          </filter>
          <filter
            id="filter1_dddi_51_65"
            x="443.561"
            y="-10.5141"
            width="211.24"
            height="166.977"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="33.3087" />
            <feGaussianBlur stdDeviation="22.2058" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_51_65"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0.0431373 0 0 0 0 0.12549 0 0 0 0 0.403922 0 0 0 0.14 0"
            />
            <feBlend
              mode="normal"
              in2="effect1_dropShadow_51_65"
              result="effect2_dropShadow_51_65"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0.0431373 0 0 0 0 0.12549 0 0 0 0 0.403922 0 0 0 0.05 0"
            />
            <feBlend
              mode="normal"
              in2="effect2_dropShadow_51_65"
              result="effect3_dropShadow_51_65"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect3_dropShadow_51_65"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="5.51362" />
            <feGaussianBlur stdDeviation="1.83787" />
            <feComposite
              in2="hardAlpha"
              operator="arithmetic"
              k2="-1"
              k3="1"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.36 0"
            />
            <feBlend
              mode="normal"
              in2="shape"
              result="effect4_innerShadow_51_65"
            />
          </filter>
          <clipPath
            id="bgblur_0_51_65_clip_path"
            transform="translate(-443.561 10.5141)"
          >
            <path d="M535.59 78.7427L487.973 42.8776L558.738 13.9516C562.902 12.2494 564.984 11.3984 567.143 11.5597C569.301 11.7211 571.233 12.8723 575.098 15.1747L590.22 24.1832C603.923 32.347 610.775 36.4289 610.372 42.0779C609.97 47.7269 602.609 50.7964 587.887 56.9354L535.59 78.7427Z" />
          </clipPath>
          <filter
            id="filter2_dddi_51_65"
            x="-3.43323e-05"
            y="-10.9516"
            width="215.96"
            height="167.786"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="33.3087" />
            <feGaussianBlur stdDeviation="22.2058" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_51_65"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0.0431373 0 0 0 0 0.12549 0 0 0 0 0.403922 0 0 0 0.14 0"
            />
            <feBlend
              mode="normal"
              in2="effect1_dropShadow_51_65"
              result="effect2_dropShadow_51_65"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0.0431373 0 0 0 0 0.12549 0 0 0 0 0.403922 0 0 0 0.05 0"
            />
            <feBlend
              mode="normal"
              in2="effect2_dropShadow_51_65"
              result="effect3_dropShadow_51_65"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect3_dropShadow_51_65"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="5.51362" />
            <feGaussianBlur stdDeviation="1.83787" />
            <feComposite
              in2="hardAlpha"
              operator="arithmetic"
              k2="-1"
              k3="1"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.36 0"
            />
            <feBlend
              mode="normal"
              in2="shape"
              result="effect4_innerShadow_51_65"
            />
          </filter>
          <clipPath
            id="bgblur_1_51_65_clip_path"
            transform="translate(3.43323e-05 10.9516)"
          >
            <path d="M123.116 79.1145L171.548 42.8776L97.2715 12.5164C94.8305 11.5186 93.61 11.0197 92.3446 11.1143C91.0793 11.2089 89.9465 11.8837 87.681 13.2334L56.155 32.0149C48.1832 36.7641 44.1973 39.1386 44.4205 42.4378C44.6438 45.737 48.9132 47.553 57.4522 51.1849L123.116 79.1145Z" />
          </clipPath>
          <filter
            id="filter3_dddi_51_65"
            x="78.7048"
            y="20.823"
            width="501.297"
            height="136.012"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="33.3087" />
            <feGaussianBlur stdDeviation="22.2058" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_51_65"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0.0431373 0 0 0 0 0.12549 0 0 0 0 0.403922 0 0 0 0.14 0"
            />
            <feBlend
              mode="normal"
              in2="effect1_dropShadow_51_65"
              result="effect2_dropShadow_51_65"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0.0431373 0 0 0 0 0.12549 0 0 0 0 0.403922 0 0 0 0.05 0"
            />
            <feBlend
              mode="normal"
              in2="effect2_dropShadow_51_65"
              result="effect3_dropShadow_51_65"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect3_dropShadow_51_65"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="5.51362" />
            <feGaussianBlur stdDeviation="1.83787" />
            <feComposite
              in2="hardAlpha"
              operator="arithmetic"
              k2="-1"
              k3="1"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.36 0"
            />
            <feBlend
              mode="normal"
              in2="shape"
              result="effect4_innerShadow_51_65"
            />
          </filter>
          <clipPath
            id="bgblur_2_51_65_clip_path"
            transform="translate(-78.7048 -20.823)"
          >
            <path d="M487.973 42.8774L171.548 42.8775L123.116 79.1144L535.59 78.7424L487.973 42.8774Z" />
          </clipPath>
          <filter
            id="filter4_dddi_51_65"
            x="78.7048"
            y="20.823"
            width="137.255"
            height="136.012"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="33.3087" />
            <feGaussianBlur stdDeviation="22.2058" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_51_65"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0.0431373 0 0 0 0 0.12549 0 0 0 0 0.403922 0 0 0 0.14 0"
            />
            <feBlend
              mode="normal"
              in2="effect1_dropShadow_51_65"
              result="effect2_dropShadow_51_65"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0.0431373 0 0 0 0 0.12549 0 0 0 0 0.403922 0 0 0 0.05 0"
            />
            <feBlend
              mode="normal"
              in2="effect2_dropShadow_51_65"
              result="effect3_dropShadow_51_65"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect3_dropShadow_51_65"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="5.51362" />
            <feGaussianBlur stdDeviation="1.83787" />
            <feComposite
              in2="hardAlpha"
              operator="arithmetic"
              k2="-1"
              k3="1"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.36 0"
            />
            <feBlend
              mode="normal"
              in2="shape"
              result="effect4_innerShadow_51_65"
            />
          </filter>
          <clipPath
            id="bgblur_3_51_65_clip_path"
            transform="translate(-78.7048 -20.823)"
          >
            <path d="M171.548 78.9088V42.8774L123.116 79.1144L171.548 78.9088Z" />
          </clipPath>
          <filter
            id="filter5_dddi_51_65"
            x="443.561"
            y="20.823"
            width="137.255"
            height="136.012"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="33.3087" />
            <feGaussianBlur stdDeviation="22.2058" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_51_65"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0.0431373 0 0 0 0 0.12549 0 0 0 0 0.403922 0 0 0 0.14 0"
            />
            <feBlend
              mode="normal"
              in2="effect1_dropShadow_51_65"
              result="effect2_dropShadow_51_65"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0.0431373 0 0 0 0 0.12549 0 0 0 0 0.403922 0 0 0 0.05 0"
            />
            <feBlend
              mode="normal"
              in2="effect2_dropShadow_51_65"
              result="effect3_dropShadow_51_65"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect3_dropShadow_51_65"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="5.51362" />
            <feGaussianBlur stdDeviation="1.83787" />
            <feComposite
              in2="hardAlpha"
              operator="arithmetic"
              k2="-1"
              k3="1"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.36 0"
            />
            <feBlend
              mode="normal"
              in2="shape"
              result="effect4_innerShadow_51_65"
            />
          </filter>
          <filter
            id="filter6_dddi_51_65"
            x="21.477"
            y="56.6875"
            width="612.444"
            height="212.562"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="33.3087" />
            <feGaussianBlur stdDeviation="22.2058" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_51_65"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0.0431373 0 0 0 0 0.12549 0 0 0 0 0.403922 0 0 0 0.14 0"
            />
            <feBlend
              mode="normal"
              in2="effect1_dropShadow_51_65"
              result="effect2_dropShadow_51_65"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0.0431373 0 0 0 0 0.12549 0 0 0 0 0.403922 0 0 0 0.05 0"
            />
            <feBlend
              mode="normal"
              in2="effect2_dropShadow_51_65"
              result="effect3_dropShadow_51_65"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect3_dropShadow_51_65"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="5.51362" />
            <feGaussianBlur stdDeviation="1.83787" />
            <feComposite
              in2="hardAlpha"
              operator="arithmetic"
              k2="-1"
              k3="1"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.36 0"
            />
            <feBlend
              mode="normal"
              in2="shape"
              result="effect4_innerShadow_51_65"
            />
          </filter>
          <clipPath id="bgblur_5_51_65_clip_path">
            <path d="M74.6011 164.033L123.116 79.1138L535.59 78.7419L581.532 164.469C588.006 176.55 591.243 182.59 588.568 187.06C585.892 191.529 579.039 191.529 565.333 191.529H90.5591C76.4759 191.529 69.4343 191.529 66.7781 186.953C64.1219 182.376 67.615 176.262 74.6011 164.033Z" />
          </clipPath>
          <clipPath id="center_box_clip">
            <rect x="123.766" y="0" width="413" height="352" />
          </clipPath>
          <linearGradient
            id="paint0_linear_51_65"
            x1="329.353"
            y1="42.8774"
            x2="329.353"
            y2="79.1144"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0.4" />
            <stop offset="1" stopColor="white" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating Chip Layer */}
      <div className="absolute inset-0 z-10 flex items-center justify-center md:justify-start pointer-events-none">
        <div
          className="relative w-full h-full flex justify-center md:justify-start items-center"
          style={{ paddingBottom: "65%" }}
        >
          <div className="relative w-full max-w-[655px] h-full flex justify-center items-center">
            <AnimatePresence mode="wait">
              {items[0] ? (
                <motion.div
                  key={items[0].id}
                  initial={{
                    y: isMobile ? -60 : -120,
                    opacity: 0,
                    scale: isMobile ? 0.55 : 0.8,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    scale: isMobile ? 0.7 : 1.25,
                  }}
                  exit={{
                    y: isMobile ? 70 : 140,
                    opacity: 0,
                    scale: isMobile ? 0.55 : 0.8,
                    transition: {
                      y: {
                        type: "tween",
                        duration: 0.8,
                        ease: "easeInOut",
                      },
                      scale: {
                        type: "tween",
                        duration: 0.8,
                        ease: "easeInOut",
                      },
                      opacity: {
                        type: "tween",
                        duration: 0.6,
                        ease: "linear",
                      },
                    },
                  }}
                  transition={{
                    y: {
                      type: "spring",
                      stiffness: 35,
                      damping: 15,
                      mass: 1.2,
                    },
                    scale: {
                      type: "spring",
                      stiffness: 40,
                      damping: 16,
                      mass: 1.2,
                    },
                    opacity: {
                      type: "tween",
                      duration: 0.8,
                      ease: "easeInOut",
                    },
                  }}
                  className="bg-[#121212]/90 border border-white/10 z-10 rounded-full p-1.5 sm:p-2 w-[200px] sm:w-[240px] shadow-sm absolute pointer-events-auto flex items-center gap-1.5 sm:gap-2 origin-bottom"
                >
                  <div className="flex size-8 sm:size-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/80">
                    {(() => {
                      const IconComponent = items[0].icon;
                      return <IconComponent className="size-4 sm:size-5" />;
                    })()}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs sm:text-sm font-medium text-white leading-none">
                      {items[0].title}
                    </span>
                    <span className="text-[10px] sm:text-xs text-white/50">
                      {items[0].description}
                    </span>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* SVG Container: Top Matte Layer (Matted Glass Frame Overlay) */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 655 352"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
        style={{
          transform: "translate3d(0, 0, 0)",
        }}
      >
        {/* Top Layer Part 1: filter0 */}
        <g filter="url(#filter0_i_51_65)">
          <path
            d="M512.766 79.1595L147.766 79.1624C136.453 79.1625 130.796 79.1626 127.281 82.6773C123.766 86.192 123.766 91.8488 123.766 103.162V327.159C123.766 338.473 123.766 344.13 127.281 347.645C130.796 351.159 136.453 351.159 147.766 351.159H512.766C524.08 351.159 529.737 351.159 533.252 347.645C536.766 344.13 536.766 338.473 536.766 327.159V103.159C536.766 91.8457 536.766 86.1888 533.252 82.6741C529.737 79.1594 524.08 79.1594 512.766 79.1595Z"
            className="fill-[#0f0f0f]"
            fillOpacity="0.8"
          />
        </g>

        {/* Top Layer Part 2: filter6 Blur (Clipped to Box Width) */}
        <g clipPath="url(#center_box_clip)">
          <foreignObject x="0" y="0" width="655" height="352">
            <div
              style={{
                backdropFilter: "blur(60.03px)",
                WebkitBackdropFilter: "blur(60.03px)",
                height: "100%",
                width: "100%",
                background: "rgba(255, 255, 255, 0.01)",
                clipPath:
                  "path('M74.6011 164.033L123.116 79.1138L535.59 78.7419L581.532 164.469C588.006 176.55 591.243 182.59 588.568 187.06C585.892 191.529 579.039 191.529 565.333 191.529H90.5591C76.4759 191.529 69.4343 191.529 66.7781 186.953C64.1219 182.376 67.615 176.262 74.6011 164.033Z')",
              }}
            ></div>
          </foreignObject>
        </g>

        {/* Top Layer Part 2: filter6 */}
        <g
          filter="url(#filter6_dddi_51_65)"
          data-figma-bg-blur-radius="22.0545"
        >
          <path
            d="M74.6011 164.033L123.116 79.1138L535.59 78.7419L581.532 164.469C588.006 176.55 591.243 182.59 588.568 187.06C585.892 191.529 579.039 191.529 565.333 191.529H90.5591C76.4759 191.529 69.4343 191.529 66.7781 186.953C64.1219 182.376 67.615 176.262 74.6011 164.033Z"
            fill="white"
            fillOpacity="0.08"
            shapeRendering="crispEdges"
          />
        </g>
      </svg>
    </div>
  );
}

export function KedantraFooter() {
  return (
    <section
      id="footer"
      className="relative w-full overflow-hidden bg-transparent"
    >
      <div className="relative mx-auto w-full max-w-[clamp(20rem,92vw,76rem)] px-6 sm:px-12 lg:px-16 pt-14 pb-5 sm:pt-20 sm:pb-6 lg:pt-40 lg:pb-12 flex flex-col md:flex-row justify-between items-center md:items-center gap-12 md:gap-16">

        {/* Left Section: Bucket animation aligned left */}
        <div className="w-full max-w-[655px] md:w-[655px] shrink-0 flex flex-col items-center gap-2">
          <h3
            className="font-black-ops text-[clamp(0.875rem,3.5vw,2.75rem)] tracking-[0.18em] text-white/40 uppercase select-none text-center leading-tight"
            style={{
              textShadow: [
                "0 0 8px rgba(255,255,255,0.55)",   /* tight bright core */
                "0 0 20px rgba(255,255,255,0.30)",  /* mid glow */
                "0 0 55px rgba(255,255,255,0.15)",  /* wide soft halo */
                "0 2px 4px rgba(0,0,0,0.8)",        /* ground shadow for depth */
              ].join(", "),
            }}
          >
            OUR PRODUCT CONTAINS:
          </h3>
          <Bucket />
        </div>

        {/* Right Section: Social links list styled precisely like the second image */}
        <div className="flex flex-col items-center md:items-start text-left mt-8 md:mt-0 self-center md:self-center shrink-0 md:ml-4">
          <ul className="flex flex-row md:flex-col gap-4 md:gap-0 md:space-y-5 w-full justify-center md:justify-start items-center md:items-start">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.title} className="w-auto md:w-full">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center gap-3 text-base text-white transition-all duration-300 ${link.hoverText}`}
                  >
                    <span className={`p-3 rounded-lg border border-white/[0.06] bg-[#0d0d0d] text-white transition-all duration-300 ${link.hoverIconBg}`}>
                      <Icon className="w-6 h-6" strokeWidth={1.5} />
                    </span>
                    <span className="font-medium tracking-normal transition-colors duration-300 hidden md:block text-white">
                      {link.title}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Copyright notice remains intact at the very bottom */}
      <div className="relative mx-auto w-full max-w-[clamp(20rem,92vw,76rem)] px-6 sm:px-12 lg:px-16 pb-5">
        <p className="relative z-10 w-full border-t border-white/[0.06] pt-5 pb-1 text-center text-sm text-white/45">
          © 2026 KEDANTRA. All rights reserved.
        </p>
      </div>
    </section>
  );
}
