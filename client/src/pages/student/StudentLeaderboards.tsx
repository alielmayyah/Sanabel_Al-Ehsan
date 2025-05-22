import { useTheme } from "../../context/ThemeContext";
import StudentNavbar from "../../components/navbar/StudentNavbar";

import { useTranslation } from "react-i18next";
import { useState } from "react";

import LeaderboardsStar from "../../icons/Leaderboards/LeaderboardsStar";
import FirstPlaceColumn from "../../icons/Leaderboards/FirstPlaceColumn";
import SecondPlaceColumn from "../../icons/Leaderboards/SecondPlaceColumn";
import ThirdPlaceColumn from "../../icons/Leaderboards/ThirdPlaceColumn";

import FilterIcon from "../../icons/Leaderboards/FilterIcon";
import PrimaryButton from "../../components/PrimaryButton";
import { delay, motion } from "framer-motion";
import MedalAndLevel from "../../components/MedalAndLevel";
import { useEffect } from "react";
import axios from "axios";
import React from "react";
import { calculateLevel } from "../../utils/LevelCalculator";
import TeacherNavbar from "../../components/navbar/TeacherNavbar";
import LeaderboardFilter, { ViewType } from "./Leaderboards/LeaderboardsFilter";
import LeaderboardsFilter from "./Leaderboards/LeaderboardsFilter";
import GetAvatar from "./tutorial/GetAvatar";
import { useUserContext } from "../../context/StudentUserProvider";

const Leaderboards: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { t } = useTranslation();

  interface LeaderboardItem {
    [x: string]: any;
    id: number;
    name: string;
    avatar: string;
    level: number;
    // Add other relevant fields as necessary
  }

  const [leaderboardsData, setLeaderboardsData] = useState<LeaderboardItem[]>(
    []
  );

  const fetchUserData = async (token?: string) => {
    const authToken = token || localStorage.getItem("token");
    if (!authToken) return;
    const userRole = localStorage.getItem("role");
    try {
      const response = await axios.get(
        // Determine the API endpoint based on the role
        userRole === "Teacher"
          ? "http://localhost:3000/teachers/leader-board"
          : "http://localhost:3000/students/appear-Leaderboard",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        setLeaderboardsData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const [ordinalNumbers, setOrdinalNumbers] = useState([
    "الأول",
    "الثاني",
    "الثالث",
    "الرابع",
    "الخامس",
    "السادس",
    "السابع",
    "الثامن",
    "التاسع",
    "العاشر",
  ]);

  const sortedData = React.useMemo(
    () => leaderboardsData.slice().sort((a, b) => b.level - a.level),
    [leaderboardsData]
  );
  console.log(sortedData);
  useEffect(() => {
    const levelsUpdated = leaderboardsData.some(
      (item) => item.level !== calculateLevel(item.xp).level
    );

    if (levelsUpdated) {
      const updatedData = sortedData.map((item) => {
        const { level } = calculateLevel(item.xp);
        return { ...item, level };
      });
      setLeaderboardsData(updatedData);
    }
  }, [sortedData, leaderboardsData]);

  // const { level, remainingXp, xpForNextLevel } = calculateLevel(xp);

  const [openFilter, setOpenFilter] = useState(false);

  const filterOptions = [
    { title: "المدة", options: ["يومي", "اسبوعي", "شهري"] },
    { title: "الفئات", options: ["فصول", "فرق", "طلاب"] },
    {
      title: "المراحل الدارسية",
      options: ["الابتدائية", "الاعدادية", "الثانوية"],
    },
    {
      title: "الفصول الدراسية",
      options: ["فصل دراسي الاول", "فصل دراسي ثاني"],
    },
    {
      title: "الفصول",
      options: ["1", "2", "3"],
    },
  ];

  // Animation Variants
  const columnVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const listVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const listItemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 1 } },
  };

  const role = localStorage.getItem("role");

  return (
    <div className="w-full" id="page-height">
      <div className="flex flex-col h-full w-full items-center justify-between p-4">
        <div className="flex flex-col gap-2 justify-between items-center w-full">
          <div className="flex justify-between items-center w-full">
            <LeaderboardsFilter
              onApplyFilters={(filters) => console.log(filters)}
              onViewChange={function (
                viewType: ViewType,
                itemsPerPage: number
              ): void {
                throw new Error("Function not implemented.");
              }}
            />
            <h1 className="text-black font-bold text-2xl text-end ">
              {t("لوحة المتصدرين")}
            </h1>
          </div>
          <p className="text-[#B3B3B3] text-sm self-end text-end ">
            {t("التحديات تعزز قيم الإحسان والتعاون لدى الأطفال")}
          </p>
        </div>
        {/* SET TYPE */}
        {/* leaderboards places */}
        <div className="flex flex-col gap-2 h-[90%] w-full overflow-y-auto py-5 px-1 ">
          {/* Leaderboards for top 3 */}
          {sortedData.length > 0 && (
            <motion.div
              className="flex justify-between items-end w-full"
              initial="hidden"
              animate="visible"
              variants={listVariants}
            >
              <motion.div
                className="flex flex-col items-center  w-1/3"
                variants={columnVariants}
              >
                <div className="w-20 h-20 rounded-full relative border-2 border-blueprimary">
                  <GetAvatar userAvatarData={sortedData[0].user.profileImg} />

                  <div className="flex-center absolute p-4 text-center transform -translate-x-1/2 -translate-y-1/2 top-0 left-1/2">
                    <LeaderboardsStar size={40} className="text-blueprimary" />
                  </div>
                </div>
                <h1 className="text-black">
                  {sortedData[0].user.firstName +
                    " " +
                    sortedData[0].user.lastName}
                </h1>
                <div className="scale-90">
                  <MedalAndLevel
                    level={sortedData[0].level}
                    color="text-blueprimary"
                    dir={""}
                    size="w-16"
                  />
                </div>

                <FirstPlaceColumn className="w-full" />
              </motion.div>
              <motion.div
                className="flex flex-col items-center  w-1/3 -order-1"
                variants={columnVariants}
              >
                <div className="h-20 w-20">
                  <GetAvatar userAvatarData={sortedData[1].user.profileImg} />
                </div>
                <h1 className="text-black">
                  {sortedData[1].user.firstName +
                    " " +
                    sortedData[1].user.lastName}
                </h1>
                <div className="scale-90">
                  <MedalAndLevel
                    level={sortedData[1].level}
                    color={"text-redprimary"}
                    dir={""}
                    size="w-16"
                  />
                </div>
                <SecondPlaceColumn className="w-full" />
              </motion.div>
              <motion.div
                className="flex flex-col items-center  w-1/3"
                variants={columnVariants}
              >
                <div className="h-20 w-20">
                  <GetAvatar userAvatarData={sortedData[2].user.profileImg} />
                </div>
                <h1 className="text-black">
                  {" "}
                  <h1 className="text-black">
                    {sortedData[2].user.firstName +
                      " " +
                      sortedData[2].user.lastName}
                  </h1>
                </h1>
                <div className="scale-90">
                  <MedalAndLevel
                    level={sortedData[2].level}
                    color={"text-yellowprimary"}
                    dir={""}
                    size="w-16"
                  />
                </div>
                <ThirdPlaceColumn className="w-full " />
              </motion.div>
            </motion.div>
          )}
          {/* Remaining leaderboard list */}
          <motion.div
            className="flex flex-col w-full gap-2 "
            initial="hidden"
            animate="visible"
            variants={listVariants}
          >
            {sortedData
              .slice(3, 10)
              .map((item: LeaderboardItem, index: number) => (
                <motion.div
                  key={index + 3}
                  className="border-2 w-full flex justify-between items-center p-1 rounded-2xl"
                  variants={listItemVariants}
                >
                  <div className="scale-90">
                    <MedalAndLevel
                      level={item.level}
                      color={"text-black"}
                      dir="horizontal"
                      size="w-16"
                    />
                  </div>
                  <div className="flex-center gap-2">
                    <div className="flex flex-col text-end">
                      <h1 className="text-black">
                        {item.user.firstName + " " + item.user.lastName}
                      </h1>
                      <p className="text-gray-500 font-medium">
                        {ordinalNumbers[index + 3]}
                      </p>
                    </div>
                    <div className="h-12 w-12">
                      <GetAvatar userAvatarData={item.user.profileImg} />
                    </div>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </div>
        {role == "Student" ? <StudentNavbar /> : <TeacherNavbar />}
      </div>
    </div>
  );
};

export default Leaderboards;
