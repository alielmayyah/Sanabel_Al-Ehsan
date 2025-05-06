import React from "react";
import { useTranslation } from "react-i18next";
import GetAvatar from "../pages/student/tutorial/GetAvatar";

// Define the type for the component props
interface GreetingProps {
  name: string;
  text: string;
  hello?: string; // Optional prop
}

const Greeting: React.FC<GreetingProps> = ({ name, text, hello }) => {
  const { t } = useTranslation();
  const role = localStorage.getItem("role");

  // Student version
  if (role === "Student") {
    return (
      <div className="flex justify-end items-center p-4 gap-4 w-full">
        <div className="flex flex-col text-end">
          <h1 className="text-lg font-bold text-[#040415] dark:text-white">
            {hello === "yes" && t("مرحباً")} {name}
          </h1>
          <h2 className="text-sm text-[#B3B3B3]">{t(text)}</h2>
        </div>
        <div className="w-16 h-16 rounded-full overflow-hidden shadow-md">
          <GetAvatar />
        </div>
      </div>
    );
  }

  // Teacher version - elegant minimalist design
  return (
    <div className="w-full p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex flex-col items-start">
          <div className="flex items-center">
            {hello === "yes" && (
              <span className="text-indigo-600 dark:text-indigo-400 font-medium mr-2">
                {t("مرحباً")}
              </span>
            )}
            <h1 className="text-xl font-bold text-[#040415] dark:text-white">
              {name}
            </h1>
            <span className="ml-3 px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-xs rounded-full">
              {t("معلم")}
            </span>
          </div>
          <h2 className="text-[#777777] dark:text-[#B3B3B3] mt-2 text-sm">
            {t(text)}
          </h2>
          <div className="mt-3 w-24 h-1 bg-indigo-500 rounded-full"></div>
        </div>

        <div className="relative">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg">
            <GetAvatar />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-700"></div>
        </div>
      </div>
    </div>
  );
};

export default Greeting;
