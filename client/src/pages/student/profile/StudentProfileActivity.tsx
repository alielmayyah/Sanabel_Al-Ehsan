import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../context/ThemeContext";
import { useUserContext } from "../../../context/StudentUserProvider";
import { treeStages } from "../../../data/Tree";
import sanabelType from "../../../data/SanabelTypeData";
import { useState, useEffect } from "react";
import axios from "axios";

import { sanabelImgs } from "../../../data/SanabelDictionary";

const Profile: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const history = useHistory();
  const { t } = useTranslation();
  const { user } = useUserContext();
  const [showPopup, setShowPopup] = useState(false);

  // Define a type for the keys of sanabelImgs
  type SanabelImgKeys = keyof typeof sanabelImgs;

  // Update the recentActivity type to include the correct key type
  interface Activity {
    createdAt: string;
    type: string;
    title: SanabelImgKeys; // Ensure this matches the keys in sanabelImgs
  }

  // Update the state with the Activity type
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);

  // Function to fetch user data

  const fetchUserData = async (token?: string) => {
    const authToken = token || localStorage.getItem("token");
    if (!authToken) return;

    try {
      const response = await axios.get(
        " http://localhost:3000/students/student-task-completed",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        // Sort activities by date (newest first)
        const sortedActivities = [...response.data.completedTasks].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setRecentActivity(sortedActivities);
        console.log("Recent Activity:", response.data.completedTasks);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const savedLanguage = localStorage.getItem("language") || "ar";

  // Calculate relative time
  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const rtf = new Intl.RelativeTimeFormat(`${savedLanguage}`, {
      numeric: "auto",
    });

    if (diffInSeconds < 60) {
      return rtf.format(-diffInSeconds, "second");
    } else if (diffInSeconds < 3600) {
      return rtf.format(-Math.floor(diffInSeconds / 60), "minute");
    } else if (diffInSeconds < 86400) {
      return rtf.format(-Math.floor(diffInSeconds / 3600), "hour");
    } else {
      return rtf.format(-Math.floor(diffInSeconds / 86400), "day");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="flex flex-col justify-start items-center h-full w-full gap-2 overflow-y-auto p-4"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-black text-md font-bold"
      >
        {t("قائمة النشاط")}
      </motion.div>
      <div className="w-full flex flex-col gap-2">
        {recentActivity.map((activity: any, index) => (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 1 }}
            className="flex  w-full justify-between items-center"
          >
            <h1 className="text-black text-sm ">
              {getRelativeTime(activity.createdAt)}
            </h1>
            <div className="flex-center gap-3">
              {" "}
              <div className="flex flex-col  w-full  text-end ">
                <h1 className="text-blueprimary text-sm">
                  {t("سنبلة" + " " + activity.type)}
                </h1>
                <h1 className="text-black text-sm w-full">
                  {" "}
                  {t(activity.title)}
                </h1>
              </div>
              <img src={sanabelImgs[activity.type]} alt="" className="w-8" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Profile;
