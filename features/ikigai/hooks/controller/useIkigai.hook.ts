import { useState, useEffect } from "react";
import { useAppStore, type IkigaiProfile, type IkigaiResult } from "@/store/appStore";

export const useIkigai = () => {
  const { ikigaiProfiles: profiles, setIkigaiProfiles: setProfiles, fetchIkigaiProfiles } = useAppStore();
  const [activeProfile, setActiveProfile] = useState<IkigaiProfile | null>(null);
  const [activeMode, setActiveMode] = useState<"view" | "create" | "loading">(
    profiles.length > 0 ? "view" : "create"
  );
  const [isLoading, setIsLoading] = useState(profiles.length === 0);

  // Input states for form creation
  const [inputs, setInputs] = useState({
    love: "",
    goodAt: "",
    worldNeeds: "",
    paidFor: ""
  });
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      if (profiles.length === 0) {
        setIsLoading(true);
      } else {
        if (!activeProfile && profiles.length > 0) {
          setActiveProfile(profiles[0]);
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
      setActiveProfile(null);
      setInputs({ love: "", goodAt: "", worldNeeds: "", paidFor: "" });
      setActiveMode("create");
    } else if (profiles.length > 0 && !activeProfile) {
      setActiveProfile(profiles[0]);
      setActiveMode("view");
    }
  }, [profiles, isLoading, activeProfile]);

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
      setInputs({ love: "", goodAt: "", worldNeeds: "", paidFor: "" });

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
