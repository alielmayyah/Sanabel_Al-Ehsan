import { useTheme } from "../../../context/ThemeContext";
import Notification from "../../../components/Notification";
import Navbar from "../../../components/navbar/TeacherNavbar";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaTrophy,
  FaUserFriends,
  FaClipboardList,
} from "react-icons/fa";

const TeacherHome = () => {
  const history = useHistory();
  const { t } = useTranslation();

  const teacherHomeButtons = [
    {
      title: "Register Classes",
      description: "Record achievements and track progress for your classroom.",
      bgColor: "bg-blueprimary",
      icon: <FaChalkboardTeacher className="text-blue-600" size={24} />,
      onclick: () => history.push("/teacher/classlist"),
    },
    {
      title: "Register Students",
      description: "Record individual student achievements and progress.",
      bgColor: "bg-greenprimary",
      icon: <FaUserGraduate className="text-green-600" size={24} />,
      onclick: () => history.push("/teacher/studentslist"),
    },
    {
      title: "Leaderboards",
      description: "View top performing classes and students.",
      bgColor: "bg-yellowprimary",
      icon: <FaTrophy className="text-yellow-500" size={24} />,
      onclick: () => history.push("/teacher/leaderboards"),
    },
    {
      title: "View Students & Classes",
      description: "Browse and manage your students and classes.",
      bgColor: "bg-redprimary",
      icon: <FaUserFriends className="text-purple-600" size={24} />,
      onclick: () => history.push("/teacher/view"),
    },
    {
      title: "View Challenges",
      description: "Explore available challenges and activities.",
      bgColor: "bg-red-600",
      icon: <FaClipboardList className="text-red-600" size={24} />,
      onclick: () => history.push("/teacher/challenges"),
    },
  ];

  return (
    <div
      className="flex flex-col items-center justify-start gap-6 bg-gray-50"
      dir="rtl"
      id="page-height"
    >
      <div className="w-full flex items-center justify-between p-4 bg-white shadow">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-gray-200 ml-3 overflow-hidden">
            {/* صورة المعلم */}
            <img
              src="/assets/teacher-avatar.png"
              alt="معلم"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-right">
            <h1 className="text-xl font-bold">مرحباً أستاذ</h1>
            <p className="text-gray-600 text-sm">هيا بنا نصنع الفرق معًا</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Notification />
        </div>
      </div>

      <div className="w-full grid grid-cols-1 gap-4 px-4 pb-20">
        {teacherHomeButtons.map((button, index) => (
          <div
            className={`${button.bgColor} rounded-xl shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105`}
            key={index}
            onClick={button.onclick}
          >
            <div className="flex items-center p-4">
              <div className="flex-1 text-white text-right">
                <h2 className="font-bold text-lg">{button.title}</h2>
                <p className="text-sm opacity-90">{button.description}</p>
              </div>
              <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-white mr-4">
                {button.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Navbar />
    </div>
  );
};

export default TeacherHome;
