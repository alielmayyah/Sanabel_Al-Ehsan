import StudentNavbar from "../../components/navbar/StudentNavbar";
import i18n from "../../i18n";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { IonRouterLink } from "@ionic/react";
import { IoMdSettings } from "react-icons/io";
import { useUserContext } from "../../context/StudentUserProvider";

import Greeting from "../../components/Greeting";
import Notification from "../../components/Notification";

import { medalsImgs } from "../../data/Medals";

import missionsDoneImg from "../../assets/target.png";
// Inventory Assets

import waterImg from "../../assets/resources/ماء.png";
import fertilizerImg from "../../assets/resources/سماد.png";
import redImg from "../../assets/resources/سنبلة حمراء.png";
import yellowImg from "../../assets/resources/سنبلة صفراء.png";
import blueImg from "../../assets/resources/سنبلة زرقاء.png";

// Tree
import { treeStages } from "../../data/Tree";

import SanabelTree from "../../components/tree/SanabelTree";
import Inventory from "../../components/tree/Inventory";
import { motion } from "framer-motion";
import axios from "axios";

const medalsData = [
  { title: "مبتدئ", img: medalsImgs[0], level: "1" },
  { title: "مستجد", img: medalsImgs[1], level: "5" },
  { title: "موهوب", img: medalsImgs[2], level: "10" },
  { title: "ماهر", img: medalsImgs[3], level: "25" },
  { title: "بارع", img: medalsImgs[4], level: "50" },
  { title: "متمرس", img: medalsImgs[5], level: "75" },
  { title: "متقدم", img: medalsImgs[6], level: "100" },
  { title: "متقن", img: medalsImgs[7], level: "150" },
  { title: "خبير", img: medalsImgs[8], level: "200" },
];

const calculateLevel = (totalXp: number) => {
  const baseXp = 10;
  const increment = 5;
  let level = 1;
  let xpForNextLevel = baseXp;

  while (totalXp >= xpForNextLevel) {
    totalXp -= xpForNextLevel;
    level++;
    xpForNextLevel = baseXp + increment * (level - 1);
  }
  return { level, remainingXp: totalXp, xpForNextLevel };
};

const calculateXpForLevel = (targetLevel: any) => {
  const baseXp = 10;
  const increment = 5;

  let totalXp = 0;

  for (let level = 1; level < targetLevel; level++) {
    totalXp += baseXp + increment * (level - 1);
  }

  return totalXp;
};

const StudentHome: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const { user } = useUserContext();
  const xp = Number(user?.xp);

  const [missionsDoneToday, setMissionsDoneToday] = useState(0);
  // Function to fetch user data

  const fetchUserData = async (token?: string) => {
    const authToken = token || localStorage.getItem("token");
    if (!authToken) return;

    try {
      const response = await axios.get(
        "http://localhost:3000/students/task-count-sucess",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        setMissionsDoneToday(response.data.completedTasksCount);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const { level, remainingXp, xpForNextLevel } = calculateLevel(xp);

  const currentXp = remainingXp; // XP within the current level
  const neededXp = xpForNextLevel; // XP required to reach the next level

  const inventory = [
    { name: "سنبلة", img: blueImg },
    { name: "سنبلة", img: yellowImg },
    { name: "سنبلة", img: redImg },
    { name: "سماد", img: fertilizerImg },
    { name: "ماء", img: waterImg },
  ];

  // Update level and medal
  const [medalImgTracker, setMedalImgTracker] = useState(0);
  useEffect(() => {
    if (level < 5) {
      setMedalImgTracker(0);
    } else if (level >= 5 && level < 10) {
      setMedalImgTracker(1);
    } else if (level >= 10 && level < 25) {
      setMedalImgTracker(2);
    } else if (level >= 25 && level < 50) {
      setMedalImgTracker(3);
    } else if (level >= 50 && level < 75) {
      setMedalImgTracker(4);
    } else if (level >= 75 && level < 100) {
      setMedalImgTracker(5);
    } else if (level >= 100 && level < 150) {
      setMedalImgTracker(6);
    } else if (level >= 150 && level < 200) {
      setMedalImgTracker(7);
    } else {
      setMedalImgTracker(8);
    }
  }, [xp]);

  return (
    <div
      className="flex flex-col h-full w-full items-center justify-between p-4  gap-3 overflow-y-auto"
      id="page-height"
    >
      <div className="flex justify-between w-full items-center">
        <Notification />
        <Greeting
          name={`مرحباً ${user?.firstName}`}
          text={"!هيا بنا نصنع الخير معًا"}
        />
      </div>

      <div className="flex flex-col gap-1 rounded-xl w-full shadow-md p-2 relative border-[1px] border-[#33333325]">
        {/* Medal and Level */}
        <div className="flex-center gap-3 w-full">
          <div className="flex flex-col items-end w-full ">
            <div className="flex-center font-bold text-black text-lg">
              <p className="text-lg font-bold text-black">
                {t("المستوى")} {level}
              </p>
            </div>
            <div className="flex-center font-bold text-[#B3B3B3] text-xs ">
              <h1> {t("نقطة خبرة للوصول إلى المستوى التالي")} </h1>
              &nbsp;
              <h1> {neededXp - currentXp} </h1>
            </div>
          </div>
          <img
            className="h-16 w-auto "
            src={medalsData[medalImgTracker].img}
          ></img>
        </div>
        <div className="w-full bg-[#fab70050] rounded-3xl h-8 flex justify-end items-center relative overflow-hidden">
          {/* Text displaying current and needed XP */}
          <div
            className={`text-[#997000] px-3 relative z-10 ${
              i18n.language === "ar" ? "" : "flex"
            } `}
          >
            <span className="text-black">{neededXp}/</span>
            {currentXp}
          </div>

          {/* Progress bar */}
          <motion.div
            className={`bg-[#F3B14E] rounded-3xl h-8 absolute top-0  ${
              i18n.language === "ar" ? "right-0" : "left-0"
            }`}
            style={{ width: `${(currentXp / neededXp) * 100}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${(currentXp / neededXp) * 100}%` }}
            transition={{ duration: 0.5 }}
          ></motion.div>
        </div>

        <div className="w-full  flex justify-between items-center text-sm">
          <h1 className="text-[#999999]">{t("المستوي التالي")}</h1>
          <h1 className="text-[#999999]">
            {t("تم إنجاز")} {currentXp} {t("نقطة")}
          </h1>
        </div>
      </div>

      <Inventory
        waterCount={Number(user?.water)}
        fertilizerCount={Number(user?.fertilizer)}
        blueCount={Number(user?.snabelBlue)}
        redCount={Number(user?.snabelRed)}
        yellowCount={Number(user?.snabelYellow)}
      />

      <div className="w-full bg-[#4AAAD6] flex justify-between items-center p-1 px-2 rounded-xl ">
        <h1 className="text-white font-bold text-lg text-end " dir="ltr">
          {missionsDoneToday}
        </h1>
        <div className="flex-center gap-3">
          <h1 className="text-white font-bold text-end text-sm" dir="ltr">
            {t("التحديات تم إنجازها اليوم")}
          </h1>
          <img src={missionsDoneImg} alt="" className="w-8" />
        </div>
      </div>

      <SanabelTree treeStage={49} />
      <StudentNavbar />
    </div>
  );
};

export default StudentHome;
