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

export const useEisenProjects = () => {
  const [projects, setProjects] = useState<EisenProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal & Inputs
  const [createProjectModal, setCreateProjectModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectPurpose, setNewProjectPurpose] = useState("");

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const response = await fetch("/api/eisen");
        if (response.ok) {
          const res = await response.json();
          if (res.success && res.data) {
            setProjects(res.data as EisenProject[]);
          } else {
            loadFromLocalStorage();
          }
        } else {
          loadFromLocalStorage();
        }
      } catch {
        loadFromLocalStorage();
      } finally {
        setIsLoading(false);
      }
    }

    function loadFromLocalStorage() {
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
    }

    loadData();
  }, []);

  const saveProjectsFallback = (updated: EisenProject[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handleCreateProject = async () => {
    if (!newProjectName.trim()) return;
    const newProject: EisenProject = {
      id: Date.now().toString(),
      name: newProjectName.trim(),
      purpose: newProjectPurpose.trim(),
      tasks: [],
      createdOn: new Date().toISOString().split("T")[0],
    };
    const updated = [...projects, newProject];
    setProjects(updated);
    setNewProjectName("");
    setNewProjectPurpose("");
    setCreateProjectModal(false);

    try {
      const response = await fetch("/api/eisen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      });
      if (!response.ok) {
        saveProjectsFallback(updated);
      }
    } catch {
      saveProjectsFallback(updated);
    }
  };

  const handleDeleteProject = async (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);

    try {
      const response = await fetch(`/api/eisen?id=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        saveProjectsFallback(updated);
      }
    } catch {
      saveProjectsFallback(updated);
    }
  };

  return {
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
  };
};
