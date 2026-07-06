import { useState, useEffect } from "react";

export interface EisenTask {
  id: string;
  title: string;
  quadrant: "Q1" | "Q2" | "Q3" | "Q4";
  completed: boolean;
  createdOn: string;
}

export interface EisenProject {
  id: string;
  name: string;
  purpose: string;
  tasks: EisenTask[];
  createdOn: string;
}

const STORAGE_KEY = "enso_eisen_projects";

export const useEisenMatrix = () => {
  const [projects, setProjects] = useState<EisenProject[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<EisenTask | null>(null);

  // Modals
  const [createProjectModal, setCreateProjectModal] = useState(false);
  const [createTaskModal, setCreateTaskModal] = useState(false);

  // Create project inputs
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectPurpose, setNewProjectPurpose] = useState("");

  // Create task inputs
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskQuadrant, setNewTaskQuadrant] = useState<"Q1" | "Q2" | "Q3" | "Q4">("Q1");

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setProjects(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved projects", e);
      }
    } else {
      setProjects([]);
    }
  }, []);

  const saveProjects = (updated: EisenProject[]) => {
    setProjects(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  // Active project helper
  const activeProject = projects.find((p) => p.id === activeProjectId) || null;

  // --- Project actions ---
  const handleCreateProject = () => {
    if (!newProjectName.trim()) return;
    const newProject: EisenProject = {
      id: Date.now().toString(),
      name: newProjectName.trim(),
      purpose: newProjectPurpose.trim(),
      tasks: [],
      createdOn: new Date().toISOString().split("T")[0],
    };
    saveProjects([...projects, newProject]);
    setNewProjectName("");
    setNewProjectPurpose("");
    setCreateProjectModal(false);
  };

  const handleDeleteProject = (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    saveProjects(updated);
    if (activeProjectId === id) {
      setActiveProjectId(null);
      setSelectedTask(null);
    }
  };

  const handleOpenProject = (id: string) => {
    setActiveProjectId(id);
    setSelectedTask(null);
  };

  const handleBackToList = () => {
    setActiveProjectId(null);
    setSelectedTask(null);
  };

  // --- Task actions (scoped to active project) ---
  const handleAddTask = () => {
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
    saveProjects(updated);
    setNewTaskTitle("");
    setNewTaskQuadrant("Q1");
    setCreateTaskModal(false);
  };

  const handleDeleteTask = (taskId: string) => {
    if (!activeProjectId) return;
    const updated = projects.map((p) =>
      p.id === activeProjectId
        ? { ...p, tasks: p.tasks.filter((t) => t.id !== taskId) }
        : p
    );
    saveProjects(updated);
    if (selectedTask?.id === taskId) {
      setSelectedTask(null);
    }
  };

  const handleToggleComplete = (taskId: string) => {
    if (!activeProjectId) return;
    const updated = projects.map((p) =>
      p.id === activeProjectId
        ? { ...p, tasks: p.tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t)) }
        : p
    );
    saveProjects(updated);
    if (selectedTask?.id === taskId) {
      setSelectedTask({ ...selectedTask, completed: !selectedTask.completed });
    }
  };

  return {
    // Project state
    projects,
    activeProject,
    activeProjectId,

    // Task state
    selectedTask,
    setSelectedTask,

    // Modal state
    createProjectModal,
    setCreateProjectModal,
    createTaskModal,
    setCreateTaskModal,

    // Create project inputs
    newProjectName,
    setNewProjectName,
    newProjectPurpose,
    setNewProjectPurpose,

    // Create task inputs
    newTaskTitle,
    setNewTaskTitle,
    newTaskQuadrant,
    setNewTaskQuadrant,

    // Actions
    handleCreateProject,
    handleDeleteProject,
    handleOpenProject,
    handleBackToList,
    handleAddTask,
    handleDeleteTask,
    handleToggleComplete,
  };
};

export default useEisenMatrix;
