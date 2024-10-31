import { useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
import PrimaryButton from "../../../components/PrimaryButton";
import { IonRouterLink } from "@ionic/react";
import GenericInput from "../../../components/GenericInput";
import BackArrow from "../../../icons/BackArrow";
import GoBackButton from "../../../components/GoBackButton";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import axios from "axios";
import parentOrTeacherImg from "../../../assets/parentorteacher/chooseparentorteacher.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import i18n from "../../../i18n";

const Toaster = () => (
  <ToastContainer
    position="top-right"
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

interface OTPProps {
  onContinue: () => void;
  onBack: () => void;
  otp: string[];
  setOtp: (otp: string[]) => void;
  setEmail: (value: string) => void;
  email: string;
}

const EmailOTP: React.FC<OTPProps> = ({
  onContinue,
  onBack,
  otp,
  setOtp,
  setEmail,
  email,
}) => {
  const { t } = useTranslation();
  const [isOtpSent, setIsOtpSent] = useState(false);

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

  const handleSendOTP = async () => {
    if (!email) {
      toast.error(t("fillEmailField"));
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error(t("invalidEmailFormat"));
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/users/send-auth",
        { email }
      );

      if (response.status === 200) {
        setIsOtpSent(true);
        toast.success(t("otpSentSuccess"));
      }
      if (response.status === 202) {
        onContinue();
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error(t("invalidOTP"));
    }
  };

  const handleConfirmOTP = async () => {
    const otpCode = otp.join("");

    if (otpCode.length !== 4) {
      toast.error(t("enter4DigitOTP"));
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/users/verfication-auth",
        { email, otp: otpCode }
      );

      if (response.status === 200) {
        toast.success(t("otpVerifySuccess"));
        onContinue();
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error(t("invalidOTP"));
    }
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
            {isOtpSent
              ? t("التحقق من البريد الإلكتروني")
              : t("انشاء حساب جديد")}
          </h1>
          <p className="text-[#B3B3B3] text-sm text-end">
            {!isOtpSent ? (
              t("انشاء حساب واستمتع بتجربة تفاعلية تبني العطاء والانتماء")
            ) : (
              <span>
                {t("لقد أرسلنا للتو الرمز المكون من 4 أرقام إلى")}{" "}
                <span className="font-semibold text-blueprimary">{email}</span>{" "}
                {t("أدخله أدناه:")}
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-7  ">
        {isOtpSent ? (
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
        ) : (
          <div className="flex flex-col gap-3 ">
            <div className="flex-center flex-col gap-4">
              <img
                src={parentOrTeacherImg}
                className="rounded-full border-2 bg-yellowprimary w-1/3"
              />
              <h1 className="text-center text-bold text-xl text-gray-800">
                {t("ولي امر او  معلم")}
              </h1>
            </div>
            <GenericInput
              type="email"
              placeholder={t("email_example")}
              title={t("البريد الإلكتروني")}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
        )}

        <div
          onClick={isOtpSent ? handleConfirmOTP : handleSendOTP}
          className="pb-24"
        >
          <PrimaryButton
            style="fill"
            text={`${isOtpSent ? "تأكيد الرمز" : "ارسل الرمز"}`}
            arrow="none"
          />
        </div>
        {isOtpSent && (
          <h1 className="text-[#B3B3B3] text-center" onClick={handleSendOTP}>
            {t("لم تتلق رمز")} <span dir="ltr">OTP</span> {t("بعد؟")}{" "}
            <span className="text-blueprimary ">{t("إعادة الإرسال")}</span>
          </h1>
        )}
      </div>

      <IonRouterLink routerLink="/login" className="text-md">
        <h1 className="text-[#8E99A4] font-semibold">
          {t("هل لديك حساب؟")}{" "}
          <span className="text-blueprimary ">{t("تسجيل الدخول")}</span>
        </h1>
      </IonRouterLink>
    </div>
  );
};

export default EmailOTP;
