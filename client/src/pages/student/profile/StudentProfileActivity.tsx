import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../context/ThemeContext";
import { useUserContext } from "../../../context/UserProvider";
import { treeStages } from "../../../data/Tree";
import sanabelType from "../../../data/SanabelTypeData";
import { useState } from "react";

const Profile: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const history = useHistory();
  const { t } = useTranslation();
  const { user } = useUserContext();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="flex flex-col justify-start items-center h-full w-full gap-2 overflow-y-auto p-4"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-black text-md font-bold"
      >
        {t("قائمة النشاط")}
      </motion.div>

      {sanabelType[0].sanabel.map((activity, index) => (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.1, duration: 1 }}
          className="flex flex-row-reverse w-full justify-between items-center"
        >
          <div className="flex justify-between items-center gap-2 ">
            <div className="flex flex-col ">
              <h1 className="text-blueprimary text-sm text-end">
                {t(activity.name)}
              </h1>
              <h1 className="text-black text-sm text-end">اسم المهمة</h1>
            </div>
            <img src={activity.img} alt="" className="w-8" />
          </div>
          <h1 className="text-[#999] text-sm">{t("منذ ساعتين")}</h1>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Profile;
