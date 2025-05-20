import { useTheme } from "../../../context/ThemeContext";
import Notification from "../../../components/Notification";
import Navbar from "../../../components/navbar/TeacherNavbar";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaTrophy,
  FaUserFriends,
} from "react-icons/fa";
import { motion } from "framer-motion";

const TeacherHome = () => {
  const history = useHistory();
  const { t } = useTranslation();

  const teacherHomeButtons = [
    {
      title: "تسجيل الفصول",
      description: "سجل إنجازات وتابع تقدم الطلاب في فصلك الدراسي",
      bgColor: "bg-blueprimary",
      icon: <FaChalkboardTeacher className="text-blueprimary" size={28} />,
      onclick: () => history.push("/teacher/classlist"),
    },
    {
      title: "تسجيل الطلاب",
      description: "سجل إنجازات الطلاب الفردية وتقدمهم",
      bgColor: "bg-greenprimary",
      icon: <FaUserGraduate className="text-greenprimary" size={28} />,
      onclick: () => history.push("/teacher/studentslist"),
    },

    {
      title: "عرض الطلاب والفصول",
      description: "تصفح وأدر طلابك وفصولك",
      bgColor: "bg-redprimary",
      icon: <FaUserFriends className="text-redprimary" size={28} />,
      onclick: () => history.push("/teacher/view"),
    },
    {
      title: "عرض التحديات",
      description: "استكشف التحديات والأنشطة المتاحة",
      bgColor: "bg-yellowprimary",
      icon: <FaTrophy className="text-yellowprimary" size={28} />,
      onclick: () => history.push("/teacher/challenges"),
    },
    {
      title: "الإعدادات",
      description: "إدارة إعدادات حسابك",
      bgColor: "bg-gray-900",
      icon: <IoMdSettings className="text-gray-900" size={28} />,
      onclick: () => history.push("/teacher/profile"),
      fullWidth: true,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-start gap-6 bg-gray-50 min-h-screen">
      <motion.div
        className="w-full flex flex-col items-center justify-between p-6 bg-gradient-to-r text-black "
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-2xl font-extrabold">{t("مرحباً أستاذ")}</h1>
      </motion.div>

      <motion.div
        className="w-full grid grid-cols-2 gap-2 px-4 pb-20 h-[90vh] overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        {teacherHomeButtons.map((button, index) => (
          <motion.div
            className={`flex-center flex-col gap-4 ${
              button.fullWidth ? "col-span-2 h-32" : "h-full"
            } ${
              button.bgColor
            } rounded-xl shadow-lg transform transition-transform w-full `}
            key={index}
            onClick={button.onclick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index, duration: 0.5 }}
          >
            <div className="flex-shrink-0 h-14 w-14 flex items-center justify-center rounded-full bg-white shadow-md">
              {button.icon}
            </div>

            <h2 className="font-bold text-md text-white">{button.title}</h2>
          </motion.div>
        ))}
      </motion.div>

      <Navbar />
    </div>
  );
};

export default TeacherHome;
