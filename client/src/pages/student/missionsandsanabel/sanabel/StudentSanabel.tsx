import { useHistory } from "react-router-dom";

import { useTranslation } from "react-i18next";

// Import Images

import GoBackButton from "../../../../components/GoBackButton";
import PointsIndicator from "../../../../components/PointsIndicator";

import SanabelArrow from "../../../../icons/SanabelArrow";
import sanabelData from "../../../../data/SanabelData";
import { useEffect, useRef, useState } from "react";
import sanabelVideo from "../../../../assets/sanabelAnimation.mp4";

const Sanabel: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const [selectMissionType, setSelectMissionType] = useState("daily");
  // Ref for the video element
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.5; // Set playback rate to 2x
    }
  }, []);

  return (
    <div className="flex flex-col h-screen w-full items-center justify-between  gap-3 p-4">
      <div className="flex items-center w-full justify-between">
     
          <video
            ref={videoRef}
            src={sanabelVideo}
            autoPlay
            loop
            muted
            preload="metadata"
            className="w-16 h-16"
          />
  
        {/* <div className="opacity-0 w-[25px] h-25" /> */}

        <h1 className="text-black font-bold text-2xl self-center" dir="ltr">
          {t("سنابل الاحسان")}
        </h1>

        <GoBackButton />
      </div>

      <div className="flex w-full bg-[#E6E6E6] rounded-3xl justify-between p-1">
        <div
          className={`w-full text-center py-1 rounded-3xl ${
            selectMissionType == "weekly"
              ? "bg-blueprimary text-white"
              : "text-[#999]"
          }`}
          onClick={() => setSelectMissionType("weekly")}
        >
          <h1>{t("type1")}</h1>
        </div>
        <div
          className={`w-full text-center py-1 rounded-3xl ${
            selectMissionType == "daily"
              ? "bg-blueprimary text-white"
              : "text-[#999]"
          }`}
          onClick={() => setSelectMissionType("daily")}
        >
          <h1>{t("type2")}</h1>
        </div>
        <div
          className={`w-full text-center py-1 rounded-3xl ${
            selectMissionType == "daily"
              ? "bg-blueprimary text-white"
              : "text-[#999]"
          }`}
          onClick={() => setSelectMissionType("daily")}
        >
          <h1>{t("type3")}</h1>
        </div>
      </div>
      <div className="w-full bg-blueprimary h-20 rounded-xl flex items-center justify-between p-5 my-5">
        <PointsIndicator points={200} color={`text-black bg-white`} />
        <h1> {t("مجموع الحسنات")}</h1>
      </div>

      <div className="flex flex-col mt-4 justify-between gap-4 items-center overflow-y-auto w-full">
        {sanabelData.map((items, index) => {
          // Cycle through the colors based on the index
          const colors = [
            "text-blueprimary",
            "text-redprimary",
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
              onClick={() => history.push(`/student/sanabel/${index}`)}
            >
              <div className="flex w-full justify-between">
                <PointsIndicator points={200} color={`${backgroundClass}`} />
                <img src={items.img} alt="" className="h-16 w-16" />
              </div>
              <div className="w-full flex flex-col items-end">
                <div className="flex-center gap-2">
                  <SanabelArrow className={`${colorClass}`} />
                  <h1 className={`${colorClass} text-end text-lg`}>
                    {items.title}
                  </h1>
                </div>
                <p className={`${colorClass} text-xs text-end w-full`}>
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

export default Sanabel;
