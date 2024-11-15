import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

import missionsAnimation from "../../../../assets/missions.json";

import GoBackButton from "../../../../components/GoBackButton";
import PointsIndicator from "../../../../components/PointsIndicator";

import SanabelArrow from "../../../../icons/SanabelArrow";

import dailyMissionsData from "../../../../data/dailyMissionsData";
import weeklyMissionsData from "../../../../data/dailyMissionsData";
import Lottie from "lottie-react";

const Missions: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const [selectMissionType, setSelectMissionType] = useState("daily");
  return (
    <div className="flex flex-col h-screen w-full items-center justify-between gap-3 p-4">
      <div className="flex items-center w-full justify-between">
        <Lottie
          animationData={missionsAnimation} // Load your Lottie JSON animation
          loop={true} // Optional: Set to true to loop the animation
          className="w-16 h-16  bg-redprimary rounded-full"
        />

        <h1 className="text-black font-bold text-2xl self-center" dir="ltr">
          {t("تحديات الإحسان")}
        </h1>

        <GoBackButton />
      </div>

      <div className="flex w-full bg-[#E6E6E6] rounded-3xl justify-between p-1">
        <div
          className={`w-full text-center py-1 rounded-3xl ${
            selectMissionType == "weekly"
              ? "bg-redprimary text-white"
              : "text-[#999]"
          }`}
          onClick={() => setSelectMissionType("weekly")}
        >
          <h1>{t("اسبوعية")}</h1>
        </div>
        <div
          className={`w-full text-center py-1 rounded-3xl ${
            selectMissionType == "daily"
              ? "bg-redprimary text-white"
              : "text-[#999]"
          }`}
          onClick={() => setSelectMissionType("daily")}
        >
          <h1>{t("يومية")}</h1>
        </div>
      </div>
      <div
        className={`w-full ${
          selectMissionType == "weekly" ? "bg-redprimary " : "bg-redprimary"
        } h-20 rounded-xl flex items-center justify-between p-5 `}
      >
        <PointsIndicator points={200} color={`text-black bg-white`} />
        <h1> {t("مجموع الحسنات")}</h1>
      </div>

      <div className="flex flex-col mt-4 justify-between gap-4 items-center overflow-y-auto w-full">
        {(selectMissionType === "daily"
          ? dailyMissionsData
          : weeklyMissionsData
        ).map((items, index) => {
          // Cycle through the colors based on the index
          let colors = [
            "text-redprimary",
            "text-blueprimary",
            "text-yellowprimary",
          ];

          const colorClass = colors[index % colors.length]; // Rotate colors using modulo

          // Define border color class explicitly
          const borderTopClass =
            colorClass === "text-redprimary"
              ? "border-t-redprimary"
              : colorClass === "text-blueprimary"
              ? "border-t-blueprimary"
              : "border-t-yellowprimary";

          const backgroundClass =
            colorClass === "text-redprimary"
              ? "bg-redprimary"
              : colorClass === "text-blueprimary"
              ? "bg-blueprimary"
              : "bg-yellowprimary";
          return (
            <div
              key={index}
              className={`w-full ${borderTopClass} border-t-2  sanabel-shadow-bottom rounded-3xl flex flex-col p-4 px-3`}
              onClick={() =>
                history.push(`/student/missions/${selectMissionType}/${index}`)
              }
            >
              <div className="flex w-full justify-between">
                <PointsIndicator points={200} color={`${backgroundClass}`} />
                <img src={items.img} alt="" className="h-16 w-16" />
              </div>
              <div className="w-full flex flex-col items-end">
                <div className="flex-center gap-2">
                  <SanabelArrow className={`text-white`} />
                  <h1 className={`text-[#040415] text-end text-lg`}>
                    {items.title}
                  </h1>
                </div>
                <p className={`text-[#999999] text-xs text-end w-full`}>
                  {items.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Missions;
