"use client";

import { motion } from "motion/react";
import { Sparkles, ArrowRight, Play, Hand, Ear, MessageCircle, Waves, Eye, Languages } from "lucide-react";

export function Hero() {
  // Floating sign-language themed icons positioned around the hero
  const floatingIcons = [
    { Icon: Hand, top: "12%", left: "6%", size: 56, delay: 0, rotate: -12, hue: "text-primary/30" },
    { Icon: Hand, top: "22%", right: "8%", size: 72, delay: 0.3, rotate: 18, hue: "text-accent/30", flip: true },
    { Icon: Ear, top: "55%", left: "4%", size: 44, delay: 0.5, rotate: -8, hue: "text-primary/25" },
    { Icon: MessageCircle, top: "68%", right: "6%", size: 52, delay: 0.7, rotate: 10, hue: "text-accent/25" },
    { Icon: Waves, top: "40%", left: "10%", size: 48, delay: 0.4, rotate: 0, hue: "text-primary/20" },
    { Icon: Eye, bottom: "18%", left: "14%", size: 40, delay: 0.6, rotate: 6, hue: "text-accent/30" },
    { Icon: Languages, top: "8%", right: "20%", size: 44, delay: 0.2, rotate: -6, hue: "text-primary/25" },
    { Icon: Hand, bottom: "10%", right: "18%", size: 60, delay: 0.8, rotate: -20, hue: "text-primary/25" },
  ] as const;

  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-32 pb-20">
      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full animate-float-slow"
          style={{ background: "var(--gradient-orb-1)" }}
        />
        <div
          className="absolute top-1/3 -right-32 h-[600px] w-[600px] rounded-full animate-float-slow-reverse"
          style={{ background: "var(--gradient-orb-2)" }}
        />
        <div
          className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full animate-float-slow"
          style={{ background: "var(--gradient-orb-3)" }}
        />
      </div>

      {/* Sign-language themed floating icons */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {floatingIcons.map((item, i) => {
          const { Icon, size, delay, rotate, hue } = item;
          const pos: React.CSSProperties = {
            top: "top" in item ? item.top : undefined,
            bottom: "bottom" in item ? item.bottom : undefined,
            left: "left" in item ? item.left : undefined,
            right: "right" in item ? item.right : undefined,
          };
          return (
            <motion.div
              key={i}
              style={pos}
              className="absolute"
              initial={{ opacity: 0, scale: 0.6, rotate: rotate - 10 }}
              animate={{ opacity: 1, scale: 1, rotate, y: [0, -14, 0] }}
              transition={{
                opacity: { duration: 1.2, delay },
                scale: { duration: 1.2, delay },
                rotate: { duration: 1.2, delay },
                y: { duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay },
              }}
            >
              <Icon
                size={size}
                strokeWidth={1.25}
                className={`${hue} ${"flip" in item && item.flip ? "-scale-x-100" : ""} drop-shadow-[0_0_25px_rgba(139,92,246,0.35)]`}
              />
            </motion.div>
          );
        })}

        {/* Dotted connection lines — evokes hand-tracking landmarks */}
        <svg className="absolute inset-0 h-full w-full opacity-30" aria-hidden="true">
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.55 0.25 290)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="oklch(0.78 0.18 230)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M 80 140 Q 300 240 520 180 T 980 260"
            stroke="url(#lineGrad)"
            strokeWidth="1.5"
            strokeDasharray="2 8"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />
          <motion.path
            d="M 120 600 Q 400 500 700 580 T 1200 520"
            stroke="url(#lineGrad)"
            strokeWidth="1.5"
            strokeDasharray="2 8"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, ease: "easeInOut", delay: 0.4 }}
          />
        </svg>

        {/* Soft hand-tracking dots */}
        {[
          { top: "18%", left: "30%" },
          { top: "30%", left: "70%" },
          { top: "50%", left: "20%" },
          { top: "62%", left: "82%" },
          { bottom: "22%", left: "45%" },
          { top: "14%", left: "55%" },
        ].map((p, i) => (
          <motion.span
            key={`dot-${i}`}
            style={p as React.CSSProperties}
            className="absolute h-2 w-2 rounded-full bg-primary/60 shadow-[0_0_12px_4px_rgba(139,92,246,0.5)]"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </div>

      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Real-time ISL recognition · Powered by AI
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-8 font-display text-5xl md:text-7xl lg:text-[6.5rem] font-bold leading-[0.95] tracking-tighter"
        >
          Speak with<br />
          <span className="text-gradient">silent hands.</span><br />
          <span className="relative inline-block">
            Hear with eyes.
            <svg
              className="absolute -bottom-3 left-0 w-full"
              viewBox="0 0 300 12"
              fill="none"
            >
              <path
                d="M2 9 Q 75 1 150 6 T 298 4"
                stroke="url(#g1)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="300" y2="0">
                  <stop stopColor="oklch(0.55 0.25 290)" />
                  <stop offset="1" stopColor="oklch(0.78 0.18 230)" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mx-auto mt-10 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed"
        >
          SignSetu turns Indian Sign Language into spoken words — and voice into signs — in real time.
          Build empathy, foster awareness, and connect inclusively with the Deaf and hard-of-hearing community.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => window.open("/speech-to-text", "_blank")}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-hero px-8 py-4 text-sm font-semibold text-foreground shadow-glow transition-transform hover:scale-105"
          >
            Start Communicating
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => window.open("/upload", "_blank")}
            className="inline-flex items-center gap-3 rounded-full glass px-6 py-4 text-sm font-medium transition-colors hover:bg-white/5"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20">
              <Play className="h-3 w-3 fill-primary text-primary" />
            </span>
            Upload to Translate
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto mt-20 grid grid-cols-3 gap-6 md:gap-12 max-w-3xl"
        >
          {[
            { v: "63M+", l: "Deaf people in India" },
            { v: "2,000+", l: "ISL signs trained" },
            { v: "<200ms", l: "Translation latency" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display text-3xl md:text-5xl font-bold text-gradient">{s.v}</div>
              <div className="mt-2 text-xs md:text-sm text-muted-foreground leading-snug">{s.l}</div>
            </div>
          ))}
        </motion.div>

        {/* Marquee */}
        <div className="mt-24 relative overflow-hidden border-y border-white/10 py-6 -mx-6 md:-mx-10">
          <div className="flex animate-marquee gap-16 whitespace-nowrap">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-16 items-center text-muted-foreground/60">
                {["Inclusive by design", "Real-time AI", "Built for India", "ISL Certified", "Privacy-first", "Open Community"].map((t) => (
                  <span key={t} className="flex items-center gap-3 font-display text-lg">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
