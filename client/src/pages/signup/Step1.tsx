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

interface Step1Props {
  onContinue: () => void;
  onBack: () => void;
  name: { firstName: string; parentName: string };
  setName: (name: { firstName: string; parentName: string }) => void;
}

const Step1: React.FC<Step1Props> = ({ onContinue, onBack, name, setName }) => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { t } = useTranslation();

  const handleNameChange = (key: string, value: string) => {
    setName({ ...name, [key]: value });
  };

  return (
    <div className="flex flex-col h-full w-full items-center justify-between p-5 gap-10 pb-10">
      <div className="flex flex-col w-full gap-3">
        <GoBackButton onClick={onBack} />

        <ProgressBar filledBars={1} />

        <div className="flex flex-col gap-2 self-end">
          <h1 className="text-black font-bold text-2xl text-end " dir="ltr">
            {t("ادخل اسمك واسم والدك")}
          </h1>

          <p className="text-[#B3B3B3] text-sm text-end">
            {t("اكمل حسابك واستمتع بتجربة تفاعلية تبني العطاء والانتماء")}
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-7">
        <div className="flex flex-col">
          <img src={dummyImage} alt="" className="h-1/3" />
          <div className="flex gap-3">
            <GenericInput
              type="text"
              placeholder={t("اسم والدك")}
              title={t("اسم والدك")}
              onChange={(e) => handleNameChange("parentName", e.target.value)}
              value={name.parentName}
            />
            <GenericInput
              type="text"
              placeholder={t("اسمك")}
              title={t("اسمك الأول")}
              onChange={(e) => handleNameChange("firstName", e.target.value)}
              value={name.firstName}
            />
          </div>
        </div>
        <div onClick={onContinue}>
          <PrimaryButton style="fill" text={t("متابعة")} arrow="left" />
        </div>
      </div>
    </div>
  );
};

export default Step1;
