import { useState, useEffect } from "react";
import { useAppStore, type IkigaiProfile, type IkigaiResult } from "@/store/appStore";

export const useIkigai = () => {
  const { ikigaiProfiles: profiles, setIkigaiProfiles: setProfiles, fetchIkigaiProfiles } = useAppStore();
  const [activeProfile, setActiveProfile] = useState<IkigaiProfile | null>(null);
  const [activeMode, setActiveMode] = useState<"view" | "create" | "loading">("view");
  const [isLoading, setIsLoading] = useState(profiles.length === 0);

  // Input states for form creation
  const [inputs, setInputs] = useState({
    love: "",
    goodAt: "",
    worldNeeds: "",
    paidFor: ""
  });
  const [error, setError] = useState("");

  const defaultMockProfile: IkigaiProfile = {
    id: "1",
    title: "Creative Developer & Educator",
    inputs: {
      love: "Coding creative interfaces, exploring philosophy",
      goodAt: "Translating mockups to clean React code, writing modular hooks",
      worldNeeds: "Helping developers find clarity, building accessible tools",
      paidFor: "Full-stack software engineering, developer advocacy"
    },
    createdOn: "2026-07-06",
    result: {
      ikigaiSummary: "To empower human clarity by engineering accessible and beautifully designed web interfaces.",
      analysis: {
        passion: "Coding creative React hooks combines your love for technology with developer strength.",
        mission: "Building tools that reduce complexity solves a core challenge developers experience.",
        vocation: "Translating designs into accessible formats is a premium, monetizable skill.",
        profession: "Full-stack engineering represents highly sustainable career paths for your skillset."
      },
      actionableSteps: [
        "Contribute to open-source developer clarity repositories.",
        "Establish a clean React component library design pattern.",
        "Integrate AI assistants to facilitate user onboarding."
      ],
      potentialObstacles: [
        "Losing focus in multi-layered features overhead.",
        "Ignoring unit test assertions in favor of visuals."
      ]
    }
  };

  useEffect(() => {
    async function loadData() {
      if (profiles.length === 0) {
        setIsLoading(true);
      } else {
        if (!activeProfile && profiles.length > 0) {
          setActiveProfile(profiles[0]);
          setInputs(profiles[0].inputs);
          setActiveMode("view");
        }
        setIsLoading(false);
      }
      try {
        await fetchIkigaiProfiles();
      } catch (e) {
        console.error("Failed to fetch Ikigai profiles:", e);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [fetchIkigaiProfiles]);

  useEffect(() => {
    if (!isLoading && profiles.length === 0) {
      const defaultProfile = defaultMockProfile;
      setProfiles([defaultProfile]);
      setActiveProfile(defaultProfile);
      setInputs(defaultProfile.inputs);
      setActiveMode("view");
      fetch("/api/ikigai/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(defaultProfile),
      }).catch((err) => console.error("Failed to save default mock profile", err));
    } else if (profiles.length > 0 && !activeProfile) {
      setActiveProfile(profiles[0]);
      setInputs(profiles[0].inputs);
      setActiveMode("view");
    }
  }, [profiles, isLoading, activeProfile]);

  const loadDefaultMock = () => {
    setProfiles([defaultMockProfile]);
    setActiveProfile(defaultMockProfile);
    setInputs(defaultMockProfile.inputs);
    setActiveMode("view");
    localStorage.setItem("enso_ikigai_profiles", JSON.stringify([defaultMockProfile]));
  };

  const handleInputChange = (value: string, key: string) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const handleDiscoverClick = () => {
    setActiveProfile(null);
    setInputs({ love: "", goodAt: "", worldNeeds: "", paidFor: "" });
    setError("");
    setActiveMode("create");
  };

  const handleViewProfile = (profile: IkigaiProfile) => {
    setActiveProfile(profile);
    setInputs(profile.inputs);
    setActiveMode("view");
    setError("");
  };

  const handleDeleteProfile = async (id: string) => {
    const updated = profiles.filter(p => p.id !== id);
    setProfiles(updated);
    if (activeProfile?.id === id) {
      if (updated.length > 0) {
        handleViewProfile(updated[0]);
      } else {
        handleDiscoverClick();
      }
    }

    try {
      await fetch(`/api/ikigai/profiles?id=${id}`, {
        method: "DELETE",
      });
    } catch (e) {
      console.error("Failed to delete Ikigai profile from database:", e);
    }
  };

  const handleSubmit = async () => {
    if (!inputs.love.trim() || !inputs.goodAt.trim() || !inputs.worldNeeds.trim() || !inputs.paidFor.trim()) {
      setError("Please fill out all fields before generating.");
      return;
    }
    
    setActiveMode("loading");
    setError("");

    try {
      const response = await fetch("/api/ikigai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to generate Ikigai profile");
      }

      const resultData: IkigaiResult = await response.json();
      
      const newProfile: IkigaiProfile = {
        id: Date.now().toString(),
        title: resultData.ikigaiSummary.length > 40 ? resultData.ikigaiSummary.slice(0, 40) + "..." : resultData.ikigaiSummary,
        inputs: { ...inputs },
        result: resultData,
        createdOn: new Date().toISOString().split("T")[0]
      };

      const updated = [newProfile, ...profiles];
      setProfiles(updated);
      setActiveProfile(newProfile);
      setActiveMode("view");

      // Save to server
      try {
        await fetch("/api/ikigai/profiles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProfile),
        });
      } catch (e) {
        console.error("Failed to save new profile to database:", e);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
      setActiveMode("create");
    }
  };

  return {
    profiles,
    activeProfile,
    setActiveProfile,
    activeMode,
    setActiveMode,
    inputs,
    setInputs,
    error,
    isLoading,
    handleInputChange,
    handleDiscoverClick,
    handleViewProfile,
    handleDeleteProfile,
    handleSubmit
  };
};

export default useIkigai;
