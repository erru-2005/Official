import React from "react";

export function VisionMissionSection() {
  return (
    <section
      id="vision"
      className="w-full bg-[#000000] py-20 sm:py-28 lg:py-32 font-sans select-none"
    >
      <div className="mx-auto w-full max-w-[clamp(20rem,92vw,72rem)] px-6 sm:px-12 lg:px-16 flex flex-col gap-12 sm:gap-16">
        
        {/* Simplified Header */}
        <div className="text-center">
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-[#ea4335] mb-2">
            Who We Are
          </p>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Vision &amp; Mission
          </h2>
        </div>

        {/* Clean, Formatted Two Column Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-start">
          
          {/* Vision Column */}
          <div className="flex flex-col gap-4 text-left">
            <h3 className="font-sans text-lg sm:text-xl font-bold text-white tracking-wide uppercase border-b border-white/10 pb-2">
              Our Vision
            </h3>
            <p className="font-sans text-sm sm:text-base text-white/70 leading-relaxed font-light">
              To build advanced, secure, and intelligent digital systems powered by next-generation AI, autonomous technologies, and high-performance infrastructure that can solve complex real-world problems with world-class scalability and innovation.
            </p>
          </div>

          {/* Mission Column */}
          <div className="flex flex-col gap-4 text-left">
            <h3 className="font-sans text-lg sm:text-xl font-bold text-white tracking-wide uppercase border-b border-white/10 pb-2">
              Our Mission
            </h3>
            <p className="font-sans text-sm sm:text-base text-white/70 leading-relaxed font-light">
              We develop high-quality, secure, and scalable websites, mobile applications, and digital platforms for modern organizations. We provide advanced feature integration, AI-powered solutions, and intelligent system automation while ensuring strong data security and reliable performance.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}



