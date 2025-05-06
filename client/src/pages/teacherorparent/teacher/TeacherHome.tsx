import { useTheme } from "../../../context/ThemeContext";

import Notification from "../../../components/Notification";

import Greeting from "../../../components/Greeting";

import Navbar from "../../../components/navbar/TeacherNavbar";
import { useTranslation } from "react-i18next";

import InviteStudent from "../../../icons/TeacherHome/InviteStudent";
import ApplyClass from "../../../icons/TeacherHome/ApplyClass";
import ApplyTeam from "../../../icons/TeacherHome/ApplyTeam";
import ApplyStudents from "../../../icons/TeacherHome/ApplyStudents";

import { IoCloseCircle } from "react-icons/io5";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const TeacherHome: React.FC = () => {
  const history = useHistory();

  const { t } = useTranslation();
  const [openInvite, setOpenInvite] = useState(false);

  const teacherHomeButtons = [
    {
      title: "دعوة طلاب",
      description: "أرسل دعوات إلى الطلاب للانضمام إلى برنامج الحسنات.",
      bgColor: "bg-[#498200]",
      icon: <InviteStudent />,
      onclick: () => setOpenInvite(true),
    },
    {
      title: "تسجيل حسنات الفصول",
      description: "سجل إنجازات الحسنات التي جمعها الطلاب في فصولهم الدراسية.",
      bgColor: "bg-[#4AAAD6]",
      icon: <ApplyClass />,
      onclick: () => history.push("/teacher/classlist"), // Fixed to correctly invoke the function
    },
    {
      title: "تسجيل حسنات الفرق",
      description: "سجل الحسنات التي جمعها الطلاب عند العمل كفرق.",
      bgColor: "bg-[#E14E54]",
      icon: <ApplyTeam className="text-[#E14E54]" />,
      onclick: () => history.push("/teacher/teamslist"), // Fixed to correctly invoke the function
    },
    {
      title: "تسجيل حسنات للطلاب",
      description: "سجل الحسنات الفردية المكتسبة من قبل كل طالب.",
      bgColor: "bg-[#FAB700]",
      icon: <ApplyStudents />,
      onclick: () => history.push("/teacher/studentslist"), // Fixed to correctly invoke the function
    },
  ];

  return (
    <div
      className="flex flex-col items-center justify-start gap-10"
      id="page-height"
    >
      <div className="flex items-center justify-center w-full p-4">
        {/* <Notification /> */}
        <Greeting name={`مرحباً مريم`} text={"هيا بنا نصنع الخير معًا"} />
      </div>

      <div className="w-full flex flex-col gap-3 h-2/3 p-4">
        {teacherHomeButtons.map((button, index) => (
          <div
            className={`${button.bgColor} w-full rounded-3xl flex-center flex-col gap-2 h-full`}
            key={index}
            onClick={button.onclick} // Correctly passing the function
          >
            <div className="flex-center p-2 bg-white rounded-full">
              {button.icon}
            </div>
            <h1 className="text-white font-bold text-2xl">{button.title}</h1>
          </div>
        ))}
      </div>
      <Navbar />

      {openInvite && (
        <div className="w-screen h-screen absolute flex-center flex-col ">
          <div className="h-1/3 bg-black opacity-10 w-full"></div>
          <div className="h-2/3 w-full bg-white flex-center p-4">
            <div
              className="flex text-redprimary w-full justify-between items-center"
              onClick={() => setOpenInvite(false)}
            >
              <IoCloseCircle size={35} />
              <h1 className="text-black text-2xl">{t("دعوة طالب")}</h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherHome;
