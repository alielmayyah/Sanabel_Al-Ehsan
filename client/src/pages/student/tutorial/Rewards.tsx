import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

import blueSanabel from "../../../assets/resources/سنبلة زرقاء.png";
import redSanabel from "../../../assets/resources/سنبلة حمراء.png";
import yellowSanabel from "../../../assets/resources/سنبلة صفراء.png";
import xpIcon from "../../../assets/resources/اكس بي.png";

import missionImg from "../../../assets/target.png";
// Define the resources that can be earned
const resources = [
  {
    icon: blueSanabel,
    name: "سنبلة زرقاء",
    value: 2,
    color: "bg-blue-100",
    textColor: "text-blue-700",
    borderColor: "border-blue-300",
  },
  {
    icon: redSanabel,
    name: "سنبلة حمراء",
    value: 2,
    color: "bg-red-100",
    textColor: "text-red-700",
    borderColor: "border-red-300",
  },
  {
    icon: yellowSanabel,
    name: "سنبلة صفراء",
    value: 2,
    color: "bg-yellow-100",
    textColor: "text-yellow-700",
    borderColor: "border-yellow-300",
  },
];
const xpResource = {
  icon: xpIcon,
  name: "نقاط خبرة",
  value: 5,
  color: "bg-purple-100",
  textColor: "text-purple-700",
  borderColor: "border-purple-300",
};

// Animation variants for the container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

// Animation variants for each item
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

const Rewards: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex-center gap-6 flex-col w-full   h-full py-4">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center flex-center gap-4 flex-col w-full"
      >
        <motion.img
          src={missionImg}
          alt="Mission Target"
          className="h-24 w-24 object-contain mb-4 animate-pulse"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        <motion.h1
          className="text-3xl text-black font-boldtext-amber-800   mb-3"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          {t("مكافآت إكمال المهمة")}
        </motion.h1>
        <p className="text-gray-600 mb-4 w-5/6 text-center">
          {t("عند إكمال المهام، ستحصل على المكافآت الرائعة!")}
        </p>
      </motion.div>

      <motion.div
        className="flex-center flex-col gap-4 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="p-1 bg-gradient-to-br w-full flex-center flex-col gap-3 rounded-2xl shadow-sm "
          variants={itemVariants}
        >
          <div className="flex justify-between w-full gap-2">
            {resources.map((resource, index) => (
              <motion.div
                key={index}
                className={`flex-1 bg-white rounded-xl p-3 text-center shadow-sm border hover:shadow-md transition-all duration-300 ${resource.borderColor}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="h-16 flex items-center justify-center mb-2">
                  <img
                    src={resource.icon}
                    alt={resource.name}
                    className="h-12 w-12 object-contain"
                  />
                </div>
                <p className="text-xs text-gray-600 mb-2">{t(resource.name)}</p>
                <div
                  className={`
                  w-10 h-10 mx-auto rounded-full flex items-center justify-center 
                  ${resource.color} ${resource.borderColor} border-2
                `}
                >
                  <p className={`font-bold ${resource.textColor}`}>
                    +{resource.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          {/* XP Resource */}
          <motion.div
            variants={itemVariants}
            className={` p-4 rounded-2xl shadow-md border border-purple-200 flex items-center justify-between w-full ${xpResource.borderColor}`}
          >
            <div
              className={`
                w-12 h-12 rounded-full flex items-center justify-center 
                ${xpResource.color} ${xpResource.borderColor} border-2
                `}
            >
              <p className={`font-bold ${xpResource.textColor}`}>
                +{xpResource.value}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-sm text-gray-700">{t(xpResource.name)}</p>
              <img
                src={xpResource.icon}
                alt={xpResource.name}
                className="h-12 w-12 object-contain"
              />
              <div></div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Rewards;
