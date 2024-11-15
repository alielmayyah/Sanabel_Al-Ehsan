import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import dailyMissionsData from "../../../../data/dailyMissionsData";
import weeklyMissionsData from "../../../../data/weeklyMissionsData";
import GoBackButton from "../../../../components/GoBackButton";
import PointsIndicator from "../../../../components/PointsIndicator";

import Tickcircle from "../../../../icons/Sanabel/Tickcircle";
import missionsAnimation from "../../../../assets/missions.json";
import Lottie from "lottie-react";

const MissionsPage: React.FC = () => {
  const { type, index } = useParams<{ type: string; index: any }>();
  const missions = type === "daily" ? dailyMissionsData : weeklyMissionsData;
  const mission = missions[parseInt(index, 10)];
  const { t } = useTranslation();

  const MissionsData = [
    {
      date: "vef",
      time: "2 mins",
      done: true,
      comment: "لقد قام باداء صلاة الفجر في مسجد المدرسة",
    },
    {
      date: "vef",
      time: "2 mins",
      done: true,
    },
    {
      date: "vef",

      time: "2 mins",
      done: false,
    },
    {
      date: "vef",
      time: "2 mins",
      done: false,
    },
    {
      date: "vef",

      time: "2 mins",
      done: true,
    },
  ];

  let colors = [];

  colors = ["bg-redprimary", "bg-blueprimary", "bg-yellowprimary"];

  const colorBG = colors[index % colors.length];
  let colorBorder = [];
  colorBorder = [
    "border-t-redprimary",
    "border-t-blueprimary",
    "border-t-yellowprimary",
  ];

  const colorBorderTop = colorBorder[index % colors.length];
  return (
    <div className="flex flex-col h-screen w-full items-center p-4 ">
      <div className="flex items-center w-full justify-between">
        <Lottie
          animationData={missionsAnimation} // Load your Lottie JSON animation
          loop={true} // Optional: Set to true to loop the animation
          className="w-16 h-16  bg-redprimary rounded-full"
        />
        <h1 className="text-black font-bold text-2xl self-center" dir="ltr">
          {t(mission.title)}
        </h1>
        <GoBackButton />
      </div>

      <div
        className={`w-full ${colorBG} flex justify-between p-5 rounded-lg h-auto mt-8`}
      >
        <img
          src={mission.img}
          alt={mission.title}
          className="w-2/4 object-contain"
        />
        <div className="flex flex-col items-end justify-between gap-3">
          <h1 className="text-white font-bold text-2xl text-end " dir="ltr">
            {t(mission.title)}
          </h1>
          <p className="text-white text-end">{t(mission.description)}</p>
          <PointsIndicator
            points={mission.points}
            color="text-black bg-white"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 items-center justify-between h-full w-full mt-5 overflow-y-auto">
        {MissionsData.map((item, index) => (
          <div className={`flex-col gap-2 flex w-full `}>
            <h1 className="text-[#999] text-end">Date </h1>
            <div
              key={index}
              className={`flex w-full flex-col items-end justify-between sanabel-shadow-bottom h-full rounded-xl p-4 gap-2 border-t-2 ${colorBorderTop}`}
            >
              <div className="flex w-full justify-between ">
                {item.done ? (
                  <h1 className="text-gray-400 text-sm">
                    {t("اكتمل منذ دقتين")}
                  </h1>
                ) : (
                  item.time && (
                    <h1 className="text-black text-sm">{item.time}</h1>
                  )
                )}
                {item.done && (
                  <div className={`flex-center  text-[#498200]`}>
                    <h1> {t("تمت")}</h1>
                    <Tickcircle />
                  </div>
                )}
              </div>
              <div className="flex-center items-end gap-3">
                <h1 className="text-black text-xl">{mission.title}</h1>
              </div>
              {/* Comment */}
              {item.done && item.comment && (
                <div className="flex-center items-end gap-3">
                  <h1 className="text-black text-sm">{t(item.comment)}</h1>
                  <img className="bg-blueprimary rounded-full h-6 w-6" alt="" />
                </div>
              )}
              {/* Comment */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MissionsPage;
