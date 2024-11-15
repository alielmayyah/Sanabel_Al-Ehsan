import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import GoBackButton from "../../../../components/GoBackButton";
import PointsIndicator from "../../../../components/PointsIndicator";

import Fajr from "../../../../icons/Sanabel/prayer/Fajr";
import Duhr from "../../../../icons/Sanabel/prayer/Duhr";
import Asr from "../../../../icons/Sanabel/prayer/Asr";
import Maghrib from "../../../../icons/Sanabel/prayer/Maghrib";
import Asha from "../../../../icons/Sanabel/prayer/Asha";
import Leil from "../../../../icons/Sanabel/prayer/Leil";
import Tickcircle from "../../../../icons/Sanabel/Tickcircle";

import sanabelData from "../../../../data/SanabelData";

import Loading from "../../../../components/Loading";
import SanabelPrayer from "./StudentSanabelPrayer";
import SanabelSeyam from "./StudentSanabelSeyam";

const SanabelPage: React.FC = () => {
  const { index } = useParams<{ index: any }>();
  const sanabel = sanabelData[parseInt(index, 10)];
  const { t } = useTranslation();

  const SanabelData = [
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

  colors = ["bg-blueprimary", "bg-redprimary", "bg-yellowprimary"];

  const colorBG = colors[index % colors.length];
  let colorBorder = [];
  colorBorder = [
    "border-t-blueprimary",
    "border-t-redprimary",
    "border-t-yellowprimary",
  ];

  const colorBorderTop = colorBorder[index % colors.length];

  // Render different components based on `index`
  if (index === "0") {
    return <SanabelPrayer />;
  } else if (index === "1") {
    return <SanabelSeyam />;
  } else {
    return (
      <div className="flex flex-col h-screen w-full items-center p-4 ">
        <div className="flex items-center w-full justify-between">
          <div className="opacity-0 w-[25px] h-25" />
          <h1 className="text-black font-bold text-2xl self-center" dir="ltr">
            {t(sanabel.title)}
          </h1>
          <GoBackButton />
        </div>

        <div
          className={`w-full ${colorBG} flex justify-between p-5 rounded-lg h-auto mt-8`}
        >
          <img
            src={sanabel.img}
            alt={sanabel.title}
            className="w-2/3 object-contain"
          />
          <div className="flex flex-col items-end justify-between">
            <h1 className="text-white font-bold text-2xl text-end " dir="ltr">
              {t(sanabel.title)}
            </h1>
            <p className="text-white text-end">{t(sanabel.description)}</p>
            <PointsIndicator
              points={sanabel.points}
              color="text-black bg-white"
            />
          </div>
        </div>

        <div className="flex flex-col gap-5 items-center justify-between h-full w-full mt-5 overflow-y-auto">
          {SanabelData.map((item, index) => (
            <div className="flex-col gap-2 flex w-full">
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
                  <h1 className="text-black text-xl">{sanabel.title}</h1>
                </div>
                {/* Comment */}
                {item.done && item.comment && (
                  <div className="flex-center items-end gap-3">
                    <h1 className="text-black text-sm">{t(item.comment)}</h1>
                    <img
                      className="bg-blueprimary rounded-full h-6 w-6"
                      alt=""
                    />
                  </div>
                )}
                {/* Comment */}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default SanabelPage;
