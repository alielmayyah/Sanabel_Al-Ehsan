import StudentNavbar from "../../components/navbar/StudentNavbar";
import i18n from "../../i18n";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { IonRouterLink } from "@ionic/react";
import { IoMdSettings } from "react-icons/io";
import { useUserContext } from "../../context/UserProvider";

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

const StudentHome: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const { user } = useUserContext();
  const currentXp = 2900;
  const neededXp = 3000;

  const inventory = [
    { name: "سنبلة", img: blueImg, count: 70 },
    { name: "سنبلة", img: yellowImg, count: 25 },
    { name: "سنبلة", img: redImg, count: 82 },
    { name: "سماد", img: fertilizerImg, count: 2 },
    { name: "ماء", img: waterImg, count: 3 },
  ];

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
              <h1> 15</h1>
              <h1> {t("المستوى")}</h1>
            </div>
            <div className="flex-center font-bold text-[#B3B3B3] text-xs ">
              <h1> {t("نقطة خبرة للوصول إلى المستوى التالي")} </h1>
              <h1> {neededXp - currentXp} </h1>
            </div>
          </div>
          <img className="h-16 w-auto " src={medalsImgs[5]}></img>
        </div>
        <div className="w-full bg-[#fab70050] rounded-3xl h-8 flex justify-end items-center relative overflow-hidden">
          {/* Text displaying current and needed XP */}
          <div className="text-[#997000] px-3 relative z-10">
            {currentXp}
            <span className="text-black">/{neededXp}</span>
          </div>

          {/* Progress bar */}
          <div
            className="bg-[#F3B14E] rounded-3xl h-8 absolute top-0 right-0"
            style={{ width: `${(currentXp / neededXp) * 100}%` }}
          ></div>
        </div>

        <div className="w-full  flex justify-between items-center text-sm">
          <h1 className="text-[#999999]">{t("المستوي التالي")}</h1>
          <h1 className="text-[#999999]">
            {t("تم إنجاز")} {currentXp} {t("نقطة")}
          </h1>
        </div>
      </div>

      <Inventory
        waterCount={5}
        fertilizerCount={3}
        blueCount={26}
        redCount={40}
        yellowCount={25}
      />

      <div className="w-full bg-[#4AAAD6] flex justify-between items-center p-1 px-2 rounded-xl ">
        <h1 className="text-white font-bold text-lg text-end " dir="ltr">
          20
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
