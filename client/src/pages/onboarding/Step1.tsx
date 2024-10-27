import { useTheme } from "../../context/ThemeContext";
import PrimaryButton from "../../components/PrimaryButton";
import dummiImg from "../../assets/boarding/vector-tree-logo-template-1911680730.jpg";
import i18n from "i18next";
import { IonRouterLink } from "@ionic/react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { useState } from "react";

// function StepComponent()  {
//    return ()
// }

const OnBoarding: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { t } = useTranslation();
  const [steps, setSteps] = useState("1");
  return (
    <div className="flex flex-col w-full h-full items-center justify-between gap-2 p-3 py-10">
      <div className="flex w-full items-center justify-between">
        <div className="p-3 border-2 rounded-3xl text-blueprimary">
          {t("تخطي")}
        </div>
        <LanguageSwitcher />
      </div>

      <div className="w-screen bg-blueprimary  h-1/3">
        {/* <img src={dummiImg} className=""></img> */}
      </div>

      <div className="flex-center w-full gap-3">
        <div className="bg-gray-500 h-2 w-1/6 rounded-lg"> </div>
        <div className="bg-gray-500 h-2 w-1/6 rounded-lg"> </div>
        <div className="bg-blueprimary h-2 w-1/6 rounded-lg"> </div>
      </div>

      <div className="flex flex-col gap-6">
        <h1 className="text-[#040415] text-3xl text-center font-bold">
          {t("مرحباً بك في")}
          <br />
          <span className="text-blueprimary"> {t("👋سنابل الإحسان")}</span>
        </h1>
        <p className="text-[#999] text-center w-4/5 mx-auto">
          {t("سنابل الإحسان هو تطبيق تفاعلي يعزز القيم النبيلة للأطفال")}
        </p>

        <h1 className="text-[#121212]">
          <span className="text-blueprimary"></span>
        </h1>

        <PrimaryButton
          style="fill"
          text={t("متابعة")}
          arrow={`${i18n.language === "ar" ? "left" : "right"}`}
        />
      </div>
    </div>
  );
};

export default OnBoarding;
