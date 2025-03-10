import { useHistory } from "react-router-dom";

import { useTranslation } from "react-i18next";

// Import Images

import { useEffect, useRef, useState } from "react";
import sanabelVideo from "../../assets/sanabelAnimation.mp4";
import TeacherNavbar from "../../../components/navbar/TeacherNavbar";
import SearchIcon from "../../../icons/SearchIcon";
import GoBackButton from "../../../components/GoBackButton";

import { avatars } from "../../../data/Avatars";

const ClassDetails: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const [selectViewType, setSelectViewType] = useState("classes");

  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search input

  const studentsData = [
    { name: "محمد منجي", avatar: avatars.boys.boy1, points: 300, class: "3B" },
    { name: "محمد عمرو", avatar: avatars.boys.boy2, points: 300, class: "3B" },
    { name: "أحمد خالد", avatar: avatars.boys.boy3, points: 300, class: "3B" },
    { name: "علي يوسف", avatar: avatars.boys.boy4, points: 300, class: "3B" },
    {
      name: "عبد الله سالم",
      avatar: avatars.boys.boy5,
      points: 300,
      class: "3B",
    },
    {
      name: "خالد إبراهيم",
      avatar: avatars.boys.boy6,
      points: 300,
      class: "3B",
    },
    { name: "ياسين محمد", avatar: avatars.boys.boy7, points: 300, class: "3B" },
    { name: "عمر حازم", avatar: avatars.boys.boy1, points: 300, class: "3B" },
    {
      name: "سيف الدين علاء",
      avatar: avatars.boys.boy2,
      points: 300,
      class: "3B",
    },
    { name: "يوسف حسن", avatar: avatars.boys.boy3, points: 300, class: "3B" },
    { name: "مالك أحمد", avatar: avatars.boys.boy4, points: 300, class: "3B" },
    { name: "رامز عادل", avatar: avatars.boys.boy5, points: 300, class: "3B" },
    { name: "حمزة مصطفى", avatar: avatars.boys.boy6, points: 300, class: "3B" },
    { name: "زياد سامي", avatar: avatars.boys.boy7, points: 300, class: "3B" },
    { name: "آدم كريم", avatar: avatars.boys.boy1, points: 300, class: "3B" },
    {
      name: "مازن عبد العزيز",
      avatar: avatars.boys.boy2,
      points: 300,
      class: "3B",
    },
    { name: "تميم محمود", avatar: avatars.boys.boy3, points: 300, class: "3B" },
    {
      name: "نور الدين عماد",
      avatar: avatars.boys.boy4,
      points: 300,
      class: "3B",
    },
    {
      name: "إياد عبد الرحمن",
      avatar: avatars.boys.boy5,
      points: 300,
      class: "3B",
    },
    { name: "باسل أمجد", avatar: avatars.boys.boy6, points: 300, class: "3B" },
    {
      name: "لينا خالد",
      avatar: avatars.girls.girl1,
      points: 300,
      class: "3B",
    },
    {
      name: "مريم عادل",
      avatar: avatars.girls.girl2,
      points: 300,
      class: "3B",
    },
    {
      name: "سارة أحمد",
      avatar: avatars.girls.girl3,
      points: 300,
      class: "3B",
    },
    {
      name: "نوران يوسف",
      avatar: avatars.girls.girl4,
      points: 300,
      class: "3B",
    },
    { name: "شهد محمد", avatar: avatars.girls.girl5, points: 300, class: "3B" },
    { name: "ملك كريم", avatar: avatars.girls.girl6, points: 300, class: "3B" },
    {
      name: "هالة خالد",
      avatar: avatars.girls.girl7,
      points: 300,
      class: "3B",
    },
    {
      name: "ريما أحمد",
      avatar: avatars.girls.girl8,
      points: 300,
      class: "3B",
    },
    {
      name: "مها إبراهيم",
      avatar: avatars.girls.girl9,
      points: 300,
      class: "3B",
    },
    {
      name: "آلاء سعيد",
      avatar: avatars.girls.girl1,
      points: 300,
      class: "3B",
    },
    { name: "رنا عمرو", avatar: avatars.girls.girl2, points: 300, class: "3B" },
    { name: "جنى خالد", avatar: avatars.girls.girl3, points: 300, class: "3B" },
    {
      name: "ميار محمد",
      avatar: avatars.girls.girl4,
      points: 300,
      class: "3B",
    },
    { name: "رغد أحمد", avatar: avatars.girls.girl5, points: 300, class: "3B" },
    {
      name: "ليان محمود",
      avatar: avatars.girls.girl6,
      points: 300,
      class: "3B",
    },
    {
      name: "تالين كريم",
      avatar: avatars.girls.girl7,
      points: 300,
      class: "3B",
    },
    {
      name: "ديما يوسف",
      avatar: avatars.girls.girl8,
      points: 300,
      class: "3B",
    },
    {
      name: "لارا مازن",
      avatar: avatars.girls.girl9,
      points: 300,
      class: "3B",
    },
    { name: "نور حازم", avatar: avatars.girls.girl1, points: 300, class: "3B" },
    {
      name: "يمنى خالد",
      avatar: avatars.girls.girl2,
      points: 300,
      class: "3B",
    },
    {
      name: "نادين عمر",
      avatar: avatars.girls.girl3,
      points: 300,
      class: "3B",
    },
    {
      name: "جود عبد الله",
      avatar: avatars.girls.girl4,
      points: 300,
      class: "3B",
    },
    {
      name: "لارين سامي",
      avatar: avatars.girls.girl5,
      points: 300,
      class: "3B",
    },
    {
      name: "تالا خالد",
      avatar: avatars.girls.girl6,
      points: 300,
      class: "3B",
    },
    { name: "لمى أحمد", avatar: avatars.girls.girl7, points: 300, class: "3B" },
    {
      name: "آية إبراهيم",
      avatar: avatars.girls.girl8,
      points: 300,
      class: "3B",
    },
    { name: "فرح خالد", avatar: avatars.girls.girl9, points: 300, class: "3B" },
    {
      name: "سلمى أمجد",
      avatar: avatars.girls.girl1,
      points: 300,
      class: "3B",
    },
    {
      name: "رزان يوسف",
      avatar: avatars.girls.girl2,
      points: 300,
      class: "3B",
    },
  ];
  const filteredStudents = studentsData.filter((student) =>
    student.name.includes(searchQuery)
  );
  return (
    <div className="flex flex-col h-screen w-full items-center justify-start  gap-3 p-4">
      <div className="flex items-center w-full justify-between">
        <div className="opacity-0 w-[25px] " />
        <h1 className="text-black font-bold text-2xl self-center" dir="ltr">
          {t("تفاصيل الفصل")}
        </h1>
        <GoBackButton />
      </div>

      <div className="w-full bg-redprimary h-20 rounded-xl flex items-center justify-between p-5 my-5">
     
        <h1 className="text-xl"> {t("فصل 2/1 الإبتدائي")}</h1>
      </div>

      <div className="flex items-end flex-col gap-2 w-full">
        <div className="w-full justify-between flex">
          <h1 className="text-[#999]"> {t("100 طالب")}</h1>
          <h1 className="text-black font-bold text-xl text-end">
            {t("الطلاب")}
          </h1>
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

      <TeacherNavbar />
    </div>
  );
};

export default ClassDetails;
