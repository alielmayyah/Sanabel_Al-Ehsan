import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import TeacherNavbar from "../../components/navbar/TeacherNavbar";
import SearchIcon from "../../icons/SearchIcon";
import FilterIcon from "../../icons/Leaderboards/FilterIcon";
import GoBackButton from "../../components/GoBackButton";
import GetAvatar from "../student/tutorial/GetAvatar";
import MedalAndLevel from "../../components/MedalAndLevel";
import { calculateLevel } from "../../utils/LevelCalculator";
import { FiGrid } from "react-icons/fi";
import { FaThList } from "react-icons/fa";

// Define types for better type safety
interface User {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  profileImg: any;
}

interface StudentData {
  xp: number;
  level: number;
  id: number;
  userId: number;
  user: User;
  class?: string;
}

interface ClassData {
  name: string;
  points: number;
  studentCount: number;
}

interface TeamData {
  name: string;
  points: number;
  studentCount: number;
}

const TeacherView: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const [selectViewType, setSelectViewType] = useState("students");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [studentsData, setStudentsData] = useState<StudentData[]>([]);
  const [layoutType, setLayoutType] = useState<"grid" | "row">("grid");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const classData: ClassData[] = [
    { name: "فصل 2/1 الابتدائي", points: 300, studentCount: 23 },
    { name: "فصل 2/2 الابتدائي", points: 280, studentCount: 21 },
    { name: "فصل 2/3 الابتدائي", points: 320, studentCount: 24 },
    { name: "فصل 3/1 الابتدائي", points: 290, studentCount: 22 },
    { name: "فصل 3/2 الابتدائي", points: 310, studentCount: 25 },
    { name: "فصل 4/1 الابتدائي", points: 330, studentCount: 26 },
  ];

  const filterOptions = [
    { value: "all", label: "الكل" },
    { value: "level_high", label: "المستوى (الأعلى)" },
    { value: "level_low", label: "المستوى (الأدنى)" },
    { value: "name_asc", label: "الاسم (أ-ي)" },
    { value: "name_desc", label: "الاسم (ي-أ)" },
  ];

  const teamData: TeamData[] = [
    { name: "فريق الخير", points: 300, studentCount: 10 },
    { name: "فريق النور", points: 280, studentCount: 12 },
    { name: "فريق العلم", points: 290, studentCount: 9 },
    { name: "فريق الأمل", points: 310, studentCount: 11 },
    { name: "فريق السلام", points: 320, studentCount: 10 },
    { name: "فريق المحبة", points: 330, studentCount: 8 },
  ];

  // Fetch students data on component mount
  useEffect(() => {
    fetchStudentsData();
  }, []);

  const fetchStudentsData = async () => {
    const authToken = localStorage.getItem("token");
    if (!authToken) return;
    try {
      const response = await fetch(
        `http://localhost:3000/teachers/appear-student`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setStudentsData(data.data);
        console.log(studentsData);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Filter and sort students based on search query and active filter
  const getFilteredStudents = () => {
    const searchFiltered = studentsData.filter((student) =>
      `${student.user.firstName} ${student.user.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );

    // Apply sorting based on active filter
    switch (activeFilter) {
      case "level_high":
        return [...searchFiltered].sort(
          (a, b) => calculateLevel(b.xp).level - calculateLevel(a.xp).level
        );
      case "level_low":
        return [...searchFiltered].sort(
          (a, b) => calculateLevel(a.xp).level - calculateLevel(b.xp).level
        );
      case "name_asc":
        return [...searchFiltered].sort((a, b) =>
          a.user.firstName.localeCompare(b.user.firstName)
        );
      case "name_desc":
        return [...searchFiltered].sort((a, b) =>
          b.user.firstName.localeCompare(a.user.firstName)
        );
      default:
        return searchFiltered;
    }
  };

  const filteredStudents = getFilteredStudents();

  // Modified to navigate to student details page
  const navigateToStudentDetail = (studentId: number) => {
    history.push(`/teacher/student/${studentId}`);
  };

  return (
    <div
      className="flex flex-col items-center justify-between gap-5 p-4"
      id="page-height"
    >
      {/* Header */}
      <div className="flex-center flex-col gap-3 w-full">
        <div className="flex items-center w-full justify-between">
          {selectViewType === "classes" ? (
            <div className="flex-center bg-gray-200 p-3 rounded-2xl">
              <FilterIcon />
              <h1 className="text-gray-500 text-md font-bold">{t("الصف")}</h1>
            </div>
          ) : (
            <div className="w-16 h-16"></div>
          )}
          <div className="flex items-center justify-center flex-col gap-2">
            <h1 className="text-black font-bold text-2xl text-end">
              {t("استعرض الطلاب")}
            </h1>
            {/* <p className="text-gray-400 text-end">
              {t("اطلع علي الفرق والطلاب والفصول")}
            </p> */}
          </div>
          <GoBackButton />
        </div>
      </div>

      {/* View Type Selector */}
      <div className="flex w-full bg-gray-200 rounded-3xl justify-between my-2 p-1">
        <div
          className={`w-full text-center py-1 rounded-3xl ${
            selectViewType === "students"
              ? "bg-blueprimary text-white"
              : "text-gray-500"
          }`}
          onClick={() => setSelectViewType("students")}
        >
          <h1>{t("طلاب")}</h1>
        </div>
        <div
          className={`w-full text-center py-1 rounded-3xl ${
            selectViewType === "teams"
              ? "bg-blueprimary text-white"
              : "text-gray-500"
          }`}
          onClick={() => setSelectViewType("teams")}
        >
          <h1>{t("فرق")}</h1>
        </div>
        <div
          className={`w-full text-center py-1 rounded-3xl ${
            selectViewType === "classes"
              ? "bg-blueprimary text-white"
              : "text-gray-500"
          }`}
          onClick={() => setSelectViewType("classes")}
        >
          <h1>{t("فصول")}</h1>
        </div>
      </div>

      {/* Search Bar and Layout Options - Only show for students view */}
      {selectViewType === "students" && (
        <div className="w-full space-y-3">
          {/* Filter and Layout Options Row */}
          <div className="flex justify-between items-center w-full">
            {/* Filter Menu */}
            <div className="relative">
              <div
                className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-xl "
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              >
                <FilterIcon />
                <span className="text-gray-700">
                  {t(
                    filterOptions.find((opt) => opt.value === activeFilter)
                      ?.label || "فلتر"
                  )}
                </span>
              </div>

              {/* Dropdown Menu */}
              {showFilterDropdown && (
                <div className="absolute left-0 mt-2 bg-white text-black shadow-lg rounded-xl z-10 min-w-max border">
                  {filterOptions.map((option) => (
                    <div
                      key={option.value}
                      className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                        activeFilter === option.value
                          ? "bg-gray-100 font-medium"
                          : ""
                      }`}
                      onClick={() => {
                        setActiveFilter(option.value);
                        setShowFilterDropdown(false);
                      }}
                    >
                      {t(option.label)}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Layout Switcher */}
            <div className="flex items-center gap-2 bg-gray-200 rounded-xl overflow-hidden">
              <div
                className={`p-2 cursor-pointer ${
                  layoutType === "grid"
                    ? "bg-blueprimary text-white"
                    : "text-gray-700"
                }`}
                onClick={() => setLayoutType("grid")}
              >
                <FiGrid size={20} />
              </div>
              <div
                className={`p-2 cursor-pointer ${
                  layoutType === "row"
                    ? "bg-blueprimary text-white"
                    : "text-gray-700"
                }`}
                onClick={() => setLayoutType("row")}
              >
                <FaThList size={20} />
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex w-full justify-between items-center border-2 rounded-xl px-2 py-1">
            <div className="w-10 h-10 bg-blueprimary rounded-xl flex-center">
              <SearchIcon className="text-white" size={20} />
            </div>
            <input
              type="text"
              placeholder={t("ابحث عن طالب")}
              className="drop-shadow-sm py-3 w-full bg-transparent text-end text-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="w-full overflow-y-auto flex-1">
        {/* Classes View */}
        {selectViewType === "classes" && (
          <div className="flex items-end flex-col gap-2 w-full">
            <h1 className="text-black font-bold text-xl text-end">
              {t("الفصول")}
            </h1>
            <div className="w-full flex flex-col gap-3">
              {classData.map((item, index) => (
                <div
                  key={index}
                  className="border-2 rounded-xl flex w-full p-4 justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-blueprimary font-bold">
                      {item.points}
                    </span>
                    <span className="text-gray-500">{t("نقطة")}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <h1 className="text-black text-end text-md">{item.name}</h1>
                    <h1 className="text-gray-500 text-end text-sm" dir="rtl">
                      {item.studentCount} {t("طالب")}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Teams View */}
        {selectViewType === "teams" && (
          <div className="flex items-end flex-col gap-2 w-full">
            <h1 className="text-black font-bold text-xl text-end">
              {t("الفرق")}
            </h1>
            <div className="w-full flex flex-col gap-3">
              {teamData.map((item, index) => (
                <div
                  key={index}
                  className="border-2 rounded-xl flex w-full p-4 justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-blueprimary font-bold">
                      {item.points}
                    </span>
                    <span className="text-gray-500">{t("نقطة")}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <h1 className="text-black text-end text-md">{item.name}</h1>
                    <h1 className="text-gray-500 text-end text-sm" dir="rtl">
                      {item.studentCount} {t("طالب")}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Students View - with Grid and Row layout options */}
        {selectViewType === "students" && (
          <div className="flex items-end flex-col gap-2 w-full">
            <h1 className="text-black font-bold text-xl text-end">
              {t("الطلاب")}
            </h1>

            {filteredStudents.length > 0 ? (
              layoutType === "grid" ? (
                // Grid View
                <div className="grid grid-cols-3 w-full gap-2 mt-2">
                  {filteredStudents.map((student) => (
                    <div
                      key={student.id}
                      className="flex flex-col items-center p-2 gap-1 border-2 rounded-xl hover:bg-gray-50 cursor-pointer"
                      onClick={() => navigateToStudentDetail(student.id)}
                    >
                      <div className="w-14 h-14 rounded-full">
                        <GetAvatar userAvatarData={student.user.profileImg} />
                      </div>
                      <h1 className="text-black text-center font-medium mt-1">
                        {`${student.user.firstName}`}
                      </h1>
                      <h1 className="text-gray-500 text-xs text-center">
                        {student.class || t("لا يوجد فصل")}
                      </h1>
                      <MedalAndLevel
                        level={calculateLevel(student.xp).level}
                        color="text-black text-sm"
                        dir=""
                        size={"w-12"}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                // Row View
                <div className="flex flex-col w-full gap-2 mt-1">
                  {filteredStudents.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-2 border-2 rounded-xl hover:bg-gray-50 cursor-pointer"
                      onClick={() => navigateToStudentDetail(student.id)}
                    >
                      <div className="flex items-center gap-3">
                        <MedalAndLevel
                          level={calculateLevel(student.xp).level}
                          color="text-black text-sm"
                          dir=""
                          size={"w-12"}
                        />
                        <span className="text-gray-500 text-sm">
                          {student.class || t("لا يوجد فصل")}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <h1 className="text-black font-medium">
                          {`${student.user.firstName} ${student.user.lastName}`}
                        </h1>
                        <div className="w-10 h-10 rounded-full">
                          <GetAvatar userAvatarData={student.user.profileImg} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className="flex justify-center items-center w-full py-10">
                <p className="text-gray-500">{t("لا يوجد طلاب")}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <TeacherNavbar />
    </div>
  );
};

export default TeacherView;
