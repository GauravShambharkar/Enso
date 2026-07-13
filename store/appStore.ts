import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Idea {
  id: string;
  text: string;
  createdOn: string;
}

export interface IkigaiResult {
  ikigaiSummary: string;
  analysis: {
    passion: string;
    mission: string;
    vocation: string;
    profession: string;
  };
  actionableSteps: string[];
  potentialObstacles: string[];
}

export interface IkigaiProfile {
  id: string;
  title: string;
  inputs: {
    love: string;
    goodAt: string;
    worldNeeds: string;
    paidFor: string;
  };
  result: IkigaiResult;
  createdOn: string;
}

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

interface AppState {
  // Idea Vault
  ideas: Idea[];
  ideasLoaded: boolean;
  activeIdeaId: string | null;
  setIdeas: (ideas: Idea[]) => void;
  setActiveIdeaId: (id: string | null) => void;
  fetchIdeas: () => Promise<void>;

  // Ikigai
  ikigaiProfiles: IkigaiProfile[];
  ikigaiLoaded: boolean;
  setIkigaiProfiles: (profiles: IkigaiProfile[]) => void;
  fetchIkigaiProfiles: () => Promise<void>;

  // Eisen Matrix
  eisenProjects: EisenProject[];
  eisenLoaded: boolean;
  activeProjectId: string | null;
  activeTaskId: string | null;
  setEisenProjects: (projects: EisenProject[]) => void;
  setActiveProjectId: (id: string | null) => void;
  setActiveTaskId: (id: string | null) => void;
  fetchEisenProjects: () => Promise<void>;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Idea Vault
      ideas: [],
      ideasLoaded: false,
      activeIdeaId: null,
      setIdeas: (ideas) => set({ ideas, ideasLoaded: true }),
      setActiveIdeaId: (activeIdeaId) => set({ activeIdeaId }),
      fetchIdeas: async () => {
        try {
          const res = await fetch("/api/ideas");
          if (res.ok) {
            const data = await res.json();
            if (data.success && data.data) {
              set({ ideas: data.data, ideasLoaded: true });
              return;
            }
          }
        } catch (e) {
          console.error("Zustand store failed to fetch ideas:", e);
        }
      },

      // Ikigai
      ikigaiProfiles: [],
      ikigaiLoaded: false,
      setIkigaiProfiles: (ikigaiProfiles) => set({ ikigaiProfiles, ikigaiLoaded: true }),
      fetchIkigaiProfiles: async () => {
        try {
          const res = await fetch("/api/ikigai/profiles");
          if (res.ok) {
            const data = await res.json();
            if (data.success && data.data) {
              set({ ikigaiProfiles: data.data, ikigaiLoaded: true });
              return;
            }
          }
        } catch (e) {
          console.error("Zustand store failed to fetch Ikigai profiles:", e);
        }
      },

      // Eisen Matrix
      eisenProjects: [],
      eisenLoaded: false,
      activeProjectId: null,
      activeTaskId: null,
      setEisenProjects: (eisenProjects) => set({ eisenProjects, eisenLoaded: true }),
      setActiveProjectId: (activeProjectId) => set({ activeProjectId }),
      setActiveTaskId: (activeTaskId) => set({ activeTaskId }),
      fetchEisenProjects: async () => {
        try {
          const res = await fetch("/api/eisen");
          if (res.ok) {
            const data = await res.json();
            if (data.success && data.data) {
              set({ eisenProjects: data.data, eisenLoaded: true });
              return;
            }
          }
        } catch (e) {
          console.error("Zustand store failed to fetch Eisen projects:", e);
        }
      },
    }),
    {
      name: "enso_app_store", // unique key in localStorage
    }
  )
);