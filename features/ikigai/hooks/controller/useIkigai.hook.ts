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
  const [selectedProfile, setSelectedProfile] = useState<IkigaiProfile | null>(null);
  
  // Modals state
  const [createModal, setCreateModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);

  // Wizard state
  const [currentStep, setCurrentStep] = useState(0); // 0: Love, 1: Good At, 2: World Needs, 3: Paid For, 4: Loading
  const [inputs, setInputs] = useState({
    love: "",
    goodAt: "",
    worldNeeds: "",
    paidFor: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("enso_ikigai_profiles");
    if (saved) {
      try {
        setProfiles(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved Ikigai profiles", e);
      }
    } else {
      // Default placeholder profile
      const defaultProfile: IkigaiProfile = {
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
      setProfiles([defaultProfile]);
      localStorage.setItem("enso_ikigai_profiles", JSON.stringify([defaultProfile]));
    }
  }, []);

  const saveProfiles = (updated: IkigaiProfile[]) => {
    setProfiles(updated);
    localStorage.setItem("enso_ikigai_profiles", JSON.stringify(updated));
  };

  const handleInputChange = (value: string, key: string) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleResetWizard = () => {
    setInputs({ love: "", goodAt: "", worldNeeds: "", paidFor: "" });
    setCurrentStep(0);
    setError("");
    setCreateModal(false);
  };

  const handleDeleteProfile = (id: string) => {
    const updated = profiles.filter(p => p.id !== id);
    saveProfiles(updated);
    if (selectedProfile?.id === id) {
      setViewModal(false);
      setSelectedProfile(null);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setCurrentStep(4); // Loading state

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
        title: resultData.ikigaiSummary.slice(0, 40) + "...",
        inputs: { ...inputs },
        result: resultData,
        createdOn: new Date().toISOString().split("T")[0]
      };

      const updated = [newProfile, ...profiles];
      saveProfiles(updated);
      setSelectedProfile(newProfile);
      setViewModal(true); // Open the view modal immediately to show results!
      handleResetWizard();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
      setCurrentStep(3); // Fallback to last question step
    } finally {
      setLoading(false);
    }
  };

  const handleViewProfile = (profile: IkigaiProfile) => {
    setSelectedProfile(profile);
    setViewModal(true);
  };

  return {
    profiles,
    selectedProfile,
    setSelectedProfile,
    createModal,
    setCreateModal,
    viewModal,
    setViewModal,
    currentStep,
    inputs,
    loading,
    error,
    handleInputChange,
    handleNext,
    handleBack,
    handleResetWizard,
    handleDeleteProfile,
    handleViewProfile
  };
};

export default useIkigai;
