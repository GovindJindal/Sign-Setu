"use client";

import CTA from "@/components/Landing_components/CTA";
import Features from "@/components/Landing_components/Features";
import Footer from "@/components/Landing_components/Footer";
import Header from "@/components/Landing_components/Header";
import Hero from "@/components/Landing_components/Hero";
import HowItWorks from "@/components/Landing_components/HowItWorks";
import ProblemStatement from "@/components/Landing_components/ProblemStatement";
import WhoItsFor from "@/components/Landing_components/WhoIsItFor";
import { useEffect } from "react";

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
   
    <div className={`scroll-container min-h-screen bg-gradient-to-b from-gray-900 to-black pt-2 overflow-y-scroll h-[500px] `}> 
      <Header />
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