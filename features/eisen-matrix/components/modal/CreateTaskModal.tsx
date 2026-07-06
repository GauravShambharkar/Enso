"use client";

import React from "react";
import { X } from "lucide-react";

const quadrants = [
  { key: "Q1", label: "Do First", color: "text-rose-300 border-rose-500/30 bg-rose-500/10" },
  { key: "Q2", label: "Schedule", color: "text-blue-300 border-blue-500/30 bg-blue-500/10" },
  { key: "Q3", label: "Delegate", color: "text-amber-300 border-amber-500/30 bg-amber-500/10" },
  { key: "Q4", label: "Eliminate", color: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10" },
] as const;

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
      className="w-full h-full fixed inset-0 flex justify-center items-center bg-black/60 z-50 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[420px] p-6 rounded-xl border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl"
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base text-white font-medium">New Task</h2>
          <button onClick={onClose} className="text-white/30 hover:text-white transition-colors cursor-pointer">
            <X className="size-4" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Task title */}
          <input
            type="text"
            value={state.title}
            onChange={(e) => state.setTitle(e.target.value)}
            placeholder="What needs to be done?"
            autoFocus
            onKeyDown={(e) => e.key === "Enter" && state.title.trim() && onSubmit()}
            className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 text-sm font-light transition-colors"
          />

          {/* Quadrant selector */}
          <div className="flex gap-2">
            {quadrants.map(({ key, label, color }) => (
              <button
                key={key}
                type="button"
                onClick={() => state.setQuadrant(key)}
                className={`flex-1 py-1.5 rounded-lg border text-[10px] font-light transition-colors cursor-pointer ${
                  state.quadrant === key
                    ? color
                    : "bg-white/5 border-white/8 text-white/40 hover:text-white/70"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-1">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-white/10 text-white/50 hover:text-white hover:bg-white/5 transition-colors text-xs cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              disabled={!state.title.trim()}
              className={`px-5 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                state.title.trim()
                  ? "bg-white text-black hover:bg-white/90"
                  : "bg-white/5 text-white/25 cursor-not-allowed"
              }`}
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;
