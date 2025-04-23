import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";
import { useHistory } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { medalsImgs } from "../../../data/Medals";
import lock from "../../../icons/lock.svg";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import xpIcon from "../../../assets/resources/اكس بي.png";
import { medalsData } from "../../../data/MedalsData";

const StudentTutorial: React.FC = () => {
  const { t } = useTranslation();

  // Keep track of visible locks for each medal individually
  const [visibleLocks, setVisibleLocks] = useState<boolean[]>(
    Array(medalsData.length).fill(true)
  );

  useEffect(() => {
    // Remove locks one by one with a delay between each
    medalsData.forEach((_, index) => {
      const timer = setTimeout(() => {
        setVisibleLocks((prev) => {
          const newVisibleLocks = [...prev];
          newVisibleLocks[index] = false;
          return newVisibleLocks;
        });
      }, 500 + index * 400); // Base delay of 500ms, then 400ms between each lock

      return () => clearTimeout(timer);
    });
  }, []);

  return (
    <div className="flex-center gap-4 flex-col w-full items-center justify-center">
      <motion.h1
        className="text-2xl font-bold text-black mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t("احصل على ميداليات")}
      </motion.h1>

      <motion.div
        className="grid grid-cols-3 w-full gap-2"
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
        {medalsData.map((item, index) => (
          <motion.div
            className={`flex flex-col w-full items-center p-2 rounded-lg border ${
              visibleLocks[index]
                ? "border-yellow-400 bg-yellow-50"
                : "border-gray-200"
            }`}
            key={item.level}
            variants={{
              hidden: { scale: 0.8, opacity: 0 },
              visible: {
                scale: 1,
                opacity: 1,
                transition: { type: "spring", damping: 12 },
              },
            }}
          >
            <div className="relative w-full flex justify-center">
              <img
                src={item.img}
                alt={item.title}
                className={`w-24 h-24 ${visibleLocks[index] && "opacity-40"}`}
              />
              {visibleLocks[index] && (
                <motion.img
                  src={lock}
                  alt="lock"
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6"
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 1.5,
                    transition: { duration: 0.5 },
                  }}
                />
              )}
            </div>
            <p className="text-xs font-medium mt-1 text-center">{item.title}</p>
            <p className="text-xs text-gray-500">
              {" "}
              {t("المستوي")} {item.level}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default StudentTutorial;
