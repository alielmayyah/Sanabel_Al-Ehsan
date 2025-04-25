import StudentNavbar from "../../../components/navbar/StudentNavbar";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import trophy from "../../../assets/trophy.png";
import Loading from "../../../components/Loading";

// Sanabel
import blueSanabel from "../../../assets/resources/سنبلة زرقاء.png";
import redSanabel from "../../../assets/resources/سنبلة حمراء.png";
import yellowSanabel from "../../../assets/resources/سنبلة صفراء.png";
import xpIcon from "../../../assets/resources/اكس بي.png";
import water from "../../../assets/resources/ماء.png";
import fertilizer from "../../../assets/resources/سماد.png";

// Trophies
import xpTrophy from "../../../assets/trophies/Other Trophies/اكس-بي.png";

import { OtherTrophies } from "../../../data/OtherTrophies";

import axios from "axios";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const Progress: React.FC = () => {
  const { t } = useTranslation();
  const [trophyType, setTrophyType] = useState(1);
  const [trophies, setTrophies] = useState<any[]>([]);
  const [groupedTrophies, setGroupedTrophies] = useState<any>({});
  const [loading, setLoading] = useState(true); // Loading state

  const fetchTrophies = async (token?: string) => {
    const authToken = token || localStorage.getItem("token");
    if (!authToken) return;
    try {
      const response = await axios.get(
        "http://localhost:3000/students/student-challenge",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.status === 200) {
        setTrophies(response.data.data);
        groupTrophiesByTitle(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Stop loading once the API call is complete
    }
  };

  useEffect(() => {
    fetchTrophies();
  }, []);

  // Group trophies by title to show one card per trophy type
  const groupTrophiesByTitle = (trophiesData: any[]) => {
    const grouped = trophiesData.reduce((acc: any, trophy: any) => {
      const title = trophy.challenge.title;
      if (!acc[title]) {
        acc[title] = [];
      }
      acc[title].push(trophy);
      return acc;
    }, {});
    setGroupedTrophies(grouped);
  };

  const getTrophyRewards = (trophy: any) => {
    return [
      { value: trophy.challenge.snabelBlue || 0, icon: blueSanabel },
      { value: trophy.challenge.snabelRed || 0, icon: redSanabel },
      { value: trophy.challenge.snabelYellow || 0, icon: yellowSanabel },
      { value: trophy.challenge.xp || 0, icon: xpIcon },
      { value: trophy.challenge.water || 0, icon: water },
      { value: trophy.challenge.fertilizer || 0, icon: fertilizer },
    ].filter((reward) => reward.value > 0); // Only show rewards with value > 0
  };

  // Find the most progressed trophy within a group
  const getMostProgressedTrophy = (trophyGroup: any[]) => {
    return trophyGroup.reduce((mostProgressed, current) => {
      return current.pointOfStudent > mostProgressed.pointOfStudent
        ? current
        : mostProgressed;
    }, trophyGroup[0]);
  };

  // Get milestone values for a trophy group
  const getTrophyMilestones = (trophyGroup: any[]) => {
    // Extract milestone values from the trophy descriptions
    // Look for patterns like "Complete X tasks to unlock this challenge"
    const milestones = trophyGroup
      .map((trophy) => {
        const description = trophy.challenge.description;
        const match = description.match(/Complete (\d+) tasks/i);
        return match ? parseInt(match[1]) : null;
      })
      .filter((value) => value !== null);

    // If we couldn't extract any milestones, use the default ones
    if (milestones.length === 0) {
      return [1, 5, 10, 25, 50, 75, 100, 1000, 2500];
    }

    // Sort milestones in ascending order
    return milestones.sort((a, b) => a - b);
  };

  // Calculate total trophies count
  const completedTrophiesCount = trophies.filter(
    (trophy) => trophy.completionStatus === "Completed"
  ).length;

  console.log("Grouped Trophies:", groupedTrophies);
  console.log("Trophies:", trophies);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-3 w-full h-3/4 overflow-y-auto">
      <div className="flex w-full rounded-2xl bg-[#e6e6e6]">
        <h1
          className={`text-[#999] text-sm p-2 rounded-2xl w-1/2 flex-center ${
            trophyType === 1 && "bg-yellowprimary text-white"
          }`}
          onClick={() => setTrophyType(1)}
        >
          {t("جوائز أخري")}
        </h1>
        <h1
          className={`text-[#999] text-sm p-2 rounded-2xl w-1/2 flex-center ${
            trophyType === 0 && "bg-yellowprimary text-white"
          }`}
          onClick={() => setTrophyType(0)}
        >
          {t("جوائز السنابل")}
        </h1>
      </div>

      <motion.div
        className="w-full bg-[#E14E54] flex-center justify-between items-center p-1 gap-3 rounded-2xl text-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-white font-bold"
          dir="ltr"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {completedTrophiesCount} / {trophies.length}
        </motion.h1>

        <motion.h1
          className="text-white font-bold"
          dir="ltr"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {t("مجموع الجوائز")}
        </motion.h1>

        <motion.img
          src={trophy}
          alt=""
          className="w-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, ease: "backOut" }}
        />
      </motion.div>

      {Object.entries(groupedTrophies).map(
        ([title, trophyGroup]: [string, any]) => {
          const representativeTrophy = getMostProgressedTrophy(trophyGroup);
          const currentPoints = representativeTrophy.pointOfStudent;
          const targetPoints = representativeTrophy.challenge.point;
          const progressPercentage = Math.min(
            (currentPoints / targetPoints) * 100,
            100
          );

          // Get the specific milestones for this trophy group
          const trophyMilestones = getTrophyMilestones(trophyGroup);

          return (
            <div
              className="w-full flex flex-col justify-between items-center shadow-sm p-3 rounded-xl border-[1px] gap-2"
              key={title}
            >
              <div className="w-full flex justify-between items-center">
                <div className="flex gap-2">
                  {getTrophyRewards(representativeTrophy).map((item, idx) => (
                    <div className="flex-col flex-center" key={idx}>
                      <img src={item.icon} alt="icon" className="w-auto h-6" />
                      <h1 className="text-black text-sm">{item.value}</h1>
                    </div>
                  ))}
                </div>
                <div className="flex flex-center flex-col gap-1">
                  <img
                    src={OtherTrophies[title]}
                    alt="trophy"
                    className="w-16"
                  />
                  <h1 className="text-black font-bold text-end w-full">
                    {"جائزة" + " " + t(title)}
                  </h1>
                </div>
              </div>

              <p className="text-black text-sm text-end w-full">
                {t(representativeTrophy.challenge.description)}
              </p>

              <div className="w-full bg-[#fab70050] rounded-3xl h-6 flex justify-end items-center relative overflow-hidden">
                {/* Text displaying current and needed points */}
                <h1 className="text-[#997000] px-3 relative z-10">
                  {currentPoints}
                  <span className="text-black">/{targetPoints}</span>
                </h1>

                {/* Progress bar */}
                <motion.div
                  className="bg-[#F3B14E] rounded-3xl h-6 absolute top-0 right-0"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5 }}
                ></motion.div>
              </div>

              <div className="w-full flex justify-around">
                {trophyMilestones.map((milestone, idx) => (
                  <div
                    key={idx}
                    className={`flex-center px-2 h-6 rounded-full ${
                      currentPoints >= milestone
                        ? "bg-[#FAB700]"
                        : "bg-[#FFF8E5]"
                    }`}
                  >
                    <h1 className="text-xs text-black font-bold">
                      {milestone}
                    </h1>
                  </div>
                ))}
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default Progress;
