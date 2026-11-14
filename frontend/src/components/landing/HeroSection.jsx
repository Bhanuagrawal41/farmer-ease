import React from "react";

export default function HeroSection({ onScrollTo, onShowDemo }) {
  return (
    <section
      id="hero"
      className="relative w-full -mt-20 overflow-hidden min-h-[942px] flex flex-col justify-between"
    >
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="https://lh3.googleusercontent.com/aida-public/AB6AXuCr16hoaJ4FL8nmuKctkHxC_uYEORb4fZ5fewtpyyZuXZ6KUOiVlmCJDOJm4XykorZW0YOI_y07jsYdYbJfvcUpBvRQ5ZcTAhISqmVQkqcwym3LItfm_HBWJatYQE-1f0EednG3TrXg1lMK3_9dbcZi2M3K0u8K80jkcJlRrcFIkLsJklxtUrHzSqY62jXKcPits7QXjYkUfB5aIncmYJsQokoEla3j2BnnZISlRjyfXc_UGqNYiYWy"
      >
        <source src="/assets/hero-720p.mp4" type="video/mp4" />
      </video>
      {/* Atmospheric Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/70 pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-gutter w-full pt-36 pb-16 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl space-y-space-md">
          {/* Badge */}
          <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-lowest/15 backdrop-blur-md shadow-sm border border-white/10">
            <span className="text-[14px]">🌾</span>
            <span className="font-label-md text-label-md text-primary-fixed uppercase tracking-wider">
              Next-Gen Autonomous Agriculture &amp; Yield Optimization
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display-lg text-display-lg text-surface tracking-tight font-bold text-4xl md:text-6xl">
            Cultivating the Future with Intelligent Earth Science
          </h1>

          {/* Subheadline */}
          <p className="font-body-lg text-body-lg text-white max-w-2xl leading-relaxed text-lg font-medium">
            FarmEase empowers modern growers, agronomists, and farm cooperatives with real-time
            soil telemetry, wind-adaptive crop monitoring, and AI-driven harvest forecasting.
          </p>

          {/* CTAs */}
          <div className="pt-space-sm flex flex-wrap items-center gap-space-md">
            <button
              onClick={() => onScrollTo("yield-calculator")}
              className="inline-flex items-center gap-space-xs px-space-lg py-space-md rounded-lg bg-secondary-container hover:bg-secondary-fixed-dim text-on-secondary-container font-headline-sm text-body-md font-semibold transition-all transform hover:-translate-y-0.5 shadow-md"
            >
              <span>Start Free Farm Trial</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
            <button
              onClick={onShowDemo}
              className="inline-flex items-center gap-space-xs px-space-lg py-space-md rounded-lg bg-surface-container-lowest/15 hover:bg-surface-container-lowest/25 backdrop-blur-md text-surface font-headline-sm text-body-md font-medium transition-all border border-white/20"
            >
              <span
                className="material-symbols-outlined text-secondary-fixed text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                play_circle
              </span>
              <span>Watch Interactive Demo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Live Metrics Bar */}
      <div className="relative z-10 w-full bg-primary-container/85 backdrop-blur-xl shadow-lg border-t border-white/10">
        <div className="max-w-7xl mx-auto px-gutter py-space-lg grid grid-cols-2 md:grid-cols-4 gap-space-lg">
          {[
            { val: "3.2M+", unit: "Acres", desc: "Under Active Monitoring", icon: null },
            { val: "28.4%", icon: "trending_up", desc: "Average Yield Uplift" },
            { val: "42%", unit: "H₂O / NPK", desc: "Water & Fertilizer Saved", icon: null },
            { val: "99.4%", icon: "verified", desc: "Predictive Pest Accuracy" },
          ].map(({ val, unit, icon, desc }, i) => (
            <div key={i} className="space-y-1">
              <div className="flex items-baseline gap-1">
                <span className="font-headline-lg text-headline-lg font-bold text-surface tracking-tight text-3xl md:text-4xl">
                  {val}
                </span>
                {unit && (
                  <span className="font-label-sm text-label-sm text-secondary-fixed font-semibold">{unit}</span>
                )}
                {icon && (
                  <span className="material-symbols-outlined text-[20px] text-tertiary-fixed">{icon}</span>
                )}
              </div>
              <p className="font-body-sm text-body-sm text-on-primary-container">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
