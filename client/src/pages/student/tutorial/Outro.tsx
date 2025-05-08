import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

// Import the assets
import blueSanabel from "../../../assets/resources/سنبلة زرقاء.png";
import redSanabel from "../../../assets/resources/سنبلة حمراء.png";
import yellowSanabel from "../../../assets/resources/سنبلة صفراء.png";
import mixedSanabel from "../../../assets/resources/سنابل.png";

import sanabelType1Img from "../../../assets/sanabeltype/سنابل الإحسان في العلاقة مع الأسرة والمجتمع.png";
import sanabelType2Img from "../../../assets/sanabeltype/سنابل الإحسان في العلاقة مع النفس.png";
import sanabelType3Img from "../../../assets/sanabeltype/سنابل-الإحسان-في-العلاقة-مع-الأرض-والكون.png";
import sanabelType4Img from "../../../assets/sanabeltype/سنابل-الإحسان-في-العلاقة-مع-الله.png";

import waterImg from "../../../assets/resources/ماء.png";
import fertilizerImg from "../../../assets/resources/سماد.png";

import logo from "../../../assets/login/logo.png";

import splashgif from "../../../assets/splashscreen/Snabl-El-Ehsan Animation-Vertical.mp4";
import wonderlearnLogo from "../../../assets/WonderLearn.png";
import { useUserContext } from "../../../context/StudentUserProvider";

const StartJourney: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { user } = useUserContext();
  const backgroundAssets = [
    blueSanabel,
    redSanabel,
    yellowSanabel,
    mixedSanabel,
    sanabelType1Img,
    sanabelType2Img,
    sanabelType3Img,
    sanabelType4Img,
    waterImg,
    fertilizerImg,
  ];

  function navigateHome() {
    history.push("/student/home");
    if (user && user.email) {
      localStorage.setItem(`tutorialComplete-${user.email}`, "true");
    }

    // Set firstTimer to false
    localStorage.setItem("firstTimer", "false");
    localStorage.setItem("firstTimer", "false");
  }
  return (
    <motion.div
      className="flex flex-col items-center justify-center w-full h-full gap-4   bg-white dark:bg-[#121212]"
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
      <motion.div
        className="flex-center   flex-col items-center w-full  py-4 px-8 rounded-2xl shadow-lg
     transition-all bg-blueprimary "
      >
        <h1 className=" text-white text-xl font-bold " onClick={navigateHome}>
          {t("ابدأ رحلتك")}
        </h1>
      </motion.div>
    </motion.div>
  );
};

export default StartJourney;
