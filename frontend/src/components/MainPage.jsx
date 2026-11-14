import React, { useState } from "react";
import { Leaf } from "lucide-react";

export default function MainPage() {
  // Yield Calculator State
  const [calcAcres, setCalcAcres] = useState(1250);
  const [calcCrop, setCalcCrop] = useState("wheat");
  const [activeField, setActiveField] = useState("north");
  const [copilotQuery, setCopilotQuery] = useState("");
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [subscribedEmail, setSubscribedEmail] = useState("");
  const [subscribedNotice, setSubscribedNotice] = useState(false);

  // Copilot messages state for in-page interactive copilot
  const [copilotMessages, setCopilotMessages] = useState([
    {
      role: "assistant",
      time: "08:45 AM",
      content:
        "Hello Marcus, I am Rebha, your FarmEase agronomic intelligence copilot. I've ingested and analyzed your Sentinel-2 NDVI multispectral imagery from 08:30 AM today along with subterranean soil probes across Lot #4.\n\nOverall vegetative vigor is strong (NDVI 0.78), but I flagged a slight reflective spectral dip along the upper terrace sandy loam strip. How can I assist your crop decisions today?",
    },
    {
      role: "user",
      time: "08:48 AM",
      author: "Marcus Vance (Farm Lead)",
      content:
        "Rebha, our west slope in Lot #4 showed lighter canopy on today's satellite pass. Is it nitrogen leaching or moisture stress?",
    },
  ]);

  // Dynamic calculations for the ROI Calculator
  const getCalculationOutputs = () => {
    let multiplier = 38.5;
    let boostPct = 26.4;
    let buAvg = 16.5;

    if (calcCrop === "corn") {
      multiplier = 46.2;
      boostPct = 29.1;
      buAvg = 22.4;
    } else if (calcCrop === "soy") {
      multiplier = 34.0;
      boostPct = 24.8;
      buAvg = 14.1;
    } else if (calcCrop === "cotton") {
      multiplier = 52.0;
      boostPct = 27.5;
      buAvg = 19.8;
    }

    const totalSavings = Math.round(Number(calcAcres || 0) * multiplier);
    return {
      savings: "$" + totalSavings.toLocaleString(),
      boost: "+" + boostPct + "%",
      bu: "+" + buAvg + " bu/acre avg",
    };
  };

  const calcOutputs = getCalculationOutputs();

  const handleCopilotSend = () => {
    if (!copilotQuery.trim()) return;
    const userMsg = {
      role: "user",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      author: "Farmer",
      content: copilotQuery.trim(),
    };
    setCopilotMessages((prev) => [...prev, userMsg]);
    const currentQ = copilotQuery;
    setCopilotQuery("");

    setTimeout(() => {
      setCopilotMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          content: `Analyzing ${currentQ} across local telemetry...\n\nField sensor readings confirm nitrogen availability is at 42 ppm in Zone B with optimal soil hydration (31.2%). Recommend applying 28 lbs N/acre side-dress prior to Zadoks 55 stage.`,
        },
      ]);
    }, 900);
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full bg-surface text-on-surface antialiased font-body-md overflow-x-hidden">
      {/* ==================== HEADER ==================== */}
      <header className="fixed top-0 left-0 w-full z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(45,38,26,0.05)] border-b border-surface-container-highest">
        <div className="h-20 w-full px-gutter max-w-7xl mx-auto flex items-center justify-between gap-space-md">
          {/* Logo & Brand */}
          <div className="flex items-center gap-space-lg">
            <a
              className="flex items-center gap-space-sm cursor-pointer"
              onClick={() => scrollTo("hero")}
            >
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-primary-fixed shadow-sm">
                <Leaf className="w-5 h-5 text-primary-fixed" />
              </div>
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight font-bold">
                FarmEase
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-space-lg">
              <button
                onClick={() => scrollTo("hero")}
                className="py-space-xs transition-colors text-primary font-semibold border-b-2 border-primary"
              >
                Home
              </button>
              <button
                onClick={() => scrollTo("telemetry-radar")}
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface py-space-xs transition-colors"
              >
                Field Analytics
              </button>
              <button
                onClick={() => scrollTo("rebha-copilot")}
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface py-space-xs transition-colors"
              >
                Crop Advisory
              </button>
              <button
                onClick={() => scrollTo("ecosystem")}
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface py-space-xs transition-colors"
              >
                Equipment &amp; Machinery
              </button>
              <button
                onClick={() => scrollTo("yield-calculator")}
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface py-space-xs transition-colors"
              >
                Smart Market
              </button>
              <button
                onClick={() => scrollTo("testimonials")}
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface py-space-xs transition-colors"
              >
                About Us
              </button>
            </nav>
          </div>

          {/* Right Utilities */}
          <div className="flex items-center gap-space-md">
            <div className="hidden md:flex items-center gap-space-xs bg-surface-container-low px-space-md py-space-xs rounded-full shadow-[0_2px_6px_-1px_rgba(45,38,26,0.04)]">
              <span className="material-symbols-outlined text-secondary text-[18px]">wb_sunny</span>
              <span className="font-label-md text-label-md text-on-surface font-medium">
                74°F · Fair Wind
              </span>
            </div>
            <div className="hidden lg:flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md">
              <span className="material-symbols-outlined text-[18px]">language</span>
              <span>EN / Global</span>
            </div>
            <a
              className="hidden sm:flex items-center gap-space-xs text-on-surface-variant hover:text-primary transition-colors font-body-sm text-body-sm"
              href="tel:18003276327"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              <span className="hidden xl:inline">1-800-FARM-EASE</span>
            </a>
            <button
              onClick={() => scrollTo("yield-calculator")}
              className="bg-primary hover:bg-primary-container text-on-primary font-body-sm text-body-sm font-medium px-space-md py-space-sm rounded-lg shadow-sm transition-all"
            >
              Get Started
            </button>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 cursor-pointer">
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </div>
          </div>
        </div>
      </header>

      {/* ==================== MAIN CONTENT ==================== */}
      <main className="w-full pt-20 bg-surface">
        {/* ==================== 1. HERO SECTION ==================== */}
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
            Your browser does not support the video tag.
          </video>
          {/* Atmospheric Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/70 pointer-events-none" />

          {/* Foreground Hero Content */}
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
                  onClick={() => scrollTo("yield-calculator")}
                  className="inline-flex items-center gap-space-xs px-space-lg py-space-md rounded-lg bg-secondary-container hover:bg-secondary-fixed-dim text-on-secondary-container font-headline-sm text-body-md font-semibold transition-all transform hover:-translate-y-0.5 shadow-md"
                >
                  <span>Start Free Farm Trial</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
                <button
                  onClick={() => setShowDemoModal(true)}
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

          {/* Live Hero Metrics Bar */}
          <div className="relative z-10 w-full bg-primary-container/85 backdrop-blur-xl shadow-lg border-t border-white/10">
            <div className="max-w-7xl mx-auto px-gutter py-space-lg grid grid-cols-2 md:grid-cols-4 gap-space-lg">
              <div className="space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className="font-headline-lg text-headline-lg font-bold text-surface tracking-tight text-3xl md:text-4xl">
                    3.2M+
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary-fixed font-semibold">
                    Acres
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-primary-container">
                  Under Active Monitoring
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className="font-headline-lg text-headline-lg font-bold text-surface tracking-tight text-3xl md:text-4xl">
                    28.4%
                  </span>
                  <span className="material-symbols-outlined text-[20px] text-tertiary-fixed">
                    trending_up
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-primary-container">
                  Average Yield Uplift
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className="font-headline-lg text-headline-lg font-bold text-surface tracking-tight text-3xl md:text-4xl">
                    42%
                  </span>
                  <span className="font-label-sm text-label-sm text-tertiary-fixed font-semibold">
                    H₂O / NPK
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-primary-container">
                  Water &amp; Fertilizer Saved
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className="font-headline-lg text-headline-lg font-bold text-surface tracking-tight text-3xl md:text-4xl">
                    99.4%
                  </span>
                  <span className="material-symbols-outlined text-[20px] text-secondary-fixed">
                    verified
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-primary-container">
                  Predictive Pest Accuracy
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 2. PRECISION AG ECOSYSTEM ==================== */}
        <section id="ecosystem" className="w-full py-space-xl bg-surface">
          <div className="max-w-7xl mx-auto px-gutter space-y-space-xl">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
              <div className="max-w-xl space-y-space-xs">
                <div className="inline-flex items-center gap-2 text-primary font-label-md text-label-md uppercase tracking-wider font-semibold">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  Integrated Smart Ecosystem
                </div>
                <h2 className="font-headline-lg text-headline-lg text-on-surface text-3xl font-bold">
                  Engineered for Precision Across Every Hectare
                </h2>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
                Harmonizing multi-spectral satellite intelligence, soil robotics, and machine
                telemetry into one unified command center.
              </p>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
              {/* Card 1 */}
              <div className="group relative rounded-xl bg-surface-container-lowest p-space-lg shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between border border-surface-container-highest">
                <div className="space-y-space-md">
                  <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-surface transition-colors">
                    <span className="material-symbols-outlined text-[24px]">sensors</span>
                  </div>
                  <div className="space-y-1">
                    <span className="font-label-sm text-label-sm text-secondary font-semibold uppercase">
                      Telemetry Core
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      Smart Field Sensors
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Multi-spectral canopy scans, in-ground moisture probes at 3 depths, and
                      hyper-local micro-climate wind sensing.
                    </p>
                  </div>
                </div>
                <div className="pt-space-md mt-space-md flex items-center justify-between text-primary font-label-md text-label-md font-semibold border-t border-surface-container-highest/60">
                  <span>24/7 Sensor Ping</span>
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group relative rounded-xl bg-surface-container-lowest p-space-lg shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between border border-surface-container-highest">
                <div className="space-y-space-md">
                  <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-surface transition-colors">
                    <span className="material-symbols-outlined text-[24px]">psychology</span>
                  </div>
                  <div className="space-y-1">
                    <span className="font-label-sm text-label-sm text-secondary font-semibold uppercase">
                      Neural Bio-Models
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      AI Crop Intelligence
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Predictive phenology tracking, variable-rate fertilizer prescription, and
                      pinpoint yield forecasting algorithms.
                    </p>
                  </div>
                </div>
                <div className="pt-space-md mt-space-md flex items-center justify-between text-primary font-label-md text-label-md font-semibold border-t border-surface-container-highest/60">
                  <span>99.4% F1-Score</span>
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group relative rounded-xl bg-surface-container-lowest p-space-lg shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between border border-surface-container-highest">
                <div className="space-y-space-md">
                  <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-surface transition-colors">
                    <span className="material-symbols-outlined text-[24px]">agriculture</span>
                  </div>
                  <div className="space-y-1">
                    <span className="font-label-sm text-label-sm text-secondary font-semibold uppercase">
                      Fleet Automation
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      Autonomous Fleet Sync
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Centimeter-accurate RTK harvester guidance, automated pivot irrigation
                      triggers, and scheduled drone scouting passes.
                    </p>
                  </div>
                </div>
                <div className="pt-space-md mt-space-md flex items-center justify-between text-primary font-label-md text-label-md font-semibold border-t border-surface-container-highest/60">
                  <span>ISOBUS Compatible</span>
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>

              {/* Card 4 */}
              <div className="group relative rounded-xl bg-surface-container-lowest p-space-lg shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between border border-surface-container-highest">
                <div className="space-y-space-md">
                  <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-surface transition-colors">
                    <span className="material-symbols-outlined text-[24px]">storefront</span>
                  </div>
                  <div className="space-y-1">
                    <span className="font-label-sm text-label-sm text-secondary font-semibold uppercase">
                      Open Exchange
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      Direct Smart Market
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Lock in forward grain contracts without intermediary fees, source organic soil
                      amendments, and rent heavy machinery.
                    </p>
                  </div>
                </div>
                <div className="pt-space-md mt-space-md flex items-center justify-between text-primary font-label-md text-label-md font-semibold border-t border-surface-container-highest/60">
                  <span>Zero Brokerage Cut</span>
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 3. REBHA AI COPILOT WORKSPACE ==================== */}
        <section
          id="rebha-copilot"
          className="w-full py-space-xl bg-surface border-t border-b border-surface-container-highest/60"
        >
          <div className="max-w-7xl mx-auto px-gutter space-y-space-lg">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
              <div className="max-w-2xl space-y-space-xs">
                <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-primary-fixed/20 border border-primary-fixed text-primary font-label-md text-label-md uppercase tracking-wider font-semibold">
                  <span className="material-symbols-outlined text-[16px] text-primary">smart_toy</span>
                  <span>AGBIO INTELLIGENCE IN ACTION</span>
                </div>
                <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight text-3xl">
                  Meet Rebha — Real-Time AI Agronomy Copilot
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Analyze live multi-spectral Sentinel-2 passes, calibrate against 3,240+ in-ground
                  telemetry probes, and synthesize variable-rate crop prescriptions in seconds.
                </p>
              </div>
              <div className="flex items-center gap-space-sm self-start md:self-auto">
                <div className="flex items-center gap-2 px-space-md py-1.5 rounded-full bg-surface-container border border-outline-variant font-label-md text-label-md text-primary">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span>Live Synced: 3,240 Probes</span>
                </div>
                <div className="flex items-center gap-1.5 px-space-md py-1.5 rounded-full bg-secondary-container/30 border border-secondary-container text-on-secondary-container font-label-md text-label-md font-medium">
                  <span className="material-symbols-outlined text-[16px]">bolt</span>
                  <span>Engine v4.2</span>
                </div>
              </div>
            </div>

            {/* Main Copilot Interface Wrapper */}
            <div className="bg-surface-container-lowest rounded-2xl border border-surface-container-highest shadow-xl overflow-hidden">
              {/* Telemetry Bar */}
              <div className="border-b border-surface-container-highest bg-surface-container-low px-space-lg py-space-sm flex flex-wrap items-center justify-between gap-space-md">
                <div className="flex items-center gap-space-md">
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-fixed shadow-sm">
                    <span className="material-symbols-outlined text-[22px]">psychology_alt</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-headline-sm text-body-md font-bold text-on-surface">
                        Rebha AI
                      </span>
                      <span className="px-2 py-0.5 rounded bg-primary text-primary-fixed font-label-sm text-[11px] font-semibold uppercase tracking-wider">
                        AgBio Precision Copilot
                      </span>
                    </div>
                    <div className="flex items-center gap-3 font-label-sm text-label-sm text-on-surface-variant pt-0.5">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">satellite_alt</span>
                        Sentinel-2 Multispectral: <strong>1h 48m ago</strong>
                      </span>
                      <span className="hidden sm:inline text-outline-variant">•</span>
                      <span className="hidden sm:inline">Resolution: 10m/pixel (Level-2A BOA)</span>
                    </div>
                  </div>
                </div>

                {/* Target Lot Selector & Quick Vitals */}
                <div className="flex flex-wrap items-center gap-space-md">
                  <div className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant px-space-md py-1.5 rounded-lg">
                    <span className="material-symbols-outlined text-primary text-[18px]">terrain</span>
                    <div className="text-left">
                      <div className="font-label-sm text-[10px] text-on-surface-variant uppercase leading-none">
                        Target Field Lot
                      </div>
                      <div className="font-label-md text-label-md font-semibold text-on-surface">
                        North Valley Lot #4 (Hard Red Spring Wheat)
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant text-[18px] ml-1">
                      expand_more
                    </span>
                  </div>
                  <div className="flex items-center gap-space-sm">
                    <div className="px-space-sm py-1 rounded-md bg-surface-container border border-surface-container-high flex items-center gap-1.5 font-label-sm text-label-sm">
                      <span className="material-symbols-outlined text-primary text-[15px]">
                        water_drop
                      </span>
                      <span>
                        Soil Moist: <strong>34%</strong>{" "}
                        <span className="text-on-surface-variant font-normal">Adequate</span>
                      </span>
                    </div>
                    <div className="px-space-sm py-1 rounded-md bg-surface-container border border-surface-container-high flex items-center gap-1.5 font-label-sm text-label-sm">
                      <span className="material-symbols-outlined text-secondary text-[15px]">
                        thermostat
                      </span>
                      <span>
                        Acc. GDD: <strong>1,418</strong>{" "}
                        <span className="text-on-surface-variant font-normal">°F-day</span>
                      </span>
                    </div>
                    <div className="hidden md:flex px-space-sm py-1 rounded-md bg-surface-container border border-surface-container-high items-center gap-1.5 font-label-sm text-label-sm">
                      <span className="material-symbols-outlined text-tertiary-fixed-dim text-[15px]">
                        spa
                      </span>
                      <span>
                        Mean NDVI: <strong>0.78</strong>
                      </span>
                    </div>
                    <button
                      className="flex items-center gap-1 px-space-sm py-1 rounded-md bg-surface-container hover:bg-surface-container-high text-on-surface-variant text-label-sm font-label-sm transition-colors cursor-pointer"
                      title="Refresh Telemetry"
                    >
                      <span className="material-symbols-outlined text-[15px]">refresh</span>
                      <span className="hidden lg:inline">Refresh</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Workstation Body */}
              <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-surface-container-highest">
                {/* Left Sidebar (Col 4) */}
                <div className="lg:col-span-4 p-space-md sm:p-space-lg bg-surface-container-low/60 space-y-space-md flex flex-col justify-between">
                  <div className="space-y-space-md">
                    {/* Active Field Telemetry Card */}
                    <div className="bg-surface-container-lowest rounded-xl p-space-md border border-surface-container-highest shadow-sm space-y-space-sm">
                      <div className="flex items-center justify-between pb-1 border-b border-surface-container-highest/60">
                        <div className="flex items-center gap-1.5 text-primary font-label-md text-label-md font-semibold">
                          <span className="material-symbols-outlined text-[18px]">sensors</span>
                          <span>Active Field Telemetry</span>
                        </div>
                        <span className="font-label-sm text-[10px] px-2 py-0.5 rounded bg-primary-fixed/30 text-on-primary-fixed font-semibold">
                          Probe #104 Active
                        </span>
                      </div>
                      <p className="font-label-sm text-[11px] text-on-surface-variant leading-tight">
                        Real-time parameters fed into Rebha inference pipeline:
                      </p>
                      <div className="grid grid-cols-2 gap-space-sm pt-1">
                        <div className="bg-surface-container-low p-2.5 rounded-lg">
                          <div className="font-label-sm text-[11px] text-on-surface-variant">
                            Active N-Index
                          </div>
                          <div className="font-headline-sm text-headline-sm font-bold text-on-surface mt-0.5">
                            88{" "}
                            <span className="text-body-sm font-normal text-on-surface-variant">
                              / 100
                            </span>
                          </div>
                          <div className="w-full bg-surface-container rounded-full h-1.5 mt-1.5">
                            <div className="bg-primary h-1.5 rounded-full w-[88%]" />
                          </div>
                        </div>
                        <div className="bg-surface-container-low p-2.5 rounded-lg">
                          <div className="font-label-sm text-[11px] text-on-surface-variant">
                            Soil Temp (15cm)
                          </div>
                          <div className="font-headline-sm text-headline-sm font-bold text-on-surface mt-0.5">
                            68.4°F
                          </div>
                          <div className="font-label-sm text-[10px] text-primary font-medium mt-1">
                            Nominal Rooting
                          </div>
                        </div>
                        <div className="bg-surface-container-low p-2.5 rounded-lg">
                          <div className="font-label-sm text-[11px] text-on-surface-variant">
                            Micro-Wind Gust
                          </div>
                          <div className="font-headline-sm text-headline-sm font-bold text-on-surface mt-0.5">
                            14{" "}
                            <span className="text-body-sm font-normal text-on-surface-variant">
                              km/h WNW
                            </span>
                          </div>
                          <div className="font-label-sm text-[10px] text-secondary font-medium mt-1">
                            Safe Spray Window
                          </div>
                        </div>
                        <div className="bg-surface-container-low p-2.5 rounded-lg">
                          <div className="font-label-sm text-[11px] text-on-surface-variant">
                            Vapor Pressure Deficit
                          </div>
                          <div className="font-headline-sm text-headline-sm font-bold text-on-surface mt-0.5">
                            1.24{" "}
                            <span className="text-body-sm font-normal text-on-surface-variant">
                              kPa
                            </span>
                          </div>
                          <div className="font-label-sm text-[10px] text-primary font-medium mt-1">
                            Transpiration Good
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-1 font-label-sm text-[11px] text-on-surface-variant border-t border-surface-container-highest/60">
                        <span>Soil: Sandy Loam (pH 6.6)</span>
                        <a
                          className="text-primary hover:underline font-semibold flex items-center gap-0.5"
                          href="#rebha-copilot"
                        >
                          View Specimen Logs{" "}
                          <span className="material-symbols-outlined text-[14px]">
                            arrow_forward
                          </span>
                        </a>
                      </div>
                    </div>

                    {/* Consultations History */}
                    <div className="space-y-space-xs">
                      <div className="flex items-center justify-between font-label-md text-label-md text-on-surface-variant px-1">
                        <span className="font-semibold uppercase tracking-wider text-[11px]">
                          Recent Field Consultations
                        </span>
                        <span className="text-[11px] font-medium">5 Active</span>
                      </div>
                      <div className="space-y-1.5">
                        <div className="p-space-sm rounded-lg bg-surface-container border-l-4 border-primary shadow-xs cursor-pointer hover:bg-surface-container-high transition-colors">
                          <div className="flex items-center justify-between">
                            <span className="font-body-sm font-bold text-on-surface flex items-center gap-1.5">
                              <span className="material-symbols-outlined text-[16px] text-primary">
                                science
                              </span>
                              Soil Chemistry &amp; Nitrogen Rx
                            </span>
                            <span className="font-label-sm text-[10px] text-primary font-semibold">
                              Active now
                            </span>
                          </div>
                          <div className="font-label-sm text-[11px] text-on-surface-variant mt-0.5">
                            Lot #4 Leaching vs Stress analysis · 94% confidence
                          </div>
                        </div>
                        <div className="p-space-sm rounded-lg bg-surface-container-lowest border border-surface-container-highest hover:bg-surface-container transition-colors cursor-pointer">
                          <div className="flex items-center justify-between">
                            <span className="font-body-sm font-medium text-on-surface flex items-center gap-1.5">
                              <span className="material-symbols-outlined text-[16px] text-secondary">
                                bug_report
                              </span>
                              Pest Warning: Wheat Sawfly
                            </span>
                            <span className="font-label-sm text-[10px] text-on-surface-variant">
                              Yesterday
                            </span>
                          </div>
                          <div className="font-label-sm text-[11px] text-on-surface-variant mt-0.5">
                            Larval sweep recommendations
                          </div>
                        </div>
                        <div className="p-space-sm rounded-lg bg-surface-container-lowest border border-surface-container-highest hover:bg-surface-container transition-colors cursor-pointer">
                          <div className="flex items-center justify-between">
                            <span className="font-body-sm font-medium text-on-surface flex items-center gap-1.5">
                              <span className="material-symbols-outlined text-[16px] text-primary">
                                calendar_month
                              </span>
                              Harvest Moisture Window
                            </span>
                            <span className="font-label-sm text-[10px] text-on-surface-variant">
                              Aug 14
                            </span>
                          </div>
                          <div className="font-label-sm text-[11px] text-on-surface-variant mt-0.5">
                            Wheat 13.5% drydown projection
                          </div>
                        </div>
                        <div className="p-space-sm rounded-lg bg-surface-container-lowest border border-surface-container-highest hover:bg-surface-container transition-colors cursor-pointer">
                          <div className="flex items-center justify-between">
                            <span className="font-body-sm font-medium text-on-surface flex items-center gap-1.5">
                              <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                                water_drop
                              </span>
                              Irrigation Pivot Schedule
                            </span>
                            <span className="font-label-sm text-[10px] text-on-surface-variant">
                              Aug 12
                            </span>
                          </div>
                          <div className="font-label-sm text-[11px] text-on-surface-variant mt-0.5">
                            Section C pressure optimization
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footnote */}
                  <div className="pt-space-sm border-t border-surface-container-highest text-on-surface-variant font-label-sm text-[11px] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-primary">
                      verified
                    </span>
                    <span>
                      Cross-referenced with <strong>USDA AgResearch</strong>,{" "}
                      <strong>CIMMYT Wheat Genomes</strong>, and{" "}
                      <strong>ISO-11783 Variable-Rate specs</strong>.
                    </span>
                  </div>
                </div>

                {/* Right Main Panel (Col 8) */}
                <div className="lg:col-span-8 p-space-md sm:p-space-lg flex flex-col justify-between space-y-space-md bg-surface-container-lowest">
                  {/* Consultation Header */}
                  <div className="flex items-center justify-between pb-space-sm border-b border-surface-container-highest">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                      <div>
                        <h4 className="font-headline-sm text-body-md font-bold text-on-surface">
                          Consultation Session #4092
                        </h4>
                        <p className="font-label-sm text-label-sm text-on-surface-variant">
                          Active Context: Lot #4 (540 Acres) • Spring Wheat
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="p-1.5 rounded-lg border border-outline-variant hover:bg-surface-container text-on-surface-variant transition-colors"
                        title="Share Diagnostic"
                      >
                        <span className="material-symbols-outlined text-[18px]">ios_share</span>
                      </button>
                      <button
                        className="p-1.5 rounded-lg border border-outline-variant hover:bg-surface-container text-on-surface-variant transition-colors"
                        title="Settings"
                      >
                        <span className="material-symbols-outlined text-[18px]">tune</span>
                      </button>
                    </div>
                  </div>

                  {/* Chat Stream History */}
                  <div className="space-y-space-md overflow-y-auto pr-1 max-h-[580px]">
                    {/* Rendered Messages */}
                    {copilotMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex items-start gap-space-sm ${
                          msg.role === "user" ? "justify-end" : ""
                        }`}
                      >
                        {msg.role !== "user" && (
                          <div className="w-8 h-8 rounded-lg bg-primary text-primary-fixed flex items-center justify-center shrink-0 shadow-xs">
                            <span className="material-symbols-outlined text-[18px]">
                              psychology_alt
                            </span>
                          </div>
                        )}
                        <div
                          className={`space-y-space-xs ${
                            msg.role === "user" ? "max-w-xl text-right" : "max-w-2xl"
                          }`}
                        >
                          <div
                            className={`flex items-center gap-2 font-label-sm text-[11px] text-on-surface-variant ${
                              msg.role === "user" ? "justify-end" : ""
                            }`}
                          >
                            <span className="font-bold text-on-surface">
                              {msg.role === "user"
                                ? msg.author || "Marcus Vance (Farm Lead)"
                                : "Rebha Copilot"}
                            </span>
                            <span>{msg.time}</span>
                            {msg.role !== "user" && (
                              <span className="px-1.5 py-0.2 bg-primary-fixed/30 text-on-primary-fixed rounded font-semibold">
                                Engine v4.2
                              </span>
                            )}
                          </div>
                          <div
                            className={`rounded-2xl p-space-md font-body-sm text-body-sm leading-relaxed border whitespace-pre-line ${
                              msg.role === "user"
                                ? "bg-primary text-surface rounded-tr-none text-left shadow-sm border-transparent"
                                : "bg-surface-container-low text-on-surface rounded-tl-none border-surface-container-highest/60 space-y-2"
                            }`}
                          >
                            {msg.content}
                          </div>
                        </div>
                        {msg.role === "user" && (
                          <div className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface font-label-md text-label-md font-bold flex items-center justify-center shrink-0 border border-outline-variant">
                            MV
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Detailed Agronomic Diagnosis & Prescription Card */}
                    <div className="flex items-start gap-space-sm">
                      <div className="w-8 h-8 rounded-lg bg-primary text-primary-fixed flex items-center justify-center shrink-0 shadow-xs">
                        <span className="material-symbols-outlined text-[18px]">
                          psychology_alt
                        </span>
                      </div>
                      <div className="space-y-space-xs max-w-2xl w-full">
                        <div className="flex items-center gap-2 font-label-sm text-[11px] text-on-surface-variant">
                          <span className="font-bold text-on-surface">Rebha Copilot</span>
                          <span>08:49 AM</span>
                          <span className="px-1.5 py-0.2 bg-secondary-fixed text-on-secondary-fixed rounded font-semibold">
                            Agronomic Diagnosis
                          </span>
                        </div>
                        <div className="bg-surface-container-low rounded-2xl rounded-tl-none p-space-md text-on-surface font-body-sm text-body-sm border border-surface-container-highest/60 space-y-space-sm">
                          {/* Diagnostic Banner */}
                          <div className="p-space-sm rounded-lg bg-primary-fixed/20 border border-primary-fixed/60 flex items-center gap-2 text-primary font-headline-sm text-body-sm font-semibold">
                            <span className="material-symbols-outlined text-[20px] text-primary">
                              fact_check
                            </span>
                            <span>Diagnosis: 94% Confidence — High Nitrogen Leaching</span>
                          </div>
                          <p className="leading-relaxed text-on-surface">
                            I evaluated cross-spectral band ratios (<strong>REIP &amp; NDRE</strong>
                            ) alongside moisture probes at 20cm and 50cm depths. Moisture stress is
                            ruled out: the lower root zone has plenty of moisture. The canopy fade is
                            caused by <strong>severe nitrogen leaching</strong> down into the coarse
                            sand strata following Tuesday night’s{" "}
                            <strong>1.84-inch convective storm</strong>.
                          </p>

                          {/* Telemetry Sensor HUD */}
                          <div className="bg-surface-container-lowest rounded-xl p-space-sm border border-surface-container-highest space-y-2">
                            <div className="flex items-center justify-between font-label-sm text-[11px] text-on-surface-variant">
                              <span className="font-semibold text-on-surface flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px] text-primary">
                                  equalizer
                                </span>{" "}
                                Sensor Probe #104 vs Zone Baseline
                              </span>
                              <span>Depth: 15-38 cm</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-label-sm">
                              <div className="p-2 rounded bg-surface-container-low">
                                <div className="flex justify-between">
                                  <span className="text-on-surface-variant">
                                    Subsurface Available N
                                  </span>
                                  <span className="font-bold text-error">
                                    42 ppm{" "}
                                    <span className="font-normal text-on-surface-variant">
                                      (Baseline: 75 ppm)
                                    </span>
                                  </span>
                                </div>
                                <div className="w-full bg-surface-container rounded-full h-1.5 mt-1">
                                  <div className="bg-error h-1.5 rounded-full w-[44%]" />
                                </div>
                                <span className="text-[10px] text-error font-medium block mt-1">
                                  33 ppm below critical heading threshold
                                </span>
                              </div>
                              <div className="p-2 rounded bg-surface-container-low">
                                <div className="flex justify-between">
                                  <span className="text-on-surface-variant">
                                    Root-Zone Moisture (38cm)
                                  </span>
                                  <span className="font-bold text-primary">
                                    31.2%{" "}
                                    <span className="font-normal text-on-surface-variant">
                                      (Optimal: 28-34%)
                                    </span>
                                  </span>
                                </div>
                                <div className="w-full bg-surface-container rounded-full h-1.5 mt-1">
                                  <div className="bg-primary h-1.5 rounded-full w-[85%]" />
                                </div>
                                <span className="text-[10px] text-primary font-medium block mt-1">
                                  Root hydration optimal — no irrigation needed
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Visual Curve */}
                          <div className="p-2 rounded bg-surface-container-low border border-surface-container-highest/60">
                            <div className="flex items-center justify-between font-label-sm text-[10px] text-on-surface-variant mb-1">
                              <span className="font-semibold text-on-surface">
                                Canopy Spectral Attenuation Profile (West Slope vs Standard)
                              </span>
                              <span>Sentinel Band 8A / 4</span>
                            </div>
                            <div className="h-12 w-full flex items-end">
                              <svg
                                className="w-full h-10"
                                preserveAspectRatio="none"
                                viewBox="0 0 400 40"
                              >
                                <path
                                  d="M0,20 Q100,5 200,28 T400,10"
                                  fill="none"
                                  stroke="#c0c9c3"
                                  strokeDasharray="3,3"
                                  strokeWidth="1.5"
                                />
                                <path
                                  d="M0,20 Q100,8 180,34 T400,24"
                                  fill="none"
                                  stroke="#825500"
                                  strokeWidth="2.5"
                                />
                                <circle cx="180" cy="34" fill="#825500" r="3.5" />
                              </svg>
                            </div>
                            <div className="flex justify-between font-label-sm text-[9px] text-on-surface-variant">
                              <span>Field Boundary 0m</span>
                              <span className="text-secondary font-bold">
                                Peak N-Deficit (-38%)
                              </span>
                              <span>West Crest 850m</span>
                            </div>
                          </div>

                          {/* Prescription Box */}
                          <div className="p-space-sm rounded-xl bg-secondary-fixed/30 border border-secondary-fixed space-y-2">
                            <div className="flex items-center gap-1.5 text-secondary font-headline-sm text-body-sm font-bold">
                              <span className="material-symbols-outlined text-[18px]">
                                assignment_turned_in
                              </span>
                              <span>Recommended Variable-Rate Agronomic Prescription:</span>
                            </div>
                            <p className="font-body-sm text-body-sm text-on-surface leading-normal">
                              Deploy a targeted side-dress application of{" "}
                              <strong>UAN-32 liquid nitrogen at 28 lbs N/acre</strong> focused
                              strictly on Zone B (84 acres) to recover protein accumulation prior to
                              the Zadoks 55 inflorescence stage.
                            </p>
                            <div className="flex flex-wrap items-center gap-2 pt-1">
                              <button
                                className="px-space-md py-1.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                                type="button"
                              >
                                <span className="material-symbols-outlined text-[16px]">
                                  file_download
                                </span>
                                <span>Export Variable-Rate GeoJSON Rx</span>
                              </button>
                              <button
                                className="px-space-md py-1.5 rounded-lg bg-surface-container-lowest border border-outline-variant hover:bg-surface-container text-primary font-label-md text-label-md font-medium flex items-center gap-1.5 transition-colors"
                                type="button"
                              >
                                <span className="material-symbols-outlined text-[16px]">
                                  flight_takeoff
                                </span>
                                <span>Schedule Drone High-Res Scout</span>
                              </button>
                              <button
                                className="px-space-sm py-1.5 rounded-lg bg-surface-container-lowest border border-outline-variant hover:bg-surface-container text-on-surface font-label-md text-label-md font-medium flex items-center gap-1 transition-colors"
                                type="button"
                              >
                                <span className="material-symbols-outlined text-[16px]">
                                  monitoring
                                </span>
                                <span>Simulate Yield Impact</span>
                              </button>
                            </div>
                          </div>

                          {/* Feedback */}
                          <div className="flex items-center justify-between pt-1 font-label-sm text-[11px] text-on-surface-variant border-t border-surface-container-highest/60">
                            <span>Was this field diagnosis accurate?</span>
                            <div className="flex items-center gap-2">
                              <button className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer">
                                <span className="material-symbols-outlined text-[14px]">
                                  thumb_up
                                </span>{" "}
                                Yes
                              </button>
                              <button className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer">
                                <span className="material-symbols-outlined text-[14px]">tune</span>{" "}
                                Needs Adjusting
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Prompt Input Bar */}
                  <div className="pt-space-sm border-t border-surface-container-highest space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-label-sm text-on-surface-variant px-1">
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Rebha AgBio-v4.2 Engine • Telemetry Context: Hard Red Spring Wheat • Lot #4
                      </span>
                      <span className="text-primary font-medium flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">
                          check_circle
                        </span>{" "}
                        Precision Spray Calibrated
                      </span>
                    </div>
                    <div className="relative flex items-center rounded-xl bg-surface-container-low border border-outline-variant focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all p-1.5">
                      <button
                        className="p-2 text-on-surface-variant hover:text-primary rounded-lg transition-colors"
                        title="Upload Field Boundary / Soil Lab Test"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          add_photo_alternate
                        </span>
                      </button>
                      <button
                        className="p-2 text-on-surface-variant hover:text-primary rounded-lg transition-colors"
                        title="Voice Dictation in Field"
                      >
                        <span className="material-symbols-outlined text-[20px]">mic</span>
                      </button>
                      <input
                        className="flex-1 bg-transparent px-space-sm text-on-surface placeholder:text-on-surface-variant/70 font-body-sm text-body-sm focus:outline-none"
                        placeholder="Ask Rebha about crop health, variable-rate prescriptions, soil chemistry, or weather impacts..."
                        type="text"
                        value={copilotQuery}
                        onChange={(e) => setCopilotQuery(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleCopilotSend();
                        }}
                      />
                      <button
                        onClick={handleCopilotSend}
                        className="px-space-lg py-2 rounded-lg bg-secondary-container hover:bg-secondary-fixed-dim text-on-secondary-container font-headline-sm text-body-md font-semibold flex items-center gap-1.5 transition-all shadow-sm shrink-0 cursor-pointer"
                        type="button"
                      >
                        <span>Dispatch Query</span>
                        <span className="material-symbols-outlined text-[18px]">north_east</span>
                      </button>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-label-sm text-on-surface-variant px-1">
                      <span>
                        Rebha uses field sensor telemetry and multi-spectral satellite imagery.
                        Always confirm high-stakes chemical applications with local crop insurance
                        requirements.
                      </span>
                      <span className="text-outline-variant hidden sm:inline">
                        Markdown &amp; Farm Coordinates Supported
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 4. REAL-TIME FIELD TELEMETRY & RADAR ==================== */}
        <section id="telemetry-radar" className="w-full py-space-xl bg-surface-container-low">
          <div className="max-w-7xl mx-auto px-gutter space-y-space-lg">
            {/* Title with Live Pulse Badge */}
            <div className="flex flex-wrap items-center justify-between gap-space-md">
              <div>
                <div className="flex items-center gap-space-xs font-label-md text-label-md text-primary mb-1 font-semibold">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary" />
                  </span>
                  <span>LIVE TELEMETRY FEED · REFRESH INTERVAL 4s</span>
                </div>
                <h2 className="font-headline-lg text-headline-lg text-on-surface text-3xl font-bold">
                  Real-Time Field Telemetry &amp; Crop Health Radar
                </h2>
              </div>
              {/* Field Switcher Pills */}
              <div className="flex items-center gap-space-xs bg-surface-container p-1 rounded-full text-on-surface">
                <button
                  onClick={() => setActiveField("north")}
                  className={`px-space-md py-1.5 rounded-full font-label-md text-label-md transition-all cursor-pointer ${
                    activeField === "north"
                      ? "bg-primary text-on-primary font-semibold"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  North Valley Lot #4
                </button>
                <button
                  onClick={() => setActiveField("south")}
                  className={`px-space-md py-1.5 rounded-full font-label-md text-label-md transition-all cursor-pointer ${
                    activeField === "south"
                      ? "bg-primary text-on-primary font-semibold"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  South Basin Corn #12
                </button>
                <button
                  onClick={() => setActiveField("east")}
                  className={`px-space-md py-1.5 rounded-full font-label-md text-label-md transition-all cursor-pointer ${
                    activeField === "east"
                      ? "bg-primary text-on-primary font-semibold"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  East Orchard Citrus
                </button>
              </div>
            </div>

            {/* Main Telemetry Card Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
              {/* Left (Col 8) Visual Field Map + Microclimate HUD */}
              <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between space-y-space-md border border-surface-container-highest">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
                      <span className="material-symbols-outlined text-[20px]">radar</span>
                    </div>
                    <div>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                        {activeField === "north"
                          ? "North Valley Wheat Lot #4"
                          : activeField === "south"
                          ? "South Basin Corn #12"
                          : "East Orchard Citrus"}
                      </h4>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">
                        GPS: 46°52'19.4"N 100°47'12.1"W · HARD RED SPRING WHEAT
                      </p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-surface-container font-label-sm text-label-sm text-primary font-semibold">
                    <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim" />
                    <span>CANOPY: VIGOROUS</span>
                  </div>
                </div>

                {/* Satellite Orthomosaic View */}
                <div className="relative w-full h-72 rounded-lg overflow-hidden bg-primary-container">
                  <img
                    alt="Agricultural orthomosaic map"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVKzvVRXBZWDOrXLq5HljyCNHYvrsaHSAq2lzI2e4oLyUU-WVFuSCxYlsCQikl5Y47Psf1AnKAsyK6JX-mcxOUDRoMibltJ0NLhFQFs-7aBt0L6xIZ5AgpTGGbKhAU_DGxTDq3cmElvsKXColnjKHeqYk4ZjAzNFIRjN9ceo3G8Qn8Dmtw03atFeodEheLoFGiEDHtwLDzf6U2mnQwfPbJsr61WuA7jIshYZIp_pA"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent pointer-events-none" />
                  {/* Floating Sensor Nodes */}
                  <div className="absolute top-1/4 left-1/3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm shadow-md text-primary font-label-sm text-label-sm font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                    <span>Node #104 · 34% Soil H₂O</span>
                  </div>
                  <div className="absolute bottom-1/3 right-1/4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm shadow-md text-primary font-label-sm text-label-sm font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container" />
                    <span>Drone Alpha · Scouting (92%)</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-surface font-label-sm text-label-sm">
                    <span>SENTINEL-2 L2A · RESOLUTION: 10m/px</span>
                    <span>CLOUD COVER: 0.0%</span>
                  </div>
                </div>

                {/* Microclimate Readouts */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm pt-space-xs">
                  <div className="p-space-sm rounded-lg bg-surface-container">
                    <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">air</span> Wind Speed
                    </span>
                    <p className="font-headline-sm text-headline-sm text-on-surface mt-1 font-bold">
                      14 <span className="font-label-sm text-body-sm font-normal">km/h</span>
                    </p>
                    <span className="font-label-sm text-label-sm text-secondary font-medium">
                      WNW · Moderate
                    </span>
                  </div>
                  <div className="p-space-sm rounded-lg bg-surface-container">
                    <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">water_drop</span> Soil
                      Moisture
                    </span>
                    <p className="font-headline-sm text-headline-sm text-on-surface mt-1 font-bold">
                      34<span className="font-label-sm text-body-sm font-normal">%</span>
                    </p>
                    <span className="font-label-sm text-label-sm text-primary font-medium">
                      Optimal Field Cap
                    </span>
                  </div>
                  <div className="p-space-sm rounded-lg bg-surface-container">
                    <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">biotech</span>{" "}
                      Nitrogen (N)
                    </span>
                    <p className="font-headline-sm text-headline-sm text-on-surface mt-1 font-bold">
                      88<span className="font-label-sm text-body-sm font-normal">/100</span>
                    </p>
                    <span className="font-label-sm text-label-sm text-primary font-medium">
                      Balanced Index
                    </span>
                  </div>
                  <div className="p-space-sm rounded-lg bg-surface-container">
                    <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">wb_sunny</span> Sun
                      Exposure
                    </span>
                    <p className="font-headline-sm text-headline-sm text-on-surface mt-1 font-bold">
                      8.2 <span className="font-label-sm text-body-sm font-normal">hrs</span>
                    </p>
                    <span className="font-label-sm text-label-sm text-secondary font-medium">
                      High Photosynthesis
                    </span>
                  </div>
                </div>
              </div>

              {/* Right (Col 4) Harvest Forecast Gauge */}
              <div className="lg:col-span-4 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between space-y-space-md border border-surface-container-highest">
                <div>
                  <div className="flex items-center justify-between mb-space-xs">
                    <span className="font-label-md text-label-md text-secondary uppercase font-semibold">
                      Yield Projection
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">
                      +18.2% vs '24
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Harvest Window Forecast
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    Estimated combining target based on GDD (Growing Degree Days) accumulation.
                  </p>
                </div>

                {/* Radial Gauge */}
                <div className="flex items-center justify-center py-space-sm relative">
                  <svg className="w-44 h-44 transform -rotate-90" viewBox="0 0 160 160">
                    <circle
                      className="text-surface-container"
                      cx="80"
                      cy="80"
                      fill="transparent"
                      r="68"
                      stroke="currentColor"
                      strokeWidth="12"
                    />
                    <circle
                      className="text-primary-container"
                      cx="80"
                      cy="80"
                      fill="transparent"
                      r="68"
                      stroke="currentColor"
                      strokeDasharray="427"
                      strokeDashoffset="105"
                      strokeLinecap="round"
                      strokeWidth="12"
                    />
                    <circle
                      className="text-secondary"
                      cx="80"
                      cy="80"
                      fill="transparent"
                      r="68"
                      stroke="currentColor"
                      strokeDasharray="427"
                      strokeDashoffset="360"
                      strokeLinecap="round"
                      strokeWidth="12"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center text-center">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      ESTIMATED YIELD
                    </span>
                    <span className="font-headline-lg text-headline-lg font-bold text-on-surface leading-none mt-1 text-3xl">
                      94.6
                    </span>
                    <span className="font-label-sm text-label-sm text-primary font-semibold mt-1">
                      bu / acre
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-space-xs">
                  <div className="flex justify-between items-center font-label-sm text-label-sm">
                    <span className="text-on-surface-variant">Optimal Window:</span>
                    <span className="text-on-surface font-semibold">Aug 18 - Aug 24 (6 Days)</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full w-4/5" />
                  </div>
                  <div className="flex justify-between items-center font-label-sm text-label-sm text-on-surface-variant pt-1">
                    <span>Current GDD: 1,840</span>
                    <span>Target: 2,100</span>
                  </div>
                </div>

                <button
                  onClick={() => scrollTo("rebha-copilot")}
                  className="w-full py-space-sm rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md font-semibold text-center transition-colors cursor-pointer"
                >
                  Open Advanced Spectral Inspector
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 5. TESTIMONIALS & TRUST ==================== */}
        <section id="testimonials" className="w-full py-space-xl bg-surface">
          <div className="max-w-7xl mx-auto px-gutter space-y-space-xl">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto space-y-space-xs">
              <span className="font-label-md text-label-md text-secondary uppercase font-semibold tracking-wider">
                Trusted by 14,000+ Growers Globally
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface text-3xl font-bold">
                Why Agricultural Leaders Rely on FarmEase
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                From multi-generational family farms to enterprise agribusinesses with 50,000+
                acres under management.
              </p>
            </div>

            {/* 3 Testimonials */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
              {/* 1 */}
              <div className="rounded-xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col justify-between space-y-space-md border border-surface-container-highest">
                <div className="space-y-space-sm">
                  <div className="flex text-secondary">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <p className="font-body-md text-body-md text-on-surface italic leading-relaxed">
                    "We shaved $47,000 off our fertilizer bill on our 4,200-acre corn operation in
                    Iowa. FarmEase pointed out that our east slope had excess nitrogen while the
                    sandy bench was starving."
                  </p>
                </div>
                <div className="flex items-center gap-space-sm pt-space-xs border-t border-surface-container-highest/60">
                  <img
                    alt="Marcus Vance"
                    className="w-12 h-12 rounded-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwWn50grMc9MUMd5LbcyRRPNedbmjFJaWUPowsETsyvvLsWHHnNXI-DMpm8qtyjZga9u7uxcdvkV94u1j1eYFCd0p9YpRAYnqQCs9CCZV8nN6pKXLnA21mz8LLiKQj_pHmAeL3BPfK8CLfukNanptVAB1wdrzfaFKM_L0zLf_Sz9Gd7VCdEzIPsqrNp2MpY0EuwzJMRYPgO4YBW37R1i8Kf1Olm1KR7qEH3JrWFp4"
                  />
                  <div>
                    <h5 className="font-headline-sm text-body-md font-bold text-on-surface">
                      Marcus Vance
                    </h5>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">
                      Managing Partner, PrairieRidge Ag (Iowa)
                    </p>
                  </div>
                </div>
              </div>

              {/* 2 */}
              <div className="rounded-xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col justify-between space-y-space-md border border-surface-container-highest">
                <div className="space-y-space-sm">
                  <div className="flex text-secondary">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <p className="font-body-md text-body-md text-on-surface italic leading-relaxed">
                    "The early pest alerts flagged wheat stem sawfly larvae three weeks before our
                    visual scouts would have spotted it. That alert alone preserved 32% of our
                    winter durum harvest."
                  </p>
                </div>
                <div className="flex items-center gap-space-sm pt-space-xs border-t border-surface-container-highest/60">
                  <img
                    alt="Dr. Elena Rostova"
                    className="w-12 h-12 rounded-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtWdoo6FwjzRfExM5R9mUjlJaKDAmrvZFMhEQlRvheqZR-LfdXI-SKf3dv4s8TwWPzeO2zvTMf9j-9ULeN0Iyr1PFWjGHeLWrYMhrTaWtX7YTpTVd4wcqg_8sd4nV4Y_EKgWb-GKCqvhjkoiMS62EgEKik-zvFFy5vdb1Sl9Fejr-Cbw2a4yjABEwEIdm1qk0MudLzGiZKm1fMtA4hvb8-OIh90hmCr01SXkm5Ymc"
                  />
                  <div>
                    <h5 className="font-headline-sm text-body-md font-bold text-on-surface">
                      Dr. Elena Rostova
                    </h5>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">
                      Lead Agronomist, Great Plains Cooperative
                    </p>
                  </div>
                </div>
              </div>

              {/* 3 */}
              <div className="rounded-xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col justify-between space-y-space-md border border-surface-container-highest">
                <div className="space-y-space-sm">
                  <div className="flex text-secondary">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <p className="font-body-md text-body-md text-on-surface italic leading-relaxed">
                    "Integrating our automated center pivot rigs with FarmEase soil sensors lowered
                    our aquifer water extraction by 41% with absolutely zero dip in almond kernel
                    density."
                  </p>
                </div>
                <div className="flex items-center gap-space-sm pt-space-xs border-t border-surface-container-highest/60">
                  <img
                    alt="Julian Chen"
                    className="w-12 h-12 rounded-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDZ1ovT6LrX48bQbXma1efKT5sQtnl9NarT0OBMhK2gmK9u6OrEx6tS7AzyC3W_cTSfrgUy1nHn0x4rHysRCWJH0bQ2si8_mdHK4w77aq6gJC3IMm5UMPOZxbjUGUtCnQOTprbOuJWkzz4iGMJN5oRdLsNoR-qO3Ksjb2d_AKCgpY44lAged_e0TSIqleiDFQDCWvJeQm_LmNxFkShvTBTkOzcSR2nVqayNzye8NQ"
                  />
                  <div>
                    <h5 className="font-headline-sm text-body-md font-bold text-on-surface">
                      Julian Chen
                    </h5>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">
                      Operations Director, Central Valley Orchards
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications Strip */}
            <div className="pt-space-lg flex flex-wrap items-center justify-center gap-space-xl opacity-80 border-t border-surface-container-highest">
              <div className="flex items-center gap-2 font-label-md text-label-md text-on-surface-variant">
                <span className="material-symbols-outlined text-primary text-[24px]">
                  verified_user
                </span>
                <span>USDA Organic Certified API</span>
              </div>
              <div className="flex items-center gap-2 font-label-md text-label-md text-on-surface-variant">
                <span className="material-symbols-outlined text-primary text-[24px]">
                  workspace_premium
                </span>
                <span>ISO 22000 Ag Safety</span>
              </div>
              <div className="flex items-center gap-2 font-label-md text-label-md text-on-surface-variant">
                <span className="material-symbols-outlined text-primary text-[24px]">hub</span>
                <span>AgTech Alliance Standard</span>
              </div>
              <div className="flex items-center gap-2 font-label-md text-label-md text-on-surface-variant">
                <span className="material-symbols-outlined text-primary text-[24px]">cloud_done</span>
                <span>SOC-2 Certified Farm Cloud</span>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 6. YIELD CALCULATOR & CTA ==================== */}
        <section id="yield-calculator" className="w-full py-space-xl bg-primary-container text-surface">
          <div className="max-w-7xl mx-auto px-gutter">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
              {/* Text Left */}
              <div className="lg:col-span-6 space-y-space-md">
                <span className="px-space-md py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold uppercase tracking-wider inline-block">
                  Instant Acreage ROI Estimate
                </span>
                <h2 className="font-headline-lg text-headline-lg font-bold tracking-tight text-surface text-3xl md:text-4xl">
                  Ready to Transform Your Acreage into a High-Yield Operation?
                </h2>
                <p className="font-body-lg text-body-lg text-surface-container-high leading-relaxed">
                  Configure your farm's parameters to forecast annual yield gains, chemical input
                  reductions, and net operational profit improvements.
                </p>
                <div className="space-y-space-xs pt-space-xs font-body-sm text-body-sm text-surface-container-highest">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-tertiary-fixed text-[18px]">
                      check_circle
                    </span>
                    <span>14-day zero-risk trial including satellite telemetry onboarding</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-tertiary-fixed text-[18px]">
                      check_circle
                    </span>
                    <span>Direct hardware sync with John Deere, Case IH, and AGCO machinery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-tertiary-fixed text-[18px]">
                      check_circle
                    </span>
                    <span>Dedicated regional agronomist assigned to your telemetry feed</span>
                  </div>
                </div>
              </div>

              {/* Calculator Card Right */}
              <div className="lg:col-span-6 bg-surface-container-lowest text-on-surface rounded-2xl p-space-lg shadow-xl space-y-space-md border border-white/20">
                <div className="flex items-center justify-between">
                  <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold text-xl">
                    Interactive Yield Booster
                  </h4>
                  <span className="font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-surface-container text-primary font-semibold">
                    2025 Algorithmic Model
                  </span>
                </div>

                {/* Form Fields */}
                <div className="space-y-space-sm">
                  <div>
                    <label className="block font-label-md text-label-md text-on-surface-variant mb-1 font-semibold">
                      TOTAL CULTIVATED ACREAGE
                    </label>
                    <div className="relative flex items-center">
                      <input
                        className="w-full h-11 px-space-md bg-surface-container-low rounded-lg text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary border border-surface-container-highest"
                        type="number"
                        value={calcAcres}
                        onChange={(e) => setCalcAcres(Number(e.target.value) || 0)}
                      />
                      <span className="absolute right-space-md font-label-md text-label-md text-on-surface-variant font-semibold">
                        ACRES
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-space-sm">
                    <div>
                      <label className="block font-label-md text-label-md text-on-surface-variant mb-1 font-semibold">
                        PRIMARY CROP
                      </label>
                      <select
                        className="w-full h-11 px-space-md bg-surface-container-low rounded-lg text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary border border-surface-container-highest cursor-pointer"
                        value={calcCrop}
                        onChange={(e) => setCalcCrop(e.target.value)}
                      >
                        <option value="wheat">Spring Wheat</option>
                        <option value="corn">Field Corn</option>
                        <option value="soy">Soybeans</option>
                        <option value="cotton">Upland Cotton</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-label-md text-label-md text-on-surface-variant mb-1 font-semibold">
                        REGION
                      </label>
                      <select className="w-full h-11 px-space-md bg-surface-container-low rounded-lg text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary border border-surface-container-highest cursor-pointer">
                        <option>North American Plains</option>
                        <option>Corn Belt (Midwest)</option>
                        <option>Pacific West Coast</option>
                        <option>European Union Basin</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Outputs */}
                <div className="p-space-md rounded-xl bg-surface-container grid grid-cols-2 gap-space-md">
                  <div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
                      ESTIMATED YIELD BOOST
                    </span>
                    <p className="font-headline-lg text-headline-lg font-bold text-primary mt-1 text-3xl">
                      {calcOutputs.boost}
                    </p>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      {calcOutputs.bu}
                    </span>
                  </div>
                  <div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
                      EST. ANNUAL SAVINGS
                    </span>
                    <p className="font-headline-lg text-headline-lg font-bold text-secondary mt-1 text-3xl">
                      {calcOutputs.savings}
                    </p>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Input &amp; Fuel optimization
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => alert("Your custom field plan request has been registered!")}
                  className="w-full h-12 bg-primary hover:bg-primary-container text-on-primary font-headline-sm text-body-md font-semibold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  type="button"
                >
                  <span>Claim Your Custom Field Plan</span>
                  <span className="material-symbols-outlined text-[18px]">east</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ==================== FOOTER ==================== */}
      <footer className="w-full bg-surface-container-low text-on-surface pt-space-xl pb-space-lg border-t border-surface-container-highest">
        <div className="max-w-7xl mx-auto px-gutter">
          {/* Pills */}
          <div className="flex flex-wrap items-center justify-between gap-space-md pb-space-lg mb-space-lg border-b border-surface-container-highest">
            <div className="flex items-center gap-space-md flex-wrap">
              <div className="flex items-center gap-space-xs bg-surface-container-high px-space-md py-space-xs rounded-full font-label-sm text-label-sm text-primary font-semibold">
                <span className="material-symbols-outlined text-[16px]">eco</span>
                <span>100% Regenerative Verified</span>
              </div>
              <div className="flex items-center gap-space-xs bg-surface-container-high px-space-md py-space-xs rounded-full font-label-sm text-label-sm text-primary font-semibold">
                <span className="material-symbols-outlined text-[16px]">water_drop</span>
                <span>Precision Water Certified</span>
              </div>
              <div className="flex items-center gap-space-xs bg-surface-container-high px-space-md py-space-xs rounded-full font-label-sm text-label-sm text-primary font-semibold">
                <span className="material-symbols-outlined text-[16px]">solar_power</span>
                <span>Carbon-Neutral Grid</span>
              </div>
            </div>
            <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm font-semibold">
              <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
              <span>USDA &amp; GlobalGAP Data Standardized</span>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-lg mb-space-xl">
            <div className="lg:col-span-2 pr-space-md">
              <div className="flex items-center gap-space-sm mb-space-sm">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-fixed">
                  <Leaf className="w-4 h-4 text-primary-fixed" />
                </div>
                <span className="font-headline-sm text-headline-sm text-primary font-bold text-xl">
                  FarmEase
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md max-w-sm">
                Field-to-cloud agricultural intelligence engineered for commercial growers,
                agronomists, and sustainable farm networks worldwide.
              </p>
              <form
                className="flex items-center gap-space-xs max-w-sm"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (subscribedEmail) {
                    setSubscribedNotice(true);
                    setSubscribedEmail("");
                  }
                }}
              >
                <div className="relative flex-1">
                  <input
                    className="w-full h-11 px-space-md rounded-lg bg-surface-container-lowest text-on-surface border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary font-body-sm text-body-sm"
                    placeholder="Enter farm email..."
                    type="email"
                    value={subscribedEmail}
                    onChange={(e) => setSubscribedEmail(e.target.value)}
                  />
                </div>
                <button
                  className="h-11 px-space-md bg-primary hover:bg-primary-container text-on-primary rounded-lg font-body-sm text-body-sm transition-colors cursor-pointer"
                  type="submit"
                >
                  Subscribe
                </button>
              </form>
              {subscribedNotice && (
                <p className="text-xs text-primary font-semibold mt-1.5">
                  ✓ Thank you for subscribing to FarmEase updates!
                </p>
              )}
            </div>

            <div>
              <h4 className="font-headline-sm text-body-md font-semibold text-on-surface mb-space-sm">
                Product Platform
              </h4>
              <ul className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
                <li>
                  <a className="hover:text-primary transition-colors cursor-pointer">
                    Satellite Telemetry
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors cursor-pointer">
                    AI Agronomist Engine
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors cursor-pointer">
                    Fleet &amp; Harvester Sync
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors cursor-pointer">
                    Grain &amp; Crop Exchange
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-headline-sm text-body-md font-semibold text-on-surface mb-space-sm">
                Operating Solutions
              </h4>
              <ul className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
                <li>
                  <a className="hover:text-primary transition-colors cursor-pointer">
                    Soil Chemistry Tracking
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors cursor-pointer">
                    Micro-Climate Station
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors cursor-pointer">
                    Irrigation Automation
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors cursor-pointer">
                    Supply-Chain Traceability
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-headline-sm text-body-md font-semibold text-on-surface mb-space-sm">
                Compliance &amp; Trust
              </h4>
              <ul className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
                <li>
                  <a className="hover:text-primary transition-colors cursor-pointer">
                    Carbon Credit Ledger
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors cursor-pointer">
                    Environmental Protocols
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors cursor-pointer">
                    Data Privacy &amp; Farm Rights
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors cursor-pointer">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-space-md border-t border-surface-container-highest flex flex-col sm:flex-row items-center justify-between gap-space-sm font-label-md text-label-md text-on-surface-variant">
            <div>© 2025 FarmEase Intelligence Inc. Cultivating sustainable precision agriculture.</div>
            <div className="flex items-center gap-space-md">
              <a className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</a>
              <a className="hover:text-primary transition-colors cursor-pointer">
                Security Whitepaper
              </a>
              <a className="hover:text-primary transition-colors cursor-pointer">API Integration</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ==================== INTERACTIVE VIDEO DEMO MODAL ==================== */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-surface-container-lowest rounded-2xl overflow-hidden shadow-2xl border border-surface-container-highest">
            <div className="flex items-center justify-between px-space-lg py-space-sm bg-primary text-on-primary">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">play_circle</span>
                <span className="font-headline-sm text-body-md font-semibold">
                  FarmEase Interactive Walkthrough Demo
                </span>
              </div>
              <button
                onClick={() => setShowDemoModal(false)}
                className="p-1 rounded-lg hover:bg-white/10 transition text-white cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="p-4 bg-black">
              <video
                className="w-full rounded-lg shadow max-h-[70vh] object-cover"
                controls
                autoPlay
                playsInline
              >
                <source src="/assets/hero-720p.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
