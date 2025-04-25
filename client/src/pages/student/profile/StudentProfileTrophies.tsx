import { motion } from "framer-motion";
import StudentNavbar from "../../../components/navbar/StudentNavbar";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../context/ThemeContext";
import { useUserContext } from "../../../context/StudentUserProvider";
import trophies from "../../../data/TrophiesData";
import { useEffect, useState } from "react";
import axios from "axios";
import { OtherTrophies } from "../../../data/OtherTrophies";

const Profile: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const history = useHistory();
  const { t } = useTranslation();
  const { user } = useUserContext();

  const [completedTrophies, setCompletedTrophies] = useState<any[]>([]);

  const fetchCompletedTrophies = async (token?: string) => {
    const authToken = token || localStorage.getItem("token");
    if (!authToken) return;
    try {
      const response = await axios.get(
        "http://localhost:3000/students/student-challenge-completed",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.status === 200) {
        // Process trophies to keep only the highest point value for each title
        const highestTrophies = processHighestTrophies(response.data.data);
        setCompletedTrophies(highestTrophies);
        console.log("Processed Trophies:", highestTrophies);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to process trophies and keep only the highest point value for each title
  const processHighestTrophies = (trophies: any[]) => {
    const trophyMap = new Map();

    trophies.forEach((trophy) => {
      const title = trophy.challenge.title;
      const currentPoints = trophy.challenge.point;

      if (
        !trophyMap.has(title) ||
        trophyMap.get(title).challenge.point < currentPoints
      ) {
        trophyMap.set(title, trophy);
      }
    });

    return Array.from(trophyMap.values());
  };

  useEffect(() => {
    fetchCompletedTrophies();
  }, []);

  return (
    <div
      className="flex flex-col h-full w-full items-center justify-between z-10 p-4 overflow-y-auto"
      id="page-height"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-4 w-full justify-between gap-1"
      >
        {completedTrophies.map((trophy: any, index: any) => (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="flex-center flex-col"
          >
            <img src={OtherTrophies[trophy.challenge.title]} alt="" />
            <h1 className=" text-xs text-yellowprimary ">
              {trophy.challenge.point}
            </h1>
            <h1 className=" text-xs text-black text-center">
              {t(trophy.challenge.title).split(" ").slice(0, 4).join(" ")}
            </h1>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Profile;
