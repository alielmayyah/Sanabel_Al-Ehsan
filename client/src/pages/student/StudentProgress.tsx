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

import { IoCloseCircle } from "react-icons/io5";

import { delay, motion } from "framer-motion";
import CircularProgressBar from "./StudentProgressBar";
import PointsIcon from "../../assets/profile/coin.png";
import { FiTarget } from "react-icons/fi";
const Leaderboards: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { t } = useTranslation();
  const [selectProgressType, setSelectProgressType] = useState("daily");

  const points = 300;
  const missions = 10;
  return (
    <div
      className="flex flex-col h-full w-full items-center justify-between p-4"
      id="page-height"
    >
      <div className="flex flex-col gap-2 justify-center items-end w-full">
        <h1 className="text-black font-bold text-2xl text-end ">
          {t("تقدمك نحو الخير")}
        </h1>

        <p className="text-[#B3B3B3] text-sm  text-end ">
          {t("تابع إنجازاتك وازرع سنابل الخير كل يوم")}
        </p>
      </div>
      <div className="flex flex-row-reverse w-full bg-[#E6E6E6] rounded-3xl justify-between p-1">
        <div
          className={`w-full text-center py-1 rounded-3xl ${
            selectProgressType == "daily"
              ? "bg-blueprimary text-white"
              : "text-[#999]"
          }`}
          onClick={() => setSelectProgressType("daily")}
        >
          <h1>{t("يومية")}</h1>
        </div>
        <div
          className={`w-full text-center py-1 rounded-3xl ${
            selectProgressType == "weekly"
              ? "bg-blueprimary text-white"
              : "text-[#999]"
          }`}
          onClick={() => setSelectProgressType("weekly")}
        >
          <h1>{t("اسبوعية")}</h1>
        </div>
        <div
          className={`w-full text-center py-1 rounded-3xl ${
            selectProgressType == "monthly"
              ? "bg-blueprimary text-white"
              : "text-[#999]"
          }`}
          onClick={() => setSelectProgressType("monthly")}
        >
          <h1>{t("شهري")}</h1>
        </div>
      </div>

      <div className="flex justify-between w-full">
        <div className="bg-yellowprimary rounded-2xl p-2">
          <div className="flex flex-col">
            <div className="flex">
              <div className="text-xl">{t("مجموع الحسنات")}</div>
              <div className="bg-white h-4/5 rounded-full flex-center">
                <img src={PointsIcon} alt="" className="h-3/5" />
              </div>
            </div>
            <h1>602 حسنة</h1>
            <div className="flex"></div>
          </div>
        </div>
      </div>
      <CircularProgressBar
        points={450}
        missions={10}
        maxPoints={500}
        maxMissions={36}
      />
      <StudentNavbar />
    </div>
  );
};

export default Leaderboards;
