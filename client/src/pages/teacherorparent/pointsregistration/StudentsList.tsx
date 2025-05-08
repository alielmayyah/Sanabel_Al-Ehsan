import { useTheme } from "../../../context/ThemeContext";

import TeacherNavbar from "../../../components/navbar/TeacherNavbar";
import { useTranslation } from "react-i18next";

import { useEffect, useState } from "react";
import SearchIcon from "../../../icons/SearchIcon";
import GoBackButton from "../../../components/GoBackButton";

import avtar1 from "../../../assets/avatars/Boys/1.png";
import PrimaryButton from "../../../components/PrimaryButton";
import { FaCheck } from "react-icons/fa";
import axios from "axios";

const StudentList: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { t } = useTranslation();
  const [openInvite, setOpenInvite] = useState(false);

  const [markedIndices, setMarkedIndices] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search input

  const toggleMarked = (index: number) => {
    setMarkedIndices(
      (prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index) // Unmark if already marked
          : [...prev, index] // Mark if not marked
    );
  };

  const [studentsData, setStudentsData] = useState<any>([]);

  const fetchStudentsData = async (token?: string) => {
    const authToken = token || localStorage.getItem("token");
    if (!authToken) return;

    try {
      const response = await axios.get(
        "http://localhost:3000/teachers/appear-student",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        setStudentsData(response.data.data);
        console.log("Students data:", response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchStudentsData();
  }, []);

  const studentList = [
    { name: "محمد منجي", avatar: avtar1 },
    { name: "محمد عمرو", avatar: avtar1 },
    { name: "أحمد خالد", avatar: avtar1 },
    { name: "علي يوسف", avatar: avtar1 },
    { name: "عبد الله سالم", avatar: avtar1 },
    { name: "خالد إبراهيم", avatar: avtar1 },
    { name: "ياسين محمد", avatar: avtar1 },
    { name: "عمر حازم", avatar: avtar1 },
    { name: "سيف الدين علاء", avatar: avtar1 },
    { name: "يوسف حسن", avatar: avtar1 },
    { name: "مالك أحمد", avatar: avtar1 },
    { name: "رامز عادل", avatar: avtar1 },
    { name: "حمزة مصطفى", avatar: avtar1 },
    { name: "زياد سامي", avatar: avtar1 },
    { name: "آدم كريم", avatar: avtar1 },
    { name: "مازن عبد العزيز", avatar: avtar1 },
    { name: "تميم محمود", avatar: avtar1 },
    { name: "نور الدين عماد", avatar: avtar1 },
    { name: "إياد عبد الرحمن", avatar: avtar1 },
    { name: "باسل أمجد", avatar: avtar1 },
    { name: "لينا خالد", avatar: avtar1 },
    { name: "مريم عادل", avatar: avtar1 },
    { name: "سارة أحمد", avatar: avtar1 },
    { name: "نوران يوسف", avatar: avtar1 },
    { name: "شهد محمد", avatar: avtar1 },
    { name: "ملك كريم", avatar: avtar1 },
    { name: "هالة خالد", avatar: avtar1 },
    { name: "ريما أحمد", avatar: avtar1 },
    { name: "مها إبراهيم", avatar: avtar1 },
    { name: "آلاء سعيد", avatar: avtar1 },
    { name: "رنا عمرو", avatar: avtar1 },
    { name: "جنى خالد", avatar: avtar1 },
    { name: "ميار محمد", avatar: avtar1 },
    { name: "رغد أحمد", avatar: avtar1 },
    { name: "ليان محمود", avatar: avtar1 },
    { name: "تالين كريم", avatar: avtar1 },
    { name: "ديما يوسف", avatar: avtar1 },
    { name: "لارا مازن", avatar: avtar1 },
    { name: "نور حازم", avatar: avtar1 },
    { name: "يمنى خالد", avatar: avtar1 },
    { name: "نادين عمر", avatar: avtar1 },
    { name: "جود عبد الله", avatar: avtar1 },
    { name: "لارين سامي", avatar: avtar1 },
    { name: "تالا خالد", avatar: avtar1 },
    { name: "لمى أحمد", avatar: avtar1 },
    { name: "آية إبراهيم", avatar: avtar1 },
    { name: "فرح خالد", avatar: avtar1 },
    { name: "سلمى أمجد", avatar: avtar1 },
    { name: "رزان يوسف", avatar: avtar1 },
  ];

  const filteredStudents = studentList.filter((student) =>
    student.name.includes(searchQuery)
  );

  return (
    <div
      className="flex flex-col items-center justify-between gap-10 p-4"
      id="page-height"
    >
      <div className="flex-center flex-col gap-3 w-full">
        <div className="flex items-center w-full justify-between">
          <div className="w-16 h-16  "></div>

          <h1 className="text-black font-bold text-2xl self-center" dir="ltr">
            {t("الطلاب")}
          </h1>

          <GoBackButton />
        </div>

        <div className="flex w-full justify-between items-center  border-2 rounded-xl px-2 py-1">
          <div className="w-10 h-10 bg-blueprimary rounded-xl flex-center">
            <SearchIcon className="text-white" size={20} />
          </div>
          <input
            type="text"
            placeholder={t("ابحث عن طالب")}
            className=" drop-shadow-sm py-3 w-full bg-transparent  text-end  text-black"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 overflow-y-auto w-full h-">
        {studentsData.map((student: any, index: any) => (
          <div
            className="w-full flex p-3  justify-between items-center border-2 rounded-xl "
            key={index}
          >
            <div
              className={`w-10 h-10 flex-center rounded-xl ${
                markedIndices.includes(index)
                  ? "bg-blueprimary border-0"
                  : "bg-transparent border-2"
              }`}
              onClick={() => toggleMarked(index)}
            >
              <FaCheck />
            </div>
            <div className="gap-3 flex-center">
              <div className="flex flex-col gap-3">
                <h1 className="text-black">
                  {" "}
                  {student.user.firstName + " " + student.user.lastName}{" "}
                </h1>
                <h1 className="text-black text-end"> {student.class}</h1>
              </div>
              <img src={student.avatar} alt="" className="w-12" />
            </div>
          </div>
        ))}
      </div>
      <PrimaryButton style={""} text={t("تسجيل حسنات")} arrow={"none"} />
      <TeacherNavbar />
    </div>
  );
};

export default StudentList;
