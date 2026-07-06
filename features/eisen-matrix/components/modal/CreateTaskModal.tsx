"use client";

import React from "react";
import { X } from "lucide-react";

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
    <div className="w-full h-full fixed inset-0 flex justify-center items-center bg-black/60 z-50 backdrop-blur-xs">
      <div className="p-8 rounded-xl border border-white/20 w-120 bg-black/80 backdrop-blur-xl relative">
        <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white transition-all">
          <X className="size-5" />
        </button>

        <h2 className="text-2xl text-white font-light tracking-tight mb-6">Create New Task</h2>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-white/60 text-sm">Task Name</label>
            <input
              type="text"
              value={state.title}
              onChange={(e) => state.setTitle(e.target.value)}
              placeholder="e.g. Prepare deck for board review"
              className="w-full p-3 rounded-xl border border-white/10 bg-white/5 text-white focus:outline-hidden focus:border-white/30 text-sm font-light transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-white/60 text-sm block">Quadrant Priority</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => state.setQuadrant("Q1")}
                className={`p-3 rounded-xl border text-xs font-light text-left transition-all ${
                  state.quadrant === "Q1" 
                  ? "bg-rose-500/20 border-rose-500/40 text-rose-300" 
                  : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                }`}
              >
                <span className="block font-medium mb-1">Q1: Do First</span>
                Urgent & Important
              </button>

              <button
                type="button"
                onClick={() => state.setQuadrant("Q2")}
                className={`p-3 rounded-xl border text-xs font-light text-left transition-all ${
                  state.quadrant === "Q2" 
                  ? "bg-blue-500/20 border-blue-500/40 text-blue-300" 
                  : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                }`}
              >
                <span className="block font-medium mb-1">Q2: Schedule</span>
                Important, Not Urgent
              </button>

              <button
                type="button"
                onClick={() => state.setQuadrant("Q3")}
                className={`p-3 rounded-xl border text-xs font-light text-left transition-all ${
                  state.quadrant === "Q3" 
                  ? "bg-amber-500/20 border-amber-500/40 text-amber-300" 
                  : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                }`}
              >
                <span className="block font-medium mb-1">Q3: Delegate</span>
                Urgent, Not Important
              </button>

              <button
                type="button"
                onClick={() => state.setQuadrant("Q4")}
                className={`p-3 rounded-xl border text-xs font-light text-left transition-all ${
                  state.quadrant === "Q4" 
                  ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300" 
                  : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                }`}
              >
                <span className="block font-medium mb-1">Q4: Eliminate</span>
                Not Urgent or Important
              </button>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-white/5 justify-end">
            <button
              onClick={onClose}
              className="px-6 h-12 rounded-full border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all text-sm"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              disabled={!state.title.trim()}
              className={`px-8 h-12 rounded-full font-medium text-sm transition-all ${
                state.title.trim() 
                ? "bg-white text-black hover:bg-white/90" 
                : "bg-white/5 text-white/30 border border-white/5 cursor-not-allowed"
              }`}
            >
              Create Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;
