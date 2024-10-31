import { useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
import PrimaryButton from "../../../components/PrimaryButton";
import GenericInput from "../../../components/GenericInput";
import GoBackButton from "../../../components/GoBackButton";
import { useTranslation } from "react-i18next";

import parentFemaleImg from "../../../assets/parentorteacher/Parents/parentfemale.png";
import parentMaleImg from "../../../assets/parentorteacher/Parents/parentmale.png";
import teacherMaleImg from "../../../assets/parentorteacher/Teachers/teachermale.png";
import teacherFemaleImg from "../../../assets/parentorteacher/Teachers/teacherfemale.png";

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
  const [showAvatarSelection, setShowAvatarSelection] = useState(false);

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
    } else if (!showAvatarSelection) {
      toast.error(t("pleaseSelectAvatar"));
    } else {
      onComplete();
    }
  };

  const handleRoleSelection = (selectedRole: string) => {
    setRole(selectedRole);
    setShowAvatarSelection(true);
    console.log(role);
  };

  const handleAvatarSelection = (avatar: string) => {
    setAvatar(avatar);
    console.log(avatar);
  };

  return (
    <div className="flex flex-col h-full w-full items-center justify-between p-5 gap-10 pb-10">
      <div className="absolute">
        <Toaster />
      </div>
      <div className="flex flex-col w-full gap-3">
        <GoBackButton onClick={onBack} />

        <div className="flex flex-col gap-2 self-end">
          <h1 className="text-black font-bold text-2xl text-end " dir="ltr">
            {t("انشاء حساب جديد")}
          </h1>
          <p className="text-[#B3B3B3] text-sm text-end">
            {t("انشاء حساب واستمتع بتجربة تفاعلية تبني العطاء والانتماء")}
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-5">
        <div
          className={`flex flex-col gap-5 transition-all duration-300 ${
            showAvatarSelection ? "scale-75 mt-[-60px]" : "scale-100 mt-0"
          }`}
        >
          <div className="flex justify-center gap-5">
            <div
              className={`flex flex-col items-center gap-2 p-4 rounded-lg cursor-pointer transition-colors ${
                role === "parent"
                  ? "bg-blueprimary text-white"
                  : "bg-gray-100 text-black"
              }`}
              onClick={() => handleRoleSelection("Parent")}
            >
              <img
                src={parentFemaleImg}
                alt="Parent"
                className="h-24 w-24 rounded-full"
              />
              <p className="text-center text-xl font-semibold">{t("Parent")}</p>
            </div>
            <div
              className={`flex flex-col items-center gap-2 p-4 rounded-lg cursor-pointer transition-colors ${
                role === "teacher"
                  ? "bg-blueprimary text-white"
                  : "bg-gray-100 text-black"
              }`}
              onClick={() => handleRoleSelection("Teacher")}
            >
              <img
                src={teacherFemaleImg}
                alt="Teacher"
                className="h-24 w-24 rounded-full"
              />
              <p className="text-center text-xl font-semibold">
                {t("Teacher")}
              </p>
            </div>
          </div>
        </div>

        {showAvatarSelection && (
          <div className="flex justify-center gap-5 mt-4">
            {role === "Parent" ? (
              <>
                <div
                  className="flex flex-col items-center gap-2 p-4 rounded-lg cursor-pointer transition-colors bg-gray-100 hover:bg-blueprimary hover:text-white"
                  onClick={() => handleAvatarSelection(parentMaleImg)}
                >
                  <img
                    src={parentMaleImg}
                    alt="Parent Male"
                    className="h-32 w-32 rounded-full"
                  />
                  <p className="text-center text-xl font-semibold">
                    {t("Male")}
                  </p>
                </div>
                <div
                  className="flex flex-col items-center gap-2 p-4 rounded-lg cursor-pointer transition-colors bg-gray-100 hover:bg-blueprimary hover:text-white"
                  onClick={() => handleAvatarSelection(parentFemaleImg)}
                >
                  <img
                    src={parentFemaleImg}
                    alt="Parent Female"
                    className="h-32 w-32 rounded-full"
                  />
                  <p className="text-center text-xl font-semibold">
                    {t("Female")}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div
                  className="flex flex-col items-center gap-2 p-4 rounded-lg cursor-pointer transition-colors bg-gray-100 hover:bg-blueprimary hover:text-white"
                  onClick={() => handleAvatarSelection(teacherMaleImg)}
                >
                  <img
                    src={teacherMaleImg}
                    alt="Teacher Male"
                    className="h-32 w-32 rounded-full"
                  />
                  <p className="text-center text-xl font-semibold">
                    {t("Male")}
                  </p>
                </div>
                <div
                  className="flex flex-col items-center gap-2 p-4 rounded-lg cursor-pointer transition-colors bg-gray-100 hover:bg-blueprimary hover:text-white"
                  onClick={() => handleAvatarSelection(teacherFemaleImg)}
                >
                  <img
                    src={teacherFemaleImg}
                    alt="Teacher Female"
                    className="h-32 w-32 rounded-full"
                  />
                  <p className="text-center text-xl font-semibold">
                    {t("Female")}
                  </p>
                </div>
              </>
            )}
          </div>
        )}

        <div className="w-full flex flex-col gap-10">
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
