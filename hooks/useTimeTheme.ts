import { useState, useEffect } from "react";

export const useTimeTheme = () => {
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const hour = new Date().getHours();
      // Night is from 6:00 PM (18:00) to 6:00 AM (06:00)
      setIsNight(hour >= 18 || hour < 6);
    };

    checkTime();

    // Check every minute
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return {
    isNight,
    theme: isNight ? "dark" : "light",
  };
};
