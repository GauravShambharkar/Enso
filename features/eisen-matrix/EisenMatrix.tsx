"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Plus,
  ArrowLeft,
  CheckCircle,
  Circle,
  Trash2,
  X,
  Calendar,
} from "lucide-react";
import { useEisenMatrix } from "./hooks/controller/useEisenMatrix.hook";
import CreateProjectModal from "./components/modal/CreateProjectModal";
import CreateTaskModal from "./components/modal/CreateTaskModal";

/* ─── Quadrant config ───────────────────────────────── */
const Q_META = {
  Q1: { label: "Do First", sub: "Urgent · Important", accent: "#f87171" },
  Q2: { label: "Schedule", sub: "Important · Not Urgent", accent: "#60a5fa" },
  Q3: { label: "Delegate", sub: "Urgent · Not Important", accent: "#fbbf24" },
  Q4: {
    label: "Eliminate",
    sub: "Not Urgent · Not Important",
    accent: "#34d399",
  },
} as const;

type Q = keyof typeof Q_META;

/* ─── Main ──────────────────────────────────────────── */
export const EisenMatrix = () => {
  const {
    projects,
    activeProject,
    selectedTask,
    setSelectedTask,
    createProjectModal,
    setCreateProjectModal,
    createTaskModal,
    setCreateTaskModal,
    newProjectName,
    setNewProjectName,
    newProjectPurpose,
    setNewProjectPurpose,
    newTaskTitle,
    setNewTaskTitle,
    newTaskQuadrant,
    setNewTaskQuadrant,
    handleCreateProject,
    handleDeleteProject,
    handleOpenProject,
    handleBackToList,
    handleAddTask,
    handleDeleteTask,
    handleToggleComplete,
  } = useEisenMatrix();

  const qTasks = (q: Q) =>
    activeProject?.tasks.filter((t) => t.quadrant === q) ?? [];

  /* ── Project list ── */
  if (!activeProject) {
    return (
      <div className="px-6 md:px-10 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[28px] font-medium text-foreground tracking-[-0.02em]">
              Eisen Matrix
            </h1>
            <p className="text-[13px] text-neutral-500 mt-0.5">
              Prioritize by urgency and importance
            </p>
          </div>
          <button
            onClick={() => setCreateProjectModal(true)}
            className="flex items-center gap-2 cursor-pointer text-[13px] px-3.5 py-1.5 rounded-md border border-border bg-secondary text-foreground transition-colors hover:border-border-hover font-sans font-medium"
          >
            <Plus className="size-3.5" /> New matrix
          </button>
        </div>

        {/* Empty state */}
        {projects.length === 0 ? (
          <div className="flex flex-col items-start gap-3 pt-5">
            <p className="text-[14px] text-muted-foreground font-light">
              No matrices yet.
            </p>
            <p className="text-[13px] text-neutral-500 font-light">
              Create a matrix to start organizing tasks by urgency and importance.
            </p>
            <button
              onClick={() => setCreateProjectModal(true)}
              className="text-[12px] px-3 py-1.5 rounded-md border border-border bg-transparent text-muted-foreground hover:bg-secondary cursor-pointer transition-colors font-sans mt-1"
            >
              Create your first matrix
            </button>
          </div>
        ) : (
          /* Project rows */
          <div className="border-t border-border">
            {projects.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between group py-3.5 border-b border-border"
              >
                <div>
                  <p className="text-[14px] text-foreground font-medium">
                    {p.name}
                  </p>
                  {p.purpose && (
                    <p className="text-[12px] text-neutral-500 mt-0.5 font-light">
                      {p.purpose}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-neutral-500">
                    {p.tasks.length} task{p.tasks.length !== 1 ? "s" : ""}
                  </span>
                  <button
                    onClick={() => handleOpenProject(p.id)}
                    className="text-[12px] px-3 py-1 rounded-md border border-border bg-transparent text-muted-foreground hover:text-foreground cursor-pointer transition-colors font-sans"
                  >
                    Open
                  </button>
                  <button
                    onClick={() => handleDeleteProject(p.id)}
                    className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity text-neutral-500 hover:text-destructive bg-none border-none p-1"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {createProjectModal && (
          <CreateProjectModal
            onClose={() => setCreateProjectModal(false)}
            onSubmit={handleCreateProject}
            state={{
              name: newProjectName,
              setName: setNewProjectName,
              purpose: newProjectPurpose,
              setPurpose: setNewProjectPurpose,
            }}
          />
        )}
      </div>
    );
  }

  /* ── Project detail ── */
  return (
    <div className="px-6 md:px-10 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-7">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBackToList}
            className="cursor-pointer transition-colors duration-100 bg-none border-none p-0 text-neutral-500 hover:text-foreground"
            aria-label="Back to matrices"
          >
            <ArrowLeft className="size-4" />
          </button>
          <div>
            <h1 className="text-[22px] font-medium text-foreground tracking-[-0.015em]">
              {activeProject.name}
            </h1>
            {activeProject.purpose && (
              <p className="text-[12px] text-neutral-500 mt-0.5 font-light">
                {activeProject.purpose}
              </p>
            )}
          </div>
        </div>
        <button
          onClick={() => setCreateTaskModal(true)}
          className="flex items-center gap-2 cursor-pointer text-[13px] px-3.5 py-1.5 rounded-md border border-border bg-secondary text-foreground transition-colors hover:border-border-hover font-sans font-medium"
        >
          <Plus className="size-3.5" /> Add task
        </button>
      </div>

      {/* 2×2 grid + panel */}
      <div className="flex gap-6 items-start">
        {/* Matrix grid */}
        <div className="grid grid-cols-2 gap-px flex-1 bg-border border border-border rounded-md overflow-hidden">
          {(["Q1", "Q2", "Q3", "Q4"] as Q[]).map((q) => {
            const meta = Q_META[q];
            const tasks = qTasks(q);
            return (
              <div key={q} className="bg-background p-4 md:p-5 min-h-[200px]">
                {/* Quadrant header */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-[12px] font-semibold" style={{ color: meta.accent }}>
                      {meta.label}
                    </p>
                    <p className="text-[10px] text-neutral-500 mt-0.5 font-light">
                      {meta.sub}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setNewTaskQuadrant(q);
                      setCreateTaskModal(true);
                    }}
                    className="flex items-center gap-1 cursor-pointer transition-colors duration-100 bg-none border-none p-0 text-[11px] text-neutral-500 hover:text-foreground font-sans"
                  >
                    <Plus className="size-3" /> Add
                  </button>
                </div>

                {/* Task list */}
                {tasks.length === 0 ? (
                  <p className="text-[11px] text-neutral-500 italic font-light">
                    Empty
                  </p>
                ) : (
                  <div className="space-y-1.5">
                    {tasks.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => setSelectedTask(selectedTask?.id === t.id ? null : t)}
                        className={`flex items-center gap-2 cursor-pointer group/task px-2 py-1.5 rounded-[5px] transition-colors ${
                          selectedTask?.id === t.id ? "bg-secondary" : "bg-transparent hover:bg-card"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleComplete(t.id);
                          }}
                          className={`bg-none border-none p-0 cursor-pointer transition-colors ${
                            t.completed ? "text-success" : "text-neutral-500 hover:text-foreground"
                          }`}
                        >
                          {t.completed ? (
                            <CheckCircle className="size-3.5" />
                          ) : (
                            <Circle className="size-3.5" />
                          )}
                        </button>
                        <span
                          className={`text-[12px] font-sans flex-1 leading-[1.4] transition-colors ${
                            t.completed ? "text-neutral-500 line-through" : "text-muted-foreground"
                          }`}
                        >
                          {t.title}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Task detail panel */}
        <AnimatePresence>
          {selectedTask && (
            <motion.div
              key={selectedTask.id}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.12 }}
              className="w-[280px] bg-card border border-border rounded-md p-[18px] md:p-5 flex-shrink-0"
            >
              <div className="flex items-start justify-between mb-3.5">
                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.06em]"
                  style={{ color: Q_META[selectedTask.quadrant].accent }}
                >
                  {Q_META[selectedTask.quadrant].label}
                </span>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="cursor-pointer transition-colors duration-100 bg-none border-none p-0 text-neutral-500 hover:text-foreground"
                >
                  <X className="size-3.5" />
                </button>
              </div>

              <p className="text-[14px] text-foreground leading-[1.6] mb-4">
                {selectedTask.title}
              </p>

              <div className="flex items-center gap-1.5 mb-5 text-neutral-500 text-[11px]">
                <Calendar className="size-3" />
                {selectedTask.createdOn}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleComplete(selectedTask.id)}
                  className="flex items-center gap-1.5 flex-1 justify-center cursor-pointer text-[12px] px-3 py-1 rounded-md border border-border bg-transparent text-muted-foreground hover:text-foreground font-sans transition-colors"
                >
                  {selectedTask.completed ? (
                    <>
                      <Circle className="size-3" /> Mark active
                    </>
                  ) : (
                    <>
                      <CheckCircle className="size-3 text-success" /> Complete
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    handleDeleteTask(selectedTask.id);
                    setSelectedTask(null);
                  }}
                  className="cursor-pointer text-[12px] px-2.5 py-1 rounded-md border border-destructive/30 bg-transparent text-destructive hover:bg-destructive/10 transition-colors font-sans"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modals */}
      {createTaskModal && (
        <CreateTaskModal
          onClose={() => setCreateTaskModal(false)}
          onSubmit={handleAddTask}
          state={{
            title: newTaskTitle,
            setTitle: setNewTaskTitle,
            quadrant: newTaskQuadrant,
            setQuadrant: setNewTaskQuadrant,
          }}
        />
      )}
    </div>
  );
};

export default EisenMatrix;
