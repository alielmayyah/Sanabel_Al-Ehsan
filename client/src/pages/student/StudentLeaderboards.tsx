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
import PointsIndicator from "../../components/PointsIndicator";
import SecondPlaceColumn from "../../icons/Leaderboards/SecondPlaceColumn";
import ThirdPlaceColumn from "../../icons/Leaderboards/ThirdPlaceColumn";

import { IoCloseCircle } from "react-icons/io5";

import { avatars } from "../../data/Avatars";

import FilterIcon from "../../icons/Leaderboards/FilterIcon";
import PrimaryButton from "../../components/PrimaryButton";
import { delay, motion } from "framer-motion";

const Leaderboards: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { t } = useTranslation();

  const [showWeekOrDay, setShowWeekOrDay] = useState<"day" | "week">("day");

  // day or week

  const [showType, setShowType] = useState("users");
  // user or classes or teams

  type LeaderboardEntry = {
    name: string;
    points: number;
    color: string;
    avatar: string;
    stage: string;
    grade: string;
    class: string;
  };

  type LeaderboardData = {
    day: LeaderboardEntry[];
    week: LeaderboardEntry[];
  };

  // Sample leaderboard data
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData>({
    day: [
      {
        name: "محمد منجي",
        points: 1200,
        color: "bg-blueprimary",
        avatar: avatars.boys.boy2,
        stage: "preparatory",
        grade: "12",
        class: "1",
      },
      {
        name: "علي يوسف",
        points: 1100,
        color: "bg-redprimary",
        avatar: avatars.boys.boy3,
        stage: "primary",
        grade: "5",
        class: "2",
      },
      {
        name: "سارة حسن",
        points: 1000,
        color: "bg-yellowprimary",
        avatar: avatars.girls.girl2,
        stage: "secondary",
        grade: "10",
        class: "1",
      },
      {
        name: "فاطمة الكيلاني",
        points: 900,
        color: "bg-gray-300",
        avatar: avatars.girls.girl1,
        stage: "primary",
        grade: "3",
        class: "3",
      },
      {
        name: "أحمد جمال",
        points: 850,
        color: "bg-greenprimary",
        avatar: avatars.boys.boy6,
        stage: "preparatory",
        grade: "8",
        class: "1",
      },
      {
        name: "رانيا عمر",
        points: 800,
        color: "bg-purpleprimary",
        avatar: avatars.girls.girl5,
        stage: "secondary",
        grade: "11",
        class: "2",
      },
      {
        name: "عمر شريف",
        points: 750,
        color: "bg-orangeprimary",
        avatar: avatars.boys.boy2,
        stage: "primary",
        grade: "2",
        class: "1",
      },
      {
        name: "لين كمال",
        points: 700,
        color: "bg-tealprimary",
        avatar: avatars.girls.girl4,
        stage: "preparatory",
        grade: "7",
        class: "3",
      },
      {
        name: "سعيد موسى",
        points: 650,
        color: "bg-pinkprimary",
        avatar: avatars.boys.boy5,
        stage: "primary",
        grade: "4",
        class: "2",
      },
      {
        name: "هدى خالد",
        points: 600,
        color: "bg-cyanprimary",
        avatar: avatars.girls.girl2,
        stage: "secondary",
        grade: "9",
        class: "1",
      },
    ],
    week: [
      {
        name: "محمد منجي",
        points: 5000,
        color: "bg-blueprimary",
        avatar: avatars.boys.boy1,
        stage: "secondary",
        grade: "12",
        class: "2",
      },
      {
        name: "علي يوسف",
        points: 7800,
        color: "bg-redprimary",
        avatar: avatars.boys.boy3,
        stage: "preparatory",
        grade: "7",
        class: "1",
      },
      {
        name: "سارة حسن",
        points: 5402,
        color: "bg-yellowprimary",
        avatar: avatars.girls.girl2,
        stage: "primary",
        grade: "6",
        class: "3",
      },
      {
        name: "فاطمة الكيلاني",
        points: 8700,
        color: "bg-gray-300",
        avatar: avatars.girls.girl1,
        stage: "preparatory",
        grade: "8",
        class: "2",
      },
      {
        name: "أحمد جمال",
        points: 9200,
        color: "bg-greenprimary",
        avatar: avatars.boys.boy6,
        stage: "secondary",
        grade: "11",
        class: "3",
      },
      {
        name: "رانيا عمر",
        points: 4790,
        color: "bg-purpleprimary",
        avatar: avatars.girls.girl5,
        stage: "primary",
        grade: "5",
        class: "1",
      },
      {
        name: "عمر شريف",
        points: 4780,
        color: "bg-orangeprimary",
        avatar: avatars.boys.boy2,
        stage: "preparatory",
        grade: "9",
        class: "2",
      },
      {
        name: "لين كمال",
        points: 7840,
        color: "bg-tealprimary",
        avatar: avatars.girls.girl4,
        stage: "secondary",
        grade: "10",
        class: "1",
      },
      {
        name: "سعيد موسى",
        points: 650,
        color: "bg-pinkprimary",
        avatar: avatars.boys.boy5,
        stage: "primary",
        grade: "3",
        class: "2",
      },
      {
        name: "هدى خالد",
        points: 600,
        color: "bg-cyanprimary",
        avatar: avatars.girls.girl2,
        stage: "preparatory",
        grade: "7",
        class: "1",
      },
    ],
  });

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

  // Sort leaderboard data by points in descending order based on `showWeekOrDay`
  const sortedData = leaderboardData[showWeekOrDay].sort(
    (a: LeaderboardEntry, b: LeaderboardEntry) => b.points - a.points
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
              className="flex flex-col items-center gap-3 w-1/3"
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
                <PointsIndicator
                  points={sortedData[0].points}
                  color={"bg-blueprimary"}
                />
              </div>
              <FirstPlaceColumn className="w-full" />
            </motion.div>
            <motion.div
              className="flex flex-col items-center gap-3 w-1/3 -order-1"
              variants={columnVariants}
            >
              <img
                className="w-20 h-20 rounded-full"
                src={sortedData[1].avatar}
              />
              <h1 className="text-black">{sortedData[1].name}</h1>
              <div className="scale-90">
                {" "}
                <PointsIndicator
                  points={sortedData[1].points}
                  color={"bg-redprimary"}
                />
              </div>
              <SecondPlaceColumn className="w-full" />
            </motion.div>
            <motion.div
              className="flex flex-col items-center gap-3 w-1/3"
              variants={columnVariants}
            >
              <img
                className="w-20 h-20 rounded-full"
                src={sortedData[2].avatar}
              />
              <h1 className="text-black">{sortedData[2].name}</h1>
              <div className="scale-90">
                <PointsIndicator
                  points={sortedData[2].points}
                  color={"bg-yellowprimary"}
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
              .map((item: LeaderboardEntry, index: number) => (
                <motion.div
                  key={index + 3}
                  className="border-2 w-full flex justify-between items-center p-2 rounded-2xl"
                  variants={listItemVariants}
                >
                  <div className="scale-90">
                    <PointsIndicator
                      points={item.points}
                      color="bg-greenprimary text-white"
                    />
                  </div>
                  <div className="flex-center gap-3">
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
