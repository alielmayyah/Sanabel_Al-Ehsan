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

  // Updated code (case-insensitive)
  const filteredStudents = studentsData.filter((student: any) =>
    `${student.user.firstName} ${student.user.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
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
      <div className="flex flex-col gap-2  justify-start overflow-y-auto w-full h-full">
        {filteredStudents.map((student: any, index: any) => (
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
                  {`${student.user.firstName} ${student.user.lastName}`}
                </h1>
                <h1 className="text-black text-end"> {student.class || ""}</h1>
              </div>
              {/* <img src={} alt="" className="w-12" /> */}
              <h1 className="text-black text-3xl">
                {student.user.profileImg.gender}
              </h1>
              i want to give the data of profile image here to show each profile
              img for the students
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
