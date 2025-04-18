import { useTheme } from "../../../context/ThemeContext";

import TeacherNavbar from "../../../components/navbar/TeacherNavbar";
import { useTranslation } from "react-i18next";

import { useState } from "react";
import SearchIcon from "../../../icons/SearchIcon";
import GoBackButton from "../../../components/GoBackButton";

import { avatars } from "../../../data/Avatars";
import PrimaryButton from "../../../components/PrimaryButton";
import { FaCheck } from "react-icons/fa";

import { useHistory } from "react-router-dom";

const StudentList: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { t } = useTranslation();
  const [openInvite, setOpenInvite] = useState(false);
  const history = useHistory();
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

  // const studentList = [
  //   { name: "محمد منجي", avatar: avatars.boys.boy1 },
  //   { name: "محمد عمرو", avatar: avatars.boys.boy2 },
  //   { name: "أحمد خالد", avatar: avatars.boys.boy3 },
  //   { name: "علي يوسف", avatar: avatars.boys.boy4 },
  //   { name: "عبد الله سالم", avatar: avatars.boys.boy5 },
  //   { name: "خالد إبراهيم", avatar: avatars.boys.boy6 },
  //   { name: "ياسين محمد", avatar: avatars.boys.boy7 },
  //   { name: "عمر حازم", avatar: avatars.boys.boy1 },
  //   { name: "سيف الدين علاء", avatar: avatars.boys.boy2 },
  //   { name: "يوسف حسن", avatar: avatars.boys.boy3 },
  //   { name: "مالك أحمد", avatar: avatars.boys.boy4 },
  //   { name: "رامز عادل", avatar: avatars.boys.boy5 },
  //   { name: "حمزة مصطفى", avatar: avatars.boys.boy6 },
  //   { name: "زياد سامي", avatar: avatars.boys.boy7 },
  //   { name: "آدم كريم", avatar: avatars.boys.boy1 },
  //   { name: "مازن عبد العزيز", avatar: avatars.boys.boy2 },
  //   { name: "تميم محمود", avatar: avatars.boys.boy3 },
  //   { name: "نور الدين عماد", avatar: avatars.boys.boy4 },
  //   { name: "إياد عبد الرحمن", avatar: avatars.boys.boy5 },
  //   { name: "باسل أمجد", avatar: avatars.boys.boy6 },
  //   { name: "لينا خالد", avatar: avatars.girls.girl1 },
  //   { name: "مريم عادل", avatar: avatars.girls.girl2 },
  //   { name: "سارة أحمد", avatar: avatars.girls.girl3 },
  //   { name: "نوران يوسف", avatar: avatars.girls.girl4 },
  //   { name: "شهد محمد", avatar: avatars.girls.girl5 },
  //   { name: "ملك كريم", avatar: avatars.girls.girl6 },
  //   { name: "هالة خالد", avatar: avatars.girls.girl7 },
  //   { name: "ريما أحمد", avatar: avatars.girls.girl8 },
  //   { name: "مها إبراهيم", avatar: avatars.girls.girl9 },
  //   { name: "آلاء سعيد", avatar: avatars.girls.girl1 },
  //   { name: "رنا عمرو", avatar: avatars.girls.girl2 },
  //   { name: "جنى خالد", avatar: avatars.girls.girl3 },
  //   { name: "ميار محمد", avatar: avatars.girls.girl4 },
  //   { name: "رغد أحمد", avatar: avatars.girls.girl5 },
  //   { name: "ليان محمود", avatar: avatars.girls.girl6 },
  //   { name: "تالين كريم", avatar: avatars.girls.girl7 },
  //   { name: "ديما يوسف", avatar: avatars.girls.girl8 },
  //   { name: "لارا مازن", avatar: avatars.girls.girl9 },
  //   { name: "نور حازم", avatar: avatars.girls.girl1 },
  //   { name: "يمنى خالد", avatar: avatars.girls.girl2 },
  //   { name: "نادين عمر", avatar: avatars.girls.girl3 },
  //   { name: "جود عبد الله", avatar: avatars.girls.girl4 },
  //   { name: "لارين سامي", avatar: avatars.girls.girl5 },
  //   { name: "تالا خالد", avatar: avatars.girls.girl6 },
  //   { name: "لمى أحمد", avatar: avatars.girls.girl7 },
  //   { name: "آية إبراهيم", avatar: avatars.girls.girl8 },
  //   { name: "فرح خالد", avatar: avatars.girls.girl9 },
  //   { name: "سلمى أمجد", avatar: avatars.girls.girl1 },
  //   { name: "رزان يوسف", avatar: avatars.girls.girl2 },
  // ];
  const classData = [
    { name: "فصل 2/1 الابتدائي", points: 300, studentCount: 23 },
    { name: "فصل 2/1 الابتدائي", points: 300, studentCount: 23 },
    { name: "فصل 2/1 الابتدائي", points: 300, studentCount: 23 },
    { name: "فصل 2/1 الابتدائي", points: 300, studentCount: 23 },
    { name: "فصل 2/1 الابتدائي", points: 300, studentCount: 23 },
    { name: "فصل 2/1 الابتدائي", points: 300, studentCount: 23 },
    { name: "فصل 2/1 الابتدائي", points: 300, studentCount: 23 },
    { name: "فصل 2/1 الابتدائي", points: 300, studentCount: 23 },
    { name: "فصل 2/1 الابتدائي", points: 300, studentCount: 23 },
    { name: "فصل 2/1 الابتدائي", points: 300, studentCount: 23 },
    { name: "فصل 2/1 الابتدائي", points: 300, studentCount: 23 },
    { name: "فصل 2/1 الابتدائي", points: 300, studentCount: 23 },
    { name: "فصل 2/1 الابتدائي", points: 300, studentCount: 23 },
    { name: "فصل 2/1 الابتدائي", points: 300, studentCount: 23 },
    { name: "فصل 2/1 الابتدائي", points: 300, studentCount: 23 },
    { name: "فصل 2/1 الابتدائي", points: 300, studentCount: 23 },
    { name: "فصل 2/1 الابتدائي", points: 300, studentCount: 23 },
    { name: "فصل 2/1 الابتدائي", points: 300, studentCount: 23 },
    { name: "فصل 2/1 الابتدائي", points: 300, studentCount: 23 },
    { name: "فصل 2/1 الابتدائي", points: 300, studentCount: 23 },
    { name: "فصل 2/1 الابتدائي", points: 300, studentCount: 23 },
  ];

  const filteredClasses = classData.filter((student) =>
    student.name.includes(searchQuery)
  );

  return (
    <div
      className="flex flex-col items-center justify-start gap-10 p-4"
      id="page-height"
    >
      <div className="flex-center flex-col gap-3 w-full">
        <div className="flex items-center w-full justify-between">
          <div className="w-16 h-16  "></div>

          <h1 className="text-black font-bold text-2xl self-center" dir="ltr">
            {t("الفصول")}
          </h1>

          <GoBackButton />
        </div>

        <div className="flex w-full justify-between items-center  border-2 rounded-xl px-2 py-1">
          <div className="w-10 h-10 bg-blueprimary rounded-xl flex-center">
            <SearchIcon className="text-white" size={20} />
          </div>
          <input
            type="text"
            placeholder={t("ابحث عن فصل")}
            className=" drop-shadow-sm py-3 w-full bg-transparent  text-end  text-black"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-end flex-col gap-2 w-full">
        <h1 className="text-black font-bold text-xl text-end">{t("الفصول")}</h1>
        <div className="h-1/2 w-full overflow-y-auto flex flex-col gap-3">
          {filteredClasses.map((item) => (
            <div className="flex flex-col border-2 rounded-xl p-4 gap-3 ">
              <div className="flex w-full justify-between">
         
                <div className="flex flex-col">
                  <h1 className="text-black text-end text-md">{item.name}</h1>
                  <h1 className="text-[#999] text-end text-sm" dir="rtl">
                    {" "}
                    {item.studentCount} {t("طالب")}
                  </h1>
                </div>
              </div>
              <div className="-p-3">
                <div
                  className={`flex-center p-1 gap-3 w-full rounded-xl font-bold text-lg text-blueprimary border-[1px] border-blueprimary`}
                  onClick={() =>
                    history.push("/teacher/classregistrationdetails")
                  }
                >
                  <h1>{t("إدارة")}</h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <TeacherNavbar />
    </div>
  );
};

export default StudentList;
