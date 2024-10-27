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

interface Step6Props {
  onComplete: () => void;
  character: string;
  setCharacter: React.Dispatch<React.SetStateAction<string>>;
  onBack: () => void;
}

const Step6: React.FC<Step6Props> = ({
  onComplete,
  character,
  setCharacter,
  onBack,
}) => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col h-full w-full items-center justify-between p-5 gap-10 pb-10">
      <div className="flex flex-col w-full gap-3">
        <GoBackButton onClick={onBack} />

        <ProgressBar filledBars={6} />

        <div className="flex flex-col gap-2 self-end">
          <h1 className="text-black font-bold text-2xl text-end " dir="ltr">
            {t("اضع صورة شخصية لك")}
          </h1>

          <p className="text-[#B3B3B3] text-sm text-end">
            {t("اكمل حسابك واستمتع بتجربة تفاعلية تبني العطاء والانتماء")}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-5 w-full">
        <div className="w-52 h-52 bg-blueprimary rounded-full"></div>
        <div className="flex gap-3 justify-between">
          <div className="w-12 h-12 bg-redprimary rounded-full"></div>
          <div className="w-12 h-12 bg-redprimary rounded-full"></div>
          <div className="w-12 h-12 bg-redprimary rounded-full"></div>
          <div className="w-12 h-12 bg-redprimary rounded-full"></div>
          <div className="w-12 h-12 bg-redprimary rounded-full"></div>
          <div className="w-12 h-12 bg-redprimary rounded-full"></div>
          <div className="w-12 h-12 bg-redprimary rounded-full"></div>
        </div>
      </div>

      <div className="w-full ">
        <div onClick={onComplete}>
          <PrimaryButton
            style="fill"
            text={t("أبدا رحلة جمع الحسنات")}
            arrow="left"
          />
        </div>
      </div>
    </div>
  );
};

export default Step6;
