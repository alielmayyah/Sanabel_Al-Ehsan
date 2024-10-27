import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import PrimaryButton from "../../components/PrimaryButton";
import { IonRouterLink } from "@ionic/react";

import GenericInput from "../../components/GenericInput";
import BackArrow from "../../icons/BackArrow";
import GoBackButton from "../../components/GoBackButton";
import { useTranslation } from "react-i18next";

import dummyImage from "../../assets/boarding/vector-tree-logo-template-1911680730.jpg";
import ProgressBar from "./ProgressBar";

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

  return (
    <div className="flex flex-col h-full w-full items-center justify-between p-5 gap-10 pb-10">
      <div className="flex flex-col w-full gap-3">
        <GoBackButton onClick={onBack}/>

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
        <div
          className={`flex-center p-3 w-full flex-col border-2 ${
            gender === "boy" ? "border-blueprimary" : "border-[#E6E6E6]"
          } rounded-xl text-[#121212] cursor-pointer`}
          onClick={() => setGender("boy")}
        >
          <img src={dummyImage} alt="" className="w-32 h-32" />
          <h1>{t("ولد")}</h1>
        </div>
        <div
          className={`flex-center p-3 w-full flex-col border-2 ${
            gender === "girl" ? "border-blueprimary" : "border-[#E6E6E6]"
          } rounded-xl text-[#121212] cursor-pointer`}
          onClick={() => setGender("girl")}
        >
          <img src={dummyImage} alt="" className="w-32 h-32" />
          <h1>{t("بنت")}</h1>
        </div>
      </div>

      <div onClick={onContinue} className="w-full">
        <PrimaryButton style="fill" text={t("متابعة")} arrow="left" />
      </div>
    </div>
  );
};

export default Step2;
