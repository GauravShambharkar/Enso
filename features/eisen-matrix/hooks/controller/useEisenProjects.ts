import { useState, useEffect } from "react";
import { useAppStore, type EisenProject } from "@/store/appStore";

export const useEisenProjects = () => {
  const { eisenProjects: projects, setEisenProjects: setProjects, fetchEisenProjects } = useAppStore();
  const [isLoading, setIsLoading] = useState(projects.length === 0);

  // Modal & Inputs
  const [createProjectModal, setCreateProjectModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectPurpose, setNewProjectPurpose] = useState("");

  useEffect(() => {
    async function loadData() {
      if (projects.length === 0) {
        setIsLoading(true);
      }
      try {
        await fetchEisenProjects();
      } catch (e) {
        console.error("Failed to fetch Eisen projects in background:", e);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [fetchEisenProjects, projects.length]);

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
      await fetch("/api/eisen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      });
    } catch (e) {
      console.error("Failed to save new project to database:", e);
    }
  };

  const handleDeleteProject = async (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);

    try {
      await fetch(`/api/eisen?id=${id}`, {
        method: "DELETE",
      });
    } catch (e) {
      console.error("Failed to delete project from database:", e);
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
