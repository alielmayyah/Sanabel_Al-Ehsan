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
import { useHistory } from "react-router-dom";

const Profile: React.FC = () => {
  const history = useHistory();

  function logout() {
    // Set both values to false
    localStorage.setItem("hasVisited", "false");
    localStorage.setItem("keepLoggedIn", "false");

    // Optional: Clear the auth token or other session info
    localStorage.removeItem("authToken");

    // Redirect to login or onboarding page
    history.push("/choosesignmethod");
  }
  return (
    <div
      className="flex flex-col h-full w-full items-center justify-between pt-4"
      id="page-height"
    >
      <ThemeSwitcher />
      <div className="text-redprimary  bg-blue-950 p-5" onClick={logout}>
        LOGOUT
      </div>
      <div className="text-black flex-center flex-col gap-3">
        <LanguageSwitcher />
        <h1 className="text-black dark:text-white">Testing Translate</h1>
      </div>
      <Navbar />
    </div>
  );
};

export default Profile;
