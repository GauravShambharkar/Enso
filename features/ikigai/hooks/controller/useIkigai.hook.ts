import { useState, useEffect } from "react";

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

export const useIkigai = () => {
  const [profiles, setProfiles] = useState<IkigaiProfile[]>([]);
  const [activeProfile, setActiveProfile] = useState<IkigaiProfile | null>(null);
  const [activeMode, setActiveMode] = useState<"view" | "create" | "loading">("view");

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
    const saved = localStorage.getItem("enso_ikigai_profiles");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as IkigaiProfile[];
        setProfiles(parsed);
        if (parsed.length > 0) {
          setActiveProfile(parsed[0]);
          setInputs(parsed[0].inputs);
          setActiveMode("view");
        } else {
          loadDefaultMock();
        }
      } catch (e) {
        console.error("Failed to parse saved Ikigai profiles", e);
        loadDefaultMock();
      }
    } else {
      loadDefaultMock();
    }
  }, []);

  const loadDefaultMock = () => {
    setProfiles([defaultMockProfile]);
    setActiveProfile(defaultMockProfile);
    setInputs(defaultMockProfile.inputs);
    setActiveMode("view");
    localStorage.setItem("enso_ikigai_profiles", JSON.stringify([defaultMockProfile]));
  };

  const saveProfiles = (updated: IkigaiProfile[]) => {
    setProfiles(updated);
    localStorage.setItem("enso_ikigai_profiles", JSON.stringify(updated));
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

  const handleDeleteProfile = (id: string) => {
    const updated = profiles.filter(p => p.id !== id);
    saveProfiles(updated);
    if (activeProfile?.id === id) {
      if (updated.length > 0) {
        handleViewProfile(updated[0]);
      } else {
        handleDiscoverClick();
      }
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
      saveProfiles(updated);
      setActiveProfile(newProfile);
      setActiveMode("view");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
      setActiveMode("create");
    }
  };

  return {
    profiles,
    activeProfile,
    activeMode,
    inputs,
    error,
    handleInputChange,
    handleDiscoverClick,
    handleViewProfile,
    handleDeleteProfile,
    handleSubmit
  };
};

export default useIkigai;
