import { useTheme } from "../../context/ThemeContext";
import PrimaryButton from "../../components/PrimaryButton";
import dummiImg from "../../assets/boarding/--a-symbolic-and-heartwarming-illustration-focused.png";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import BackArrow from "../../icons/BackArrow";

const onboardingData = [
  {
    title: "مرحباً بك في",
    span: "👋سنابل الإحسان",
    img: dummiImg,
    description: "سنابل الإحسان هو تطبيق تفاعلي يعزز القيم النبيلة للأطفال",
  },
  {
    title: "ازرع سنبلة تُثمر",
    span: "خيراً وأجراً",
    img: dummiImg,
    description: "إغتنم الفرص لفعل الخير، فالحسنات تتضاعف مع كل عمل صالح",
  },
  {
    title: "تسابقوا إلى",
    span: "الخيرات، فإنها لا تدوم",
    img: dummiImg,
    description: "لا تفوّت الفرصة لفعل الخير، فالأجر يعمّ والحسنات تُكتب",
  },
];

const OnBoarding: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { t } = useTranslation();
  const [stepCount, setStepCount] = useState(0);
  const history = useHistory();

  function changeStepIncrement() {
    if (stepCount === 2) {
      history.push("/choosesignmethod"); // Navigate to choosesignmethod
    } else {
      setStepCount(stepCount + 1);
    }
  }
  function changeStepDecrement() {
    if (stepCount !== 0) {
      setStepCount(stepCount - 1);
    }
  }

  function skipOnboarding() {
    history.push("/choosesignmethod");
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col w-full h-full items-center justify-between gap-2 p-3 pb-10 pt-5"
    >
      <div className="flex w-full items-center justify-between">
        <div
          className="p-3 px-5 border-2 rounded-3xl text-blueprimary cursor-pointer"
          onClick={skipOnboarding}
        >
          {t("تخطي")}
        </div>
        <LanguageSwitcher />
      </div>

      {/* Animated Image with key and exit animation */}
      <div className="w-screen bg-blueprimary h-1/3">
        <motion.img
          key={stepCount} // This key ensures that the image changes properly
          src={onboardingData[stepCount].img}
          className="w-full h-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }} // Exit animation for the old image
          transition={{ duration: 0.6 }}
        />
      </div>

      {/* Progress indicators */}
      <motion.div
        className="flex-center flex-row-reverse w-full gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {onboardingData.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-1/6 rounded-lg ${
              index === stepCount ? "bg-blueprimary" : "bg-gray-500"
            }`}
          ></div>
        ))}
      </motion.div>

      {/* Animated Text Content */}
      <motion.div
        className="flex flex-col gap-6"
        key={stepCount}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-[#040415] text-3xl text-center font-bold">
          {t(onboardingData[stepCount].title)}
          <br />
          <span className="text-blueprimary">
            {" "}
            {t(onboardingData[stepCount].span)}
          </span>
        </h1>
        <p className="text-[#999] text-center w-4/5 mx-auto">
          {t(onboardingData[stepCount].description)}
        </p>

        {/* Button with Scale Animation */}

        <div className="flex w-full items-center gap-2">
          <div onClick={changeStepIncrement} className="w-full">
            {" "}
            <PrimaryButton
              style="fill"
              text={t("متابعة")}
              arrow={`${i18n.language === "ar" ? "left" : "right"}`}
            />
          </div>

          {stepCount !== 0 && (
            <div
              className="flex-center p-3 border-2 border-[#EAECF0] rounded-xl self-end w-1/4"
              onClick={changeStepDecrement}
            >
              <BackArrow
                size={25}
                className={` text-[#B3B3B3] ${
                  i18n.language === "en" && "rotate-180"
                }`}
              />
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OnBoarding;
