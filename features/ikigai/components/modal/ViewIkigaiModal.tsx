"use client";

import React, { useState } from "react";
import { X, Trash2, Heart, Sparkles, Globe, Briefcase, Compass, Zap, CheckCircle2, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { IkigaiProfile } from "../../hooks/controller/useIkigai.hook";

interface ViewIkigaiProps {
  profile: IkigaiProfile | null;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export const ViewIkigaiModal = ({ profile, onClose, onDelete }: ViewIkigaiProps) => {
  const [activeIntersection, setActiveIntersection] = useState("ikigai");

  if (!profile) return null;
  const { result, inputs } = profile;

  return (
    <div className="w-full h-full fixed inset-0 flex justify-center items-center bg-black/70 z-50 overflow-y-auto py-10 backdrop-blur-xs">
      <div className="p-8 rounded-xl border border-white/20 w-[90%] max-w-4xl bg-black/90 backdrop-blur-xl relative my-auto">
        <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white transition-all z-10">
          <X className="size-5" />
        </button>

        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-semibold text-[#977DD3] flex items-center gap-1.5 mb-1">
                <Compass className="size-3.5" />
                Synthesized Purpose Analysis
              </span>
              <h2 className="text-2xl text-white tracking-tight font-light">{profile.title}</h2>
              <p className="text-white/40 text-xs mt-1">Generated on: {profile.createdOn}</p>
            </div>
            
            <button
              onClick={() => {
                onDelete(profile.id);
                onClose();
              }}
              className="self-start md:self-auto flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/40 transition-all text-xs cursor-pointer"
            >
              <Trash2 className="size-3.5" />
              Delete Profile
            </button>
          </div>

          {/* Core Synthesis Statement */}
          <div className="p-6 rounded-2xl border border-white/10 bg-linear-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-60 h-60 bg-[#977DD3]/5 blur-[60px] rounded-full pointer-events-none" />
            <div className="relative z-10 space-y-2">
              <div className="flex items-center gap-1.5 text-white/50 text-[10px] font-semibold uppercase tracking-wider">
                <Zap className="size-3 text-yellow-400" />
                Ikigai Purpose Statement
              </div>
              <p className="text-lg md:text-xl text-white font-light leading-relaxed italic">
                "{result.ikigaiSummary}"
              </p>
            </div>
          </div>

          {/* Venn Diagram & Analysis Panel Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Interactive Venn Diagram */}
            <div className="md:col-span-5 flex flex-col items-center p-4 rounded-2xl border border-white/5 bg-black/40">
              <div className="relative w-64 h-64 select-none scale-95">
                {/* Circle 1: Love */}
                <div 
                  onClick={() => setActiveIntersection("love")}
                  className={`absolute top-0 left-1/2 -translate-x-1/2 w-36 h-36 rounded-full bg-rose-500/10 border transition-all duration-300 cursor-pointer flex items-center justify-center ${
                    activeIntersection === "love" ? "border-rose-400 ring-4 ring-rose-400/20 scale-105 bg-rose-500/15" : "border-rose-500/20 hover:border-rose-400"
                  }`}
                  style={{ top: '5%' }}
                >
                  <span className="text-rose-300/80 font-medium text-[10px] absolute top-6">Love</span>
                </div>

                {/* Circle 2: Good At */}
                <div 
                  onClick={() => setActiveIntersection("goodAt")}
                  className={`absolute top-1/2 -translate-y-1/2 left-0 w-36 h-36 rounded-full bg-yellow-500/10 border transition-all duration-300 cursor-pointer flex items-center justify-center ${
                    activeIntersection === "goodAt" ? "border-yellow-400 ring-4 ring-yellow-400/20 scale-105 bg-yellow-500/15" : "border-yellow-500/20 hover:border-yellow-400"
                  }`}
                  style={{ left: '5%' }}
                >
                  <span className="text-yellow-300/80 font-medium text-[10px] absolute left-4">Skills</span>
                </div>

                {/* Circle 3: World Needs */}
                <div 
                  onClick={() => setActiveIntersection("worldNeeds")}
                  className={`absolute top-1/2 -translate-y-1/2 right-0 w-36 h-36 rounded-full bg-blue-500/10 border transition-all duration-300 cursor-pointer flex items-center justify-center ${
                    activeIntersection === "worldNeeds" ? "border-blue-400 ring-4 ring-blue-400/20 scale-105 bg-blue-500/15" : "border-blue-500/20 hover:border-blue-400"
                  }`}
                  style={{ right: '5%' }}
                >
                  <span className="text-blue-300/80 font-medium text-[10px] absolute right-4">Needs</span>
                </div>

                {/* Circle 4: Paid For */}
                <div 
                  onClick={() => setActiveIntersection("paidFor")}
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-36 h-36 rounded-full bg-emerald-500/10 border transition-all duration-300 cursor-pointer flex items-center justify-center ${
                    activeIntersection === "paidFor" ? "border-emerald-400 ring-4 ring-emerald-400/20 scale-105 bg-emerald-500/15" : "border-emerald-500/20 hover:border-emerald-400"
                  }`}
                  style={{ bottom: '5%' }}
                >
                  <span className="text-emerald-300/80 font-medium text-[10px] absolute bottom-6">Careers</span>
                </div>

                {/* Intersections */}
                <button 
                  onClick={() => setActiveIntersection("passion")}
                  className={`absolute w-10 h-10 rounded-full border border-dashed transition-all duration-300 cursor-pointer text-[8px] font-semibold flex items-center justify-center ${
                    activeIntersection === "passion" ? "bg-rose-500/30 border-rose-300 text-rose-300 scale-105" : "bg-black/60 border-white/20 text-white/50"
                  }`}
                  style={{ top: '29%', left: '27%' }}
                >
                  PSN
                </button>

                <button 
                  onClick={() => setActiveIntersection("mission")}
                  className={`absolute w-10 h-10 rounded-full border border-dashed transition-all duration-300 cursor-pointer text-[8px] font-semibold flex items-center justify-center ${
                    activeIntersection === "mission" ? "bg-blue-500/30 border-blue-300 text-blue-300 scale-105" : "bg-black/60 border-white/20 text-white/50"
                  }`}
                  style={{ top: '29%', right: '27%' }}
                >
                  MSN
                </button>

                <button 
                  onClick={() => setActiveIntersection("profession")}
                  className={`absolute w-10 h-10 rounded-full border border-dashed transition-all duration-300 cursor-pointer text-[8px] font-semibold flex items-center justify-center ${
                    activeIntersection === "profession" ? "bg-amber-500/30 border-amber-300 text-amber-300 scale-105" : "bg-black/60 border-white/20 text-white/50"
                  }`}
                  style={{ bottom: '29%', left: '27%' }}
                >
                  PRF
                </button>

                <button 
                  onClick={() => setActiveIntersection("vocation")}
                  className={`absolute w-10 h-10 rounded-full border border-dashed transition-all duration-300 cursor-pointer text-[8px] font-semibold flex items-center justify-center ${
                    activeIntersection === "vocation" ? "bg-emerald-500/30 border-emerald-300 text-emerald-300 scale-105" : "bg-black/60 border-white/20 text-white/50"
                  }`}
                  style={{ bottom: '29%', right: '27%' }}
                >
                  VOC
                </button>

                {/* Center */}
                <button 
                  onClick={() => setActiveIntersection("ikigai")}
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border transition-all duration-300 cursor-pointer text-[10px] font-semibold flex flex-col items-center justify-center shadow-md ${
                    activeIntersection === "ikigai" 
                    ? "bg-purple-600 border-purple-300 text-white scale-105" 
                    : "bg-black border-purple-500/40 text-purple-300 hover:border-purple-400"
                  }`}
                >
                  <span>IKIGAI</span>
                </button>
              </div>
            </div>

            {/* Interactive Explainer Card */}
            <div className="md:col-span-7 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md min-h-[140px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                {activeIntersection === "love" && (
                  <motion.div key="l" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
                    <h4 className="text-sm font-medium text-rose-400 flex items-center gap-1.5"><Heart className="size-4" /> What You Love</h4>
                    <p className="text-white/70 text-xs leading-relaxed font-light">{inputs.love}</p>
                  </motion.div>
                )}
                {activeIntersection === "goodAt" && (
                  <motion.div key="g" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
                    <h4 className="text-sm font-medium text-yellow-400 flex items-center gap-1.5"><Sparkles className="size-4" /> What You Are Good At</h4>
                    <p className="text-white/70 text-xs leading-relaxed font-light">{inputs.goodAt}</p>
                  </motion.div>
                )}
                {activeIntersection === "worldNeeds" && (
                  <motion.div key="w" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
                    <h4 className="text-sm font-medium text-blue-400 flex items-center gap-1.5"><Globe className="size-4" /> What The World Needs</h4>
                    <p className="text-white/70 text-xs leading-relaxed font-light">{inputs.worldNeeds}</p>
                  </motion.div>
                )}
                {activeIntersection === "paidFor" && (
                  <motion.div key="p" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
                    <h4 className="text-sm font-medium text-emerald-400 flex items-center gap-1.5"><Briefcase className="size-4" /> What You Can Be Paid For</h4>
                    <p className="text-white/70 text-xs leading-relaxed font-light">{inputs.paidFor}</p>
                  </motion.div>
                )}
                {activeIntersection === "passion" && (
                  <motion.div key="pass" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
                    <h4 className="text-sm font-medium text-rose-300">Your Passion</h4>
                    <p className="text-white/70 text-xs leading-relaxed font-light">{result.analysis.passion}</p>
                  </motion.div>
                )}
                {activeIntersection === "mission" && (
                  <motion.div key="miss" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
                    <h4 className="text-sm font-medium text-blue-300">Your Mission</h4>
                    <p className="text-white/70 text-xs leading-relaxed font-light">{result.analysis.mission}</p>
                  </motion.div>
                )}
                {activeIntersection === "vocation" && (
                  <motion.div key="voc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
                    <h4 className="text-sm font-medium text-emerald-300">Your Vocation</h4>
                    <p className="text-white/70 text-xs leading-relaxed font-light">{result.analysis.vocation}</p>
                  </motion.div>
                )}
                {activeIntersection === "profession" && (
                  <motion.div key="prof" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
                    <h4 className="text-sm font-medium text-amber-300">Your Profession</h4>
                    <p className="text-white/70 text-xs leading-relaxed font-light">{result.analysis.profession}</p>
                  </motion.div>
                )}
                {activeIntersection === "ikigai" && (
                  <motion.div key="ik" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
                    <h4 className="text-sm font-medium text-purple-300">Your Synthesized Ikigai</h4>
                    <p className="text-white/70 text-xs leading-relaxed font-light">
                      Click the overlapping segments in the diagram to inspect intersections of your profile, or explore the action steps and potential obstacles detailed below.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              <p className="text-[9px] text-white/30 border-t border-white/5 pt-2 mt-4 uppercase tracking-wider font-semibold">
                Tip: Click any circle or segment inside the Venn diagram to review it.
              </p>
            </div>
          </div>

          {/* Actionable Steps & Obstacles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-white/10 bg-black/40 space-y-4">
              <h4 className="text-md font-light text-white flex items-center gap-2">
                <CheckCircle2 className="size-4.5 text-emerald-400" />
                Actionable Roadmap
              </h4>
              <ul className="space-y-2.5">
                {result.actionableSteps.map((step, idx) => (
                  <li key={idx} className="flex gap-2 text-white/70 font-light text-xs">
                    <span className="flex-none w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-[10px] mt-0.5">{idx + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-black/40 space-y-4">
              <h4 className="text-md font-light text-white flex items-center gap-2">
                <AlertTriangle className="size-4.5 text-amber-400" />
                Potential Obstacles
              </h4>
              <ul className="space-y-2.5">
                {result.potentialObstacles.map((obstacle, idx) => (
                  <li key={idx} className="flex gap-2 text-white/70 font-light text-xs">
                    <span className="flex-none w-4 h-4 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center text-[10px] mt-0.5">!</span>
                    <span>{obstacle}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewIkigaiModal;
