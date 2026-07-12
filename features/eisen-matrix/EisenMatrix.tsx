"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useQueryState } from "nuqs";
import {
  Plus,
  ArrowLeft,
  CheckCircle,
  Circle,
  Trash2,
  X,
  Calendar,
} from "lucide-react";
import { useEisenProjects } from "./hooks/controller/useEisenProjects";
import { useEisenTasks } from "./hooks/controller/useEisenTasks";
import type {
  EisenTask,
  EisenProject,
} from "./hooks/controller/useEisenProjects";
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
  // Sync activeProjectId and selectedTaskId to URL query parameters using nuqs
  const [activeProjectId, setActiveProjectId] = useQueryState("projectId", {
    defaultValue: "",
  });
  const [selectedTaskId, setSelectedTaskId] = useQueryState("taskId", {
    defaultValue: "",
  });

  const {
    projects,
    setProjects,
    isLoading,
    createProjectModal,
    setCreateProjectModal,
    newProjectName,
    setNewProjectName,
    newProjectPurpose,
    setNewProjectPurpose,
    handleCreateProject,
    handleDeleteProject,
  } = useEisenProjects();

  const {
    createTaskModal,
    setCreateTaskModal,
    newTaskTitle,
    setNewTaskTitle,
    newTaskQuadrant,
    setNewTaskQuadrant,
    handleAddTask,
    handleDeleteTask,
    handleToggleComplete,
    handleUpdateTask,
  } = useEisenTasks(projects, setProjects, activeProjectId);

  const activeProject = projects.find((p) => p.id === activeProjectId) || null;
  const selectedTask =
    activeProject?.tasks.find((t) => t.id === selectedTaskId) || null;

  const [editTitle, setEditTitle] = useState("");
  const [quadrantTab, setQuadrantTab] = useState<
    Record<Q, "active" | "completed">
  >({
    Q1: "active",
    Q2: "active",
    Q3: "active",
    Q4: "active",
  });

  useEffect(() => {
    if (selectedTask) {
      setEditTitle(selectedTask.title);
    }
  }, [selectedTask?.id]);

  const setSelectedTask = (task: EisenTask | null) => {
    setSelectedTaskId(task ? task.id : null);
  };

  const handleOpenProject = (id: string) => {
    setActiveProjectId(id);
    setSelectedTaskId(null);
  };

  const handleBackToList = () => {
    setActiveProjectId(null);
    setSelectedTaskId(null);
  };

  const qTasks = (q: Q) =>
    activeProject?.tasks.filter((t) => t.quadrant === q) ?? [];

  /* ── Skeleton Loading State ── */
  if (isLoading && !activeProject) {
    return (
      <div className="px-6 md:px-10 py-8 min-h-screen bg-background">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-8 animate-pulse">
          <div>
            <div className="h-8 bg-secondary rounded-sm w-44 mb-2" />
            <div className="h-4 bg-secondary rounded-sm w-72" />
          </div>
          <div className="h-8 bg-secondary rounded-sm w-28" />
        </div>
        {/* Rows Skeleton */}
        <div className="flex flex-col gap-3 border-t border-border/60 py-4 pr-2.5">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="flex items-center justify-between py-4 border-b border-border/40 animate-pulse"
            >
              <div className="h-4 bg-secondary rounded-sm w-1/3" />
              <div className="h-3 bg-secondary rounded-sm w-20" />
            </div>
          ))}
        </div>
      </div>
    );
  }

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
              Create a matrix to start organizing tasks by urgency and
              importance.
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
          <div className="border-t border-border w-200">
            {projects.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between group py-3.5 border-b border-border"
              >
                <div>
                  <p
                    onClick={() => handleOpenProject(p.id)}
                    className="text-[14px] text-foreground font-medium cursor-pointer"
                  >
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

      {/* 2×2 grid + panel wrapper */}
      <div className="flex flex-col md:flex-row gap-6 items-start w-full">
        {/* Matrix grid */}
        <div className="grid grid-cols-2 gap-px flex-1 bg-border border border-border rounded-md overflow-hidden">
          {(["Q1", "Q2", "Q3", "Q4"] as Q[]).map((q) => {
            const meta = Q_META[q];
            const tasks = qTasks(q);
            const activeTasks = tasks.filter((t) => !t.completed);
            const completedTasks = tasks.filter((t) => t.completed);
            const activeTab = quadrantTab[q];
            const displayedTasks =
              activeTab === "active" ? activeTasks : completedTasks;

            return (
              <div
                key={q}
                className="bg-background p-4 md:p-5 h-[255px] md:h-[295px] flex flex-col overflow-hidden"
              >
                {/* Quadrant header */}
                <div className="flex items-center justify-between mb-2 flex-shrink-0">
                  <div>
                    <p
                      className="text-[12px] font-semibold"
                      style={{ color: meta.accent }}
                    >
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

                {/* Sub-header Tabs (Active / Completed) */}
                <div className="flex gap-3 mb-2.5 border-b border-border/40 pb-1.5 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      setQuadrantTab((prev) => ({ ...prev, [q]: "active" }))
                    }
                    className={`text-[10px] bg-transparent border-none cursor-pointer p-0 font-sans font-medium transition-colors ${
                      activeTab === "active"
                        ? "text-foreground"
                        : "text-neutral-500 hover:text-muted-foreground"
                    }`}
                  >
                    Active ({activeTasks.length})
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setQuadrantTab((prev) => ({ ...prev, [q]: "completed" }))
                    }
                    className={`text-[10px] bg-transparent border-none cursor-pointer p-0 font-sans font-medium transition-colors ${
                      activeTab === "completed"
                        ? "text-foreground"
                        : "text-neutral-500 hover:text-muted-foreground"
                    }`}
                  >
                    Completed ({completedTasks.length})
                  </button>
                </div>

                {/* Task list with independent overflow scrollbar */}
                <div className="space-y-1.5 overflow-y-auto flex-1 pr-1.5 scrollbar-thin">
                  {displayedTasks.length === 0 ? (
                    <p className="text-[11px] text-neutral-500 italic font-light">
                      No {activeTab} tasks
                    </p>
                  ) : (
                    displayedTasks.map((t) => (
                      <div
                        key={t.id}
                        onClick={() =>
                          setSelectedTask(selectedTask?.id === t.id ? null : t)
                        }
                        className={`flex items-center gap-2 cursor-pointer group/task px-2 py-1.5 rounded-[5px] transition-colors ${
                          selectedTask?.id === t.id
                            ? "bg-secondary"
                            : "bg-transparent hover:bg-card"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleComplete(t.id);
                          }}
                          className={`bg-none border-none p-0 cursor-pointer transition-colors ${
                            t.completed
                              ? "text-success"
                              : "text-neutral-500 hover:text-foreground"
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
                            t.completed
                              ? "text-neutral-500 line-through"
                              : "text-muted-foreground"
                          }`}
                        >
                          {t.title}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Task detail panel wrapper */}
        <div className="w-full md:w-[300px] flex-shrink-0 min-h-[320px]">
          <AnimatePresence mode="wait">
            {selectedTask ? (
              <motion.div
                key={selectedTask.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.12 }}
                className="w-full bg-card border border-border rounded-md p-[18px] md:p-5 flex flex-col min-h-[320px] h-full"
              >
                {/* Panel Header */}
                <div className="flex items-start justify-between mb-3.5 flex-shrink-0">
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

                {/* Editable Title Input */}
                <label className="text-[10px] text-neutral-500 block mb-1.5 uppercase font-medium tracking-[0.04em] flex-shrink-0">
                  Task Title
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onBlur={() => {
                    if (editTitle.trim() && editTitle !== selectedTask.title) {
                      handleUpdateTask(selectedTask.id, {
                        title: editTitle.trim(),
                      });
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && editTitle.trim()) {
                      e.currentTarget.blur();
                    }
                  }}
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground text-[13px] outline-none mb-4 focus:border-ring/35 transition-colors font-sans flex-shrink-0"
                  placeholder="Enter task title..."
                />

                {/* Priority Quadrant Selector */}
                <div className="mb-4 flex-shrink-0">
                  <label className="text-[10px] text-neutral-500 block mb-1.5 uppercase font-medium tracking-[0.04em]">
                    Priority Quadrant
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {(["Q1", "Q2", "Q3", "Q4"] as Q[]).map((q) => {
                      const meta = Q_META[q];
                      const active = selectedTask.quadrant === q;
                      return (
                        <button
                          key={q}
                          type="button"
                          onClick={() =>
                            handleUpdateTask(selectedTask.id, { quadrant: q })
                          }
                          className={`py-1 px-1.5 rounded-[4px] text-[10px] cursor-pointer text-center transition-all border ${
                            active
                              ? ""
                              : "border-border bg-transparent text-neutral-500 hover:text-muted-foreground hover:bg-card"
                          }`}
                          style={{
                            borderColor: active
                              ? `${meta.accent}40`
                              : undefined,
                            backgroundColor: active
                              ? `${meta.accent}12`
                              : undefined,
                            color: active ? meta.accent : undefined,
                            fontWeight: active ? 500 : 400,
                          }}
                        >
                          {meta.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Task Metadata */}
                <div className="flex items-center gap-1.5 mb-5 text-neutral-500 text-[11px] flex-shrink-0">
                  <Calendar className="size-3" />
                  <span>Created {selectedTask.createdOn}</span>
                </div>

                {/* Actions Footer */}
                <div className="flex gap-2 mt-auto pt-2 flex-shrink-0">
                  <button
                    onClick={() => handleToggleComplete(selectedTask.id)}
                    className="flex items-center gap-1.5 flex-1 justify-center cursor-pointer text-[12px] px-3 py-1.5 rounded-md border border-border bg-transparent text-muted-foreground hover:text-foreground font-sans transition-colors"
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
                    className="cursor-pointer text-[12px] px-2.5 py-1.5 rounded-md border border-destructive/30 bg-transparent text-destructive hover:bg-destructive/10 transition-colors font-sans"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="w-full h-full border border-dashed border-border/40 rounded-md p-5 flex flex-col items-center justify-center text-center min-h-[320px]">
                <p className="text-[12px] font-sans text-neutral-500/70">
                  Select a task to view details and priority options.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
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
