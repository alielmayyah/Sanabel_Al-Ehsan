import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../context/ThemeContext";
import { useUserContext } from "../../../context/StudentUserProvider";
import { treeStages } from "../../../data/Tree";

const Profile: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const history = useHistory();
  const { t } = useTranslation();
  const { user } = useUserContext();
  const currentStage = 50;
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (stage < currentStage) {
        setStage(stage + 1);
      } else {
        clearInterval(intervalId);
      }
    }, 100); // Adjust the interval for smoother animation

    return () => clearInterval(intervalId);
  }, [stage, currentStage]);

  return (
    <div className="flex flex-col justify-start items-center h-full w-full gap-2 overflow-y-auto">
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
        src={treeStages[stage]}
        alt="tree"
        className="w-4/6"
      />
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: currentStage * 0.1 + 0.5, duration: 0.5 }} // Delay the text animation until the tree animation finishes
        className="text-[#495638] text-2xl"
      >
        {1} {t("المرحلة")}
      </motion.h1>
    </div>
  );
};

export default Profile;
