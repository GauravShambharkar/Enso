"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Compass, Heart, Sparkles, Globe, Briefcase, Trash2, ArrowRight, ArrowLeft, CheckCircle2, AlertTriangle } from "lucide-react";
import { useIkigai } from "./hooks/controller/useIkigai.hook";

const segmentMap: Record<string, { title: string; color: string }> = {
  love:       { title: "What You Love",            color: "text-rose-300 border-rose-500/20 bg-rose-500/5" },
  goodAt:     { title: "What You're Good At",       color: "text-yellow-300 border-yellow-500/20 bg-yellow-500/5" },
  worldNeeds: { title: "What The World Needs",      color: "text-blue-300 border-blue-500/20 bg-blue-500/5" },
  paidFor:    { title: "What You Can Be Paid For",  color: "text-emerald-300 border-emerald-500/20 bg-emerald-500/5" },
  passion:    { title: "Passion",                   color: "text-rose-300 border-rose-500/20 bg-rose-500/5" },
  mission:    { title: "Mission",                   color: "text-blue-300 border-blue-500/20 bg-blue-500/5" },
  vocation:   { title: "Vocation",                  color: "text-emerald-300 border-emerald-500/20 bg-emerald-500/5" },
  profession: { title: "Profession",                color: "text-amber-300 border-amber-500/20 bg-amber-500/5" },
  ikigai:     { title: "Ikigai",                    color: "text-purple-300 border-purple-500/20 bg-purple-500/5" },
};

const STEPS = [
  { field: "love",       label: "What You Love",            icon: Heart,     color: "text-rose-300",    border: "border-rose-500/20",    placeholder: "Things you love doing — hobbies, activities, topics that make you lose track of time..." },
  { field: "goodAt",     label: "What You're Good At",      icon: Sparkles,  color: "text-yellow-300",  border: "border-yellow-500/20",  placeholder: "Skills you've built — natural talents, learned expertise, what others ask help from you for..." },
  { field: "worldNeeds", label: "What The World Needs",     icon: Globe,     color: "text-blue-300",    border: "border-blue-500/20",    placeholder: "Problems worth solving — what gaps do you notice that society needs filled?" },
  { field: "paidFor",    label: "What You Can Be Paid For", icon: Briefcase,  color: "text-emerald-300", border: "border-emerald-500/20", placeholder: "Market-valued skills — services or products people would pay you for..." },
] as const;

type IkigaiInputKey = "love" | "goodAt" | "worldNeeds" | "paidFor";

interface FormWizardProps {
  inputs: Record<IkigaiInputKey, string>;
  handleInputChange: (value: string, field: IkigaiInputKey) => void;
  profiles: unknown[];
  error: string | null;
  handleSubmit: () => void;
  onCancel: () => void;
}

const FormWizard = ({ inputs, handleInputChange, profiles, error, handleSubmit, onCancel }: FormWizardProps) => {
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const Icon = current.icon;
  const allFilled = STEPS.every(s => inputs[s.field].trim());

  return (
    <motion.div
      key="form"
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
      className="p-6 rounded-xl border border-white/10 bg-black/30 backdrop-blur-md"
    >
      {/* Progress */}
      <div className="flex items-center gap-1.5 mb-6">
        {STEPS.map((s, i) => (
          <button
            key={s.field}
            onClick={() => setStep(i)}
            className={`flex-1 h-0.5 rounded-full transition-all duration-300 cursor-pointer ${
              i < step ? "bg-white/60" : i === step ? "bg-white" : "bg-white/15"
            }`}
          />
        ))}
      </div>

      {/* Step label */}
      <div className="mb-5">
        <span className="text-[10px] text-white/40 uppercase tracking-widest">Step {step + 1} of {STEPS.length}</span>
        <h3 className={`text-lg font-medium mt-0.5 flex items-center gap-2 ${current.color}`}>
          <Icon className="size-4" />
          {current.label}
        </h3>
      </div>

      {/* Textarea */}
      <AnimatePresence mode="wait">
        <motion.textarea
          key={step}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
          value={inputs[current.field]}
          onChange={(e) => handleInputChange(e.target.value, current.field)}
          placeholder={current.placeholder}
          rows={5}
          autoFocus
          className={`w-full px-4 py-3 rounded-lg border bg-black/40 text-sm text-white placeholder:text-white/20 focus:outline-none transition resize-none font-light leading-relaxed ${current.border} focus:border-white/30`}
        />
      </AnimatePresence>

      {error && <p className="text-xs text-red-400 mt-2">{error}</p>}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/5">
        <div className="flex gap-2">
          {step > 0 && (
            <button
              onClick={() => setStep(s => s - 1)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/10 text-white/50 hover:text-white hover:bg-white/5 transition text-xs cursor-pointer"
            >
              <ArrowLeft className="size-3" /> Back
            </button>
          )}
          {profiles.length > 0 && step === 0 && (
            <button
              onClick={onCancel}
              className="px-3 py-2 rounded-lg border border-white/10 text-white/40 hover:text-white/70 hover:bg-white/5 transition text-xs cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>

        {step < STEPS.length - 1 ? (
          <button
            onClick={() => setStep(s => s + 1)}
            disabled={!inputs[current.field].trim()}
            className={`flex items-center gap-1.5 px-5 py-2 rounded-lg text-xs transition cursor-pointer ${
              inputs[current.field].trim() ? "bg-white text-black hover:bg-white/90" : "bg-white/5 text-white/25 cursor-not-allowed"
            }`}
          >
            Next <ArrowRight className="size-3" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!allFilled}
            className={`flex items-center gap-1.5 px-5 py-2 rounded-lg text-xs transition cursor-pointer ${
              allFilled ? "bg-white text-black hover:bg-white/90" : "bg-white/5 text-white/25 cursor-not-allowed"
            }`}
          >
            Generate <ArrowRight className="size-3" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

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
    handleSubmit,
  } = useIkigai();

  const [activeSegment, setActiveSegment] = useState<string>("ikigai");

  const getSegmentContent = (): string => {
    if (!activeProfile) return "Click any circle or intersection on the diagram.";
    switch (activeSegment) {
      case "love":       return inputs.love;
      case "goodAt":     return inputs.goodAt;
      case "worldNeeds": return inputs.worldNeeds;
      case "paidFor":    return inputs.paidFor;
      case "passion":    return activeProfile.result.analysis.passion;
      case "mission":    return activeProfile.result.analysis.mission;
      case "vocation":   return activeProfile.result.analysis.vocation;
      case "profession": return activeProfile.result.analysis.profession;
      default:           return activeProfile.result.ikigaiSummary;
    }
  };

  const seg = segmentMap[activeSegment] ?? segmentMap.ikigai;

  return (
    <div className="flex flex-col gap-6 relative min-h-screen pb-20 text-white">
      {/* Header */}
      <div className="w-full flex items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-medium text-white">Ikigai</h1>
          <p className="text-white/50 text-sm mt-1 font-light">your reason for being</p>
        </div>

        {activeMode !== "create" && activeMode !== "loading" && (
          <button
            onClick={handleDiscoverClick}
            className="cursor-pointer hover:bg-white/10 transition-all text-white flex items-center gap-2 border px-4 py-1.5 rounded-lg bg-black/50 border-white/30 text-sm font-light"
          >
            <Plus className="size-4" />
            Discover Purpose
          </button>
        )}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">

        {/* Left: Venn Diagram */}
        <div className="lg:col-span-5 p-6 rounded-xl border border-white/10 bg-black/30 backdrop-blur-md flex flex-col items-center gap-4">
          <div className="relative w-96 h-96 select-none">
            {/* Circle 1: Love */}
            <div
              onClick={() => setActiveSegment("love")}
              className={`absolute left-1/2 -translate-x-1/2 w-52 h-52 rounded-full border transition-all duration-300 cursor-pointer flex items-center justify-center bg-rose-500/10 ${
                activeSegment === "love" ? "border-rose-400 ring-4 ring-rose-400/20 scale-105 bg-rose-500/15" : "border-rose-500/20 hover:border-rose-400"
              }`}
              style={{ top: "3%" }}
            >
              <span className="text-rose-300/80 font-medium text-sm absolute top-7">Love</span>
            </div>

            {/* Circle 2: Skills */}
            <div
              onClick={() => setActiveSegment("goodAt")}
              className={`absolute top-1/2 -translate-y-1/2 w-52 h-52 rounded-full border transition-all duration-300 cursor-pointer flex items-center justify-center bg-yellow-500/10 ${
                activeSegment === "goodAt" ? "border-yellow-400 ring-4 ring-yellow-400/20 scale-105 bg-yellow-500/15" : "border-yellow-500/20 hover:border-yellow-400"
              }`}
              style={{ left: "3%" }}
            >
              <span className="text-yellow-300/80 font-medium text-sm absolute left-5">Skills</span>
            </div>

            {/* Circle 3: World Needs */}
            <div
              onClick={() => setActiveSegment("worldNeeds")}
              className={`absolute top-1/2 -translate-y-1/2 right-0 w-52 h-52 rounded-full border transition-all duration-300 cursor-pointer flex items-center justify-center bg-blue-500/10 ${
                activeSegment === "worldNeeds" ? "border-blue-400 ring-4 ring-blue-400/20 scale-105 bg-blue-500/15" : "border-blue-500/20 hover:border-blue-400"
              }`}
              style={{ right: "3%" }}
            >
              <span className="text-blue-300/80 font-medium text-sm absolute right-5">Needs</span>
            </div>

            {/* Circle 4: Paid For */}
            <div
              onClick={() => setActiveSegment("paidFor")}
              className={`absolute left-1/2 -translate-x-1/2 w-52 h-52 rounded-full border transition-all duration-300 cursor-pointer flex items-center justify-center bg-emerald-500/10 ${
                activeSegment === "paidFor" ? "border-emerald-400 ring-4 ring-emerald-400/20 scale-105 bg-emerald-500/15" : "border-emerald-500/20 hover:border-emerald-400"
              }`}
              style={{ bottom: "3%" }}
            >
              <span className="text-emerald-300/80 font-medium text-sm absolute bottom-7">Careers</span>
            </div>

            {/* Intersections */}
            {[
              { key: "passion",    style: { top: "27%", left: "24%" },    activeColor: "bg-rose-500/30 border-rose-300 text-rose-300",    label: "PSN" },
              { key: "mission",    style: { top: "27%", right: "24%" },   activeColor: "bg-blue-500/30 border-blue-300 text-blue-300",    label: "MSN" },
              { key: "profession", style: { bottom: "27%", left: "24%" }, activeColor: "bg-amber-500/30 border-amber-300 text-amber-300", label: "PRF" },
              { key: "vocation",   style: { bottom: "27%", right: "24%" },activeColor: "bg-emerald-500/30 border-emerald-300 text-emerald-300", label: "VOC" },
            ].map(({ key, style, activeColor, label }) => (
              <button
                key={key}
                onClick={() => setActiveSegment(key)}
                className={`absolute w-12 h-12 rounded-full border border-dashed transition-all duration-300 cursor-pointer text-[10px] font-semibold flex items-center justify-center ${
                  activeSegment === key ? `${activeColor} scale-105` : "bg-black/60 border-white/20 text-white/50"
                }`}
                style={style}
              >
                {label}
              </button>
            ))}

            {/* Center */}
            <button
              onClick={() => setActiveSegment("ikigai")}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border transition-all duration-300 cursor-pointer text-[10px] font-semibold flex items-center justify-center ${
                activeSegment === "ikigai"
                  ? "bg-purple-600 border-purple-300 text-white scale-105"
                  : "bg-black border-purple-500/40 text-purple-300 hover:border-purple-400"
              }`}
            >
              IKIGAI
            </button>
          </div>

          {/* Segment info panel */}
          {activeProfile && (
            <div className={`w-full p-4 rounded-lg border text-xs font-light transition-all duration-300 ${seg.color}`}>
              <span className="block text-[9px] uppercase tracking-wider font-semibold mb-1.5 opacity-60">{seg.title}</span>
              <p className="leading-relaxed text-white/80">{getSegmentContent() || "—"}</p>
            </div>
          )}
        </div>

        {/* Right: Form / Loading / Results */}
        <div className="lg:col-span-7 w-full">
          <AnimatePresence mode="wait">

            {/* Form – step-by-step wizard */}
            {activeMode === "create" && (
              <FormWizard
                inputs={inputs}
                handleInputChange={handleInputChange}
                profiles={profiles}
                error={error}
                handleSubmit={handleSubmit}
                onCancel={() => profiles.length > 0 && handleViewProfile(profiles[0])}
              />
            )}

            {/* Loading */}
            {activeMode === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="p-12 rounded-xl border border-white/10 bg-black/30 backdrop-blur-md flex flex-col items-center justify-center min-h-[340px] gap-5 text-center"
              >
                <motion.div
                  className="w-10 h-10 rounded-full border-2 border-purple-500/20 border-t-purple-400"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                />
                <div>
                  <p className="text-sm font-light text-white">Synthesizing your Ikigai...</p>
                  <p className="text-xs text-white/40 mt-1">Analyzing overlaps across your four pillars</p>
                </div>
              </motion.div>
            )}

            {/* Result */}
            {activeMode === "view" && activeProfile && (
              <motion.div
                key="result"
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                className="p-6 rounded-xl border border-white/10 bg-black/30 backdrop-blur-md space-y-6"
              >
                <div className="border-b border-white/5 pb-4">
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-purple-400">Your Ikigai</span>
                  <p className="text-lg font-light text-white/90 italic leading-relaxed mt-1.5">
                    "{activeProfile.result.ikigaiSummary}"
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2.5">
                    <h5 className="text-xs font-medium text-white flex items-center gap-1.5">
                      <CheckCircle2 className="size-3.5 text-emerald-400" /> Action Steps
                    </h5>
                    <ul className="space-y-2">
                      {activeProfile.result.actionableSteps.map((step, idx) => (
                        <li key={idx} className="flex gap-2 text-white/70 text-xs font-light leading-relaxed">
                          <span className="flex-none w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-[10px] mt-0.5">{idx + 1}</span>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2.5">
                    <h5 className="text-xs font-medium text-white flex items-center gap-1.5">
                      <AlertTriangle className="size-3.5 text-amber-400" /> Obstacles
                    </h5>
                    <ul className="space-y-2">
                      {activeProfile.result.potentialObstacles.map((obs, idx) => (
                        <li key={idx} className="flex gap-2 text-white/70 text-xs font-light leading-relaxed">
                          <span className="flex-none w-4 h-4 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center text-[10px] mt-0.5">!</span>
                          {obs}
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

      {/* Saved Profiles */}
      {profiles.length > 0 && (
        <div className="w-full space-y-3 pt-6 border-t border-white/10">
          <div className="flex items-center gap-2 text-white/60">
            <Compass className="size-4" />
            <h3 className="text-sm font-light">Saved Profiles</h3>
          </div>

          <div className="w-full border border-white/10 bg-white/5 backdrop-blur-xl rounded-xl overflow-hidden">
            <table className="w-full table-fixed border-collapse text-white">
              <thead className="bg-black/40 text-xs">
                <tr>
                  <th className="border border-white/10 px-4 py-2.5 text-left font-light text-white/50 w-[60%]">Summary</th>
                  <th className="border border-white/10 px-4 py-2.5 text-left font-light text-white/50 w-[20%]">Date</th>
                  <th className="border border-white/10 px-4 py-2.5 text-left font-light text-white/50 w-[20%]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {profiles.map((p) => (
                  <tr key={p.id} className={`hover:bg-white/5 transition text-xs ${activeProfile?.id === p.id ? "bg-white/5" : ""}`}>
                    <td className="border border-white/10 px-4 py-2.5">
                      <span className="truncate block font-light text-white/80">{p.result.ikigaiSummary}</span>
                    </td>
                    <td className="border border-white/10 px-4 py-2.5 text-white/40 font-light">{p.createdOn}</td>
                    <td className="border border-white/10 px-4 py-2.5">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewProfile(p)}
                          className="inline-flex cursor-pointer hover:bg-white/10 transition text-[10px] text-white items-center gap-1.5 border border-white/20 px-3 py-1 rounded-md"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDeleteProfile(p.id)}
                          className="inline-flex cursor-pointer hover:bg-rose-500/15 transition text-rose-400 items-center border border-rose-500/20 px-2.5 py-1 rounded-md"
                        >
                          <Trash2 className="size-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ikigai;