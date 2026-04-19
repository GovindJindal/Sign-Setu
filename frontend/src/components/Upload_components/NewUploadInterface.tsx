"use client";

import { useState } from "react";
import { NewDisplayPanel } from "./NewDisplayPanel";
import NewInputPanel from "./NewInputPanel";
import { Hand, Heart, Sparkles, Star, Target, Zap } from "lucide-react";

// interface InputData {
//   category? : string,
//   text?: string,
//   file?: File,
// }

export default function NewUploadInterface() {

    const [data,setData] = useState<string[] | null>(null);
    console.log("Data reached in Parent: "+ data);

   return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-700" />
        
        {/* Floating icons */}
        <div className="absolute top-32 left-1/4 animate-float">
          <Hand className="w-8 h-8 text-blue-400/20" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float-delayed">
          <Sparkles className="w-6 h-6 text-purple-400/20" />
        </div>
        <div className="absolute bottom-1/3 left-1/3 animate-float-slow">
          <Zap className="w-7 h-7 text-pink-400/20" />
        </div>
        <div className="absolute top-1/4 right-1/3 animate-float">
          <Heart className="w-5 h-5 text-indigo-400/20" />
        </div>
        <div className="absolute bottom-1/4 right-1/4 animate-float-delayed">
          <Star className="w-6 h-6 text-cyan-400/20" />
        </div>
        <div className="absolute top-150 left-1/9 animate-float-slow">
          <Target className="w-8 h-8 text-emerald-400/20" />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 h-screen flex flex-col">
        {/* Header */}
        <div className="text-center mb-8 animate-fadeInUp">
          <div className="flex items-center justify-center gap-3 mb-1">
            
            <h2 className="text-xl md:text-xl lg:text-xl font-semibold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              Studying ASL fosters awareness and sensitivity toward the Deaf and hard of hearing community.
            </h2>
          </div>
          
        </div>

        {/* Main Content */}
        <div className="flex-1 grid lg:grid-cols-5 gap-6 min-h-0 animate-fadeInUp delay-500">
          <div className="lg:col-span-2 order-2 lg:order-1">
            <NewInputPanel setData={(data) => setData(data)} />
          </div>
          <div className="lg:col-span-3 order-1 lg:order-2">
            <NewDisplayPanel data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
