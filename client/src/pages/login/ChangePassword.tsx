import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import PrimaryButton from "../../components/PrimaryButton";
import { IonRouterLink } from "@ionic/react";

import GenericInput from "../../components/GenericInput";
import BackArrow from "../../icons/BackArrow";
import GoBackButton from "../../components/GoBackButton";
import { FaCheck } from "react-icons/fa";
import classNames from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const ChangePassword: React.FC = () => {
  const { t } = useTranslation();
  const { darkMode, toggleDarkMode } = useTheme();
  const [isOtpSent, setIsOtpSent] = useState(true);

  const [otp, setOtp] = useState(["", "", "", ""]);

  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState({
    minLength: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const validatePassword = (password: string) => {
    setIsValid({
      minLength: password.length >= 8,
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
    console.log("empty");
  };

  const validationCircles = [
    { condition: isValid.minLength, text: t("8 أحرف كحد أدنى") },
    { condition: isValid.hasNumber, text: t("رقم") },
    { condition: isValid.hasSpecialChar, text: t("رمز") },
  ];

  // Count the number of valid conditions
  const validConditionsCount = Object.values(isValid).filter(Boolean).length;

  // Determine width and color based on valid conditions
  const progressWidth = `${(validConditionsCount / 3) * 100}%`;
  const progressColor =
    validConditionsCount === 1
      ? "bg-red-500"
      : validConditionsCount === 2
      ? "bg-yellow-500"
      : validConditionsCount === 3
      ? "bg-green-500"
      : "bg-gray-200";

  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  function handleChangePassword() {
    setIsPasswordChanged(true);
  }

  return (
    <div className="flex flex-col h-full w-full items-center justify-between p-5 gap-10 pb-10">
      <div className="flex flex-col w-full gap-3">
        <GoBackButton />

        <div className="flex flex-col gap-2 self-end">
          <h1 className="text-black font-bold text-2xl text-end ">
            {t("إعادة تعيين كلمة السر")}
          </h1>
          <p className="text-[#B3B3B3] text-sm  text-end ">
            {t("تأمين حسابك بكلمة مرور جديدة")}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-10 w-full">
        <div className="flex flex-col gap-5">
          <GenericInput
            type="password"
            placeholder={t("ادخل كلمة السر")}
            title={t("كلمة السر")}
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="flex w-full bg-gray-200 h-2 rounded-xl gap-0">
          <div
            className={`${progressColor} h-2 rounded-xl`}
            style={{ width: progressWidth }}
          ></div>
        </div>
        {/* className="bg-redprimary w-1/3 h-2  rounded-xl" */}
        <div className="flex flex-col gap-3 items-end self-end">
          {validationCircles.map((circle) => (
            <div className="flex-center gap-3 ">
              <h1
                className={classNames(
                  circle.condition ? "text-green-500" : "text-[#8E99A4]"
                )}
              >
                {circle.text}
              </h1>
              <div
                className={classNames(
                  "rounded-full w-7 h-7 flex-center",
                  circle.condition
                    ? "bg-green-500"
                    : "border-2 border-[#c7cbd3]"
                )}
              >
                {circle.condition && <FaCheck className="text-white text-sm" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`w-full opacity-50 ${
          validConditionsCount == 3 && "opacity-100"
        } `}
      >
        <PrimaryButton
          style={""}
          text={"حفظ"}
          arrow={"none"}
          onClick={handleChangePassword}
        />
      </div>

      <IonRouterLink routerLink="/signup" className="text-md ">
        <h1 className="text-[#8E99A4] font-semibold">
          {t("ليس لديك حساب؟")}{" "}
          <span className="text-blueprimary ">{t("إنشاء حساب")}</span>
        </h1>
      </IonRouterLink>
      {isPasswordChanged && (
        <motion.div
          initial={{ opacity: 1, y: 250 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute  h-full  w-full rounded-lg bottom-0 border-2 bg-gradient-to-t"
        >
          <div className="h-1/3 bg-black opacity-10 w-full"></div>
          <div className="h-2/3 w-full flex flex-col p-5  items-center justify-around bg-white">
            <div className="w-64 h-64 bg-redprimary rounded-full"></div>
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-black font-bold text-2xl text-center ">
                {t("تم تغير كلمة السر بنجاح")}
              </h1>
              <p className="text-[#B3B3B3] text-sm  text-center ">
                {t("قم بتسجيل الدخول و ابدأ في جمع الحسنات")}
              </p>
            </div>
            <IonRouterLink routerLink="/login" className="text-md w-full">
              <PrimaryButton
                style={""}
                text={t("تسجيل الدخول")}
                arrow={"none"}
              />
            </IonRouterLink>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ChangePassword;
