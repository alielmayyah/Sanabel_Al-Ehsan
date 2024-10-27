import { useTheme } from "../../context/ThemeContext";
import PrimaryButton from "../../components/PrimaryButton";
import dummiImg from "./18156864 2.png";
import { IonRouterLink } from "@ionic/react";
import { motion } from "framer-motion"; 

const ChooseSignMethod: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Start off-screen (below)
      animate={{ opacity: 1, y: 0 }} // Fade in and slide up
      transition={{ duration: 0.6 }} // Control the duration of the animation
      className="flex flex-col h-full w-full items-center justify-end p-3 gap-10 pb-10"
    >
      <motion.div
        initial={{ opacity: 0, y: -150 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full"
      >
        <img src={dummiImg} className="w-full" alt="Sign Method" />
      </motion.div>

      <div className="flex flex-col gap-6">
        <h1 className="text-[#040415] text-3xl text-center font-bold">
          سجل الآن وابدأ
          <br />
          <span className="text-blueprimary">رحلة الإحسان</span>
        </h1>
        <p className="text-[#999] text-center">
          سجل الآن واستمتع بتجربة تفاعلية تبني العطاء والانتماء
        </p>

        <IonRouterLink routerLink="/signup">
          <PrimaryButton style="fill" text="إنشاء حساب" arrow="none" />
        </IonRouterLink>
        <IonRouterLink routerLink="/login">
          <PrimaryButton style="stroke" text="تسجيل الدخول" arrow="none" />
        </IonRouterLink>
      </div>
    </motion.div>
  );
};

export default ChooseSignMethod;
