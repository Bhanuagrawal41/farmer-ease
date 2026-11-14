import React from "react";

export default function HeroVideo() {
  return (
    <section className="relative w-full overflow-hidden bg-forestAlt" style={{ height: "60vh" }}>
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/assets/hero-poster.jpg"
      >
        <source src="/assets/hero-720p.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay so text is readable */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 gap-4">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white font-sans tracking-tight leading-tight">
          Cultivating the Future with<br />Intelligent Earth Science
        </h1>
        <p className="text-sm md:text-base text-white/80 max-w-lg">
          AI-powered soil diagnostics, crop health monitoring, and smart farm planning — all in one place.
        </p>
        <a
          href="#start"
          className="px-6 py-2.5 bg-goldDark text-forestAlt font-semibold rounded-full hover:bg-goldLight transition text-sm"
        >
          Start Free Farm Trial
        </a>
      </div>
    </section>
  );
}
