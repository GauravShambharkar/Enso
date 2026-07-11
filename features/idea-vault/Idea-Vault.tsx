"use client";

import React, { useState, useEffect, useRef } from "react";
import { Trash2, ArrowUpRight, X, Plus } from "lucide-react";

interface Idea {
  id: string;
  text: string;
  createdOn: string;
}

const STORAGE_KEY = "enso_idea_vault";

function loadIdeas(): Idea[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveIdeas(ideas: Idea[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas));
}

export default function Idea_Vault() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [draft, setDraft] = useState("");
  const [selected, setSelected] = useState<Idea | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setIdeas(loadIdeas());
  }, []);

  const addIdea = () => {
    if (!draft.trim()) return;
    const next: Idea = {
      id: Date.now().toString(),
      text: draft.trim(),
      createdOn: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
    };
    const updated = [next, ...ideas];
    setIdeas(updated);
    saveIdeas(updated);
    setDraft("");
    inputRef.current?.focus();
  };

  const deleteIdea = (id: string) => {
    const updated = ideas.filter((i) => i.id !== id);
    setIdeas(updated);
    saveIdeas(updated);
    if (selected?.id === id) setSelected(null);
  };

  return (
    <div className="w-full px-6 md:px-10 py-8 h-screen flex flex-col overflow-hidden bg-background">
      {/* Header */}
      <div className="mb-7 flex-shrink-0">
        <h1 className="text-[28px] font-medium text-foreground tracking-[-0.02em]">
          Idea Vault
        </h1>
        <p className="text-[13px] text-neutral-500 mt-0.5">
          {ideas.length === 0 ? "Capture your first idea on the right" : `${ideas.length} idea${ideas.length !== 1 ? "s" : ""}`}
        </p>
      </div>

      {/* Responsive Grid Split: list at left, input/details at right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start flex-1 min-h-0 overflow-hidden">
        
        {/* Left Column: Idea List */}
        <div className="lg:col-span-7 xl:col-span-8 min-w-0 w-full h-full flex flex-col overflow-hidden">
          <p className="text-[11px] text-primary font-semibold uppercase tracking-[0.08em] mb-4 flex-shrink-0">
            Saved Ideas
          </p>
          
          {ideas.length === 0 ? (
            <p className="text-[13px] text-neutral-500 font-light italic">
              No ideas saved yet. Use the vault to capture thoughts.
            </p>
          ) : (
            <div className="flex flex-col border-t border-border overflow-y-auto flex-1 pr-2.5">
              {ideas.map((idea) => (
                <div
                  key={idea.id}
                  className="flex items-start justify-between group py-3 border-b border-border"
                >
                  <button
                    onClick={() => setSelected(idea)}
                    className="flex-1 text-left cursor-pointer transition-colors duration-100 bg-none border-none p-0 text-[13px] leading-[1.55] font-sans text-muted-foreground hover:text-foreground"
                    style={{
                      color: selected?.id === idea.id ? "var(--text-1)" : undefined,
                    }}
                  >
                    {idea.text.length > 120 ? idea.text.slice(0, 120) + "…" : idea.text}
                  </button>

                  <div className="flex items-center gap-3 ml-4 flex-none pt-0.5">
                    <span className="text-[11px] text-neutral-500">{idea.createdOn}</span>
                    <button
                      onClick={() => setSelected(idea)}
                      title="View"
                      className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity text-neutral-500 hover:text-foreground bg-none border-none p-0.5"
                    >
                      <ArrowUpRight className="size-3.5" />
                    </button>
                    <button
                      onClick={() => deleteIdea(idea.id)}
                      title="Delete"
                      className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity text-neutral-500 hover:text-destructive bg-none border-none p-0.5"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Capture Box OR Selected Details */}
        <div className="lg:col-span-5 xl:col-span-4 w-full flex-shrink-0">
          {selected ? (
            /* Selected Idea Details Panel */
            <div className="bg-card border border-border rounded-md p-5 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[11px] text-primary font-semibold uppercase tracking-[0.08em]">
                  Idea Details
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelected(null)}
                    title="Write a new idea"
                    className="cursor-pointer flex items-center gap-1 text-[12px] bg-none border-none text-primary hover:underline font-sans"
                  >
                    <Plus className="size-3" /> New
                  </button>
                  <button
                    onClick={() => setSelected(null)}
                    className="cursor-pointer transition-colors duration-100 text-neutral-500 hover:text-foreground bg-none border-none p-0.5"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </div>

              <p className="text-[14px] text-foreground leading-[1.7] white-space-pre-wrap min-h-[120px] whitespace-pre-wrap">
                {selected.text}
              </p>

              <div className="border-t border-border mt-5 pt-3 flex justify-between items-center">
                <span className="text-[11px] text-neutral-500">
                  Captured {selected.createdOn}
                </span>
                <button
                  onClick={() => deleteIdea(selected.id)}
                  className="text-[12px] px-2.5 py-1 rounded-md border border-destructive/30 bg-transparent text-destructive cursor-pointer hover:bg-destructive/10 transition-colors font-sans"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            /* Input / Capture Form */
            <div className="bg-card border border-border rounded-md overflow-hidden focus-within:border-ring/30 transition-colors">
              <div className="px-4 pt-3.5">
                <p className="text-[11px] text-primary font-semibold uppercase tracking-[0.08em]">
                  Capture new idea
                </p>
              </div>
              <textarea
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    addIdea();
                  }
                }}
                placeholder="Write a thought... (Enter to save, Shift+Enter for newline)"
                rows={5}
                className="w-full bg-transparent border-none outline-none px-4 py-3 text-white/30 focus:text-white/80 text-[14px] leading-[1.6] resize-none font-sans"
              />
              <div className="flex items-center justify-between px-3 py-2 border-t border-border">
                <p className="text-[11px] text-neutral-500">
                  Enter to save · Shift+Enter for newline
                </p>
                <button
                  onClick={addIdea}
                  disabled={!draft.trim()}
                  className="text-[12px] px-3 py-1 rounded-md border-none font-medium font-sans cursor-pointer disabled:cursor-not-allowed bg-foreground text-background disabled:bg-secondary disabled:text-neutral-500"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
