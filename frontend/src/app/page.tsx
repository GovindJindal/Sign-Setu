"use client";

import { useEffect } from "react";


import { Navbar } from "@/components/Navbar_Lovable";
import { Hero } from "@/components/Hero_Lovable";
import ProblemStatement from "@/components/Landing_components/ProblemStatement";
import Features from "@/components/Landing_components/Features";
import HowItWorks from "@/components/Landing_components/HowItWorks";
import WhoItsFor from "@/components/Landing_components/WhoIsItFor";
import CTA from "@/components/Landing_components/CTA";
import Footer from "@/components/Landing_components/Footer";

export default function Home() {

  useEffect(() => {
    const container = document.querySelector('.scroll-container');
    let timer: NodeJS.Timeout;

    const onScroll = () => {
      container?.classList.add('show-scrollbar');
      clearTimeout(timer);
      timer = setTimeout(() => {
        container?.classList.remove('show-scrollbar');
      }, 1500);
    };

    container?.addEventListener('scroll', onScroll);
    return () => container?.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`scroll-container min-h-screen pt-2 overflow-y-scroll h-full relative bg-background text-foreground scroll-smooth`}>
      <Navbar />
      <Hero />
      <ProblemStatement />
      <Features />
      <HowItWorks />
      <WhoItsFor />
      <CTA />
      <Footer />
    </div>
  );
}