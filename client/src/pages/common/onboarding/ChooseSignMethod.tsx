import PrimaryButton from "../../../components/PrimaryButton";

import trophyImg from "../../../assets/onboarding/trophy_2.png";
import parentOrTeacherImg from "../../../assets/choosesignmethod/chooseparentorteacher.png";
import studentImg from "../../../assets/choosesignmethod/choosestudent.png";

import { IonRouterLink } from "@ionic/react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const ChooseSignMethod: React.FC = () => {
  const { t } = useTranslation();
  const [showSignupOptions, setShowSignupOptions] = useState(false);
  const [isTrophyLoaded, setTrophyLoaded] = useState(false);
  const [isStudentImgLoaded, setStudentImgLoaded] = useState(false);
  const [isParentTeacherImgLoaded, setParentTeacherImgLoaded] = useState(false);

  const handleSignupClick = () => {
    setShowSignupOptions(true);
  };

  // Shared animation properties
  const sharedImageAnimation = {
    initial: { opacity: 0, y: -100 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col h-full w-full items-center justify-end p-3 gap-10 pb-10"
    >
      <AnimatePresence>
        {!showSignupOptions ? (
          <motion.div
            key="main-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <motion.div {...sharedImageAnimation} className="w-full">
              {!isTrophyLoaded && (
                <div className="loading-placeholder">Loading...</div>
              )}
              <img
                src={trophyImg}
                className={`w-full pb-3 ${!isTrophyLoaded ? "hidden" : ""}`}
                alt="Sign Method"
                onLoad={() => setTrophyLoaded(true)}
              />
            </motion.div>

            <div className="flex flex-col gap-6 w-full">
              <h1 className="text-[#040415] text-3xl text-center font-bold">
                {t("سجل الآن وابدأ")}
                <br />
                <span className="text-blueprimary"> {t("رحلة الإحسان")}</span>
              </h1>
              <p className="text-[#999] text-center">
                {t("سجل الآن واستمتع بتجربة تفاعلية تبني العطاء والانتماء")}
              </p>

              <IonRouterLink onClick={handleSignupClick}>
                <PrimaryButton style="fill" text="إنشاء حساب" arrow="none" />
              </IonRouterLink>
              <IonRouterLink routerLink="/login">
                <PrimaryButton
                  style="stroke"
                  text="تسجيل الدخول"
                  arrow="none"
                />
              </IonRouterLink>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="signup-options"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full flex flex-col items-center justify-around py-10 gap-6"
          >
            <motion.div
              initial={{ y: -200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-2/3"
            >
              <img
                src={trophyImg}
                className={`w-full ${!isTrophyLoaded ? "hidden" : ""}`}
                alt="Sign Method"
                onLoad={() => setTrophyLoaded(true)}
              />
            </motion.div>

            <h2 className="text-[#040415] text-2xl font-bold text-center">
              {t("اختر نوع التسجيل")}
            </h2>

            <div className="flex w-full justify-between gap-3">
              <IonRouterLink
                routerLink="/signupstudent"
                className="w-full flex flex-col gap-10"
              >
                <motion.img
                  src={studentImg}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.8 }}
                  className={`w-full rounded-full border-2 bg-redprimary ${
                    !isStudentImgLoaded ? "hidden" : ""
                  }`}
                  onLoad={() => setStudentImgLoaded(true)}
                />
                <h1 className="text-center text-bold text-xl text-gray-800">
                  {t("طالب")}
                </h1>
              </IonRouterLink>
              <IonRouterLink
                routerLink="/signupparentorteacher"
                className="w-full flex flex-col gap-10"
              >
                {!isParentTeacherImgLoaded && (
                  <div className="loading-placeholder">Loading...</div>
                )}
                <motion.img
                  src={parentOrTeacherImg}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.8 }}
                  className={`w-full rounded-full border-2 bg-yellowprimary ${
                    !isParentTeacherImgLoaded ? "hidden" : ""
                  }`}
                  onLoad={() => setParentTeacherImgLoaded(true)}
                />
                <h1 className="text-center text-bold text-xl text-gray-800">
                  {t("ولي امر او  معلم")}
                </h1>
              </IonRouterLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ChooseSignMethod;
