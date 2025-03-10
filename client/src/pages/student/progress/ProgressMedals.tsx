import StudentNavbar from "../../../components/navbar/StudentNavbar";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import xpIcon from "../../../assets/resources/اكس بي.png";
import lock from "../../../icons/lock.svg";
// Medals

import { medalsImgs } from "../../../data/Medals";

const medalsData = [
  { title: "مبتدئ", img: medalsImgs[0], level: "1" },
  { title: "مستجد", img: medalsImgs[1], level: "5" },
  { title: "موهوب", img: medalsImgs[2], level: "10" },
  { title: "ماهر", img: medalsImgs[3], level: "25" },
  { title: "بارع", img: medalsImgs[4], level: "50" },
  { title: "متمرس", img: medalsImgs[5], level: "75" },
  { title: "متقدم", img: medalsImgs[6], level: "100" },
  { title: "متقن", img: medalsImgs[7], level: "150" },
  { title: "خبير", img: medalsImgs[8], level: "200" },
];
const calculateLevel = (totalXp: number) => {
  const baseXp = 10;
  const increment = 5;
  let level = 1;
  let xpForNextLevel = baseXp;

  while (totalXp >= xpForNextLevel) {
    totalXp -= xpForNextLevel;
    level++;
    xpForNextLevel = baseXp + increment * (level - 1);
  }
  return { level, remainingXp: totalXp, xpForNextLevel };
};

const calculateXpForLevel = (targetLevel: any) => {
  const baseXp = 10;
  const increment = 5;

  let totalXp = 0;

  for (let level = 1; level < targetLevel; level++) {
    totalXp += baseXp + increment * (level - 1);
  }

  return totalXp;
};

const Progress: React.FC = () => {
  const { t } = useTranslation();

  const [xp, setXp] = useState(1745);

  const { level, remainingXp, xpForNextLevel } = calculateLevel(xp);

  const currentXp = remainingXp; // XP within the current level
  const neededXp = xpForNextLevel; // XP required to reach the next level

  // Update level and medal
  const [medalImgTracker, setMedalImgTracker] = useState(0);
  useEffect(() => {
    if (level < 5) {
      setMedalImgTracker(0);
    } else if (level >= 5 && level < 10) {
      setMedalImgTracker(1);
    } else if (level >= 10 && level < 25) {
      setMedalImgTracker(2);
    } else if (level >= 25 && level < 50) {
      setMedalImgTracker(3);
    } else if (level >= 50 && level < 75) {
      setMedalImgTracker(4);
    } else if (level >= 75 && level < 100) {
      setMedalImgTracker(5);
    } else if (level >= 100 && level < 150) {
      setMedalImgTracker(6);
    } else if (level >= 150 && level < 200) {
      setMedalImgTracker(7);
    } else {
      setMedalImgTracker(8);
    }
  }, [xp]);

  return (
    <motion.div
      className="flex flex-col gap-1 w-full h-3/4 "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex flex-col gap-1 rounded-xl w-full p-2 relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        {/* Medal and Level */}
        <motion.div
          className="flex-center flex-col gap-3 w-full"
          key={level}
          initial={{ rotate: -15, scale: 0.5 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <img
            src={medalsData[medalImgTracker].img}
            alt={`Medal`}
            className="w-28 h-28"
          />
          <p className="text-lg font-bold text-black">
            {t("المستوى")} {level}
          </p>
        </motion.div>

        <div className="w-full bg-[#fab70050] rounded-3xl h-8 flex justify-end items-center relative overflow-hidden">
          {/* Text displaying current and needed XP */}
          <h1 className="text-[#997000] px-3 relative z-10">
            {currentXp}
            <span className="text-black">/{neededXp}</span>
          </h1>

          {/* Progress bar */}
          <motion.div
            className="bg-[#F3B14E] rounded-3xl h-8 absolute top-0 right-0"
            initial={{ width: 0 }}
            animate={{ width: `${(currentXp / neededXp) * 100}%` }}
            transition={{ duration: 0.5 }}
          ></motion.div>
        </div>

        <div className="w-full flex justify-between items-center text-sm">
          <h1 className="text-[#999999]">{t("المستوي التالي")}</h1>
          <h1 className="text-[#999999]">{t(`تم إنجاز ${currentXp} نقطة`)}</h1>
        </div>
      </motion.div>

      <div className="w-full flex justify-between items-center rounded-xl bg-greenprimary p-3">
        <motion.h1
          className="text-white font-bold text-sm"
          animate={{ scale: 1.1 }}
          transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
        >
          {xp}
        </motion.h1>

        <div className="flex gap-3">
          <h1 className="text-white font-bold text-sm">{t("مجموع اكس بي")}</h1>
          <img src={xpIcon} alt="xp" className="w-auto h-6" />
        </div>
      </div>

      <motion.div
        className="flex w-full justify-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h1 className=" text-redprimary">(2 / 9) </h1>
        &ensp;
        <h1 className=" text-black">{t("الميداليات")}</h1>
      </motion.div>
      <motion.div
        className="grid grid-cols-2 gap-2 h-3/4 overflow-y-auto"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {medalsData.map((item) => (
          <motion.div
            className="flex flex-center flex-col p-3 shadow-md border-[1px] rounded-lg"
            key={item.level}
            variants={{
              hidden: { scale: 0.8, opacity: 0 },
              visible: { scale: 1, opacity: 1 },
            }}
          >
            {xp < calculateXpForLevel(item.level) && (
              <div className="flex w-full  items-center justify-between">
                <div className="flex-center gap-2 w-full  bg-yellowprimary rounded-xl p-1 ">
                  <h1 className="flex-center  text-white text-sm font-bold ">
                    {calculateXpForLevel(item.level)}
                  </h1>
                  <img src={xpIcon} alt="xp" className="h-5" />
                </div>
                <img src={lock} alt="lock" className="" />
              </div>
            )}

            <div
              className={`flex-center flex-col w-full  ${
                xp < calculateXpForLevel(item.level) && "opacity-60"
              }`}
            >
              <img src={item.img} alt="" className="w-1/2" />
              <h1 className="text-black font-bold text-xl">{t(item.title)}</h1>
              <h1 className="text-blueprimary">
                {t(item.level)} {t("المستوي")}
              </h1>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Progress;
