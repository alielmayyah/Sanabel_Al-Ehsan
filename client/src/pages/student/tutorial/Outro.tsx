import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../../../context/StudentUserProvider";

import splashgif from "../../../assets/splashscreen/Snabl-El-Ehsan Animation-Vertical.mp4";

const StartJourney: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { user } = useUserContext();

  // Fetch and parse avatarData from local storage
  const avatarDataString = localStorage.getItem("avatarData");
  const avatarData = avatarDataString ? JSON.parse(avatarDataString) : null;
  console.log(avatarData);

  const handleTutorial = async (token?: string) => {
    const authToken = token || localStorage.getItem("token");
    if (!authToken) return;

    try {
      if (!avatarData) {
        console.error("No avatar data found in local storage.");
        return;
      }

      const response = await axios.patch(
        "http://localhost:3000/students/update-profile-image",
        {
          profileImg: {
            avatarId: avatarData.avatarId,
            bgColor: avatarData.bgColor,
            bgPattern: avatarData.bgPattern,
            gender: avatarData.gender,
            hairColor: avatarData.hairColor,
            skinColor: avatarData.skinColor,
            tshirtColor: avatarData.tshirtColor,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        history.push("/student/home");

        if (user && user.email) {
          localStorage.setItem(`tutorialComplete-${user.email}`, "true");
        }

        localStorage.setItem("firstTimer", "false");
      }
    } catch (error) {
      console.error("Error updating profile image:", error);
    }
  };

  const navigateHome = () => {
    handleTutorial();
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center w-full h-full gap-4 bg-white dark:bg-[#121212]"
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
        aria-label="Intro animation"
      />
      <motion.div className="flex flex-col items-center w-full py-4 px-8 rounded-2xl shadow-lg transition-all bg-blueprimary">
        <h1
          className="text-white text-xl font-bold cursor-pointer"
          onClick={navigateHome}
        >
          {t("ابدأ رحلتك")}
        </h1>
      </motion.div>
    </motion.div>
  );
};

export default StartJourney;
