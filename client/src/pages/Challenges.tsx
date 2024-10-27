import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useTheme } from "../context/ThemeContext";
import Navbar from "../components/Navbar";
import ThemeSwitcher from "../components/ThemeSwitcher";
import LanguageSwitcher from "../components/LanguageSwitcher";

const Challenges: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  return (
    <div
      className="flex flex-col  items-center justify-between pt-4"
      id="page-height"
    >
      <ThemeSwitcher />

      <div className="text-black flex-center flex-col gap-3">
        <LanguageSwitcher />
        <h1 className="text-black dark:text-white">Testing Translate</h1>
      </div>

      <Navbar />
    </div>
  );
};

export default Challenges;
