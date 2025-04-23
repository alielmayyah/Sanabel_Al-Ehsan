import sanabelType1Img from "../../../assets/sanabeltype/سنابل الإحسان في العلاقة مع الأسرة والمجتمع.png";
import sanabelType2Img from "../../../assets/sanabeltype/سنابل الإحسان في العلاقة مع النفس.png";
import sanabelType3Img from "../../../assets/sanabeltype/سنابل-الإحسان-في-العلاقة-مع-الأرض-والكون.png";
import sanabelType4Img from "../../../assets/sanabeltype/سنابل-الإحسان-في-العلاقة-مع-الله.png";

import StudentNavbar from "../../../components/navbar/StudentNavbar";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../context/ThemeContext";

// overview icons
import { useUserContext } from "../../../context/StudentUserProvider";
import { motion } from "framer-motion";
import missionsDoneImg from "../../../assets/target.png";
import { medalsImgs } from "../../../data/Medals";
import MedalAndLevel from "../../../components/MedalAndLevel";
import { medalsData } from "../../../data/MedalsData";
import { calculateLevel } from "../../../utils/LevelCalculator";
// Define the data structure for the chart

interface sanabelType {
  name: string;
  value: number;
}

const sanabelType = [
  { name: "العلاقة مع الله", img: sanabelType1Img, value: 140 },
  { name: "العلاقة مع النفس", img: sanabelType2Img, value: 60 },
  { name: "العلاقة مع الاسرة", img: sanabelType3Img, value: 75 },
  { name: "العلاقة مع الكوكب", img: sanabelType4Img, value: 125 },
];

const total = sanabelType.reduce((acc, item) => acc + item.value, 0);

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

const gridItemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (index: number) => ({
    opacity: 1,
    y: 10,
    transition: {
      delay: index * 0.1,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

const Profile: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const history = useHistory();
  const { t } = useTranslation();
  const { user } = useUserContext();
  const xp = Number(user?.xp);

  const { level, remainingXp, xpForNextLevel } = calculateLevel(xp);

  return (
    <div
      className="flex flex-col h-full w-full items-start justify-start z-10 p-4 overflow-y-auto "
      id="page-height"
    >
      <MedalAndLevel level={level} color={"text-black text-sm"} dir={""} />

      <div className="flex flex-col gap-1">
        <motion.div
          className="w-full bg-[#E14E54] flex-center justify-between items-center p-1 gap-3 rounded-xl text-md"
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
            {sanabelType[0].value +
              sanabelType[1].value +
              sanabelType[2].value +
              sanabelType[3].value}
          </motion.h1>

          <motion.h1
            className="text-white font-bold"
            dir="ltr"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {t("مجموع التحديات")}
          </motion.h1>

          <motion.img
            src={missionsDoneImg}
            alt=""
            className="w-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, ease: "backOut" }}
          />
        </motion.div>
        <motion.div
          className="grid grid-cols-2 w-full gap-2"
          initial="hidden"
          animate="visible"
        >
          {sanabelType.map((items, index) => (
            <motion.div
              className="flex justify-start flex-col border-t-2 border-[#E14E54] rounded-2xl w-full p-1"
              key={index}
              variants={gridItemVariants}
              custom={index}
            >
              <div className="flex justify-between items-center w-full">
                <h1 className="text-[#E14E54] font-bold text-xl">
                  {items.value}
                </h1>
                <img src={items.img} alt="sanabel" className="w-1/3" />
              </div>
              <h1 className="text-black font-bold text-end">{items.name}</h1>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
