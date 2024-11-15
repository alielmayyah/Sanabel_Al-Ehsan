import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import sanabelData from "../../../../data/SanabelData";
import GoBackButton from "../../../../components/GoBackButton";
import PointsIndicator from "../../../../components/PointsIndicator";

import Tickcircle from "../../../../icons/Sanabel/Tickcircle";

const SanabelSeyam: React.FC = () => {
  const { index } = useParams<{ index: string }>();
  const item = sanabelData[parseInt(index, 10)];
  const { t } = useTranslation();

  const SanabelSeyamData = [
    {
      title: "صيام يوم السبت",
      done: true,
      comment: "لقد قام باداء صلاة الفجر في مسجد المدرسة",
    },
    {
      title: "صيام يوم الاحد",
      done: true,
    },
    {
      title: "صيام يوم الاثنين",
      done: false,
    },
    {
      title: "صيام يوم الثلاثاء",
      done: false,
    },
    {
      title: "صيام يوم الاربعاء",
      done: true,
    },
    {
      title: "صيام يوم الخميس",
      done: true,
    },
    {
      title: "صيام يوم الجمعة",
      done: true,
    },
  ];

  return (
    <div className="flex flex-col h-screen w-full items-center p-4 ">
      <div className="flex items-center w-full justify-between">
        <div className="opacity-0 w-[25px] h-25" />
        <h1 className="text-black font-bold text-2xl self-center" dir="ltr">
          {t(item.title)}
        </h1>
        <GoBackButton />
      </div>

      <div className="w-full bg-redprimary flex justify-between p-5 rounded-lg h-44 mt-8">
        <img src={item.img} alt={item.title} className="w-2/3 object-contain" />
        <div className="flex flex-col items-end justify-between">
          <h1 className="text-white font-bold text-2xl text-end " dir="ltr">
            {t(item.title)}
          </h1>
          <p className="text-white text-end">{t(item.description)}</p>
          <PointsIndicator points={item.points} color="text-black bg-white" />
        </div>
      </div>

      <div className="flex flex-col gap-5 items-center justify-between h-full w-full mt-5 overflow-y-auto">
        {SanabelSeyamData.map((item, index) => (
          <div
            key={index}
            className={`flex w-full flex-col items-end justify-between sanabel-shadow-bottom h-full rounded-xl p-4 gap-2 border-t-2 border-t-redprimary`}
          >
            <div className="flex w-full justify-between ">
              {item.done && (
                <h1 className="text-gray-400 text-sm">
                  {t("اكتمل منذ دقتين")}
                </h1>
              )}
              {item.done && (
                <div className={`flex-center  text-[#498200]`}>
                  <h1> {t("تمت")}</h1>
                  <Tickcircle />
                </div>
              )}
            </div>
            <div className="flex-center items-end gap-3">
              <h1 className="text-black text-xl">{item.title}</h1>
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
        ))}
      </div>
    </div>
  );
};

export default SanabelSeyam;
