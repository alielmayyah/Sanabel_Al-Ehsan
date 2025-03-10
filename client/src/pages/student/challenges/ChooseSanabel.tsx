import { useTranslation } from "react-i18next";
import { useState } from "react";

import { delay, motion } from "framer-motion";

import { useHistory, useParams } from "react-router-dom";

import sanabelTypeData from "../../../data/SanabelTypeData";
import GoBackButton from "../../../components/GoBackButton";

const SanabelType: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { index } = useParams<{ index: any }>();
  const sanabel = sanabelTypeData[parseInt(index, 10)];

  let colors = [];

  colors = [
    "border-t-blueprimary",
    "border-t-redprimary",
    "border-t-yellowprimary",
    "border-t-greenprimary",
  ];

  const colorBG = colors[index % colors.length];

  // Animation variants for stagger effect
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between each child animation
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 }, // Start hidden and slightly below
    visible: { opacity: 1, y: 0 }, // Animate to visible and original position
  };

  return (
    <motion.div
      className="flex flex-col h-screen w-full items-center p-3"
      initial={{ opacity: 0, y: 50 }} // Start hidden and slightly below
      animate={{ opacity: 1, y: 0 }} // Animate to visible and original position
      exit={{ opacity: 0, y: -50 }} // Exit animation (if applicable)
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <motion.div
        className="flex items-center w-full justify-between"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <motion.img
          src={sanabel.img}
          alt=""
          className="h-20"
          initial={{ rotate: -10, scale: 0.9 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        <div className="w-[43px]">
          <GoBackButton />
        </div>
      </motion.div>

      {/* Title */}
      <motion.h1
        className="text-black font-bold text-[16px] text-end my-2"
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0, ease: "easeOut" }}
      >
        {t(sanabel.name)}
      </motion.h1>

      {/* Grid with stagger animation */}
      <motion.div
        className="grid grid-cols-2 content-start w-full h-full gap-2 align-top overflow-y-auto p-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {sanabel.sanabel.map((item, idx) => (
          <motion.div
            key={idx}
            className={`w-full ${colorBG} border-t-2 flex-center p-2 py-3 flex-col gap-3
            rounded-lg mt-4 shadow-md h-36`}
            variants={itemVariants}
            custom={idx}
            onClick={() => history.push(`/student/sanabel/${index}/${idx}`)}
          >
            <img src={item.img} alt="" className="w-2/5" />
            <h1 className="text-black font-bold text-sm text-center">
              {item.name}
            </h1>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default SanabelType;
