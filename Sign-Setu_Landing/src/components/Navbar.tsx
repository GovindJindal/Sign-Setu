import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import logo from "@/assets/sign-setu-logo.png";

const links = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how" },
  { label: "Who It's For", href: "#who" },
];

export function Navbar() {
  const [active, setActive] = useState("Home");

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-4"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative flex h-16 md:h-20 items-center rounded-2xl bg-white/5 backdrop-blur-md ring-1 ring-white/10 px-4 shadow-glow">
            <img
              src={logo}
              alt="Sign Setu logo"
              className="h-14 md:h-16 w-auto object-contain mix-blend-screen [filter:brightness(1.4)_contrast(1.1)_hue-rotate(5deg)_drop-shadow(0_0_12px_rgba(167,139,250,0.55))]"
            />
          </div>
          <span className="ml-1 inline-block h-2 w-2 animate-pulse-glow rounded-full bg-primary shadow-glow" />
        </Link>

        <nav className="hidden md:flex items-center gap-2 rounded-full bg-[#0b0b0f]/90 backdrop-blur-md ring-1 ring-white/10 px-4 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
          {links.map((l) => {
            const isActive = active === l.label;
            return (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setActive(l.label)}
                className="relative px-4 py-1 text-sm font-medium transition-colors duration-300"
                style={{ color: isActive ? "#a78bfa" : "rgba(255,255,255,0.75)" }}
              >
                <span className="relative z-10">{l.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-2 right-2 -bottom-1 h-[2px] rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(167,139,250,0) 0%, #a78bfa 50%, rgba(167,139,250,0) 100%)",
                      boxShadow: "0 0 12px rgba(167,139,250,0.8)",
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        <button className="group relative overflow-hidden rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-transform hover:scale-105">
          <span className="relative z-10">Try now →</span>
          <span className="absolute inset-0 bg-gradient-hero opacity-0 transition-opacity group-hover:opacity-100" />
        </button>
      </div>
    </motion.header>
  );
}
