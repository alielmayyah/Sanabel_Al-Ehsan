import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import PrimaryButton from "../../components/PrimaryButton";
import { IonRouterLink } from "@ionic/react";

import GenericInput from "../../components/GenericInput";
import BackArrow from "../../icons/BackArrow";
import GoBackButton from "../../components/GoBackButton";
import { useTranslation } from "react-i18next";

import dummyImage from "../../assets/boarding/vector-tree-logo-template-1911680730.jpg";

import { MdCancel } from "react-icons/md";
import i18n from "../../i18n";

interface OTPProps {
  onContinue: () => void;
  onBack: () => void;
  otp: string[];
  setOtp: (otp: string[]) => void;
}



const OTP: React.FC<OTPProps> = ({ onContinue, onBack, otp, setOtp }) => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { t } = useTranslation();

  const [stepIndex, setStepIndex] = useState(0);

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; // Prevents entering non-numeric values
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically focus the next input
    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  
  return (
    <div className="flex flex-col h-full w-full items-center justify-between p-5 gap-10 pb-10">
      <div className="flex flex-col w-full gap-3">
        <IonRouterLink routerLink="/choosesignmethod" className="w-full h-7">
          <MdCancel className="text-redprimary text-3xl" />
        </IonRouterLink>

        <div className="flex flex-col gap-2 self-end">
          <h1 className="text-black font-bold text-2xl text-end " dir="ltr">
            {t("التحقق من البريد الإلكتروني")}
          </h1>

          <p className="text-[#B3B3B3] text-sm text-end">
            <span>
              {t("لقد أرسلنا للتو الرمز المكون من 5 أرقام إلى")}{" "}
              <span className="font-semibold text-blueprimary">
                mohamedmonge7@gmail.com
              </span>{" "}
              {t("أدخله أدناه:")}
            </span>
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-7">
        <div className="flex flex-col items-center gap-6">
          <h1 className="self-end text-[#121212] ">{t("الرمز")}</h1>
          <div
            className={`flex gap-3   ${
              i18n.language === "en" && "flex-row-reverse"
            } `}
          >
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleOtpChange(e.target.value, index)}
                className={`w-10 h-10 text-center font-bold rounded-full ${
                  digit
                    ? "bg-transparent text-2xl text-black"
                    : "bg-blueprimary text-white opacity-50"
                }`}
                maxLength={1}
                inputMode="numeric"
              />
            ))}
          </div>
        </div>

        <div onClick={onContinue}>
          <PrimaryButton style="fill" text={t("متابعة")} arrow="none" />
        </div>

        <h1 className="text-[#B3B3B3] text-center">
          {t("لم تتلق رمز")} <span dir="ltr">OTP</span> {t("بعد؟")}{" "}
          <span className="text-blueprimary ">{t("إعادة الإرسال")}</span>
        </h1>
      </div>
      <h1 className="text-[#8E99A4] font-semibold"></h1>
    </div>
  );
};

export default OTP;
