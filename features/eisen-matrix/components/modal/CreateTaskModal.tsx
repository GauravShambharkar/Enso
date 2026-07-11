"use client";

import React from "react";
import { X } from "lucide-react";

const QUADRANTS = [
  { key: "Q1" as const, label: "Do First",  accent: "#f87171" },
  { key: "Q2" as const, label: "Schedule",  accent: "#60a5fa" },
  { key: "Q3" as const, label: "Delegate",  accent: "#fbbf24" },
  { key: "Q4" as const, label: "Eliminate", accent: "#34d399" },
];

interface CreateTaskProps {
  onClose: () => void;
  onSubmit: () => void;
  state: {
    title: string;
    setTitle: (s: string) => void;
    quadrant: "Q1" | "Q2" | "Q3" | "Q4";
    setQuadrant: (q: "Q1" | "Q2" | "Q3" | "Q4") => void;
  };
}

export const CreateTaskModal = ({ onClose, onSubmit, state }: CreateTaskProps) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 px-4"
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="w-full max-w-[400px] bg-card border border-border rounded-md p-6 pb-5 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-[14px] font-medium text-foreground">New Task</p>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-foreground bg-transparent border-none cursor-pointer p-0.5"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Title input */}
        <input
          type="text"
          value={state.title}
          onChange={e => state.setTitle(e.target.value)}
          placeholder="What needs to be done?"
          autoFocus
          onKeyDown={e => e.key === "Enter" && state.title.trim() && onSubmit()}
          className="w-full bg-background border border-border rounded-md px-3 py-2.5 text-foreground text-[14px] outline-none mb-4 focus:border-ring/35 transition-colors font-sans"
        />

        {/* Quadrant selector */}
        <div className="flex gap-1.5 mb-5">
          {QUADRANTS.map(({ key, label, accent }) => {
            const active = state.quadrant === key;
            return (
              <button
                key={key}
                onClick={() => state.setQuadrant(key)}
                className={`flex-1 py-1.5 px-1 rounded-md text-[11px] cursor-pointer font-sans transition-all border ${
                  active
                    ? ""
                    : "border-border bg-transparent text-neutral-500 hover:text-muted-foreground"
                }`}
                style={{
                  borderColor: active ? `${accent}40` : undefined,
                  backgroundColor: active ? `${accent}15` : undefined,
                  color: active ? accent : undefined,
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="text-[12px] px-3.5 py-1.5 rounded-md border border-border bg-transparent text-muted-foreground cursor-pointer font-sans transition-colors hover:text-foreground"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={!state.title.trim()}
            className="text-[12px] px-3.5 py-1.5 rounded-md border-none font-medium font-sans cursor-pointer disabled:cursor-not-allowed bg-foreground text-background disabled:bg-secondary disabled:text-neutral-500"
          >
            Add task
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;
