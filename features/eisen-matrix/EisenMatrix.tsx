"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Eye,
  CheckCircle,
  Circle,
  Trash2,
  Calendar,
  Tag,
  ArrowLeft,
  FolderOpen,
} from "lucide-react";
import { useEisenMatrix } from "./hooks/controller/useEisenMatrix.hook";
import CreateProjectModal from "./components/modal/CreateProjectModal";
import CreateTaskModal from "./components/modal/CreateTaskModal";

const quadrantMeta = {
  Q1: {
    title: "Do First",
    label: "Urgent & Important",
    headerColor: "text-rose-300",
    accent: "text-rose-300",
  },
  Q2: {
    title: "Schedule",
    label: "Important, Not Urgent",
    headerColor: "text-blue-300",
    accent: "text-blue-300",
  },
  Q3: {
    title: "Delegate",
    label: "Urgent, Not Important",
    headerColor: "text-amber-300",
    accent: "text-amber-300",
  },
  Q4: {
    title: "Eliminate",
    label: "Not Urgent, Not Important",
    headerColor: "text-emerald-300",
    accent: "text-emerald-300",
  },
};

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

  const qTasks = (q: "Q1" | "Q2" | "Q3" | "Q4") =>
    activeProject?.tasks.filter((t) => t.quadrant === q) || [];

  // ─── PROJECT LIST VIEW ───
  if (!activeProject) {
    return (
      <div className="flex flex-col gap-6 relative min-h-screen pb-20 text-white">
        {/* Header */}
        <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-medium text-white"
            >
              Eisen-Matrix
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-white/70 text-sm mt-1"
            >
              your priority matrices
            </motion.div>
          </div>

          <button
            onClick={() => setCreateProjectModal(true)}
            className="cursor-pointer hover:bg-white/10 transition-all ease-in-out duration-300 text-white flex items-center gap-2 border px-4 py-1.5 rounded-lg bg-black/50 border-white/30 shadow-sm shadow-white/30 text-sm font-light self-start md:self-auto"
          >
            <Plus className="size-4" />
            Create Matrix
          </button>
        </div>

        {/* Projects Table */}
        <div className="w-full border border-white/20 bg-white/10 backdrop-blur-xl rounded-lg overflow-hidden max-h-[70vh] overflow-y-auto">
          <table className="w-full table-fixed border-collapse text-white">
            <thead className="sticky top-0 left-0 right-0 z-10 bg-black text-sm">
              <tr>
                <th className="border border-white/20 px-4 py-2.5 text-left font-thin w-[35%]">Matrix</th>
                <th className="border border-white/20 px-4 py-2.5 text-left font-thin w-[35%]">Purpose</th>
                <th className="border border-white/20 px-4 py-2.5 text-left font-thin w-[10%]">Tasks</th>
                <th className="border border-white/20 px-4 py-2.5 text-left font-thin w-[20%]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="border border-white/20 px-4 py-8 text-center text-white/50 font-light text-sm italic"
                  >
                    No matrices created yet.
                  </td>
                </tr>
              ) : (
                projects.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-white/5 transition group text-sm"
                  >
                    <td className="border border-white/20 px-4 py-2">
                      <span className="truncate block max-w-full font-light">{p.name}</span>
                    </td>
                    <td className="border border-white/20 px-4 py-2">
                      <span className="text-white/60 font-light truncate block">{p.purpose || "—"}</span>
                    </td>
                    <td className="border border-white/20 px-4 py-2">
                      <span className="text-white/70 font-light">{p.tasks.length}</span>
                    </td>
                    <td className="border border-white/20 px-4 py-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOpenProject(p.id)}
                          className="inline-flex cursor-pointer hover:bg-white/10 transition-all duration-300 text-xs text-white items-center gap-1.5 border px-3 py-1 rounded-md bg-black/50 border-white/30"
                        >
                          <FolderOpen className="size-3" />
                          Open
                        </button>
                        <button
                          onClick={() => handleDeleteProject(p.id)}
                          className="inline-flex cursor-pointer hover:bg-rose-500/15 transition-all duration-300 text-xs text-rose-300 items-center gap-1.5 border px-3 py-1 rounded-md bg-black/50 border-rose-500/20"
                        >
                          <Trash2 className="size-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Create Project Modal */}
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

  // ─── PROJECT DETAIL VIEW (2x2 Grid + Preview) ───
  return (
    <div className="flex flex-col gap-6 relative min-h-screen pb-20 text-white">
      {/* Header with back button */}
      <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBackToList}
            className="cursor-pointer text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft className="size-5" />
          </button>
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-medium text-white"
            >
              {activeProject.name}
            </motion.h1>
            {activeProject.purpose && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="text-white/50 text-xs mt-1 font-light"
              >
                {activeProject.purpose}
              </motion.div>
            )}
          </div>
        </div>

        <button
          onClick={() => setCreateTaskModal(true)}
          className="cursor-pointer hover:bg-white/10 transition-all ease-in-out duration-300 text-white flex items-center gap-2 border px-4 py-1.5 rounded-lg bg-black/50 border-white/30 shadow-sm shadow-white/30 text-sm font-light self-start md:self-auto"
        >
          <Plus className="size-4" />
          Add Task
        </button>
      </div>

      {/* Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">
        {/* Left: 2x2 Matrix */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
          {(["Q1", "Q2", "Q3", "Q4"] as const).map((q) => {
            const meta = quadrantMeta[q];
            const list = qTasks(q);
            return (
              <div
                key={q}
                className="p-5 rounded-xl border border-white/10 bg-black/30 backdrop-blur-md flex flex-col min-h-[200px]"
              >
                <div className={`flex justify-between items-center mb-3 ${meta.headerColor}`}>
                  <span className="text-sm font-medium">{meta.title}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs opacity-50">{list.length}</span>
                    <button
                      onClick={() => {
                        setNewTaskQuadrant(q);
                        setCreateTaskModal(true);
                      }}
                      className="cursor-pointer opacity-40 hover:opacity-100 transition-opacity"
                      title={`Add task to ${meta.title}`}
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto max-h-32 space-y-1.5 pr-1 custom-scrollbar">
                  {list.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-[11px] text-white/30 font-light italic">
                      No tasks
                    </div>
                  ) : (
                    list.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => setSelectedTask(t)}
                        className={`flex items-center p-2.5 rounded-lg border transition-all cursor-pointer ${
                          selectedTask?.id === t.id
                            ? "bg-white/10 border-white/20"
                            : "bg-white/5 border-white/5 hover:border-white/15 hover:bg-white/8"
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleComplete(t.id);
                            }}
                            className="flex-none text-white/40 hover:text-white transition-colors cursor-pointer"
                          >
                            {t.completed ? (
                              <CheckCircle className="size-3.5 text-emerald-400" />
                            ) : (
                              <Circle className="size-3.5" />
                            )}
                          </button>
                          <span
                            className={`text-xs truncate font-light ${t.completed ? "line-through opacity-40" : ""}`}
                          >
                            {t.title}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Task Preview Panel */}
        <div className="lg:col-span-5 w-full">
          <AnimatePresence mode="wait">
            {selectedTask ? (
              <motion.div
                key={selectedTask.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 rounded-xl border border-white/10 bg-black/30 backdrop-blur-md space-y-5 sticky top-6"
              >
                <div className="border-b border-white/5 pb-4 space-y-2">
                  <div
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-white/10 text-[10px] font-medium ${quadrantMeta[selectedTask.quadrant].headerColor}`}
                  >
                    <Tag className="size-3" />
                    {quadrantMeta[selectedTask.quadrant].title}
                  </div>
                  <h3 className="text-lg font-light text-white leading-relaxed">
                    {selectedTask.title}
                  </h3>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[11px] text-white/60">
                    <Calendar className="size-3.5 flex-none" />
                    <span className="font-light">Created on {selectedTask.createdOn}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px]">
                    {selectedTask.completed ? (
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/20 font-light">
                        <CheckCircle className="size-3" />
                        Completed
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 text-white/60 border border-white/10 font-light">
                        <Circle className="size-3" />
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-white/40 font-light leading-relaxed">
                    {quadrantMeta[selectedTask.quadrant].label}
                  </p>
                </div>

                <div className="flex gap-3 pt-3 border-t border-white/5">
                  <button
                    onClick={() => handleToggleComplete(selectedTask.id)}
                    className="cursor-pointer flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-light transition-all"
                  >
                    {selectedTask.completed ? (
                      <>
                        <Circle className="size-3" /> Mark Active
                      </>
                    ) : (
                      <>
                        <CheckCircle className="size-3 text-emerald-400" /> Complete
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      handleDeleteTask(selectedTask.id);
                      setSelectedTask(null);
                    }}
                    className="cursor-pointer flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/15 text-rose-300 text-xs font-light transition-all"
                  >
                    <Trash2 className="size-3" />
                    Delete
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6 rounded-xl border border-white/10 bg-black/30 backdrop-blur-md flex flex-col items-center justify-center min-h-[280px] text-center sticky top-6"
              >
                <Eye className="size-8 text-white/15 mb-3" />
                <h4 className="text-sm font-light text-white/50">No task selected</h4>
                <p className="text-[11px] text-white/30 font-light mt-1 max-w-[200px]">
                  Click any task in the matrix to inspect its details here.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Create Task Modal */}
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
