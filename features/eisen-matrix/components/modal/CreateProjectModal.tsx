"use client";

import React from "react";
import { X } from "lucide-react";

interface CreateProjectModalProps {
  onClose: () => void;
  onSubmit: () => void;
  state: {
    name: string;
    setName: (s: string) => void;
    purpose: string;
    setPurpose: (s: string) => void;
  };
}

export const CreateProjectModal = ({ onClose, onSubmit, state }: CreateProjectModalProps) => {
  return (
    <div
      className="w-full h-full fixed inset-0 flex justify-center items-center bg-black/60 z-50 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[440px] p-7 rounded-xl border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg text-white font-medium">New Matrix</h2>
          <button onClick={onClose} className="text-white/30 hover:text-white transition-colors cursor-pointer">
            <X className="size-4" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-white/50 text-xs">Name</label>
            <input
              type="text"
              value={state.name}
              onChange={(e) => state.setName(e.target.value)}
              placeholder="Weekly Sprint, Product Launch..."
              autoFocus
              className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 text-sm font-light transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-white/50 text-xs">Purpose</label>
            <textarea
              value={state.purpose}
              onChange={(e) => state.setPurpose(e.target.value)}
              placeholder="What are you prioritizing?"
              rows={2}
              className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 text-sm font-light transition-colors resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-white/10 text-white/50 hover:text-white hover:bg-white/5 transition-colors text-xs cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              disabled={!state.name.trim()}
              className={`px-5 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                state.name.trim()
                  ? "bg-white text-black hover:bg-white/90"
                  : "bg-white/5 text-white/25 cursor-not-allowed"
              }`}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;
