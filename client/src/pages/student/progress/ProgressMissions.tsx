import StudentNavbar from "../../../components/navbar/StudentNavbar";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

// Sanabel type

import sanabelType1Img from "../../../assets/sanabeltype/سنابل الإحسان في العلاقة مع الأسرة والمجتمع.png";
import sanabelType2Img from "../../../assets/sanabeltype/سنابل الإحسان في العلاقة مع النفس.png";
import sanabelType3Img from "../../../assets/sanabeltype/سنابل-الإحسان-في-العلاقة-مع-الأرض-والكون.png";
import sanabelType4Img from "../../../assets/sanabeltype/سنابل-الإحسان-في-العلاقة-مع-الله.png";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// Sanabel
import blueSanabel from "../../../assets/resources/سنبلة زرقاء.png";
import redSanabel from "../../../assets/resources/سنبلة حمراء.png";
import yellowSanabel from "../../../assets/resources/سنبلة صفراء.png";
import mixedSanabel from "../../../assets/resources/سنابل.png";

// Navbar

import missionsDoneImg from "../../../assets/target.png";

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

// Define the colors for the chart
const COLORS = ["#FAB700", "#E14E54", "#495638", "#4AAAD6"];

interface sanabelColor {
  name: string;
  value: number;
}
const sanabelCOLORS = ["#FAB700", "#E14E54", "#4AAAD6"];
const sanabelColor = [{ value: 25 }, { value: 40 }, { value: 20 }];
const totalSanabel = sanabelColor.reduce((acc, item) => acc + item.value, 0);

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

const ProgressMissions: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-3 w-full h-3/4 overflow-y-auto ">
      <motion.div
        className="w-full bg-[#E14E54] flex-center justify-between items-center p-2 gap-3 rounded-xl text-lg"
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

      <div className="flex justify-center items-center w-full h-[350px] relative">
        <PieChart width={window.innerWidth - 50} height={350}>
          <Pie
            data={sanabelType}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={120}
            fill="#8884d8"
            paddingAngle={0}
            label={({ name, value }) =>
              ` ${((value / total) * 100).toFixed(1)}%`
            }
            labelLine={false}
          >
            {sanabelType.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
        <img
          src={missionsDoneImg}
          alt=""
          className="w-1/4 absolute top-1/2 left-2/4 transform -translate-x-1/2 -translate-y-3/4"
        />
      </div>

      <div className="w-full bg-[#495638] flex-center justify-between items-center p-2 gap-2  rounded-xl text-md">
        <img src={blueSanabel} className="h-6" alt="" />
        <h1>x{sanabelColor[0].value}</h1>
        <img src={yellowSanabel} className="h-6" alt="" />
        <h1>x{sanabelColor[1].value}</h1>
        <img src={redSanabel} className="h-6" alt="" />
        <h1>x{sanabelColor[2].value}</h1>
        <h1 className="text-white font-bold text-md " dir="ltr">
          {t("إجمالي السنابل")}
        </h1>
        <img src={mixedSanabel} alt="" className="w-8" />
      </div>

      <div className="flex justify-center items-center w-full relative">
        <PieChart width={window.innerWidth} height={350}>
          <Pie
            data={sanabelColor}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={120}
            fill="#8884d8"
            paddingAngle={0}
            label={({ value }) =>
              ` ${((value / totalSanabel) * 100).toFixed(0)}%`
            }
            labelLine={false}
          >
            {sanabelType.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={sanabelCOLORS[index % sanabelCOLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
        <img
          src={mixedSanabel}
          alt=""
          className="w-1/4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  );
};

export default ProgressMissions;
