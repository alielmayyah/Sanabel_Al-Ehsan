import { useTheme } from "../../context/ThemeContext";
import PrimaryButton from "../../components/PrimaryButton";

import BackArrow from "../../icons/BackArrow";

import { IonRouterLink } from "@ionic/react";
import GenericInput from "../../components/GenericInput";
import GoBackButton from "../../components/GoBackButton";
import { useState } from "react";
import { useTranslation } from "react-i18next";
const Login: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { t } = useTranslation();
  const [isKeepLogged, setIsKeepLogged] = useState(false);

  function handleKeepLogged() {
    setIsKeepLogged(!isKeepLogged);
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleLogin() {
    console.log(email, "email", password, "password");

    if (isKeepLogged) {
      // save local storage
    }
  }

  return (
    <div className="flex flex-col h-full w-full items-center justify-between p-5 gap-10 pb-10">
      <div className="flex flex-col w-full gap-3">
        <GoBackButton />

        <div className="flex flex-col gap-2 self-end">
          <h1 className="text-black font-bold text-2xl text-end ">
            {t("تسجيل الدخول")}{" "}
          </h1>
          <p className="text-[#B3B3B3] text-sm  text-end ">
            {t("سجل الآن واستمتع بتجربة تفاعلية تبني العطاء والانتماء")}{" "}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full">
        {" "}
        <GenericInput
          type="email"
          placeholder={t("email_example")}
          title={t("البريد الإلكتروني")}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <div className="flex flex-col gap-5">
          <GenericInput
            type="password"
            placeholder={t("ادخل كلمة السر")}
            title={t("كلمة السر")}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="flex  items-center justify-between">
            <IonRouterLink routerLink="/forgotpassword">
              <h1 className="text-blueprimary">{t("هل نسيت كلمة السر؟")}</h1>
            </IonRouterLink>

            <div className="flex gap-3 items-center" onClick={handleKeepLogged}>
              <h1 className="text-[#ccc]">{t("حفظ الحساب")}</h1>
              <div
                className={
                  "w-8 h-8  border-2 border-[#EAECF0] rounded-lg relative"
                }
              >
                {isKeepLogged && (
                  <div className="rounded-md bg-blueprimary w-7 h-7 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 " />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full" onClick={handleLogin}>
        <PrimaryButton style="fill" text={t("تسجيل الدخول")} arrow="none" />
      </div>

      <IonRouterLink routerLink="/signup" className="text-md">
        <h1 className="text-[#8E99A4] font-semibold">
          {t("ليس لديك حساب؟")}{" "}
          <span className="text-blueprimary ">{t("إنشاء حساب")}</span>
        </h1>
      </IonRouterLink>
    </div>
  );
};

export default Login;
