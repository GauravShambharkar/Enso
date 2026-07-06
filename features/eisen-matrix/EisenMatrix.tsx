"use client";

import React from "react";
import { motion } from "framer-motion";
import { Plus, Eye, CheckCircle, Circle, ClipboardList } from "lucide-react";
import { useEisenMatrix } from "./hooks/controller/useEisenMatrix.hook";
import CreateTaskModal from "./components/modal/CreateTaskModal";
import ViewTaskModal from "./components/modal/ViewTaskModal";

const quadrantMeta = {
  Q1: {
    title: "Quadrant 1: Do First",
    headerBg: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    badge: "Do",
  },
  Q2: {
    title: "Quadrant 2: Schedule",
    headerBg: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    badge: "Schedule",
  },
  Q3: {
    title: "Quadrant 3: Delegate",
    headerBg: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    badge: "Delegate",
  },
  Q4: {
    title: "Quadrant 4: Eliminate",
    headerBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    badge: "Eliminate",
  },
};

export const EisenMatrix = () => {
  const {
    tasks,
    createModal,
    setCreateModal,
    viewModal,
    setViewModal,
    selectedTask,
    setSelectedTask,
    newTitle,
    setNewTitle,
    newQuadrant,
    setNewQuadrant,
    handleAddTask,
    handleDeleteTask,
    handleToggleComplete,
    handleViewTask,
  } = useEisenMatrix();

  // Filter tasks per quadrant
  const qTasks = (q: "Q1" | "Q2" | "Q3" | "Q4") =>
    tasks.filter((t) => t.quadrant === q);

  return (
    <div className="flex flex-col gap-6 relative min-h-screen pb-20 text-white">
      {/* Title Header matching Idea-Vault */}
      <div className="w-full">
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
          className="w-full text-white/70 text-sm mt-1"
        >
          dashboards
        </motion.div>
      </div>

      <div className="w-full space-y-6">
        {/* Create Button matching Idea-Vault */}
        <div className="flex justify-end">
          <button
            onClick={() => setCreateModal(true)}
            className="cursor-pointer hover:bg-white/10 transition-all ease-in-out duration-300 text-white flex items-center gap-2 border px-4 py-1.5 rounded-lg bg-black/50 border-white/30 shadow-sm shadow-white/30 text-sm font-light"
          >
            <Plus className="size-4" />
            Create Task
          </button>
        </div>

        {/* 2x2 Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(["Q1", "Q2", "Q3", "Q4"] as const).map((q) => {
            const meta = quadrantMeta[q];
            const list = qTasks(q);
            return (
              <div
                key={q}
                className="p-6 rounded-xl border border-white/10 bg-black/30 backdrop-blur-md flex flex-col min-h-[220px]"
              >
                <div
                  className={`flex justify-between items-center px-3.5 py-1.5 rounded-full border text-xs font-medium mb-4 ${meta.headerBg}`}
                >
                  <span>{meta.title}</span>
                  <span>{meta.badge}</span>
                </div>

                <div className="flex-1 overflow-y-auto max-h-28 space-y-2 pr-1 custom-scrollbar">
                  {list.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-xs text-white/30 font-light italic">
                      No tasks in this quadrant
                    </div>
                  ) : (
                    list.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => handleViewTask(t)}
                        className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-2 max-w-[80%]">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleComplete(t.id);
                            }}
                            className="text-white/40 hover:text-white transition-colors"
                          >
                            {t.completed ? (
                              <CheckCircle className="size-4 text-emerald-400" />
                            ) : (
                              <Circle className="size-4" />
                            )}
                          </button>
                          <span
                            className={`text-xs truncate font-light ${t.completed ? "line-through opacity-40" : ""}`}
                          >
                            {t.title}
                          </span>
                        </div>
                        <Eye className="size-3.5 text-white/0 group-hover:text-white/60 transition-opacity" />
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* All Tasks Table - Unified view matching Idea-Vault */}
        <div className="w-full space-y-4 pt-4">
          <div className="flex items-center gap-2 text-white/80">
            <ClipboardList className="size-5" />
            <h3 className="text-lg font-light">All Registered Tasks</h3>
          </div>

          <div className="w-full border border-white/20 bg-white/10 backdrop-blur-xl rounded-lg overflow-hidden max-h-80 overflow-y-auto">
            <table className="w-full table-fixed border-collapse text-white">
              <thead className="sticky top-0 left-0 right-0 z-10 bg-black text-sm">
                <tr>
                  <th className="border border-white/20 px-4 py-2.5 text-left font-thin w-[45%]">
                    Task
                  </th>
                  <th className="border border-white/20 px-4 py-2.5 text-left font-thin w-[20%]">
                    Quadrant
                  </th>
                  <th className="border border-white/20 px-4 py-2.5 text-left font-thin w-[15%]">
                    Status
                  </th>
                  <th className="border border-white/20 px-4 py-2.5 text-left font-thin w-[20%]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {tasks.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="border border-white/20 px-4 py-8 text-center text-white/50 font-light text-sm italic"
                    >
                      No tasks created yet.
                    </td>
                  </tr>
                ) : (
                  tasks.map((t) => (
                    <tr
                      key={t.id}
                      className="hover:bg-white/5 transition group text-sm"
                    >
                      <td className="border border-white/20 px-4 py-2">
                        <span
                          className={`truncate block max-w-full font-light ${t.completed ? "line-through opacity-40" : ""}`}
                        >
                          {t.title}
                        </span>
                      </td>
                      <td className="border border-white/20 px-4 py-2">
                        <span className="text-white/70 font-light">
                          {quadrantMeta[t.quadrant].badge}
                        </span>
                      </td>
                      <td className="border border-white/20 px-4 py-2">
                        <span
                          className={`text-xs font-light px-2.5 py-0.5 rounded-full ${t.completed ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-white/5 text-white/50 border border-white/10"}`}
                        >
                          {t.completed ? "Completed" : "Active"}
                        </span>
                      </td>
                      <td className="border border-white/20 px-4 py-2">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewTask(t)}
                            className="inline-flex cursor-pointer hover:bg-white/10 transition-all duration-300 text-xs text-white items-center gap-1.5 border px-3 py-1 rounded-md bg-black/50 border-white/30"
                          >
                            <Eye className="size-3" />
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modals */}
      {createModal && (
        <CreateTaskModal
          onClose={() => setCreateModal(false)}
          onSubmit={handleAddTask}
          state={{
            title: newTitle,
            setTitle: setNewTitle,
            quadrant: newQuadrant,
            setQuadrant: setNewQuadrant,
          }}
        />
      )}

      {viewModal && selectedTask && (
        <ViewTaskModal
          task={selectedTask}
          onClose={() => {
            setViewModal(false);
            setSelectedTask(null);
          }}
          onDelete={handleDeleteTask}
          onToggle={handleToggleComplete}
        />
      )}
    </div>
  );
};

export default EisenMatrix;
