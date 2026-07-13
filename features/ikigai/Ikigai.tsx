"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Plus, RotateCcw, Trash2, Eye, Compass, List, Sparkles } from "lucide-react";
import { useQueryState } from "nuqs";
import { useIkigai } from "./hooks/controller/useIkigai.hook";
import type { IkigaiProfile } from "@/store/appStore";

/* ─── Wizard steps ──────────────────────────────────── */
const STEPS = [
  {
    field: "love" as const,
    num: "01",
    label: "What you love",
    hint: "Activities, topics, and pursuits that draw you in without effort.",
    placeholder: "e.g. writing, building tools, teaching, exploring ideas...",
  },
  {
    field: "goodAt" as const,
    num: "02",
    label: "What you're good at",
    hint: "Competencies you've built — skills others rely on you for.",
    placeholder: "e.g. systems thinking, visual design, deep research...",
  },
  {
    field: "worldNeeds" as const,
    num: "03",
    label: "What the world needs",
    hint: "Real problems worth solving. Where you see gaps others miss.",
    placeholder: "e.g. accessible education, mental clarity tools...",
  },
  {
    field: "paidFor" as const,
    num: "04",
    label: "What you can be paid for",
    hint: "Market-valued skills — services or products people will pay for.",
    placeholder: "e.g. software engineering, consulting, writing...",
  },
] as const;

/* ─── Segment details mapping ───────────────────────── */
const SEGMENTS = {
  ikigai:     { title: "Ikigai",                  accent: "var(--accent)" },
  love:       { title: "What You Love",           accent: "#f87171" },
  goodAt:     { title: "What You're Good At",     accent: "#60a5fa" },
  worldNeeds: { title: "What the World Needs",    accent: "#fbbf24" },
  paidFor:    { title: "What You Can Be Paid For",accent: "#34d399" },
  passion:    { title: "Passion",                 accent: "#c084fc" },
  mission:    { title: "Mission",                 accent: "#fb7185" },
  vocation:   { title: "Vocation",                accent: "#fb923c" },
  profession: { title: "Profession",              accent: "#2dd4bf" },
} as const;

type SegKey = keyof typeof SEGMENTS;

export const Ikigai = () => {
  const {
    profiles,
    activeProfile,
    setActiveProfile,
    activeMode,
    setActiveMode,
    inputs,
    setInputs,
    error,
    isLoading,
    handleInputChange,
    handleDiscoverClick,
    handleViewProfile,
    handleDeleteProfile,
    handleSubmit,
  } = useIkigai();

  // Sync activeTab and activeSegment to URL query state using nuqs
  const [tabState, setTabState] = useQueryState("tab", { defaultValue: "view" });
  const activeTab = (tabState || "view") as "discover" | "view" | "profiles";
  const setActiveTab = (tab: "discover" | "view" | "profiles" | null) => setTabState(tab);

  const [segmentState, setSegmentState] = useQueryState("segment", { defaultValue: "ikigai" });
  const activeSegment = (segmentState || "ikigai") as SegKey;
  const setActiveSegment = (seg: SegKey | null) => setSegmentState(seg);

  // Sync mode transitions with tabs
  useEffect(() => {
    if (activeMode === "create") {
      setActiveTab("discover");
    } else if (activeMode === "view" && activeProfile) {
      setActiveTab("view");
    }
  }, [activeMode, activeProfile]);

  const handleTabChange = (tab: "discover" | "view" | "profiles") => {
    if (tab === "discover") {
      handleDiscoverClick();
    } else if (tab === "view" && profiles.length > 0) {
      handleViewProfile(activeProfile || profiles[0]);
    }
    setActiveTab(tab);
  };

  const getSegmentContent = (): string => {
    if (!activeProfile) return "No profile data loaded.";
    switch (activeSegment) {
      case "love":       return inputs.love || activeProfile.inputs.love;
      case "goodAt":     return inputs.goodAt || activeProfile.inputs.goodAt;
      case "worldNeeds": return inputs.worldNeeds || activeProfile.inputs.worldNeeds;
      case "paidFor":    return inputs.paidFor || activeProfile.inputs.paidFor;
      case "passion":    return activeProfile.result.analysis.passion;
      case "mission":    return activeProfile.result.analysis.mission;
      case "vocation":   return activeProfile.result.analysis.vocation;
      case "profession": return activeProfile.result.analysis.profession;
      default:           return activeProfile.result.ikigaiSummary;
    }
  };

  if (isLoading) {
    /* Full Page Skeleton Loader */
    return (
      <div className="w-full px-4 sm:px-6 md:px-10 py-6 md:py-8 bg-background min-h-screen pb-24 md:pb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-border pb-4 animate-pulse">
          <div>
            <div className="h-8 bg-secondary rounded-sm w-48 mb-2" />
            <div className="h-4 bg-secondary rounded-sm w-80" />
          </div>
          <div className="h-8 bg-secondary rounded-sm w-64 self-start" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start mt-8 animate-pulse">
          <div className="lg:col-span-5 flex flex-col items-center w-full">
            <div className="w-72 h-72 rounded-full bg-secondary" />
          </div>
          <div className="lg:col-span-7 w-full flex flex-col gap-4">
            <div className="h-6 bg-secondary rounded w-32 mb-4" />
            <div className="h-4 bg-secondary rounded w-full" />
            <div className="h-4 bg-secondary rounded w-full" />
            <div className="h-4 bg-secondary rounded w-2/3" />
            <div className="h-px bg-border my-6" />
            <div className="grid grid-cols-2 gap-8">
              <div className="h-20 bg-secondary rounded" />
              <div className="h-20 bg-secondary rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 md:px-10 py-6 md:py-8 bg-background pb-24 md:pb-8">
      {/* Header and Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-border pb-4">
        <div>
          <h1 className="text-[28px] font-medium text-foreground tracking-[-0.02em]">
            Ikigai Workspace
          </h1>
          <p className="text-[13px] text-neutral-500 mt-0.5">
            Align your passion, mission, vocation, and profession.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex gap-1 bg-card p-1 rounded-md border border-border self-start">
          <button
            onClick={() => handleTabChange("discover")}
            className={`text-[12px] px-3.5 py-1.5 rounded-[4px] border-none cursor-pointer font-sans flex items-center gap-1.5 transition-colors ${
              activeTab === "discover" ? "bg-secondary text-foreground font-medium" : "bg-transparent text-neutral-500 hover:text-muted-foreground"
            }`}
          >
            <Compass className="size-3.5" /> Discover
          </button>
          
          <button
            onClick={() => handleTabChange("view")}
            disabled={profiles.length === 0}
            className={`text-[12px] px-3.5 py-1.5 rounded-[4px] border-none font-sans flex items-center gap-1.5 transition-all ${
              profiles.length === 0
                ? "text-neutral-500 opacity-50 cursor-not-allowed"
                : activeTab === "view"
                ? "bg-secondary text-foreground font-medium cursor-pointer"
                : "bg-transparent text-muted-foreground hover:text-foreground cursor-pointer"
            }`}
          >
            <Sparkles className="size-3.5" /> Graph View
          </button>

          <button
            onClick={() => setActiveTab("profiles")}
            className={`text-[12px] px-3.5 py-1.5 rounded-[4px] border-none cursor-pointer font-sans flex items-center gap-1.5 transition-colors ${
              activeTab === "profiles" ? "bg-secondary text-foreground font-medium" : "bg-transparent text-neutral-500 hover:text-muted-foreground"
            }`}
          >
            <List className="size-3.5" /> Profiles ({profiles.length})
          </button>
        </div>
      </div>

      {/* Main Workspace content area */}
      <AnimatePresence mode="wait">
        {activeTab === "discover" && activeMode === "create" && (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }}>
            <WizardForm
              inputs={inputs}
              onChange={handleInputChange}
              onSubmit={handleSubmit}
              onCancel={() => profiles.length > 0 && handleViewProfile(profiles[0])}
              error={error}
              hasProfiles={profiles.length > 0}
            />
          </motion.div>
        )}

        {activeMode === "loading" && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }}>
            <LoadingState />
          </motion.div>
        )}

        {activeTab === "view" && activeProfile && (
          <motion.div
            key="graph-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start"
          >
            {/* Left side: Interactive SVG Venn Diagram */}
            <div className="lg:col-span-5 xl:col-span-5 flex flex-col items-center w-full">
              <InteractiveIkigaiGraph
                activeSegment={activeSegment}
                onSelectSegment={setActiveSegment}
              />
              <p className="text-[11px] text-neutral-500 mt-4 text-center">
                Click any circle, overlap region, or label to view detail analysis.
              </p>
            </div>

            {/* Right side: Detailed Analysis info */}
            <div className="lg:col-span-7 xl:col-span-7 w-full min-w-0">
              <div
                className="pl-5 mb-7"
                style={{ borderLeft: `3px solid ${SEGMENTS[activeSegment].accent}` }}
              >
                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.08em] block mb-1"
                  style={{ color: SEGMENTS[activeSegment].accent }}
                >
                  Selected Pillar
                </span>
                <h3 className="text-[20px] font-medium text-foreground">
                  {SEGMENTS[activeSegment].title}
                </h3>
              </div>

              <p className="text-[14px] text-muted-foreground leading-[1.7] mb-8 font-light">
                {getSegmentContent()}
              </p>

              {/* Action Steps & Obstacles */}
              <div className="border-t border-border pt-6 mt-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <p className="text-[11px] text-primary font-semibold uppercase tracking-[0.08em] mb-3">
                    Action steps
                  </p>
                  <ol className="space-y-2.5 m-0 p-0 list-none">
                    {activeProfile.result.actionableSteps.map((step, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-[11px] text-neutral-500 min-w-[18px] pt-0.5 tabular-nums">
                          {i + 1}.
                        </span>
                        <p className="text-[13px] text-muted-foreground leading-[1.6] m-0">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>
                
                <div>
                  <p className="text-[11px] text-primary font-semibold uppercase tracking-[0.08em] mb-3">
                    Watch for
                  </p>
                  <ul className="space-y-2.5 m-0 p-0 list-none">
                    {activeProfile.result.potentialObstacles.map((obs, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-[11px] text-neutral-500 min-w-[18px] pt-0.5">—</span>
                        <p className="text-[13px] text-muted-foreground leading-[1.6] m-0">{obs}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Switch/Action options */}
              <div className="flex gap-3 border-t border-border mt-8 pt-5">
                <button
                  onClick={() => handleTabChange("discover")}
                  className="flex items-center gap-1.5 text-[12px] px-2.5 py-1.5 border border-border rounded-md bg-transparent text-neutral-500 hover:text-foreground cursor-pointer font-sans transition-colors"
                >
                  <RotateCcw className="size-3" /> New Discovery
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "profiles" && (
          <motion.div
            key="profiles-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <SavedProfilesTab
              profiles={profiles}
              activeId={activeProfile?.id}
              isLoading={isLoading}
              onView={(p) => {
                handleViewProfile(p);
                setActiveTab("view");
              }}
              onDelete={handleDeleteProfile}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── Wizard Form Component ─────────────────────────── */
function WizardForm({
  inputs,
  onChange,
  onSubmit,
  onCancel,
  error,
  hasProfiles,
}: {
  inputs: Record<string, string>;
  onChange: (val: string, key: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  error: string;
  hasProfiles: boolean;
}) {
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const value = inputs[current.field] ?? "";
  const allFilled = STEPS.every(s => inputs[s.field]?.trim());

  return (
    <div className="max-w-[600px] my-5">
      <div className="flex items-center gap-1.5 mb-8">
        {STEPS.map((s, i) => (
          <button
            key={s.field}
            onClick={() => setStep(i)}
            className="cursor-pointer transition-all duration-150 h-0.5 flex-1 rounded-full"
            style={{
              background: i < step
                ? "var(--text-3)"
                : i === step
                  ? "var(--accent)"
                  : "var(--surface-3)",
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.12 }}
        >
          <p className="text-[11px] text-neutral-500 mb-1.5 tabular-nums">
            {current.num} / 04
          </p>
          <h2 className="text-[22px] font-medium text-foreground tracking-[-0.015em] mb-1">
            {current.label}
          </h2>
          <p className="text-[13px] text-neutral-500 mb-5 leading-[1.6]">
            {current.hint}
          </p>

          <textarea
            autoFocus
            value={value}
            onChange={e => onChange(e.target.value, current.field)}
            placeholder={current.placeholder}
            onKeyDown={e => {
              if (e.key === "Enter" && e.metaKey && value.trim()) {
                if (step < STEPS.length - 1) setStep(s => s + 1);
                else onSubmit();
              }
            }}
            rows={5}
            className="w-full bg-card border border-border rounded-md px-3.5 py-3 text-foreground text-[14px] leading-[1.7] resize-none outline-none focus:border-ring/35 transition-colors font-sans"
          />
        </motion.div>
      </AnimatePresence>

      {error && (
        <p className="text-[12px] text-destructive mt-2">{error}</p>
      )}

      <div className="flex items-center justify-between mt-6">
        <div className="flex gap-2">
          {step > 0 && (
            <button
              onClick={() => setStep(s => s - 1)}
              className="flex items-center gap-1.5 text-[12px] px-2.5 py-1.5 rounded-md border border-border bg-transparent text-neutral-500 hover:text-foreground cursor-pointer font-sans transition-colors"
            >
              <ArrowLeft className="size-3" /> Back
            </button>
          )}
          {hasProfiles && step === 0 && (
            <button
              onClick={onCancel}
              className="text-[12px] px-2.5 py-1.5 rounded-md border border-border bg-transparent text-neutral-500 hover:text-foreground cursor-pointer font-sans transition-colors"
            >
              Cancel
            </button>
          )}
        </div>

        {step < STEPS.length - 1 ? (
          <button
            onClick={() => setStep(s => s + 1)}
            disabled={!value.trim()}
            className="flex items-center gap-1.5 text-[13px] font-medium font-sans px-4 py-1.5 rounded-md border-none cursor-pointer disabled:cursor-not-allowed disabled:bg-secondary disabled:text-neutral-500 bg-foreground text-background"
          >
            Next <ArrowRight className="size-3.5" />
          </button>
        ) : (
          <button
            onClick={onSubmit}
            disabled={!allFilled}
            className="flex items-center gap-1.5 text-[13px] font-medium font-sans px-4 py-1.5 rounded-md border-none cursor-pointer disabled:cursor-not-allowed disabled:bg-secondary disabled:text-neutral-500 bg-primary text-white"
          >
            Generate <ArrowRight className="size-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Loading State Component ───────────────────────── */
function LoadingState() {
  return (
    <div className="flex flex-col items-start gap-4 max-w-[480px] pt-10">
      <div className="animate-spin w-5 h-5 rounded-full border-2 border-border border-t-primary" />
      <div>
        <p className="text-[15px] text-foreground font-medium">Synthesizing…</p>
        <p className="text-[13px] text-neutral-500 mt-1">
          Analyzing overlaps across your four pillars
        </p>
      </div>
    </div>
  );
}

/* ─── Saved Profiles List View ──────────────────────── */
function SavedProfilesTab({
  profiles,
  activeId,
  isLoading,
  onView,
  onDelete,
}: {
  profiles: IkigaiProfile[];
  activeId: string | undefined;
  isLoading: boolean;
  onView: (p: IkigaiProfile) => void;
  onDelete: (id: string) => void;
}) {
  if (isLoading) {
    return (
      <div>
        <p className="text-[11px] text-primary font-semibold uppercase tracking-[0.08em] mb-4">
          Historical Discoveries
        </p>
        <div className="flex flex-col gap-3 border-t border-border/60 py-3 pr-2.5">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex items-center justify-between py-3 border-b border-border/40 animate-pulse">
              <div className="h-4 bg-secondary rounded-sm w-1/2" />
              <div className="h-3 bg-secondary rounded-sm w-16" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className="py-10 text-left">
        <p className="text-[14px] text-neutral-500">No saved profiles yet.</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-[11px] text-primary font-semibold uppercase tracking-[0.08em] mb-4">
        Historical Discoveries
      </p>
      <div className="border-t border-border">
        {profiles.map(p => (
          <div
            key={p.id}
            className="flex items-center justify-between group py-3.5 border-b border-border"
          >
            <div className="flex-1 min-w-0">
              <button
                onClick={() => onView(p)}
                className="text-left cursor-pointer transition-colors duration-100 bg-none border-none p-0 text-[14px] font-sans text-muted-foreground hover:text-foreground"
                style={{
                  fontWeight: activeId === p.id ? 500 : 400,
                  color: activeId === p.id ? "var(--text-1)" : undefined,
                }}
              >
                {p.result.ikigaiSummary}
              </button>
            </div>
            
            <div className="flex items-center gap-4 ml-6 flex-shrink-0">
              <span className="text-[12px] text-neutral-500">{p.createdOn}</span>
              <button
                onClick={() => onView(p)}
                title="View"
                className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity text-neutral-500 hover:text-foreground bg-none border-none p-0.5"
              >
                <Eye className="size-4" />
              </button>
              <button
                onClick={() => onDelete(p.id)}
                title="Delete"
                className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity text-neutral-500 hover:text-destructive bg-none border-none p-0.5"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Interactive SVG Ikigai Diagram ────────────────── */
function InteractiveIkigaiGraph({
  activeSegment,
  onSelectSegment,
}: {
  activeSegment: SegKey;
  onSelectSegment: (seg: SegKey) => void;
}) {
  return (
    <svg
      viewBox="0 0 400 400"
      className="w-full max-w-[400px] h-auto bg-transparent select-none font-sans"
    >
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* ── 4 Main Circles: Background & Border Overlays ── */}
      
      {/* 1. Love (Top) */}
      <circle
        cx="200"
        cy="145"
        r="75"
        onClick={() => onSelectSegment("love")}
        style={{
          fill: activeSegment === "love" ? "rgba(248, 113, 113, 0.16)" : "rgba(248, 113, 113, 0.04)",
          stroke: activeSegment === "love" ? "#f87171" : "rgba(248, 113, 113, 0.25)",
          strokeWidth: activeSegment === "love" ? 2 : 1.2,
          cursor: "pointer",
          transition: "all 0.15s ease",
        }}
      />

      {/* 2. Good At (Left) */}
      <circle
        cx="145"
        cy="200"
        r="75"
        onClick={() => onSelectSegment("goodAt")}
        style={{
          fill: activeSegment === "goodAt" ? "rgba(96, 165, 250, 0.16)" : "rgba(96, 165, 250, 0.04)",
          stroke: activeSegment === "goodAt" ? "#60a5fa" : "rgba(96, 165, 250, 0.25)",
          strokeWidth: activeSegment === "goodAt" ? 2 : 1.2,
          cursor: "pointer",
          transition: "all 0.15s ease",
        }}
      />

      {/* 3. World Needs (Right) */}
      <circle
        cx="255"
        cy="200"
        r="75"
        onClick={() => onSelectSegment("worldNeeds")}
        style={{
          fill: activeSegment === "worldNeeds" ? "rgba(251, 191, 36, 0.16)" : "rgba(251, 191, 36, 0.04)",
          stroke: activeSegment === "worldNeeds" ? "#fbbf24" : "rgba(251, 191, 36, 0.25)",
          strokeWidth: activeSegment === "worldNeeds" ? 2 : 1.2,
          cursor: "pointer",
          transition: "all 0.15s ease",
        }}
      />

      {/* 4. Paid For (Bottom) */}
      <circle
        cx="200"
        cy="255"
        r="75"
        onClick={() => onSelectSegment("paidFor")}
        style={{
          fill: activeSegment === "paidFor" ? "rgba(52, 211, 153, 0.16)" : "rgba(52, 211, 153, 0.04)",
          stroke: activeSegment === "paidFor" ? "#34d399" : "rgba(52, 211, 153, 0.25)",
          strokeWidth: activeSegment === "paidFor" ? 2 : 1.2,
          cursor: "pointer",
          transition: "all 0.15s ease",
        }}
      />

      {/* ── Outer Labels for Pillars ── */}
      <text
        x="200"
        y="50"
        textAnchor="middle"
        onClick={() => onSelectSegment("love")}
        style={{
          fontSize: 10,
          fontWeight: activeSegment === "love" ? 600 : 400,
          fill: activeSegment === "love" ? "#f87171" : "var(--text-3)",
          cursor: "pointer",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        What You Love
      </text>

      <text
        x="45"
        y="204"
        textAnchor="start"
        onClick={() => onSelectSegment("goodAt")}
        style={{
          fontSize: 10,
          fontWeight: activeSegment === "goodAt" ? 600 : 400,
          fill: activeSegment === "goodAt" ? "#60a5fa" : "var(--text-3)",
          cursor: "pointer",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Good At
      </text>

      <text
        x="355"
        y="204"
        textAnchor="end"
        onClick={() => onSelectSegment("worldNeeds")}
        style={{
          fontSize: 10,
          fontWeight: activeSegment === "worldNeeds" ? 600 : 400,
          fill: activeSegment === "worldNeeds" ? "#fbbf24" : "var(--text-3)",
          cursor: "pointer",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Needs
      </text>

      <text
        x="200"
        y="350"
        textAnchor="middle"
        onClick={() => onSelectSegment("paidFor")}
        style={{
          fontSize: 10,
          fontWeight: activeSegment === "paidFor" ? 600 : 400,
          fill: activeSegment === "paidFor" ? "#34d399" : "var(--text-3)",
          cursor: "pointer",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Paid For
      </text>

      {/* ── Intersection Hotspots (Circles or text labels styled as boxes) ── */}

      {/* Passion (Top-Left intersection) */}
      <g onClick={() => onSelectSegment("passion")} style={{ cursor: "pointer" }}>
        <rect
          x="115"
          y="125"
          width="50"
          height="18"
          rx="4"
          style={{
            fill: activeSegment === "passion" ? "#c084fc" : "var(--surface)",
            stroke: activeSegment === "passion" ? "#c084fc" : "var(--border)",
            strokeWidth: 1,
            transition: "all 0.12s",
          }}
        />
        <text
          x="140"
          y="137"
          textAnchor="middle"
          style={{
            fontSize: 9,
            fontWeight: 500,
            fill: activeSegment === "passion" ? "#090909" : "var(--text-2)",
            letterSpacing: "0.02em",
          }}
        >
          Passion
        </text>
      </g>

      {/* Mission (Top-Right intersection) */}
      <g onClick={() => onSelectSegment("mission")} style={{ cursor: "pointer" }}>
        <rect
          x="235"
          y="125"
          width="50"
          height="18"
          rx="4"
          style={{
            fill: activeSegment === "mission" ? "#fb7185" : "var(--surface)",
            stroke: activeSegment === "mission" ? "#fb7185" : "var(--border)",
            strokeWidth: 1,
            transition: "all 0.12s",
          }}
        />
        <text
          x="260"
          y="137"
          textAnchor="middle"
          style={{
            fontSize: 9,
            fontWeight: 500,
            fill: activeSegment === "mission" ? "#090909" : "var(--text-2)",
            letterSpacing: "0.02em",
          }}
        >
          Mission
        </text>
      </g>

      {/* Profession (Bottom-Left intersection) */}
      <g onClick={() => onSelectSegment("profession")} style={{ cursor: "pointer" }}>
        <rect
          x="110"
          y="255"
          width="60"
          height="18"
          rx="4"
          style={{
            fill: activeSegment === "profession" ? "#2dd4bf" : "var(--surface)",
            stroke: activeSegment === "profession" ? "#2dd4bf" : "var(--border)",
            strokeWidth: 1,
            transition: "all 0.12s",
          }}
        />
        <text
          x="140"
          y="267"
          textAnchor="middle"
          style={{
            fontSize: 9,
            fontWeight: 500,
            fill: activeSegment === "profession" ? "#090909" : "var(--text-2)",
            letterSpacing: "0.02em",
          }}
        >
          Profession
        </text>
      </g>

      {/* Vocation (Bottom-Right intersection) */}
      <g onClick={() => onSelectSegment("vocation")} style={{ cursor: "pointer" }}>
        <rect
          x="230"
          y="255"
          width="60"
          height="18"
          rx="4"
          style={{
            fill: activeSegment === "vocation" ? "#fb923c" : "var(--surface)",
            stroke: activeSegment === "vocation" ? "#fb923c" : "var(--border)",
            strokeWidth: 1,
            transition: "all 0.12s",
          }}
        />
        <text
          x="260"
          y="267"
          textAnchor="middle"
          style={{
            fontSize: 9,
            fontWeight: 500,
            fill: activeSegment === "vocation" ? "#090909" : "var(--text-2)",
            letterSpacing: "0.02em",
          }}
        >
          Vocation
        </text>
      </g>

      {/* ── Central Ikigai Intersection Hotspot ── */}
      <g onClick={() => onSelectSegment("ikigai")} style={{ cursor: "pointer" }}>
        <circle
          cx="200"
          cy="200"
          r="26"
          style={{
            fill: activeSegment === "ikigai" ? "rgba(151, 125, 211, 0.25)" : "transparent",
            stroke: activeSegment === "ikigai" ? "var(--accent)" : "transparent",
            strokeWidth: 1.5,
            transition: "all 0.15s ease",
          }}
        />
        <rect
          x="175"
          y="190"
          width="50"
          height="20"
          rx="4"
          style={{
            fill: activeSegment === "ikigai" ? "var(--accent)" : "var(--surface-2)",
            stroke: activeSegment === "ikigai" ? "var(--accent)" : "var(--accent)",
            strokeWidth: activeSegment === "ikigai" ? 0 : 1,
            transition: "all 0.12s",
          }}
        />
        <text
          x="200"
          y="203"
          textAnchor="middle"
          style={{
            fontSize: 9,
            fontWeight: 700,
            fill: activeSegment === "ikigai" ? "#ffffff" : "var(--text-1)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Ikigai
        </text>
      </g>
    </svg>
  );
}

export default Ikigai;