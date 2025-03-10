import { motion } from "framer-motion";
import StudentNavbar from "../../../components/navbar/StudentNavbar";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../context/ThemeContext";
import { useUserContext } from "../../../context/UserProvider";
import trophies from "../../../data/TrophiesData";

const Profile: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const history = useHistory();
  const { t } = useTranslation();
  const { user } = useUserContext();

  return (
    <div
      className="flex flex-col h-full w-full items-center justify-between z-10 p-4 overflow-y-auto"
      id="page-height"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-4 w-full justify-between gap-1"
      >
        {trophies.map((trophy, index) => (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="flex-center flex-col"
          >
            <img src={trophy.img} alt="" className="w-20" />
            <h1 className=" text-xs text-yellowprimary ">{trophy.count}</h1>
            <h1 className=" text-xs text-black text-center">
              {t(trophy.title).split(" ").slice(0, 2).join(" ")}
            </h1>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Profile;
