import { useState } from "react";
import { type EisenTask, type EisenProject } from "@/store/appStore";

export const useEisenTasks = (
  projects: EisenProject[],
  setProjects: (projects: EisenProject[]) => void,
  activeProjectId: string | null
) => {
  // Modal & Inputs
  const [createTaskModal, setCreateTaskModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskQuadrant, setNewTaskQuadrant] = useState<"Q1" | "Q2" | "Q3" | "Q4">("Q1");

  const handleAddTask = async () => {
    if (!newTaskTitle.trim() || !activeProjectId) return;
    const newTask: EisenTask = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      quadrant: newTaskQuadrant,
      completed: false,
      createdOn: new Date().toISOString().split("T")[0],
    };
    const updated = projects.map((p) =>
      p.id === activeProjectId ? { ...p, tasks: [...p.tasks, newTask] } : p
    );
    setProjects(updated);
    setNewTaskTitle("");
    setNewTaskQuadrant("Q1");
    setCreateTaskModal(false);

    const targetProject = updated.find((p) => p.id === activeProjectId);
    if (targetProject) {
      try {
        await fetch("/api/eisen", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(targetProject),
        });
      } catch (e) {
        console.error("Failed to save new task to database:", e);
      }
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!activeProjectId) return;
    const updated = projects.map((p) =>
      p.id === activeProjectId
        ? { ...p, tasks: p.tasks.filter((t) => t.id !== taskId) }
        : p
    );
    setProjects(updated);

    const targetProject = updated.find((p) => p.id === activeProjectId);
    if (targetProject) {
      try {
        await fetch("/api/eisen", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(targetProject),
        });
      } catch (e) {
        console.error("Failed to delete task from database:", e);
      }
    }
  };

  const handleToggleComplete = async (taskId: string) => {
    if (!activeProjectId) return;
    const updated = projects.map((p) =>
      p.id === activeProjectId
        ? { ...p, tasks: p.tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t)) }
        : p
    );
    setProjects(updated);

    const targetProject = updated.find((p) => p.id === activeProjectId);
    if (targetProject) {
      try {
        await fetch("/api/eisen", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(targetProject),
        });
      } catch (e) {
        console.error("Failed to toggle task complete state in database:", e);
      }
    }
  };

  const handleUpdateTask = async (taskId: string, updates: Partial<EisenTask>) => {
    if (!activeProjectId) return;
    const updated = projects.map((p) =>
      p.id === activeProjectId
        ? {
            ...p,
            tasks: p.tasks.map((t) => (t.id === taskId ? { ...t, ...updates } : t)),
          }
        : p
    );
    setProjects(updated);

    const targetProject = updated.find((p) => p.id === activeProjectId);
    if (targetProject) {
      try {
        await fetch("/api/eisen", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(targetProject),
        });
      } catch (e) {
        console.error("Failed to update task detail inside database:", e);
      }
    }
  };

  return {
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
  };
};
