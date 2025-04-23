import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useTheme } from "../../context/ThemeContext";
import StudentNavbar from "../../components/navbar/StudentNavbar";

import { useTranslation } from "react-i18next";
import { useState } from "react";

import LeaderboardsStar from "../../icons/Leaderboards/LeaderboardsStar";
import FirstPlaceColumn from "../../icons/Leaderboards/FirstPlaceColumn";
import SecondPlaceColumn from "../../icons/Leaderboards/SecondPlaceColumn";
import ThirdPlaceColumn from "../../icons/Leaderboards/ThirdPlaceColumn";

import { IoCloseCircle } from "react-icons/io5";

import { avatars } from "../../data/Avatars";

import FilterIcon from "../../icons/Leaderboards/FilterIcon";
import PrimaryButton from "../../components/PrimaryButton";
import { delay, motion } from "framer-motion";
import MedalAndLevel from "../../components/MedalAndLevel";
import { useEffect } from "react";
import axios from "axios";
import React from "react";

const Leaderboards: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { t } = useTranslation();

  interface LeaderboardItem {
    id: number;
    name: string;
    avatar: string;
    level: number;
    // Add other relevant fields as necessary
  }

  const [leaderboardsData, setLeaderboardsData] = useState<LeaderboardItem[]>([
    {
      id: 0,
      name: "محمد منجي",
      level: 31,
      avatar: avatars.boys.boy2,
    },
    {
      id: 1,
      name: "علي يوسف",
      level: 5,
      avatar: avatars.boys.boy3,
    },
    {
      id: 2,
      name: "سارة حسن",
      level: 88,

      avatar: avatars.girls.girl2,
    },
    {
      id: 3,
      name: "فاطمة الكيلاني",
      level: 15,
      avatar: avatars.girls.girl1,
    },
    {
      id: 4,
      name: "أحمد جمال",
      level: 18,
      avatar: avatars.boys.boy6,
    },
    {
      id: 5,
      name: "رانيا عمر",
      level: 26,
      avatar: avatars.girls.girl5,
    },
    {
      id: 6,
      name: "عمر شريف",
      level: 125,
      avatar: avatars.boys.boy2,
    },
    {
      id: 7,
      name: "لين كمال",
      level: 3,
      avatar: avatars.girls.girl4,
    },
    {
      id: 8,
      name: "سعيد موسى",
      level: 206,
      avatar: avatars.boys.boy5,
    },
    {
      id: 9,
      name: "هدى خالد",
      level: 52,
      avatar: avatars.girls.girl2,
    },
  ]);

  const fetchUserData = async (token?: string) => {
    const authToken = token || localStorage.getItem("token");
    if (!authToken) return;

    try {
      const response = await axios.get(
        "http://localhost:3000/students/appear-Leaderboard",
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

  console.log(leaderboardsData);

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

  return (
    <div className="w-full" id="page-height">
      <div className="flex flex-col h-full w-full items-center justify-between p-4">
        <div className="flex flex-col gap-2 justify-between items-center w-full">
          <div className="flex justify-between items-center w-full">
            <div
              className="flex-center bg-[#E6E6E6] p-3 rounded-2xl"
              onClick={() => setOpenFilter(true)}
            >
              <h1 className="text-[#999] text-md font-bold">{t("فلترة")}</h1>
              <FilterIcon />
            </div>
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
                <img
                  className="w-[75px] h-[75px] rounded-full absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  src={sortedData[0].avatar}
                />
                <div className="flex-center absolute p-4 text-center transform -translate-x-1/2 -translate-y-1/2 top-0 left-1/2">
                  <LeaderboardsStar size={40} className="text-blueprimary" />
                </div>
              </div>
              <h1 className="text-black">{sortedData[0].name}</h1>
              <div className="scale-90">
                <MedalAndLevel
                  level={sortedData[0].level}
                  color="text-blueprimary"
                  dir={""}
                />
              </div>

              <FirstPlaceColumn className="w-full" />
            </motion.div>
            <motion.div
              className="flex flex-col items-center  w-1/3 -order-1"
              variants={columnVariants}
            >
              <img
                className="w-20 h-20 rounded-full"
                src={sortedData[1].avatar}
              />
              <h1 className="text-black">{sortedData[1].name}</h1>
              <div className="scale-90">
                <MedalAndLevel
                  level={sortedData[1].level}
                  color={"text-redprimary"}
                  dir={""}
                />
              </div>
              <SecondPlaceColumn className="w-full" />
            </motion.div>
            <motion.div
              className="flex flex-col items-center  w-1/3"
              variants={columnVariants}
            >
              <img
                className="w-20 h-20 rounded-full"
                src={sortedData[2].avatar}
              />
              <h1 className="text-black">{sortedData[2].name}</h1>
              <div className="scale-90">
                <MedalAndLevel
                  level={sortedData[2].level}
                  color={"text-yellowprimary"}
                  dir={""}
                />
              </div>
              <ThirdPlaceColumn className="w-full " />
            </motion.div>
          </motion.div>
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
                    />
                  </div>
                  <div className="flex-center gap-2">
                    <div className="flex flex-col text-end">
                      <h1 className="text-black">{item.name}</h1>
                      <p className="text-gray-500 font-medium">
                        {ordinalNumbers[index + 3]}
                      </p>
                    </div>
                    <img className="w-12 h-12 rounded-full" src={item.avatar} />
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </div>
        <StudentNavbar />
      </div>

      {openFilter && (
        <div className="w-[100%] h-[100%] absolute top-0 bg-white flex flex-col justify-between p-4">
          <div className="flex w-full justify-between items-center ">
            <h1 className="text-blueprimary font-bold text-md w-1/3">
              {t("إعادة تعيين الكل")}
            </h1>
            <h1 className="text-black font-bold text-2xl text-center">
              {t("فلترة")}
            </h1>
            <div
              className="flex text-redprimary w-1/3 justify-end"
              onClick={() => setOpenFilter(false)}
            >
              <IoCloseCircle size={30} />
            </div>
          </div>
          {filterOptions.map((option, index) => (
            <div className="flex flex-col gap-2 ">
              <h1 className="text-[#B3B3B3] text-end">{option.title}</h1>
              <div className="flex justify-between flex-row-reverse  w-full gap-3">
                {option.options.map((opt, i) => (
                  <div
                    key={i}
                    className="bg-[#E6E6E6] px-4 py-2 rounded-2xl text-[#999] w-full text-center"
                  >
                    {opt}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex-center w-full mb-3">
            <PrimaryButton arrow="none" style={""} text={"فلترة"} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboards;
