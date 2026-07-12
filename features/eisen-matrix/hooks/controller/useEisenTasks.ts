import { useState } from "react";
import type { EisenTask, EisenProject } from "./useEisenProjects";

const STORAGE_KEY = "enso_eisen_projects";

export const useEisenTasks = (
  projects: EisenProject[],
  setProjects: React.Dispatch<React.SetStateAction<EisenProject[]>>,
  activeProjectId: string | null
) => {
  // Modal & Inputs
  const [createTaskModal, setCreateTaskModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskQuadrant, setNewTaskQuadrant] = useState<"Q1" | "Q2" | "Q3" | "Q4">("Q1");

  const saveProjectsFallback = (updated: EisenProject[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

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
        const response = await fetch("/api/eisen", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(targetProject),
        });
        if (!response.ok) {
          saveProjectsFallback(updated);
        }
      } catch {
        saveProjectsFallback(updated);
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
        const response = await fetch("/api/eisen", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(targetProject),
        });
        if (!response.ok) {
          saveProjectsFallback(updated);
        }
      } catch {
        saveProjectsFallback(updated);
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
        const response = await fetch("/api/eisen", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(targetProject),
        });
        if (!response.ok) {
          saveProjectsFallback(updated);
        }
      } catch {
        saveProjectsFallback(updated);
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
        const response = await fetch("/api/eisen", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(targetProject),
        });
        if (!response.ok) {
          saveProjectsFallback(updated);
        }
      } catch {
        saveProjectsFallback(updated);
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
