import { useState } from "react";

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

export const useIkigai = () => {
  const [currentStep, setCurrentStep] = useState(-1); // -1 is Welcome Screen
  const [inputs, setInputs] = useState({
    love: "",
    goodAt: "",
    worldNeeds: "",
    paidFor: ""
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IkigaiResult | null>(null);
  const [error, setError] = useState("");
  const [activeIntersection, setActiveIntersection] = useState<string>("ikigai");

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
    if (currentStep > -1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setInputs({ love: "", goodAt: "", worldNeeds: "", paidFor: "" });
    setResult(null);
    setCurrentStep(-1);
    setError("");
    setActiveIntersection("ikigai");
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

      const data = await response.json();
      setResult(data);
      setCurrentStep(5); // Result state
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
      setCurrentStep(3); // Fallback to last question step
    } finally {
      setLoading(false);
    }
  };

  return {
    currentStep,
    setCurrentStep,
    inputs,
    loading,
    result,
    error,
    activeIntersection,
    setActiveIntersection,
    handleInputChange,
    handleNext,
    handleBack,
    handleReset,
    handleSubmit
  };
};
export default useIkigai;
