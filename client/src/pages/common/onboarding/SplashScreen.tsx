import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

import splashgif from "../../../assets/splashscreen/Snabl-El-Ehsan Animation-Vertical.mp4";
import wonderlearnLogo from "../../../assets/WonderLearn.png";

const SplashScreen: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited") === "true";
    const keepLoggedIn = localStorage.getItem("keepLoggedIn") === "true";
    const role = localStorage.getItem("role");
    const firstTimer = localStorage.getItem("firstTimer");

    const timer = setTimeout(() => {
      if (keepLoggedIn) {
        // Logged-in user redirects to home based on role
        if (role === "Student") {
          // Check if this is their first time (they need to see tutorial)
          if (firstTimer === "true") {
            history.replace("/student/tutorial");
          } else {
            // This is a returning user, send directly to home
            history.replace("/student/home");
          }
        } else if (role === "Teacher") {
          history.replace("/teacher/home");
        } else if (role === "Parent") {
          history.replace("/parent/home");
        }
      } else if (!hasVisited) {
        // First-time visitor to app redirects to onboarding
        localStorage.setItem("hasVisited", "true");
        history.replace("/onboarding");
      } else {
        // Returning visitor (but not logged in) redirects to choose sign method
        history.replace("/choosesignmethod");
      }
    }, 4000); // 4-second delay for splash screen

    return () => clearTimeout(timer);
  }, [history]);

  return (
    <motion.div
      className="flex flex-col items-center justify-center w-screen h-5/6 bg-white dark:bg-[#121212]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <video
        src={splashgif}
        className="object-fill"
        autoPlay
        loop
        muted
        preload="auto"
      />
      <motion.h1
        className="text-2xl text-[#5e5e5e] font-bold"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        Powered By
      </motion.h1>
      <motion.img
        src={wonderlearnLogo}
        alt=""
        className="w-2/3"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      />
    </motion.div>
  );
};

export default SplashScreen;
