import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home",                target: "hero" },
  { label: "Field Analytics",    target: "telemetry-radar" },
  { label: "Crop Advisory",      target: "rebha-copilot" },
  { label: "Equipment",          target: "ecosystem" },
  { label: "Smart Market",       target: "yield-calculator" },
  { label: "About Us",           target: "testimonials" },
];

export default function Navbar({ onScrollTo }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (target) => {
    onScrollTo(target);
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface/50 backdrop-blur-xl shadow-[0_1px_8px_rgba(45,38,26,0.04)] border-b border-surface-container-highest/60 transition-colors">
      <div className="h-20 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex items-center justify-between gap-3 lg:gap-5">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3 xl:gap-6">
          <a
            className="flex items-center gap-2.5 cursor-pointer shrink-0"
            onClick={() => go("hero")}
          >
            <img
              src="/assets/logo.png"
              alt="FarmEase Logo"
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain drop-shadow-sm"
            />
            <span className="font-headline-sm text-lg sm:text-xl text-primary tracking-tight font-bold">
              FarmEase
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm">
            {NAV_LINKS.map(({ label, target }, i) => (
              <button
                key={target}
                onClick={() => go(target)}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap font-body-sm text-body-sm ${
                  i === 0
                    ? "text-primary font-semibold border-b-2 border-primary"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container/60"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Utilities */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Weather pill */}
          <div className="hidden md:flex items-center gap-space-xs bg-surface-container-low/80 border border-surface-container-high/60 px-space-md py-space-xs rounded-full shadow-[0_2px_6px_-1px_rgba(45,38,26,0.04)]">
            <span className="material-symbols-outlined text-secondary text-[18px]">wb_sunny</span>
            <span className="font-label-md text-label-md text-on-surface font-medium">74°F · Fair Wind</span>
          </div>

          {/* Language */}
          <div className="hidden xl:flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md">
            <span className="material-symbols-outlined text-[18px]">language</span>
            <span>EN / Global</span>
          </div>

          {/* Phone */}
          <a
            className="hidden 2xl:flex items-center gap-space-xs text-on-surface-variant hover:text-primary transition-colors font-body-sm text-body-sm"
            href="tel:18003276327"
          >
            <span className="material-symbols-outlined text-[18px]">call</span>
            <span>1-800-FARM-EASE</span>
          </a>

          {/* CTA */}
          <button
            onClick={() => go("yield-calculator")}
            className="bg-primary hover:bg-primary-container text-on-primary font-body-sm text-body-sm font-medium px-3 sm:px-space-md py-space-sm rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap"
          >
            Get Started
          </button>

          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 cursor-pointer">
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-primary hover:bg-surface-container transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="lg:hidden w-full border-t border-b border-surface-container-highest bg-surface/95 backdrop-blur-2xl shadow-xl px-5 py-4 flex flex-col gap-2">
          {NAV_LINKS.map(({ label, target }, i) => (
            <button
              key={target}
              onClick={() => go(target)}
              className={`text-left py-2 px-3 rounded-lg text-sm transition-colors ${
                i === 0
                  ? "font-semibold text-primary bg-primary/10"
                  : "font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
              }`}
            >
              {label}
            </button>
          ))}
          <div className="pt-2 mt-1 border-t border-surface-container-highest flex items-center justify-between text-xs text-on-surface-variant">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">wb_sunny</span>
              74°F · Fair Wind
            </span>
            <span>1-800-FARM-EASE</span>
          </div>
        </div>
      )}
    </header>
  );
}
