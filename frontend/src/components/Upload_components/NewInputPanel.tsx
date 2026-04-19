"use client";

import { localGlossify } from "@/utilities/LocalGlossifier";
import { inputDataToFormData } from "@/utilities/Functions";
import axios from "axios";
import {
  FileText, Loader2, Mic, Send, Sparkles, Upload, UploadCloud, Video, Zap
} from "lucide-react";
import { useRef, useState } from "react";

interface InputData {
  category?: string;
  text?: string;
  file?: File;
}

interface ChildProps {
  setData: (data: string[]) => void;
}

export default function NewInputPanel({ setData }: ChildProps) {
  const textInputRef = useRef<HTMLTextAreaElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [inputData, setInputData] = useState<InputData>({});
  const [isLoading, setIsLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string>('');

  const categories = [
    { value: "text",  label: "Text",  icon: FileText, color: "from-blue-500 to-cyan-500" },
    { value: "audio", label: "Audio", icon: Mic,      color: "from-purple-500 to-pink-500" },
    { value: "video", label: "Video", icon: Video,    color: "from-green-500 to-emerald-500" },
    { value: "translate",  label: "Translate",  icon: Upload,   color: "from-orange-500 to-red-500" },
  ];

  function handleCategorySelect(category: string) {
    setInputData({ category });
    setStatusMsg('');
  }

  // ─── TEXT: runs locally — zero latency ──────────────────────────────────────
  function handleTextSubmit() {
    if (!textInputRef.current) return;
    const text = textInputRef.current.value.trim();
    if (!text) return;

    // Instant local processing — no backend call
    const gloss = localGlossify(text);
    if (gloss.length > 0) {
      setData(gloss);
      setStatusMsg(`✓ ${gloss.length} signs — processed locally`);
    } else {
      setStatusMsg('No matching signs found. Try different words.');
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleTextSubmit();
    }
  };

  // ─── AUDIO/VIDEO: send to backend ───────────────────────────────────────────
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const category = inputData.category === 'file' ? 'translate' : inputData.category;
    const updatedData = { ...inputData, category, file: files[0] };
    setInputData(updatedData);
    await sendToBackend(updatedData);
  };

  const sendToBackend = async (data: InputData) => {
    try {
      setIsLoading(true);
      setStatusMsg('Sending to server…');

      const formData = inputDataToFormData(data);
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await axios.post(
        `${API_URL}/api/process/`,
        formData,
        { timeout: 90000 } // 90s timeout for cold start
      );

      const gloss: string[] = response.data.gloss || [];
      setData(gloss);
      setStatusMsg(`✓ ${gloss.length} signs from server`);
    } catch (error) {
      console.error("Backend error:", error);
      setStatusMsg('Server error — try again');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full max-h-164 bg-white/5 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 rounded-3xl" />

      {/* Header */}
      <div className="relative z-10 mb-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-4 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Start Communicating</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-1" />
          </div>
        </div>

        {/* Speed badge for text */}
        {inputData.category === 'text' && (
          <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-400/10 rounded-full px-3 py-1 w-fit">
            <Zap className="w-3 h-3" />
            Text runs instantly in your browser — no server needed
          </div>
        )}
        {(inputData.category === 'audio' || inputData.category === 'video' || inputData.category === 'translate') && (
          <div className="flex items-center gap-2 text-xs text-yellow-400 bg-yellow-400/10 rounded-full px-3 py-1 w-fit">
            <Loader2 className="w-3 h-3" />
            Audio/Video/Translate uses the server — first request may take 30–60s to wake up
          </div>
        )}
      </div>

      {/* Category Selection */}
      <div className="relative z-10 mb-4">
        <h3 className="text-white/90 font-semibold mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
          Select Input Type
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {categories.map((item) => (
            <button
              key={item.value}
              onClick={() => handleCategorySelect(item.value)}
              className={`group relative p-1 rounded-2xl border transition-all duration-500 hover:scale-105 hover:shadow-2xl transform-gpu ${
                inputData?.category === item.value
                  ? 'bg-gradient-to-br from-white/20 to-white/5 border-white/30 shadow-2xl scale-105'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex flex-col items-center gap-1 p-1">
                <div className={`relative p-4 rounded-xl transition-all duration-500 ${
                  inputData?.category === item.value
                    ? `bg-gradient-to-r ${item.color} text-white shadow-lg scale-90`
                    : 'bg-white/10 text-white/70 group-hover:bg-white/20 group-hover:text-white'
                }`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <span className={`font-medium text-sm transition-all duration-300 ${
                  inputData?.category === item.value ? 'text-white' : 'text-white/70 group-hover:text-white'
                }`}>
                  {item.label}
                </span>
              </div>
              {inputData?.category === item.value && (
                <div className="absolute inset-0 rounded-2xl border-2 border-blue-400/50 animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Text Input — local, instant */}
      {inputData?.category === "text" && (
        <div className="relative z-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-1 shadow-2xl">
            <textarea
              ref={textInputRef}
              placeholder="Type your message… (Enter to translate instantly)"
              className="w-full h-44 px-6 py-4 bg-transparent text-white placeholder-white/50 focus:outline-none resize-none rounded-xl text-lg leading-relaxed"
              onKeyDown={handleKeyPress}
            />
            <div className="flex justify-between items-center p-3">
              <div className="text-emerald-400/80 text-xs">
                {statusMsg}
              </div>
              <button
                onClick={handleTextSubmit}
                className="group flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                Translate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* File Upload — uses backend */}
      {inputData && (inputData.category === "audio" || inputData.category === "video" || inputData.category === "translate") && (
        <div className="relative z-10">
          <div
            className="bg-white/5 backdrop-blur-sm rounded-2xl border-2 border-dashed border-white/30 p-10 text-center hover:border-white/50 hover:bg-white/10 transition-all duration-500 group cursor-pointer relative overflow-hidden"
            onClick={() => !isLoading && fileInputRef.current?.click()}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="relative p-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full group-hover:scale-110 transition-transform duration-500">
                <UploadCloud className="w-10 h-10 text-white/80" />
                {!isLoading && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-ping" />
                )}
              </div>

              <p className="text-white font-semibold text-xl">
                {isLoading ? 'Processing…' : `Drop your ${inputData.category} here`}
              </p>

              {statusMsg && (
                <p className="text-emerald-400 text-sm">{statusMsg}</p>
              )}

              {!isLoading && (
                <button
                  type="button"
                  className="flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl mt-2"
                >
                  <FileText className="w-5 h-5" />
                  Browse Files
                </button>
              )}

              {isLoading && (
                <div className="flex items-center gap-3 text-white/80 mt-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Waiting for server… (may take up to 60s on first request)</span>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileSelect}
                accept={
                  inputData.category === "audio" ? "audio/*" :
                  inputData.category === "video" ? "video/*" : "*/*"
                }
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      )}

      {/* Loading overlay for file operations */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-3xl flex items-center justify-center z-50">
          <div className="flex items-center gap-3 text-white bg-white/10 rounded-2xl px-6 py-4">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="font-medium">Processing your file…</span>
          </div>
        </div>
      )}
    </div>
  );
}