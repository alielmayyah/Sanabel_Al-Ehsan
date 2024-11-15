import StudentNavbar from "../../../components/navbar/StudentNavbar";

import { useHistory } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { useState, useEffect } from "react";
import i18n from "../../../i18n";
import { IonRouterLink } from "@ionic/react";
import { useTheme } from "../../../context/ThemeContext";
import DeleteAccountPopup from "./StudentDeleteAccountPopup";

import { IoMdSettings } from "react-icons/io";

// overview icons
import MissionIcon from "../../../icons/navbar/LeaderboardsIcon";
import LeaderboardIcon from "../../../icons/navbar/LeaderboardsIcon"; 
import PointsIcon from "../../../assets/profile/coin.png";
import BadgeIcon from "../../../icons/navbar/LeaderboardsIcon";
import { FiTarget } from "react-icons/fi";

import activityDoneImg from "../../../assets/profile/Medallions.png";

import Medal1 from "../../../icons/medals/Medal1";
import Medal2 from "../../../icons/medals/Medal2";
import Medal3 from "../../../icons/medals/Medal3";
import Medal4 from "../../../icons/medals/Medal4";
import Medal5 from "../../../icons/medals/Medal5";
import Medal6 from "../../../icons/medals/Medal6";
import Medal7 from "../../../icons/medals/Medal7";
import Medal8 from "../../../icons/medals/Medal8";
import Medal9 from "../../../icons/medals/Medal9";

const Profile: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const history = useHistory();
  const { t } = useTranslation();

  const [show, setShow] = useState("overview");

  const overviewData = [
    { title: "قائمة المتصدرين", content: "s", icon: LeaderboardIcon },
    { title: "تحديات", content: "s", icon: LeaderboardIcon },
    { title: "مجموع الحسنات", content: "s", icon: LeaderboardIcon },
    { title: "مستوي الشارة", content: "s", icon: LeaderboardIcon },
  ];

  return (
    <div
      className="flex flex-col h-full w-full items-center justify-between z-10"
      id="page-height"
    >
      {/* <div className="bg-yellowprimary h-24 w-screen absolute t-0 z-0"></div> */}

      <div className="flex  items-center justify-between bg-yellowprimary py-10 w-screen  p-4 rounded-b-[50px] ">
        {/* Settings Button */}
        <div
          className="flex-center gap-3 p-2 bg-[#E6E6E6] rounded-2xl"
          onClick={() => history.push("/student/settings")}
        >
          <IoMdSettings className="text-blueprimary text-2xl" />
          <h1 className="text-[#999]"> {t("الاعدادات")}</h1>
        </div>
        {/* Settings Button */}
        <h1 className="text-2xl text-black font-bold">{t("الملف الشخصي")}</h1>
      </div>
      <div className="flex flex-col items-center gap-1 justify-between">
        <div className="w-32 h-32 bg-redprimary rounded-full -mt-6 border-8 border-white"></div>
        <h1 className="text-black">محمد منجي</h1>
        <h1 className="text-[#B3B3B3]"> طالب</h1>
        <h1 className="text-[#B3B3B3]"> المرحلة الاعدادية - فصل 4/8</h1>
      </div>

      <IonRouterLink
        className="flex-center text-[#999999] w-11/12 border-2 rounded-lg py-2 "
        routerLink="/student/profile/edit"
      >
        <h1> {t("تعديل الملف الشخصي")}</h1>
      </IonRouterLink>

      <div className="flex flex-col gap-1 items-center w-full">
        <div className="flex justify-between flex-row-reverse  w-full gap-3 p-4">
          <div
            className={`${
              show === "overview"
                ? "bg-blueprimary text-white"
                : "bg-[#E6E6E6] text-[#999]"
            }  px-4 py-2 rounded-2xl  w-full text-center`}
            onClick={() => setShow("overview")}
          >
            {t("نظرة عامة")}
          </div>
          <div
            className={` ${
              show === "achievements"
                ? "bg-blueprimary text-white"
                : "bg-[#E6E6E6] text-[#999]"
            } px-4 py-2 rounded-2xl  w-full text-center`}
            onClick={() => setShow("achievements")}
          >
            <h1>{t("الإنجازات")}</h1>
          </div>
          <div
            className={` ${
              show === "trophies"
                ? "bg-blueprimary text-white"
                : "bg-[#E6E6E6] text-[#999]"
            } px-4 py-2 rounded-2xl  w-full text-center`}
            onClick={() => setShow("trophies")}
          >
            <h1>{t("الجوائز")}</h1>
          </div>
        </div>

        {show == "overview" && (
          <div className="grid grid-cols-2 w-full gap-3 p-4">
            {/* Challenges */}
            <div className="flex justify-end items-center gap-3 sanabel-shadow-bottom rounded-2xl p-2">
              <div className="flex-col">
                <h1 className="text-redprimary text-end font-bold">500</h1>
                <h1 className="text-redprimary font-bold">{t("تحديات")}</h1>
              </div>
              <div className="p-2 w-10 h-10 bg-redprimary rounded-full flex-center">
                <FiTarget className="text-white text-3xl " />
              </div>
            </div>
            {/* Leaderboards */}
            <div className="flex justify-end items-center gap-3 sanabel-shadow-bottom rounded-2xl p-2">
              <div className="flex-col">
                <h1 className="text-greenprimary text-end font-bold">
                  # <span>2</span>
                </h1>
                <h1 className="text-greenprimary font-bold">
                  {t("قائمة المتصدرين")}
                </h1>
              </div>
              <div className="p-2 w-10 h-10 bg-greenprimary rounded-full flex-center">
                <LeaderboardIcon className="text-white  " />
              </div>
            </div>

            {/* Medals */}
            <div className="flex justify-end items-center  sanabel-shadow-bottom rounded-2xl ">
              <h1 className="text-greenprimary font-bold">
                {t("مستوي الشارة")}
              </h1>

              <div className="p-2rounded-full flex-center">
                <Medal1 className="w-14 h-14 text-3xl" />
              </div>
            </div>
            {/* Total Points */}
            <div className="flex justify-end items-center gap-3 sanabel-shadow-bottom rounded-2xl p-2">
              <div className="flex-col">
                <h1 className="text-blueprimary text-end font-bold">5000</h1>
                <h1 className="text-blueprimary font-bold">
                  {t("مجموع الحسنات")}
                </h1>
              </div>
              <div className="p-2 w-10 h-10 bg-blueprimary rounded-full flex-center">
                <img className="text-yellowprimary" src={PointsIcon} />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="w-full flex-center flex-col p-4">
        <h1 className="text-black text-end font-bold text-xl self-end">
          {t("النشاط")}
        </h1>
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between w-full ">
            <h1 className="text-[#999] ">منذ دقيقة</h1>
            <h1 className="text-black">لقد قمت اكمال تحدي التعاون اليوم</h1>
            <img src={activityDoneImg} alt="" />
          </div>
        </div>
      </div>

      <StudentNavbar />
    </div>
  );
};

export default Profile;
