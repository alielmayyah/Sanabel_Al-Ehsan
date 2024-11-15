import { useState } from "react";
import { useTheme } from "../../../../context/ThemeContext";
import PrimaryButton from "../../../../components/PrimaryButton";
import { IonRouterLink } from "@ionic/react";

import GenericInput from "../../../../components/GenericInput";
import BackArrow from "../../../../icons/BackArrow";
import GoBackButton from "../../../../components/GoBackButton";
import { useTranslation } from "react-i18next";

import boyImage from "../../../../assets/signup/boy.png";
import girlImage from "../../../../assets/signup/girl.png";

import ProgressBar from "../ProgressBar";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import i18n from "../../../../i18n";
import { motion } from "framer-motion";

const Toaster = () => (
  <ToastContainer
    position="top-center"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
  />
);

interface Step2Props {
  onContinue: () => void;
  onBack: () => void;
  gender: string;
  setGender: (gender: string) => void;
}

const Step2: React.FC<Step2Props> = ({
  onContinue,
  onBack,
  gender,
  setGender,
}) => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { t } = useTranslation();

  function handleGenderStep() {
    if (!gender) {
      toast.error(t("اختار جنسك (بنت - ولد)"));
    } else {
      onContinue();
    }
    console.log(gender);
  }
  return (
    <div className="flex flex-col h-full w-full items-center justify-between p-5 gap-10 pb-10">
      <div className="absolute">
        <Toaster />
      </div>
      <div className="flex flex-col w-full gap-3">
        <GoBackButton onClick={onBack} />

        <ProgressBar filledBars={2} />

        <div className="flex flex-col gap-2 self-end">
          <h1 className="text-black font-bold text-2xl text-end " dir="ltr">
            {t("اختار جنسك (بنت - ولد)")}
          </h1>

          <p className="text-[#B3B3B3] text-sm text-end">
            {t("اكمل حسابك واستمتع بتجربة تفاعلية تبني العطاء والانتماء")}
          </p>
        </div>
      </div>

      <div className="flex w-full gap-3 justify-center items-center">
        <div className="flex-center gap-4 flex-col w-full">
          {" "}
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: gender === "boy" ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
            className={`flex-center pt-3 w-full flex-col border-2 ${
              gender === "boy"
                ? "bg-blueprimary text-white"
                : "border-[#E6E6E6]"
            } rounded-xl text-[#121212] cursor-pointer`}
            onClick={() => setGender("boy")}
          >
            <img src={boyImage} alt="" className="w-32 h-32" />
          </motion.div>
          <h1
            className={`text-black text-xl ${
              gender === "boy" ? "text-blueprimary" : "text-black"
            }`}
          >
            {t("ولد")}
          </h1>
        </div>

        <div className="flex-center gap-4 flex-col w-full">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: gender === "girl" ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
            className={`flex-center pt-3 w-full flex-col border-2 ${
              gender === "girl" ? "bg-pink-500 text-white" : "border-[#E6E6E6]"
            } rounded-xl text-[#121212] cursor-pointer`}
            onClick={() => setGender("girl")}
          >
            <img src={girlImage} alt="" className="w-32 h-32" />
          </motion.div>
          <h1
            className={`text-black text-xl ${
              gender === "girl" ? "text-pink-500" : "text-black"
            }`}
          >
            {t("بنت")}
          </h1>
        </div>
      </div>

      <div onClick={handleGenderStep} className="w-full">
        <PrimaryButton style="fill" text={t("متابعة")} arrow="left" />
      </div>
    </div>
  );
};

export default Step2;
