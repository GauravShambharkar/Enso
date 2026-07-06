"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Eye, Compass, HelpCircle, Heart, Sparkles, Globe, Briefcase, Trash2, ArrowRight, Compass as SpinnerIcon, CheckCircle2, AlertTriangle, Zap } from "lucide-react";
import { useIkigai } from "./hooks/controller/useIkigai.hook";

export const Ikigai = () => {
  const {
    profiles,
    activeProfile,
    activeMode,
    inputs,
    error,
    handleInputChange,
    handleDiscoverClick,
    handleViewProfile,
    handleDeleteProfile,
    handleSubmit
  } = useIkigai();

  const [activeSegment, setActiveSegment] = useState<string>("ikigai");

  return (
    <div className="flex flex-col gap-6 relative min-h-screen pb-20 text-white">
      {/* Title Header matching Idea-Vault */}
      <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-medium text-white"
          >
            Ikigai
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="w-full text-white/70 text-sm mt-1"
          >
            dashboards
          </motion.div>
        </div>

        {/* Action Button */}
        {activeMode !== "create" && activeMode !== "loading" && (
          <button
            onClick={handleDiscoverClick}
            className="cursor-pointer hover:bg-white/10 transition-all ease-in-out duration-300 text-white flex items-center gap-2 border px-4 py-1.5 rounded-lg bg-black/50 border-white/30 shadow-sm shadow-white/30 text-sm font-light self-start md:self-auto"
          >
            <Plus className="size-4" />
            Discover Purpose
          </button>
        )}
      </div>

      {/* Main Workspace Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
        {/* Left Side: Interactive Venn Diagram (Always Visible) */}
        <div className="lg:col-span-5 p-6 rounded-xl border border-white/10 bg-black/30 backdrop-blur-md flex flex-col items-center">
          <h3 className="text-md font-light text-white/80 self-start mb-6 flex items-center gap-2">
            <Compass className="size-4 text-[#977DD3]" />
            Ikigai Intersection Graph
          </h3>

          <div className="relative w-64 h-64 select-none scale-100 mb-8">
            {/* Circle 1: Love */}
            <div
              onClick={() => setActiveSegment("love")}
              className={`absolute top-0 left-1/2 -translate-x-1/2 w-36 h-36 rounded-full bg-rose-500/10 border transition-all duration-300 cursor-pointer flex items-center justify-center ${
                activeSegment === "love" ? "border-rose-400 ring-4 ring-rose-400/20 scale-105 bg-rose-500/15" : "border-rose-500/20 hover:border-rose-400"
              }`}
              style={{ top: '5%' }}
            >
              <span className="text-rose-300/80 font-medium text-[10px] absolute top-6">Love</span>
            </div>

            {/* Circle 2: Good At (Skills) */}
            <div
              onClick={() => setActiveSegment("goodAt")}
              className={`absolute top-1/2 -translate-y-1/2 left-0 w-36 h-36 rounded-full bg-yellow-500/10 border transition-all duration-300 cursor-pointer flex items-center justify-center ${
                activeSegment === "goodAt" ? "border-yellow-400 ring-4 ring-yellow-400/20 scale-105 bg-yellow-500/15" : "border-yellow-500/20 hover:border-yellow-400"
              }`}
              style={{ left: '5%' }}
            >
              <span className="text-yellow-300/80 font-medium text-[10px] absolute left-4">Skills</span>
            </div>

            {/* Circle 3: World Needs */}
            <div
              onClick={() => setActiveSegment("worldNeeds")}
              className={`absolute top-1/2 -translate-y-1/2 right-0 w-36 h-36 rounded-full bg-blue-500/10 border transition-all duration-300 cursor-pointer flex items-center justify-center ${
                activeSegment === "worldNeeds" ? "border-blue-400 ring-4 ring-blue-400/20 scale-105 bg-blue-500/15" : "border-blue-500/20 hover:border-blue-400"
              }`}
              style={{ right: '5%' }}
            >
              <span className="text-blue-300/80 font-medium text-[10px] absolute right-4">Needs</span>
            </div>

            {/* Circle 4: Paid For */}
            <div
              onClick={() => setActiveSegment("paidFor")}
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-36 h-36 rounded-full bg-emerald-500/10 border transition-all duration-300 cursor-pointer flex items-center justify-center ${
                activeSegment === "paidFor" ? "border-emerald-400 ring-4 ring-emerald-400/20 scale-105 bg-emerald-500/15" : "border-emerald-500/20 hover:border-emerald-400"
              }`}
              style={{ bottom: '5%' }}
            >
              <span className="text-emerald-300/80 font-medium text-[10px] absolute bottom-6">Careers</span>
            </div>

            {/* Intersections */}
            <button
              onClick={() => setActiveSegment("passion")}
              className={`absolute w-9 h-9 rounded-full border border-dashed transition-all duration-300 cursor-pointer text-[8px] font-semibold flex items-center justify-center ${
                activeSegment === "passion" ? "bg-rose-500/30 border-rose-300 text-rose-300 scale-105" : "bg-black/60 border-white/20 text-white/50"
              }`}
              style={{ top: '29%', left: '27%' }}
            >
              PSN
            </button>

            <button
              onClick={() => setActiveSegment("mission")}
              className={`absolute w-9 h-9 rounded-full border border-dashed transition-all duration-300 cursor-pointer text-[8px] font-semibold flex items-center justify-center ${
                activeSegment === "mission" ? "bg-blue-500/30 border-blue-300 text-blue-300 scale-105" : "bg-black/60 border-white/20 text-white/50"
              }`}
              style={{ top: '29%', right: '27%' }}
            >
              MSN
            </button>

            <button
              onClick={() => setActiveSegment("profession")}
              className={`absolute w-9 h-9 rounded-full border border-dashed transition-all duration-300 cursor-pointer text-[8px] font-semibold flex items-center justify-center ${
                activeSegment === "profession" ? "bg-amber-500/30 border-amber-300 text-amber-300 scale-105" : "bg-black/60 border-white/20 text-white/50"
              }`}
              style={{ bottom: '29%', left: '27%' }}
            >
              PRF
            </button>

            <button
              onClick={() => setActiveSegment("vocation")}
              className={`absolute w-9 h-9 rounded-full border border-dashed transition-all duration-300 cursor-pointer text-[8px] font-semibold flex items-center justify-center ${
                activeSegment === "vocation" ? "bg-emerald-500/30 border-emerald-300 text-emerald-300 scale-105" : "bg-black/60 border-white/20 text-white/50"
              }`}
              style={{ bottom: '29%', right: '27%' }}
            >
              VOC
            </button>

            {/* Center */}
            <button
              onClick={() => setActiveSegment("ikigai")}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border transition-all duration-300 cursor-pointer text-[8px] font-semibold flex flex-col items-center justify-center shadow-md ${
                activeSegment === "ikigai"
                ? "bg-purple-600 border-purple-300 text-white scale-105"
                : "bg-black border-purple-500/40 text-purple-300 hover:border-purple-400"
              }`}
            >
              <span>IKIGAI</span>
            </button>
          </div>

          {/* Render what user mentioned at each circle block below/beside diagram */}
          <div className="w-full space-y-4 pt-4 border-t border-white/5">
            <h4 className="text-xs font-medium text-white/50 uppercase tracking-widest mb-2">Pillar Previews</h4>
            
            <div className="grid grid-cols-2 gap-2 w-full">
              <div 
                onClick={() => setActiveSegment("love")}
                className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                  activeSegment === "love" ? "bg-rose-500/10 border-rose-500/30" : "bg-white/5 border-white/5 hover:border-white/10"
                }`}
              >
                <div className="flex items-center gap-1 text-xs text-rose-300 mb-1"><Heart className="size-3" /> Love</div>
                <p className="text-[10px] text-white/60 font-light line-clamp-2 leading-relaxed">
                  {inputs.love || "Not entered yet..."}
                </p>
              </div>

              <div 
                onClick={() => setActiveSegment("goodAt")}
                className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                  activeSegment === "goodAt" ? "bg-yellow-500/10 border-yellow-500/30" : "bg-white/5 border-white/5 hover:border-white/10"
                }`}
              >
                <div className="flex items-center gap-1 text-xs text-yellow-300 mb-1"><Sparkles className="size-3" /> Skills</div>
                <p className="text-[10px] text-white/60 font-light line-clamp-2 leading-relaxed">
                  {inputs.goodAt || "Not entered yet..."}
                </p>
              </div>

              <div 
                onClick={() => setActiveSegment("worldNeeds")}
                className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                  activeSegment === "worldNeeds" ? "bg-blue-500/10 border-blue-500/30" : "bg-white/5 border-white/5 hover:border-white/10"
                }`}
              >
                <div className="flex items-center gap-1 text-xs text-blue-300 mb-1"><Globe className="size-3" /> Needs</div>
                <p className="text-[10px] text-white/60 font-light line-clamp-2 leading-relaxed">
                  {inputs.worldNeeds || "Not entered yet..."}
                </p>
              </div>

              <div 
                onClick={() => setActiveSegment("paidFor")}
                className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                  activeSegment === "paidFor" ? "bg-emerald-500/10 border-emerald-500/30" : "bg-white/5 border-white/5 hover:border-white/10"
                }`}
              >
                <div className="flex items-center gap-1 text-xs text-emerald-300 mb-1"><Briefcase className="size-3" /> Careers</div>
                <p className="text-[10px] text-white/60 font-light line-clamp-2 leading-relaxed">
                  {inputs.paidFor || "Not entered yet..."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Dynamic Area (Form / Loader / Results) */}
        <div className="lg:col-span-7 w-full">
          <AnimatePresence mode="wait">
            {/* 1. Form Mode */}
            {activeMode === "create" && (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 rounded-xl border border-white/10 bg-black/30 backdrop-blur-md space-y-6"
              >
                <div className="border-b border-white/5 pb-2">
                  <h3 className="text-lg font-light text-white">Discover Your Purpose</h3>
                  <p className="text-xs text-white/50">Fill out your details to allow Groq LLM to synthesize your Ikigai.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs text-rose-300 font-medium flex items-center gap-1"><Heart className="size-3" /> What You Love</label>
                    <textarea
                      value={inputs.love}
                      onChange={(e) => handleInputChange(e.target.value, "love")}
                      placeholder="List things you love doing (e.g. creative programming, teaching, exploring photography...)"
                      className="w-full h-20 p-3 rounded-lg border border-white/10 bg-black/40 text-xs focus:border-white/30 focus:outline-hidden transition resize-none font-light leading-relaxed placeholder:text-white/20"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-yellow-300 font-medium flex items-center gap-1"><Sparkles className="size-3" /> What You Are Good At</label>
                    <textarea
                      value={inputs.goodAt}
                      onChange={(e) => handleInputChange(e.target.value, "goodAt")}
                      placeholder="List skills and strengths (e.g. logic coding, design aesthetics, user research...)"
                      className="w-full h-20 p-3 rounded-lg border border-white/10 bg-black/40 text-xs focus:border-white/30 focus:outline-hidden transition resize-none font-light leading-relaxed placeholder:text-white/20"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-blue-300 font-medium flex items-center gap-1"><Globe className="size-3" /> What The World Needs</label>
                    <textarea
                      value={inputs.worldNeeds}
                      onChange={(e) => handleInputChange(e.target.value, "worldNeeds")}
                      placeholder="What does society need? (e.g. accessibility platforms, stress reduction tools, educational clarity...)"
                      className="w-full h-20 p-3 rounded-lg border border-white/10 bg-black/40 text-xs focus:border-white/30 focus:outline-hidden transition resize-none font-light leading-relaxed placeholder:text-white/20"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-emerald-300 font-medium flex items-center gap-1"><Briefcase className="size-3" /> What You Can Be Paid For</label>
                    <textarea
                      value={inputs.paidFor}
                      onChange={(e) => handleInputChange(e.target.value, "paidFor")}
                      placeholder="Market demands (e.g. full-stack engineering, interface optimization consultation...)"
                      className="w-full h-20 p-3 rounded-lg border border-white/10 bg-black/40 text-xs focus:border-white/30 focus:outline-hidden transition resize-none font-light leading-relaxed placeholder:text-white/20"
                    />
                  </div>
                </div>

                {error && <p className="text-xs text-red-400 font-light">{error}</p>}

                <div className="flex gap-3 justify-end pt-2 border-t border-white/5">
                  {profiles.length > 0 && (
                    <button
                      onClick={() => handleViewProfile(profiles[0])}
                      className="px-5 h-10 rounded-full border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}
                  
                  <button
                    onClick={handleSubmit}
                    disabled={!inputs.love.trim() || !inputs.goodAt.trim() || !inputs.worldNeeds.trim() || !inputs.paidFor.trim()}
                    className={`flex items-center gap-1.5 px-6 h-10 rounded-full font-medium transition text-xs cursor-pointer ${
                      inputs.love.trim() && inputs.goodAt.trim() && inputs.worldNeeds.trim() && inputs.paidFor.trim()
                      ? "bg-white text-black hover:bg-white/90"
                      : "bg-white/5 text-white/30 border border-white/5 cursor-not-allowed"
                    }`}
                  >
                    Generate Purpose
                    <ArrowRight className="size-3.5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* 2. Loading Mode */}
            {activeMode === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-12 rounded-xl border border-white/10 bg-black/30 backdrop-blur-md flex flex-col items-center justify-center min-h-[400px] text-center space-y-6"
              >
                <div className="relative">
                  <motion.div
                    className="w-14 h-14 rounded-full border-2 border-[#977DD3]/20 border-t-[#977DD3]"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                    <SpinnerIcon className="w-5 h-5 text-[#977DD3]" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-light text-white">Synthesizing Your Ikigai...</h3>
                  <p className="text-xs text-white/50 max-w-xs mx-auto">
                    Comparing overlaps in your pillars using Groq AI. Please stand by.
                  </p>
                </div>
              </motion.div>
            )}

            {/* 3. View/Result Mode */}
            {activeMode === "view" && activeProfile && (
              <motion.div
                key="result"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                {/* Core Synthesis Statement */}
                <div className="p-6 rounded-xl border border-white/10 bg-linear-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-60 h-60 bg-[#977DD3]/5 blur-[60px] rounded-full pointer-events-none" />
                  <div className="relative z-10 space-y-2">
                    <div className="flex items-center gap-1.5 text-white/50 text-[10px] font-semibold uppercase tracking-wider">
                      <Zap className="size-3 text-yellow-400" />
                      Ikigai Purpose Statement
                    </div>
                    <p className="text-md md:text-lg text-white font-light leading-relaxed italic">
                      "{activeProfile.result.ikigaiSummary}"
                    </p>
                  </div>
                </div>

                {/* Sub-Pillar Intersections Explainer */}
                <div className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md space-y-4">
                  <div className="border-b border-white/5 pb-2">
                    <h4 className="text-sm font-medium text-purple-300">Pillar Intersection Details</h4>
                    <p className="text-[10px] text-white/40">Select segments inside the Venn diagram to examine intersection analysis.</p>
                  </div>

                  <div className="min-h-[90px] flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                      {activeSegment === "love" && (
                        <motion.div key="l" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-1">
                          <h5 className="text-xs font-semibold text-rose-300 flex items-center gap-1"><Heart className="size-3" /> Love</h5>
                          <p className="text-white/70 text-[11px] leading-relaxed font-light">{inputs.love}</p>
                        </motion.div>
                      )}
                      {activeSegment === "goodAt" && (
                        <motion.div key="g" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-1">
                          <h5 className="text-xs font-semibold text-yellow-300 flex items-center gap-1"><Sparkles className="size-3" /> Skills</h5>
                          <p className="text-white/70 text-[11px] leading-relaxed font-light">{inputs.goodAt}</p>
                        </motion.div>
                      )}
                      {activeSegment === "worldNeeds" && (
                        <motion.div key="w" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-1">
                          <h5 className="text-xs font-semibold text-blue-300 flex items-center gap-1"><Globe className="size-3" /> Needs</h5>
                          <p className="text-white/70 text-[11px] leading-relaxed font-light">{inputs.worldNeeds}</p>
                        </motion.div>
                      )}
                      {activeSegment === "paidFor" && (
                        <motion.div key="p" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-1">
                          <h5 className="text-xs font-semibold text-emerald-300 flex items-center gap-1"><Briefcase className="size-3" /> Careers</h5>
                          <p className="text-white/70 text-[11px] leading-relaxed font-light">{inputs.paidFor}</p>
                        </motion.div>
                      )}
                      {activeSegment === "passion" && (
                        <motion.div key="pass" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-1">
                          <h5 className="text-xs font-semibold text-rose-300">Your Passion (Skills + Love)</h5>
                          <p className="text-white/70 text-[11px] leading-relaxed font-light">{activeProfile.result.analysis.passion}</p>
                        </motion.div>
                      )}
                      {activeSegment === "mission" && (
                        <motion.div key="miss" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-1">
                          <h5 className="text-xs font-semibold text-blue-300">Your Mission (Needs + Love)</h5>
                          <p className="text-white/70 text-[11px] leading-relaxed font-light">{activeProfile.result.analysis.mission}</p>
                        </motion.div>
                      )}
                      {activeSegment === "vocation" && (
                        <motion.div key="voc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-1">
                          <h5 className="text-xs font-semibold text-emerald-300">Your Vocation (Needs + Careers)</h5>
                          <p className="text-white/70 text-[11px] leading-relaxed font-light">{activeProfile.result.analysis.vocation}</p>
                        </motion.div>
                      )}
                      {activeSegment === "profession" && (
                        <motion.div key="prof" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-1">
                          <h5 className="text-xs font-semibold text-amber-300">Your Profession (Skills + Careers)</h5>
                          <p className="text-white/70 text-[11px] leading-relaxed font-light">{activeProfile.result.analysis.profession}</p>
                        </motion.div>
                      )}
                      {activeSegment === "ikigai" && (
                        <motion.div key="ik" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-1">
                          <h5 className="text-xs font-semibold text-purple-300 font-light uppercase tracking-wider">Your Synthesized Ikigai</h5>
                          <p className="text-white/70 text-[11px] leading-relaxed font-light">
                            Use the interactive diagram on the left to click on overlaps like Passion (PSN), Mission (MSN), Vocation (VOC), or Profession (PRF) to explore details.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Actions & Obstacles Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-lg border border-white/5 bg-black/40 space-y-3">
                    <h5 className="text-xs font-medium text-white flex items-center gap-1.5">
                      <CheckCircle2 className="size-3.5 text-emerald-400" />
                      Action Steps
                    </h5>
                    <ul className="space-y-2">
                      {activeProfile.result.actionableSteps.map((step, idx) => (
                        <li key={idx} className="flex gap-2 text-white/70 font-light text-[10px] leading-normal">
                          <span className="flex-none w-3.5 h-3.5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-[9px] mt-0.5">{idx + 1}</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-5 rounded-lg border border-white/5 bg-black/40 space-y-3">
                    <h5 className="text-xs font-medium text-white flex items-center gap-1.5">
                      <AlertTriangle className="size-3.5 text-amber-400" />
                      Obstacles
                    </h5>
                    <ul className="space-y-2">
                      {activeProfile.result.potentialObstacles.map((obstacle, idx) => (
                        <li key={idx} className="flex gap-2 text-white/70 font-light text-[10px] leading-normal">
                          <span className="flex-none w-3.5 h-3.5 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center text-[9px] mt-0.5">!</span>
                          <span>{obstacle}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Saved Profiles Table - Unified view matching Idea-Vault */}
      <div className="w-full space-y-4 pt-6 border-t border-white/10">
        <div className="flex items-center gap-2 text-white/80">
          <Compass className="size-5" />
          <h3 className="text-lg font-light">Saved Ikigai Profiles</h3>
        </div>

        <div className="w-full border border-white/20 bg-white/10 backdrop-blur-xl rounded-xl overflow-hidden max-h-80 overflow-y-auto custom-scrollbar">
          <table className="w-full table-fixed border-collapse text-white">
            <thead className="sticky top-0 left-0 right-0 z-10 bg-black text-xs">
              <tr>
                <th className="border border-white/20 px-4 py-2.5 text-left font-thin w-[55%]">Synthesized Core Concept</th>
                <th className="border border-white/20 px-4 py-2.5 text-left font-thin w-[25%]">Created On</th>
                <th className="border border-white/20 px-4 py-2.5 text-left font-thin w-[20%]">Actions</th>
              </tr>
            </thead>

            <tbody>
              {profiles.length === 0 ? (
                <tr>
                  <td colSpan={3} className="border border-white/20 px-4 py-8 text-center text-white/50 font-light text-sm italic">
                    No Ikigai profiles created yet. Click "Discover Purpose" to start.
                  </td>
                </tr>
              ) : (
                profiles.map((p) => (
                  <tr key={p.id} className={`hover:bg-white/5 transition group text-xs ${activeProfile?.id === p.id ? "bg-white/5" : ""}`}>
                    <td className="border border-white/20 px-4 py-2">
                      <span className="truncate block max-w-full font-light">
                        {p.result.ikigaiSummary}
                      </span>
                    </td>
                    <td className="border border-white/20 px-4 py-2">
                      <span className="text-white/70 font-light">{p.createdOn}</span>
                    </td>
                    <td className="border border-white/20 px-4 py-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewProfile(p)}
                          className="inline-flex cursor-pointer hover:bg-white/10 transition-all duration-300 text-[10px] text-white items-center gap-1.5 border px-3 py-1 rounded-md bg-black/50 border-white/30"
                        >
                          <Eye className="size-3" />
                          View
                        </button>
                        <button
                          onClick={() => handleDeleteProfile(p.id)}
                          className="inline-flex cursor-pointer hover:bg-red-500/20 hover:text-red-400 transition-all duration-300 text-[10px] text-red-500 items-center gap-1.5 border px-2.5 py-1 rounded-md bg-black/50 border-red-500/20"
                        >
                          <Trash2 className="size-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Ikigai;