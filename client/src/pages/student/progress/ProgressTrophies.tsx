import StudentNavbar from "../../../components/navbar/StudentNavbar";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import trophy from "../../../assets/trophy.png";

// Sanabel
import blueSanabel from "../../../assets/resources/سنبلة زرقاء.png";
import redSanabel from "../../../assets/resources/سنبلة حمراء.png";
import yellowSanabel from "../../../assets/resources/سنبلة صفراء.png";
import xpIcon from "../../../assets/resources/اكس بي.png";

// Trophies

import xpTrophy from "../../../assets/trophies/Other Trophies/اكس-بي.png";
import challengesTrophy from "../../../assets/trophies/Other Trophies/التحديات.png";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const Progress: React.FC = () => {
  const { t } = useTranslation();
  const [trophyType, setTrophyType] = useState(0);

  //   Variables TEST
  const rewards = [
    { value: 2, icon: blueSanabel },
    { value: 2, icon: redSanabel },
    { value: 2, icon: yellowSanabel },
    { value: 5, icon: xpIcon },
  ];
  const currentXp = 13;
  const neededXp = 25;

  const trophyCount = [1, 5, 10, 25, 50, 75, 100, 1000, 2500];
  return (
    <div className="flex flex-col gap-3 w-full h-3/4 overflow-y-auto ">
      <div className="flex w-full rounded-2xl bg-[#e6e6e6]">
        <h1
          className={`text-[#999] text-sm p-2 rounded-2xl w-1/2 flex-center ${
            trophyType === 1 && "bg-yellowprimary text-white"
          }`}
          onClick={() => setTrophyType(1)}
        >
          {t("جوائز أخري")}
        </h1>
        <h1
          className={`text-[#999] text-sm p-2 rounded-2xl w-1/2 flex-center ${
            trophyType === 0 && "bg-yellowprimary text-white"
          }`}
          onClick={() => setTrophyType(0)}
        >
          {t("جوائز السنابل")}
        </h1>
      </div>

      <motion.div
        className="w-full bg-[#E14E54] flex-center justify-between items-center p-1 gap-3 rounded-2xl text-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-white font-bold"
          dir="ltr"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          3 / 50
        </motion.h1>

        <motion.h1
          className="text-white font-bold"
          dir="ltr"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {t("مجموع الجوائز")}
        </motion.h1>

        <motion.img
          src={trophy}
          alt=""
          className="w-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, ease: "backOut" }}
        />
      </motion.div>

      <div className="w-full flex flex-col justify-between items-center shadow-sm p-3 rounded-xl border-[1px] gap-2">
        <div className="w-full flex  justify-between items-center">
          <div className="flex gap-2">
            {rewards?.map((item) => (
              <div className="flex-col flex-center">
                <img src={item.icon} alt="icon" className="w-auto h-6" />
                <h1 className="text-black text-sm"> {item.value}</h1>
              </div>
            ))}
          </div>
          <div className="flex flex-center flex-col gap-1">
            <img src={xpTrophy} alt="trophy" className={"w-16"} />
            <h1 className="text-black font-bold text-end w-full">
              {t("XPجائزة الـ")}
            </h1>
          </div>
        </div>

        <p className="text-black text-sm text-end w-full">
          {t("أحصل على 1200 XP لتحصل على المكافأة")}
        </p>

        <div className="w-full bg-[#fab70050] rounded-3xl h-6 flex justify-end items-center relative overflow-hidden">
          {/* Text displaying current and needed XP */}
          <h1 className="text-[#997000] px-3 relative z-10">
            {currentXp}
            <span className="text-black">/{neededXp}</span>
          </h1>

          {/* Progress bar */}
          <motion.div
            className="bg-[#F3B14E] rounded-3xl h-6 absolute top-0 right-0"
            initial={{ width: 0 }}
            animate={{ width: `${(currentXp / neededXp) * 100}%` }}
            transition={{ duration: 0.5 }}
          ></motion.div>
        </div>

        <div className="w-full flex justify-around">
          {trophyCount.map((item) => (
            <div
              className="flex-center
             bg-[#FFF8E5]1  
             bg-[#FAB700] 
             w-auto px-2 h-6  rounded-full"
            >
              <h1 className="text-xs text-black font-bold">{item}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Progress;
