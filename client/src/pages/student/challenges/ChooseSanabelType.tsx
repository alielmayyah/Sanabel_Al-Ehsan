import { useTranslation } from "react-i18next";
import { useState } from "react";

import { delay, motion } from "framer-motion";

import { useHistory } from "react-router-dom";
import StudentNavbar from "../../../components/navbar/StudentNavbar";
import SanabelArrow from "../../../icons/SanabelArrow";

import reminderImg from "../../../assets/توصيات عامة.svg";
import { FaCircleQuestion } from "react-icons/fa6";

import sanabelType from "../../../data/SanabelTypeData";

const SanabelType: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const [reminderPopup, setReminderPopup] = useState(
    localStorage.getItem("sanabelReminder") === null
  );

  const handleStartClick = () => {
    setReminderPopup(false);
    localStorage.setItem("sanabelReminder", "false");
  };

  const reminderData = [
    "️اختر عددًا من التحديات اليومية والأسبوعية بحسب وقتك وظروفك.",
    "️اجعل الهدف الرئيسي هو الإحسان في كل عمل تقوم به لتترك أثرًا إيجابيًا في نفسك ومحيطك.",
    "️الحرص على التوازن بين العلاقات وعدم إهمال أي جانب.",
    "️التدرج في الأهداف وتجنب إرهاق النفس في بداية التحدي.",
  ];

  const popupVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.5,
      },
    },
    exit: { y: "100%", opacity: 0, transition: { duration: 0.5 } },
  };

  const listItemVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: (index: number) => ({
      x: 0,
      opacity: 1,
      transition: { delay: index * 0.2, duration: 0.5 },
    }),
  };

  return (
    <motion.div
      className="flex flex-col h-full w-full items-center justify-between p-4 px-3 overflow-y-auto  "
      id="page-height"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Popup */}
      {reminderPopup && (
        <motion.div
          className="flex-col flex items-center justify-between w-screen h-[86vh] absolute bottom-0 rounded-t-3xl border-t-2  bg-white z-30 p-4"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={popupVariants}
        >
          {/* Image */}
          <motion.img
            src={reminderImg}
            loading="lazy"
            alt="Reminder"
            style={{ width: "170px" }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              duration: 0.5,
            }}
          />

          {/* Title */}
          <motion.h1
            className="font-bold text-2xl text-black"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {t("توصيات عامة")}
          </motion.h1>

          {/* List Items */}
          <div className="flex flex-col gap-2 items-end">
            {reminderData.map((item, index) => (
              <motion.div
                key={index}
                className="flex gap-2"
                custom={index}
                initial="hidden"
                animate="visible"
                variants={listItemVariants}
              >
                <p className="text-end text-[#333]">{t(item)}</p>
                <p>⭐</p>
              </motion.div>
            ))}
          </div>

          {/* Button */}
          <motion.div
            className="w-full bg-blueprimary rounded-2xl flex-center text-white p-3"
            onClick={handleStartClick}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {t("أبدا")}
          </motion.div>
        </motion.div>
      )}
      {/* Popup */}

      <div className="w-full flex justify-between items-center mb-4">
        <motion.div
          className="text-black font-bold  text-end"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          onClick={() => setReminderPopup(!reminderPopup)}
        >
          <FaCircleQuestion className="text-[#333] text-3xl" />
        </motion.div>

        <div className="flex flex-col gap-2 justify-center items-end w-full">
          <motion.h1
            className="text-black font-bold text-2xl text-end"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            {t("سنابل الإحسان")}
          </motion.h1>

          <motion.p
            className="text-[#B3B3B3] text-sm text-end"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {t("اختر سنبلة من سنابل الاحسان")}
          </motion.p>
        </div>
      </div>
      <motion.div
        className="flex flex-col justify-center gap-4 items-center w-full h-full"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.3,
            },
          },
        }}
      >
        {sanabelType.map((items, index) => {
          const colors = [
            "text-blueprimary",
            "text-redprimary",
            "text-yellowprimary",
            "text-greenprimary",
          ];

          const colorClass = colors[index % colors.length];

          // Define border color class explicitly
          const borderTopClass =
            colorClass === "text-redprimary"
              ? "border-t-redprimary"
              : colorClass === "text-blueprimary"
              ? "border-t-blueprimary"
              : colorClass === "text-yellowprimary"
              ? "border-t-yellowprimary"
              : "border-t-greenprimary";

          // Define background color class explicitly
          const backgroundClass =
            colorClass === "text-redprimary"
              ? "bg-redprimary"
              : colorClass === "text-blueprimary"
              ? "bg-blueprimary"
              : colorClass === "text-yellowprimary"
              ? "bg-yellowprimary"
              : "bg-greenprimary";

          return (
            <motion.div
              key={index}
              className={`w-full ${borderTopClass} border-t-2 sanabel-shadow-bottom rounded-3xl flex flex-col p-4 px-3`}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              onClick={() => history.push(`/student/sanabel/${index}`)}
            >
              <div className="flex w-full justify-between">
                <div className="flex gap-2">
                  {items.rewards?.map((item) => (
                    <div className="flex-col flex-center">
                      <img
                        src={item.icon}
                        alt="icon"
                        className="w-auto h-6"
                        loading="lazy"
                      />
                      <h1 className="text-black text-sm"> {item.value}</h1>
                    </div>
                  ))}
                </div>
                <img
                  src={items.img}
                  alt=""
                  className="h-auto w-1/4"
                  loading="lazy"
                />
              </div>
              <div className="w-full flex flex-col items-end">
                <div className="flex-center gap-2">
                  <SanabelArrow className={`${colorClass}`} />
                  <h1 className={`${colorClass} text-end text-sm font-bold`}>
                    {items.name}
                  </h1>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <StudentNavbar />
    </motion.div>
  );
};

export default SanabelType;
