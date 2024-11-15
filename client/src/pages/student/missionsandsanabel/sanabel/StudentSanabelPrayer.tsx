import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import sanabelData from "../../../../data/SanabelData";
import GoBackButton from "../../../../components/GoBackButton";
import PointsIndicator from "../../../../components/PointsIndicator";

import Fajr from "../../../../icons/Sanabel/prayer/Fajr";
import Duhr from "../../../../icons/Sanabel/prayer/Duhr";
import Asr from "../../../../icons/Sanabel/prayer/Asr";
import Maghrib from "../../../../icons/Sanabel/prayer/Maghrib";
import Asha from "../../../../icons/Sanabel/prayer/Asha";
import Leil from "../../../../icons/Sanabel/prayer/Leil";
import Tickcircle from "../../../../icons/Sanabel/Tickcircle";

import Loading from "../../../../components/Loading";

// Fetch prayer times using a sample API
const fetchPrayerTimes = async () => {
  const response = await fetch(
    `https://api.aladhan.com/v1/timingsByCity?city=Cairo&country=Egypt`
  );
  const data = await response.json();
  return data.data.timings;
};

// Format time to AM/PM format
const formatTimeToAMPM = (time: string) => {
  const [hour, minute] = time.split(":");
  const date = new Date();
  date.setHours(parseInt(hour, 10));
  date.setMinutes(parseInt(minute, 10));
  return date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

const SanabelPrayer: React.FC = () => {
  const { index } = useParams<{ index: string }>();
  const item = sanabelData[parseInt(index, 10)];
  const { t } = useTranslation();

  const [prayerTimes, setPrayerTimes] = useState<any>({});
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const getPrayerTimes = async () => {
      const timings = await fetchPrayerTimes();
      setPrayerTimes(timings);
      setLoading(false); // Set loading to false after data is fetched
    };
    getPrayerTimes();
  }, []);

  // Get current time
  const currentTime = new Date();

  const SanabelPrayerData = [
    {
      title: "صلاة الفجر",
      icon: <Fajr size={40} />,
      time: prayerTimes.Fajr,
      done: true,
      comment: "لقد قام باداء صلاة الفجر في مسجد المدرسة",
    },
    {
      title: "صلاة الظهر",
      icon: <Duhr size={40} />,
      time: prayerTimes.Dhuhr,
      done: true,
    },
    {
      title: "صلاة العصر",
      icon: <Asr size={40} />,
      time: prayerTimes.Asr,
      done: false,
    },
    {
      title: "صلاة المغرب",
      icon: <Maghrib size={40} />,
      time: prayerTimes.Maghrib,
      done: false,
    },
    {
      title: "صلاة العشاء",
      icon: <Asha size={40} />,
      time: prayerTimes.Isha,
      done: true,
    },
    // { title: "صلاة قيام الليل", icon: <Leil size={40} />, done: false },
  ].sort((a, b) => {
    const timeA = new Date(`1970-01-01T${a.time || "00:00"}:00`).getTime();
    const timeB = new Date(`1970-01-01T${b.time || "00:00"}:00`).getTime();
    const currentTimeMs = new Date(
      `1970-01-01T${currentTime.getHours()}:${currentTime.getMinutes()}:00`
    ).getTime();

    // Sort by upcoming prayers first, then past ones
    if (timeA < currentTimeMs && timeB >= currentTimeMs) return 1;
    if (timeA >= currentTimeMs && timeB < currentTimeMs) return -1;
    return timeA - timeB; // Otherwise, sort by time
  });

  if (loading) {
    return <Loading />; // Loading state
  }

  return (
    <div className="flex flex-col h-screen w-full items-center p-4 ">
      <div className="flex items-center w-full justify-between">
        <div className="opacity-0 w-[25px] h-25" />
        <h1 className="text-black font-bold text-2xl self-center" dir="ltr">
          {t(item.title)}
        </h1>
        <GoBackButton />
      </div>

      <div className="w-full bg-blueprimary flex justify-between p-5 rounded-lg h-44 mt-8">
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
        {SanabelPrayerData.map((item, index) => (
          <div
            key={index}
            className={`flex w-full flex-col items-end justify-between sanabel-shadow-bottom h-full rounded-xl p-4 gap-2 border-t-2 border-t-blueprimary`}
          >
            <div className="flex w-full justify-between ">
              {item.done ? (
                <h1 className="text-gray-400 text-sm">
                  {t("اكتمل منذ دقتين")}
                </h1>
              ) : (
                item.time && (
                  <h1 className="text-black text-sm">
                    {formatTimeToAMPM(item.time)} <br />
                  </h1>
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
              <h1 className="text-black text-xl">{item.title}</h1>
              <div className="border-2 flex-center rounded-full">
                {item.icon}
              </div>
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

export default SanabelPrayer;
