import StudentNavbar from "../../../components/navbar/StudentNavbar";
import ThemeSwitcher from "../../../components/ThemeSwitcher";
import LanguageSwitcher from "../../../components/LanguageSwitcher";
import { useHistory } from "react-router-dom";

import ProfileArrow from "../../../icons/ProfileArrow";
import Greeting from "../../../components/Greeting";
import { useTranslation } from "react-i18next";

// Import Icons
import ChangeLanguage from "../../../icons/Profile/ChangeLanguage";
import ChangePassword from "../../../icons/Profile/ChangePassword";
import Darkmode from "../../../icons/Profile/Darkmode";
import HelpCenter from "../../../icons/Profile/HelpCenter";
import Logout from "../../../icons/Profile/Logout";
import PrivacyPolicy from "../../../icons/Profile/PrivacyPolicy";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

import { useState, useEffect } from "react";
import i18n from "../../../i18n";
import { IonRouterLink } from "@ionic/react";
import { useTheme } from "../../../context/ThemeContext";

import GoBackButton from "../../../components/GoBackButton";
import DeleteAccountPopup from "../../student/profile/StudentDeleteAccountPopup";
import DarkModeComingSoon from "../../common/DarkModeComingSoon";
import { avatars } from "../../../data/Avatars";

const Profile: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const history = useHistory();
  const { t } = useTranslation();
  function logout() {
    // Set both values to false
    localStorage.setItem("hasVisited", "false");
    localStorage.setItem("keepLoggedIn", "false");

    // Optional: Clear the auth token or other session info
    localStorage.removeItem("authToken");

    // Redirect to login or onboarding page
    history.push("/choosesignmethod");
  }

  const handleLanguageToggle = () => {
    const newLanguage = i18n.language === "ar" ? "en" : "ar";
    const newDir = newLanguage === "ar" ? "ltr" : "rtl";

    // Update the language in i18n
    i18n.changeLanguage(newLanguage);

    // Update direction attribute
    document.documentElement.setAttribute("dir", newDir);

    // Save the selected language and direction in localStorage
    localStorage.setItem("language", newLanguage);
    localStorage.setItem("dir", newDir);
  };

  const redirectPage = (route: string) => {
    if (route) {
      history.push(route);
    }
  };

  const [deleteAccountPopup, setDeleteAccountPopup] = useState(false);

  const profileButtons = [
    {
      title: `${
        i18n.language === "en" ? "تغيير الي العربية" : "تغيير الي الانجليزية"
      }`,
      icon: <ChangeLanguage size={25} />,
      to: "",
      function: handleLanguageToggle,
    },
    {
      title: "تغيير كلمة المرور",
      icon: <ChangePassword size={25} />,
      to: "profilechangepassword",
    },
    {
      title: "سياسة الخصوصية",
      icon: <PrivacyPolicy size={25} />,
      to: "/student/settings/privacypolicy",
    },
    {
      title: "مركز المساعدة",
      icon: <HelpCenter size={25} />,
      to: "/student/settings/helpcenter",
    },
    {
      title: "تفعيل الوضع الداكن",
      icon: darkMode ? (
        <MdLightMode size={25} color="#4AAAD6" />
      ) : (
        <MdDarkMode size={25} color="#4AAAD6" />
      ),
      to: "",
    },
    {
      title: "تسجيل الخروج",
      icon: <Logout size={25} />,
      to: "choosesignmethod",
      function: logout,
    },
  ];

  const [showDarkModePopup, setShowDarkModePopup] = useState(false);
  // Handle Dark Mode toggle by showing popup instead of actually toggling
  const handleDarkModeClick = (e: any) => {
    e.stopPropagation(); // Prevent event bubbling
    setShowDarkModePopup(true);
    // toggleDarkMode();
  };

  return (
    <div className="flex flex-col h-full w-full items-center justify-between p-4">
      <div className="flex justify-between items-center w-full gap-3">
        <div className="opacity-0 w-[45px]" />

        <h1 className="text-black font-bold text-2xl text-end " dir="ltr">
          {t("الاعدادات")}
        </h1>
        <GoBackButton />
      </div>
      <IonRouterLink
        className="flex-center text-[#999999] w-full border-2 rounded-lg py-3"
        routerLink="/editprofile"
      >
        <h1>{t("تعديل الملف الشخصي")}</h1>
      </IonRouterLink>

      <div className="flex flex-col justify-around h-3/5 items-center w-full">
        {profileButtons.map((item, index) => (
          <div className="flex flex-col -mt-10 w-full" key={index}>
            <div
              className="flex w-full p-2 justify-between items-center"
              onClick={() =>
                item.function ? item.function() : redirectPage(item.to)
              }
            >
              {index === 4 ? (
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={handleDarkModeClick}
                    onClick={handleDarkModeClick}
                    className="sr-only peer"
                  />
                  <div
                    className="relative w-14 h-7
                     bg-blueprimary peer-focus:outline-none peer-focus:ring-4
                      peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800
                       rounded-full peer dark:bg-gray-700 
                       peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full
                        peer-checked:after:border-white after:content-['']
                         after:absolute after:top-0.5 after:start-[4px] 
                         after:bg-white -300 after:border
                          after:rounded-full after:h-6 after:w-6 after:transition-all
                           dark:border-gray-600 peer-checked:bg-blueprimary"
                  ></div>
                </label>
              ) : (
                <ProfileArrow size={25} />
              )}

              <div className="flex-center gap-3">
                <h1
                  className={`${
                    index == 5 ? "text-[#E14E54]" : "text-black dark:text-white"
                  }`}
                >
                  {t(item.title)}
                </h1>
                <div
                  className={`${
                    index == 5 ? "bg-[#e14e5349]" : "bg-[#D5EBF6]"
                  }  p-2 rounded-full`}
                >
                  {item.icon}
                </div>
              </div>
            </div>

            <div className="h-0.5 bg-gray-200 rounded-lg dark-gray-100" />
          </div>
        ))}
      </div>

      <div className="mt-6 w-full flex justify-center">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200"
        >
          <Logout size={25} />
          <span>{t("تسجيل الخروج")}</span>
        </button>
      </div>

      <DarkModeComingSoon
        isOpen={showDarkModePopup}
        onClose={() => setShowDarkModePopup(false)}
      />

      {deleteAccountPopup && (
        <DeleteAccountPopup
          deleteAccountPopup={deleteAccountPopup}
          setDeleteAccountPopup={setDeleteAccountPopup}
        />
      )}
    </div>
  );
};

export default Profile;
