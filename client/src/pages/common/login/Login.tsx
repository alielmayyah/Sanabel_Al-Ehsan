import { IonRouterLink } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import GenericInput from "../../../components/GenericInput";
import GoBackButton from "../../../components/GoBackButton";
import PrimaryButton from "../../../components/PrimaryButton";

import loginImg from "../../../assets/login/logo.png";
import sanabelVideo from "../../../assets/login/loginVideo.mp4";
import { FaHome } from "react-icons/fa";
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

const Login: React.FC = () => {
  // Ref for the video element
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.5; // Set playback rate to 2x
    }
  }, []);

  const { t } = useTranslation();
  const [isKeepLogged, setIsKeepLogged] = useState(false);
  const history = useHistory();

  function handleKeepLogged() {
    setIsKeepLogged(!isKeepLogged);
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(email);
  console.log(password);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error(t("fill_all_fields"));
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error(t("invalid_email"));
      return;
    }
    if (password.length < 8) {
      toast.error(t("short_password"));
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        email,
        password,
      });

      if (response.status === 200) {
        toast.success(t("login_successful"));
        // Store auth token
        localStorage.setItem(
          "token",
          `${response.data.data.user.token.toString()}`
        );
        // console.log("email", response.data.user.email);
        console.log(response.data.data.token.toString());
        // Store Role preference
        localStorage.setItem("role", response.data.data.user.role.toString());
        // Store keepLoggedIn preference
        localStorage.setItem("keepLoggedIn", isKeepLogged.toString());

        if (response.data.data.user.role === "Student") {
          history.push("/student/home");
        } else if (response.data.data.user.role === "Teacher") {
          history.push("/teacher/home");
        } else if (response.data.data.user.role === "Parent") {
          history.push("/parent/home");
        }

        // Redirect to the home screen after login
      }
    } catch (error) {
      toast.error(t("login_failed"));
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
          <h1 className="text-black font-bold text-2xl text-end ">
            {t("تسجيل الدخول")}{" "}
          </h1>
          <p className="text-[#B3B3B3] text-sm  text-end ">
            {t("سجل الآن واستمتع بتجربة تفاعلية تبني العطاء والانتماء")}{" "}
          </p>
        </div>
      </div>
      {/* <img src={loginImg} alt="" className="w-2/5 -my-7" /> */}
      <div className="w-full -my-7 ">
        <video src={sanabelVideo} autoPlay muted preload="metadata" />
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

      <IonRouterLink routerLink="/choosesignmethod" className="text-md">
        <h1 className="text-[#8E99A4] font-semibold">
          {t("ليس لديك حساب؟")}{" "}
          <span className="text-blueprimary ">{t("إنشاء حساب")}</span>
        </h1>
      </IonRouterLink>
    </div>
  );
};

export default Login;
