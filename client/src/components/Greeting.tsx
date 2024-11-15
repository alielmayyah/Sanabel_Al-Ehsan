import React from "react";
import { useTranslation } from "react-i18next";

// Define the type for the component props
interface GreetingProps {
  name: string;
  text: string;
  hello?: string; // Optional prop
}

const Greeting: React.FC<GreetingProps> = ({ name, text, hello }) => {
  const { t } = useTranslation();

  return (
    <div className="flex-center p-2 gap-3">
      <div className="flex flex-col text-end">
        <h1 className="text-[#040415] dark:text-white">
          {hello === "yes" && t("مرحباً")} {name}
        </h1>
        <h2 className="text-[#B3B3B3]">{t(text)}</h2>
      </div>
      <div className="w-12 h-12 bg-red-300 rounded-full"></div>
    </div>
  );
};

export default Greeting;
