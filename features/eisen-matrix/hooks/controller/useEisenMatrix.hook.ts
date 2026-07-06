import { useState, useEffect } from "react";

export interface EisenTask {
  id: string;
  title: string;
  quadrant: "Q1" | "Q2" | "Q3" | "Q4"; // Q1: Do, Q2: Decide, Q3: Delegate, Q4: Eliminate
  completed: boolean;
  createdOn: string;
}

export const useEisenMatrix = () => {
  const [tasks, setTasks] = useState<EisenTask[]>([]);
  const [createModal, setCreateModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<EisenTask | null>(null);
  
  // Create task inputs
  const [newTitle, setNewTitle] = useState("");
  const [newQuadrant, setNewQuadrant] = useState<"Q1" | "Q2" | "Q3" | "Q4">("Q1");

  useEffect(() => {
    const saved = localStorage.getItem("enso_eisen_tasks");
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved tasks", e);
      }
    } else {
      // Default mock tasks
      const defaultTasks: EisenTask[] = [
        { id: "1", title: "Complete critical database migration script", quadrant: "Q1", completed: false, createdOn: "2026-07-06" },
        { id: "2", title: "Schedule monthly team retrospective session", quadrant: "Q2", completed: false, createdOn: "2026-07-06" },
        { id: "3", title: "Sort through spam emails and support tickets", quadrant: "Q3", completed: false, createdOn: "2026-07-06" },
        { id: "4", title: "Browse social media during work focus hours", quadrant: "Q4", completed: true, createdOn: "2026-07-06" }
      ];
      setTasks(defaultTasks);
      localStorage.setItem("enso_eisen_tasks", JSON.stringify(defaultTasks));
    }
  }, []);

  const saveTasks = (updated: EisenTask[]) => {
    setTasks(updated);
    localStorage.setItem("enso_eisen_tasks", JSON.stringify(updated));
  };

  const handleAddTask = () => {
    if (!newTitle.trim()) return;
    const newTask: EisenTask = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      quadrant: newQuadrant,
      completed: false,
      createdOn: new Date().toISOString().split("T")[0]
    };
    const updated = [...tasks, newTask];
    saveTasks(updated);
    setNewTitle("");
    setNewQuadrant("Q1");
    setCreateModal(false);
  };

  const handleDeleteTask = (id: string) => {
    const updated = tasks.filter(t => t.id !== id);
    saveTasks(updated);
    if (selectedTask?.id === id) {
      setViewModal(false);
      setSelectedTask(null);
    }
  };

  const handleToggleComplete = (id: string) => {
    const updated = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    saveTasks(updated);
  };

  const handleViewTask = (task: EisenTask) => {
    setSelectedTask(task);
    setViewModal(true);
  };

  return {
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
    handleViewTask
  };
};

export default useEisenMatrix;
