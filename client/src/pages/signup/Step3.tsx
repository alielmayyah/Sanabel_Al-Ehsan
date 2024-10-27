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

interface Step3Props {
  onContinue: () => void;
  onBack: () => void;
  birthdate: { day: string; month: string; year: string };
  setBirthdate: (birthdate: {
    day: string;
    month: string;
    year: string;
  }) => void;
}

const Step3: React.FC<Step3Props> = ({
  onContinue,
  onBack,
  birthdate,
  setBirthdate,
}) => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { t } = useTranslation();

  const handleInputChange = (field: string, value: string) => {
    setBirthdate({ ...birthdate, [field]: value });
  };

  return (
    <div className="flex flex-col h-full w-full items-center justify-between p-5 gap-10 pb-10">
      <div className="flex flex-col w-full gap-3">
        <GoBackButton onClick={onBack} />

        <ProgressBar filledBars={3} />

        <div className="flex flex-col gap-2 self-end">
          <h1 className="text-black font-bold text-2xl text-end " dir="ltr">
            {t("ادخل تاريخ عيد ميلادك 🎂")}
          </h1>

          <p className="text-[#B3B3B3] text-sm text-end">
            {t("اكمل حسابك واستمتع بتجربة تفاعلية تبني العطاء والانتماء")}
          </p>
        </div>
      </div>

      <div className="flex w-full gap-3 justify-center items-center">
        <div className="flex flex-col w-full gap-3 justify-center items-center">
          <img src={dummyImage} alt="" className="w-32 h-32" />
          <div className="flex w-full gap-3">
            <GenericInput
              type="text"
              placeholder={t("السنة")}
              title={t("السنة")}
              onChange={(e) => handleInputChange("year", e.target.value)}
              value={birthdate.year}
            />
            <GenericInput
              type="text"
              placeholder={t("الشهر")}
              title={t("الشهر")}
              onChange={(e) => handleInputChange("month", e.target.value)}
              value={birthdate.month}
            />
            <GenericInput
              type="text"
              placeholder={t("اليوم")}
              title={t("اليوم")}
              onChange={(e) => handleInputChange("day", e.target.value)}
              value={birthdate.day}
            />
          </div>
        </div>
      </div>

      <div className="w-full ">
        <div onClick={onContinue}>
          <PrimaryButton style="fill" text={t("متابعة")} arrow="left" />
        </div>
      </div>
    </div>
  );
};

export default Step3;
