"use client";

import React from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const router = useRouter();

  return (
    <header className="relative z-50">
      <div className="flex justify-between items-center mb-2 px-4">
        <div className="flex items-center space-x-2 ml-6">
          <div className="text-3xl font-light text-white tracking-widest">
            MIME<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400 font-semibold">.ai</span>
          </div>
        </div>
{/* 
        <div className="bg-white/8 backdrop-blur-md border border-white/15 rounded-2xl p-8 text-center min-h-48 flex items-center justify-center hover:bg-white/15 transition-all duration-300 relative">
          <div className="text-xs text-white/60 absolute top-4 left-4">
            Minimal & Hover
          </div>
          <div className="text-4xl font-light text-white tracking-widest">
            MIME<span className="text-teal-300 font-bold">.ai</span>
          </div>
        </div> */}

        {/* Enhanced Navigation */}
        <div className="sticky top-0 z-50 hidden md:flex justify-center items-center">
          <nav
            className="sticky top-0 z-50
          hidden md:flex justify-center items-center
          border border-white/10 px-8 py-2 rounded-3xl
          bg-white/5 backdrop-saturate-150 backdrop-blur-2xl
          shadow-[0_8px_32px_rgba(0,0,0,0.3)]
          hover:shadow-[0_4px_16px_rgba(139,92,246,0.2)]
          transition-all duration-700"
          >
            <div className="flex items-center space-x-8">
              <a
                href="#home"
                className="group relative text-gray-300 font-medium transition-all duration-500 hover:text-white hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-400 hover:to-rose-400"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400/0 via-pink-400/5 to-pink-400/0 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-lg"></div>
                <span className="relative">Home</span>
              </a>

              <a
                href="#features"
                className="group relative text-gray-300 font-medium transition-all duration-500 hover:text-white hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-violet-400"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-purple-400/5 to-purple-400/0 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-lg"></div>
                <span className="relative">Features</span>
              </a>

              <a
                href="#how-it-works"
                className="group relative text-gray-300 font-medium transition-all duration-500 hover:text-white hover:bg-clip-text hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-400"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/5 to-cyan-400/0 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-lg"></div>
                <span className="relative">How It Works</span>
              </a>

              <a
                href="#who-its-for"
                className="group relative text-gray-300 font-medium transition-all duration-500 hover:text-white hover:bg-clip-text hover:bg-gradient-to-r hover:from-emerald-400 hover:to-teal-400"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/5 to-emerald-400/0 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-lg"></div>
                <span className="relative">Who It&apos;s For</span>
              </a>
            </div>
          </nav>
        </div>

        <div className="hidden md:flex mr-6">
          <button
            className="relative inline-flex h-11 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            onClick={() => router.push("/upload")}
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              Try now
            </span>
          </button>
        </div>

        <button
          className="md:hidden text-white mr-6"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-slate-700">
          <nav className="flex flex-col space-y-4 p-6">
            <a
              href="#home"
              className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium"
            >
              Home
            </a>
            <a
              href="#features"
              className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium"
            >
              How It Works
            </a>
            <a
              href="#who-its-for"
              className="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium"
            >
              Who It&apos;s For
            </a>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-xl font-medium w-fit">
              Try Now
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
