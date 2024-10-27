import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useTheme } from "../context/ThemeContext";

import Notification from "../components/Notification";
import ThemeSwitcher from "../components/ThemeSwitcher";
import LanguageSwitcher from "../components/LanguageSwitcher";
import Greeting from "../components/Greeting";
import ProgressHomeBar from "../components/ProgressHomeBar";
import SanabelAlEhsanCard from "../components/SanabelAlEhsanCard";
import { SanabelAlEhsanData } from "../data/SanabelAlEhsanData";
import Navbar from "../components/Navbar";

interface SanabelCard {
  img: string;
  title: string;
  points: number;
  borderColor: string;
}

const Home: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  return (
    <div
      className="flex flex-col items-center justify-between p-3"
      id="page-height"
    >
      <div className="flex items-center justify-between w-full">
        <Notification />
        <Greeting />
      </div>
      <ProgressHomeBar />
      <div className="flex flex-col gap-3 w-full">
        <div className="flex w-full justify-between">
          <h1 className="text-[#B3B3B3]">عرض الكل</h1>
          <h1 className="text-[#121212] font-bold text-lg">سنابل الإحسان</h1>
        </div>
        <div className="grid gr grid-cols-3 w-full gap-2">
          {SanabelAlEhsanData.map((card: SanabelCard) => (
            <SanabelAlEhsanCard
              key={card.title}
              title={card.title}
              points={card.points}
              img={card.img}
              borderColor={card.borderColor}
            />
          ))}
        </div>
      </div>
      <div className="text-black flex-center flex-col gap-3">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
      <Navbar />
    </div>
  );
};

export default Home;
