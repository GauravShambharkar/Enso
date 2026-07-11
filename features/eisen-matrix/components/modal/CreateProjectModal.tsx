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
      className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 px-4"
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="w-full max-w-[420px] bg-card border border-border rounded-md p-6 pb-5 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-[14px] font-medium text-foreground">New Matrix</p>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-foreground bg-transparent border-none cursor-pointer p-0.5"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Name */}
        <div className="mb-3.5">
          <label className="text-[11px] text-neutral-500 block mb-1.5 font-sans font-medium uppercase tracking-[0.04em]">Name</label>
          <input
            type="text"
            value={state.name}
            onChange={e => state.setName(e.target.value)}
            placeholder="Weekly sprint, product launch…"
            autoFocus
            onKeyDown={e => e.key === "Enter" && state.name.trim() && onSubmit()}
            className="w-full bg-background border border-border rounded-md px-3 py-2.5 text-foreground text-[14px] outline-none focus:border-ring/35 transition-colors font-sans"
          />
        </div>

        {/* Purpose */}
        <div className="mb-5">
          <label className="text-[11px] text-neutral-500 block mb-1.5 font-sans font-medium uppercase tracking-[0.04em]">
            Purpose <span className="text-neutral-500 opacity-60 lowercase font-normal">(optional)</span>
          </label>
          <textarea
            value={state.purpose}
            onChange={e => state.setPurpose(e.target.value)}
            placeholder="What are you prioritizing?"
            rows={2}
            className="w-full bg-background border border-border rounded-md px-3 py-2.5 text-foreground text-[14px] outline-none resize-none focus:border-ring/35 transition-colors font-sans"
          />
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
            disabled={!state.name.trim()}
            className="text-[12px] px-3.5 py-1.5 rounded-md border-none font-medium font-sans cursor-pointer disabled:cursor-not-allowed bg-foreground text-background disabled:bg-secondary disabled:text-neutral-500"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;
