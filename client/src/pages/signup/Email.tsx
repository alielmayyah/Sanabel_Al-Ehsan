import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import PrimaryButton from "../../components/PrimaryButton";
import { IonRouterLink } from "@ionic/react";

import GenericInput from "../../components/GenericInput";
import BackArrow from "../../icons/BackArrow";
import GoBackButton from "../../components/GoBackButton";
import { useTranslation } from "react-i18next";

import dummyImage from "../../assets/boarding/vector-tree-logo-template-1911680730.jpg";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const Email: React.FC<{
  onContinue: () => void;
  setEmail: (value: string) => void;
  email: string;
}> = ({ onContinue, setEmail, email }) => {
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const { darkMode, toggleDarkMode } = useTheme();
  const { t } = useTranslation();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendOTP = () => {
    if (!email) {
      toast.error(t("يرجى إدخال بريد إلكتروني"));
      return;
    }
    if (!validateEmail(email)) {
      toast.error(t("البريد الإلكتروني غير صالح"));
      return;
    }
    toast.success(t("تم إرسال رمز OTP بنجاح!"));
    onContinue();
  };

  return (
    <div className="flex flex-col h-full w-full items-center justify-between p-5 gap-10 pb-10">
      <div className="absolute">
        <Toaster />
      </div>
      <div className="flex flex-col w-full gap-3">
        <GoBackButton />

        <div className="flex flex-col gap-2 self-end">
          <h1 className="text-black font-bold text-2xl text-end " dir="ltr">
            {t("انشاء حساب جديد")}
          </h1>

          <p className="text-[#B3B3B3] text-sm text-end">
            {t("انشاء حساب واستمتع بتجربة تفاعلية تبني العطاء والانتماء")}
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-7">
        <GenericInput
          type="email"
          placeholder={t("email_example")}
          title={t("البريد الإلكتروني")}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <div onClick={handleSendOTP}>
          <PrimaryButton style="fill" text={t("متابعة")} arrow="left" />
        </div>
      </div>

      <IonRouterLink routerLink="/signupsteps" className="text-md">
        <h1 className="text-[#8E99A4] font-semibold">
          {t("هل لديك حساب؟")}{" "}
          <span className="text-blueprimary ">{t("تسجيل الدخول")}</span>
        </h1>
      </IonRouterLink>
    </div>
  );
};

export default Email;
