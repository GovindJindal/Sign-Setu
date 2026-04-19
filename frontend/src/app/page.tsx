"use client";

import { useEffect } from "react";


import { Navbar } from "@/components/Navbar_Lovable";
import { Hero } from "@/components/Hero_Lovable";

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
    <div className={`scroll-container min-h-screen pt-2 overflow-y-scroll h-[500px] relative bg-background text-foreground`}>
      <Navbar />
      <Hero />
    </div>
  );
}