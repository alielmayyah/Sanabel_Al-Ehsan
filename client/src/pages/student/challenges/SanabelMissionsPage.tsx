import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import GoBackButton from "../../../components/GoBackButton";

import Tickcircle from "../../../icons/Sanabel/Tickcircle";
import { FaLocationArrow } from "react-icons/fa";

import sanabelType from "../../../data/SanabelTypeData";
import PrayerTimes from "./PrayerTimes";
const SanabelMissionsPage: React.FC = () => {
  const { index, subIndex } = useParams<{ index: any; subIndex: any }>();
  const sanabel = sanabelType[index].sanabel[subIndex];
  const { t } = useTranslation();

  const sanabelIndex = index;
  console.log(index);
  console.log(subIndex);

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

  const doneArray = [true, false, false, true, false];

  const [location, setLocation] = useState<string>(
    localStorage.getItem("selectedLocation") || "الإسكندرية" // Default to "الإسكندرية"
  );

  // Add a list of available cities
  const availableCities = [
    "القاهرة",
    "الإسكندرية",
    // "طنطا",
    // "أسيوط",
    // "المنصورة",
  ];

  // Save location to localStorage when it changes
  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
    localStorage.setItem("selectedLocation", newLocation);
  };

  return (
    <div className="flex flex-col h-screen w-full items-center p-4 ">
      <div className="flex items-center w-full justify-between">
        <div className="opacity-0 w-[25px] h-25" />
        <h1 className="text-black font-bold text-2xl self-center" dir="ltr">
          {t(sanabel.name)}
        </h1>
        <GoBackButton />
      </div>
      <div
        className={`w-full ${colorBG} flex justify-between items-center  p-5 rounded-lg  mt-8`}
      >
        <img
          src={sanabel.img}
          alt={sanabel.name}
          className="w-1/3 object-contain"
        />

        <div className="flex flex-col justify-between gap-3">
          <h1 className="text-white font-bold text-xl text-center ">
            <span>{t("تحديات")}</span>
            <br></br>
            {t(sanabel.name)}
          </h1>
          {index == 0 && subIndex == 0 && (
            <div className="flex flex-col items-center w-full scale-90">
              <div className="flex items-center gap-1 border-2 border-gray-300 rounded-lg p-1">
                <FaLocationArrow className="text-white" />
                <select
                  className="bg-transparent text-white border-none outline-none px-2 py-1 rounded-lg cursor-pointer "
                  value={location}
                  onChange={(e) => handleLocationChange(e.target.value)}
                >
                  {availableCities.map((city) => (
                    <option
                      key={city}
                      value={city}
                      className="text-black bg-white"
                    >
                      {t(city)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {index == 0 && subIndex == 0 && <PrayerTimes location={location} />}

      <div className="flex flex-col gap-5 items-center justify-between h-2/3 w-full mt-5 overflow-y-auto">
        {sanabel.missions.map((mission: string, index: number) => (
          <div
            key={index}
            className={`flex w-full flex-col items-end justify-between sanabel-shadow-bottom h-full rounded-xl p-4 gap-2 border-t-2 ${
              doneArray[index] == false
                ? `${colorBorderTop}`
                : "border-t-[#498200]"
            }`}
          >
            {doneArray[index] == true && (
              <div className="flex w-full justify-between">
                <div className="flex w-full justify-between ">
                  <h1 className="text-gray-400 text-sm">
                    {t("اكتمل منذ دقتين")}
                  </h1>

                  <div className={`flex-center  text-[#498200]`}>
                    <h1> {t("تمت")}</h1>
                    <Tickcircle />
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center w-full">
              <div className="flex gap-2 w-32">
                {sanabelType[sanabelIndex]?.rewards?.map((reward, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col items-center gap-0 ${
                      !doneArray[index] && "opacity-70"
                    }`}
                  >
                    <img
                      src={reward.icon}
                      alt="reward icon"
                      className="w-auto h-5"
                    />
                    <span className="text-black text-sm">{reward.value}</span>
                  </div>
                ))}
              </div>
              <h1 className="text-black text-end text-sm">{mission}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SanabelMissionsPage;
