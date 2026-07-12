"use client";

import React from "react";
import { X, Trash2, CheckCircle, Circle } from "lucide-react";
import { EisenTask } from "../../hooks/controller/useEisenProjects";

interface ViewTaskProps {
  task: EisenTask | null;
  onClose: () => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

const quadrantDetails = {
  Q1: { name: "Quadrant 1: Do First", desc: "Urgent & Important tasks that require immediate action.", color: "text-rose-400 border-rose-500/30 bg-rose-500/5" },
  Q2: { name: "Quadrant 2: Schedule", desc: "Important but Not Urgent tasks. Plan time to execute them.", color: "text-blue-400 border-blue-500/30 bg-blue-500/5" },
  Q3: { name: "Quadrant 3: Delegate", desc: "Urgent but Not Important tasks. Assign to others if possible.", color: "text-amber-400 border-amber-500/30 bg-amber-500/5" },
  Q4: { name: "Quadrant 4: Eliminate", desc: "Not Urgent & Not Important tasks. Remove from your lists.", color: "text-[#a3a3a3] border-white/10 bg-white/5" }
};

export const ViewTaskModal = ({ task, onClose, onDelete, onToggle }: ViewTaskProps) => {
  if (!task) return null;
  const details = quadrantDetails[task.quadrant];

  return (
    <div className="w-full h-full fixed inset-0 flex justify-center items-center bg-black/60 z-50 backdrop-blur-xs">
      <div className="p-8 rounded-xl border border-white/20 w-120 bg-black/80 backdrop-blur-xl relative">
        <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white transition-all">
          <X className="size-5" />
        </button>

        <div className="space-y-6">
          <div className="space-y-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-light border ${details.color}`}>
              {details.name}
            </span>
            <h2 className={`text-2xl text-white tracking-tight leading-snug font-light ${task.completed ? "line-through opacity-50" : ""}`}>
              {task.title}
            </h2>
          </div>

          <div className="text-sm text-white/60 font-light leading-relaxed border-t border-b border-white/5 py-4">
            <p className="mb-2"><span className="font-medium text-white/80">Strategy:</span> {details.desc}</p>
            <p><span className="font-medium text-white/80">Created On:</span> {task.createdOn}</p>
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => onDelete(task.id)}
              className="flex items-center gap-2 px-5 h-12 rounded-full border border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/40 transition-all text-sm cursor-pointer"
            >
              <Trash2 className="size-4" />
              Delete Task
            </button>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-6 h-12 rounded-full border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all text-sm"
              >
                Close
              </button>
              
              <button
                onClick={() => {
                  onToggle(task.id);
                  onClose();
                }}
                className={`flex items-center gap-2 px-6 h-12 rounded-full font-medium text-sm transition-all cursor-pointer ${
                  task.completed 
                  ? "bg-white/10 text-white hover:bg-white/20 border border-white/15" 
                  : "bg-white text-black hover:bg-white/90"
                }`}
              >
                {task.completed ? (
                  <>
                    <Circle className="size-4" />
                    Mark Incomplete
                  </>
                ) : (
                  <>
                    <CheckCircle className="size-4" />
                    Complete Task
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTaskModal;
