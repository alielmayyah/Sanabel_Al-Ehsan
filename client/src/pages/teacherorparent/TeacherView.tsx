import { useHistory } from "react-router-dom";

import { useTranslation } from "react-i18next";

// Import Images

import SanabelArrow from "../../icons/SanabelArrow";

import { useEffect, useRef, useState } from "react";
import sanabelVideo from "../../assets/sanabelAnimation.mp4";
import FilterIcon from "../../icons/Leaderboards/FilterIcon";
import TeacherNavbar from "../../components/navbar/TeacherNavbar";
import SearchIcon from "../../icons/SearchIcon";
import GoBackButton from "../../components/GoBackButton";

import { studentsData } from "../../data/StudentsData";

import { avatars } from "../../data/Avatars";

const TeacherView: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const [selectViewType, setSelectViewType] = useState("classes");

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
  const teamData = [
    { name: "فريق الخير", points: 300, studentCount: 23 },
    { name: "فريق الخير", points: 300, studentCount: 23 },
    { name: "فريق الخير", points: 300, studentCount: 23 },
    { name: "فريق الخير", points: 300, studentCount: 23 },
    { name: "فريق الخير", points: 300, studentCount: 23 },
    { name: "فريق الخير", points: 300, studentCount: 23 },
    { name: "فريق الخير", points: 300, studentCount: 23 },
    { name: "فريق الخير", points: 300, studentCount: 23 },
    { name: "فريق الخير", points: 300, studentCount: 23 },
    { name: "فريق الخير", points: 300, studentCount: 23 },
    { name: "فريق الخير", points: 300, studentCount: 23 },
    { name: "فريق الخير", points: 300, studentCount: 23 },
    { name: "فريق الخير", points: 300, studentCount: 23 },
    { name: "فريق الخير", points: 300, studentCount: 23 },
    { name: "فريق الخير", points: 300, studentCount: 23 },
    { name: "فريق الخير", points: 300, studentCount: 23 },
    { name: "فريق الخير", points: 300, studentCount: 23 },
    { name: "فريق الخير", points: 300, studentCount: 23 },
    { name: "فريق الخير", points: 300, studentCount: 23 },
    { name: "فريق الخير", points: 300, studentCount: 23 },
    { name: "فريق الخير", points: 300, studentCount: 23 },
  ];

  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search input
  const filteredStudents = studentsData.filter((student) =>
    student.name.includes(searchQuery)
  );
  return (
    <div className="flex flex-col h-screen w-full items-center justify-start  gap-3 p-4">
      <div
        className={`flex items-center w-full ${
          selectViewType == "classes" ? "justify-between" : "justify-end"
        } `}
      >
        {selectViewType == "classes" && (
          <div className="flex-center bg-[#E6E6E6] p-3 rounded-2xl">
            <FilterIcon />
            <h1 className="text-[#999] text-md font-bold">{t("الصف")}</h1>
          </div>
        )}
        <div className="flex items-end flex-col gap-2">
          <h1 className="text-black font-bold text-2xl text-end">
            {t("استعرض الطلاب")}
          </h1>
          <p className="text-[#b3b3b3] text-end">
            {t("اطلع علي الفرق والطلاب والفصول")}
          </p>
        </div>
      </div>

      <div className="flex w-full bg-[#E6E6E6] rounded-3xl justify-between my-4 p-1">
        <div
          className={`w-full text-center py-1 rounded-3xl ${
            selectViewType == "students"
              ? "bg-blueprimary text-white"
              : "text-[#999]"
          }`}
          onClick={() => setSelectViewType("students")}
        >
          <h1>{t("طلاب")}</h1>
        </div>
        <div
          className={`w-full text-center py-1 rounded-3xl ${
            selectViewType == "teams"
              ? "bg-blueprimary text-white"
              : "text-[#999]"
          }`}
          onClick={() => setSelectViewType("teams")}
        >
          <h1>{t("فرق")}</h1>
        </div>
        <div
          className={`w-full text-center py-1 rounded-3xl ${
            selectViewType == "classes"
              ? "bg-blueprimary text-white"
              : "text-[#999]"
          }`}
          onClick={() => setSelectViewType("classes")}
        >
          <h1>{t("فصول")}</h1>
        </div>
      </div>

      {selectViewType === "classes" && (
        <div className="flex items-end flex-col gap-2 w-full">
          <h1 className="text-black font-bold text-xl text-end">
            {t("الفصول")}
          </h1>
          <div className="h-1/2 w-full overflow-y-auto flex flex-col gap-3">
            {classData.map((item) => (
              <div className="border-2 rounded-xl flex w-full p-4 justify-between">
                
                <div className="flex flex-col">
                  <h1 className="text-black text-end text-md">{item.name}</h1>
                  <h1 className="text-[#999] text-end text-sm" dir="rtl">
                    {" "}
                    {item.studentCount} {t("طالب")}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {selectViewType === "teams" && (
        <div className="flex items-end flex-col gap-2 w-full">
          <h1 className="text-black font-bold text-xl text-end">
            {t("الفرق")}
          </h1>
          <div className="h-1/2 w-full overflow-y-auto flex flex-col gap-3">
            {teamData.map((item) => (
              <div className="border-2 rounded-xl flex w-full p-4 justify-between">
             
                <div className="flex flex-col">
                  <h1 className="text-black text-end text-md">{item.name}</h1>
                  <h1 className="text-[#999] text-end text-sm" dir="rtl">
                    {" "}
                    {item.studentCount} {t("طالب")}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {selectViewType === "students" && (
        <div className="flex items-end flex-col gap-2 w-full">
          <h1 className="text-black font-bold text-xl text-end">
            {t("الطلاب")}
          </h1>
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
          <div className="h-1/2 grid grid-cols-3 w-full overflow-y-auto gap-2">
            {filteredStudents.map((item) => (
              <div className=" flex-center flex-col p-2 gap-1 ">
                <img src={item.avatar} alt="" className="w-12" />

                <h1 className="text-black text-end text-md">{item.name}</h1>
                <h1 className="text-[#999] text-end text-sm" dir="rtl">
                  {item.points} {t("")}
                </h1>
                <h1 className="text-[#999] text-end text-sm" dir="rtl">
                  {item.class}
                </h1>
              </div>
            ))}
          </div>
        </div>
      )}
      <TeacherNavbar />
    </div>
  );
};

export default TeacherView;
