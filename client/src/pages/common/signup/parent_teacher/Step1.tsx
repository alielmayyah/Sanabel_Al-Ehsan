import { useState } from "react";
import { useTheme } from "../../../../context/ThemeContext";
import PrimaryButton from "../../../../components/PrimaryButton";
import GenericInput from "../../../../components/GenericInput";
import GoBackButton from "../../../../components/GoBackButton";
import { useTranslation } from "react-i18next";

import parentFemaleImg from "../../../../assets/choosesignmethod/chooseparentorteacher.png";

import parentMaleImg from "../../../../assets/choosesignmethod/chooseparentorteacher.png";
import teacherMaleImg from "../../../../assets/choosesignmethod/chooseparentorteacher.png";
import teacherFemaleImg from "../../../../assets/choosesignmethod/chooseparentorteacher.png";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

interface Step1Props {
  onComplete: () => void;
  onBack: () => void;
  name: { firstName: string; lastName: string };
  setName: (name: { firstName: string; lastName: string }) => void;
  role: string;
  setRole: (value: string) => void;
  setAvatar: (avatar: string) => void;
}

const Step1: React.FC<Step1Props> = ({
  onComplete,
  onBack,
  name,
  setName,
  role,
  setRole,
  setAvatar,
}) => {
  const { darkMode } = useTheme();
  const { t } = useTranslation();

  const handleNameChange = (key: string, value: string) => {
    setName({ ...name, [key]: value });
  };

  const isAlphabetic = (str: string) => /^[A-Za-z\u0621-\u064A ]+$/.test(str);

  const finishStep1 = () => {
    if (!name.firstName || !name.lastName) {
      toast.error(t("enterFirstNameAndParentName"));
    } else if (!isAlphabetic(name.firstName) || !isAlphabetic(name.lastName)) {
      toast.error(t("noNumbersOrSymbols"));
    } else if (!role) {
      toast.error(t("pleaseSelectRole"));
    } else {
      onComplete();
    }
  };

  const handleRoleSelection = (selectedRole: string) => {
    setRole(selectedRole);

    console.log(role);
  };

  return (
    <div className="flex flex-col items-center justify-between w-full h-full gap-10 p-5 pb-10">
      <div className="absolute">
        <Toaster />
      </div>
      <div className="flex flex-col w-full gap-3">
        <GoBackButton onClick={onBack} />

        <div className="flex flex-col self-end gap-2">
          <h1 className="text-2xl font-bold text-black text-end " dir="ltr">
            {t("انشاء حساب جديد")}
          </h1>
          <p className="text-[#B3B3B3] text-sm text-end">
            {t("انشاء حساب واستمتع بتجربة تفاعلية تبني العطاء والانتماء")}
          </p>
        </div>
      </div>

      <div className="flex flex-col w-full gap-5">
        <div className={`flex flex-col gap-5 transition-all duration-300 `}>
          <div className="flex justify-center gap-5">
            <div
              className={`flex flex-col items-center gap-2 p-4 rounded-lg cursor-pointer transition-colors ${
                role === "Parent"
                  ? "bg-blueprimary text-white"
                  : "bg-gray-100 text-black"
              }`}
              onClick={() => handleRoleSelection("Parent")}
            >
              <img
                src={parentFemaleImg}
                alt="Parent"
                className="w-24 h-24 rounded-full"
              />
              <p className="text-xl font-semibold text-center">{t("Parent")}</p>
            </div>
            <div
              className={`flex flex-col items-center gap-2 p-4 rounded-lg cursor-pointer transition-colors ${
                role === "Teacher"
                  ? "bg-blueprimary text-white"
                  : "bg-gray-100 text-black"
              }`}
              onClick={() => handleRoleSelection("Teacher")}
            >
              <img
                src={teacherFemaleImg}
                alt="Teacher"
                className="w-24 h-24 rounded-full"
              />
              <p className="text-xl font-semibold text-center">
                {t("Teacher")}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full gap-10">
          <div className="flex gap-3">
            <GenericInput
              type="text"
              placeholder={t("اسمك الاخير")}
              title={t("اسمك الاخير")}
              onChange={(e) => handleNameChange("lastName", e.target.value)}
              value={name.lastName}
            />
            <GenericInput
              type="text"
              placeholder={t("اسمك")}
              title={t("اسمك الأول")}
              onChange={(e) => handleNameChange("firstName", e.target.value)}
              value={name.firstName}
            />
          </div>
        </div>
      </div>

      <div className="w-full" onClick={finishStep1}>
        <PrimaryButton style="fill" text={t("متابعة")} arrow="left" />
      </div>
    </div>
  );
};

export default Step1;
