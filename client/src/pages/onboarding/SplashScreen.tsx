// SplashScreen component (update navigation based on hasVisited status)
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import logo from "../../assets/boarding/Asset 4.jpg"; // Adjust the path as needed

const SplashScreen: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited") === "true";

    const timer = setTimeout(() => {
      if (!hasVisited) {
        // First time users are taken to onboarding after the splash screen
        history.replace("/onboarding");
      } else {
        // Users who have visited before go directly to the ChooseSignMethod
        history.replace("/choosesignmethod");
      }
    }, 5000); // 5-second delay

    return () => clearTimeout(timer);
  }, [history]);

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-white dark:bg-[#121212]">
      <img src={logo} alt="App Logo" className="w-1/2 h-auto" />
    </div>
  );
};

export default SplashScreen;
