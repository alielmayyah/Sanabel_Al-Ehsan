import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import TeacherNavbar from "../../../components/navbar/TeacherNavbar";
import SearchIcon from "../../../icons/SearchIcon";
import FilterIcon from "../../../icons/Leaderboards/FilterIcon";
import GoBackButton from "../../../components/GoBackButton";
import GetAvatar from "../../student/tutorial/GetAvatar";
import MedalAndLevel from "../../../components/MedalAndLevel";
import { calculateLevel } from "../../../utils/LevelCalculator";
import { FiGrid } from "react-icons/fi";
import { FaThList } from "react-icons/fa";

const ClassDetails: React.FC = () => {
  const history = useHistory();

  const { classId } = useParams<{ classId: string }>();

  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState<string>("");
  type Student = {
    id: number;
    xp: number;
    user: {
      firstName: string;
      lastName: string;
      profileImg?: string;
    };
    class?: {
      classname?: string;
    };
  };

  const [studentsData, setStudentsData] = useState<Student[]>([]);

  const [layoutType, setLayoutType] = useState<"grid" | "row">("grid");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);

  const filterOptions = [
    { value: "all", label: "الكل" },
    { value: "level_high", label: "المستوى (الأعلى)" },
    { value: "level_low", label: "المستوى (الأدنى)" },
    { value: "name_asc", label: "الاسم (أ-ي)" },
    { value: "name_desc", label: "الاسم (ي-أ)" },
  ];

  // Fetch class data and its students on component mount
  useEffect(() => {
    fetchClassStudents();
  }, [classId]);

  const fetchClassStudents = async () => {
    setIsLoading(true);
    const authToken = localStorage.getItem("token");
    if (!authToken) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/teachers/appear-student-class/${classId}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setStudentsData(data.data || []);
      }
      console.log("Students data:", studentsData);
    } catch (error) {
      console.error("Error fetching class students:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter and sort students based on search query and active filter
  const getFilteredStudents = () => {
    const searchFiltered = studentsData.filter((student: any) =>
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

  // Navigate to student details page
  const navigateToStudentDetail = (studentId: number) => {
    history.push(`/teacher/student/${studentId}`);
  };

  return (
    <div className="flex flex-col h-screen w-full items-center justify-start gap-3 p-4">
      {/* Header */}
      <div className="flex items-center w-full justify-between">
        <div className="opacity-0 w-[25px]" />
        <h1 className="text-black font-bold text-2xl self-center">
          {t("تفاصيل الفصل")}
        </h1>
        <GoBackButton />
      </div>

      {/* Class Info Card */}
      <div className="w-full bg-redprimary h-16 rounded-xl flex items-center justify-center p-2 my-5">
        <h1 className="text-xl text-white capitalize font-bold text-center">
          {studentsData[0]?.class?.classname || t("لا يوجد فصل")}
        </h1>
      </div>

      {/* Student List Header and Search */}
      <div className="flex items-end flex-col gap-2 w-full">
        <div className="w-full justify-between flex">
          <h1 className="text-[#999]">
            {filteredStudents.length} {t("طالب")}
          </h1>
          <h1 className="text-black font-bold text-xl text-end">
            {t("الطلاب")}
          </h1>
        </div>

        {/* Filter and Layout Options Row */}
        <div className="flex justify-between items-center w-full mb-3">
          {/* Filter Menu */}
          <div className="relative">
            <div
              className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-xl"
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

      {/* Students List */}
      <div className="w-full overflow-y-auto flex-1 mt-3">
        {isLoading ? (
          <div className="flex justify-center items-center w-full py-10">
            <p className="text-gray-500">{t("جاري التحميل...")}</p>
          </div>
        ) : filteredStudents.length > 0 ? (
          layoutType === "grid" ? (
            // Grid View
            <div className="grid grid-cols-3 w-full gap-2 mt-2">
              {filteredStudents.map((student: any) => (
                <div
                  key={student.id}
                  className="flex flex-col items-center p-2 gap-1 border-2 rounded-xl hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigateToStudentDetail(student.id)}
                >
                  <div className="w-12 h-12 rounded-full mb-1">
                    <GetAvatar userAvatarData={student.user.profileImg} />
                  </div>
                  <h1 className="text-black text-center font-medium">
                    {`${student.user.firstName}`}
                  </h1>
                  <div className="flex-center flex-col">
                    <span className="text-gray-500 text-sm capitalize">
                      {student.class?.classname || t("لا يوجد فصل")}
                    </span>
                  </div>
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
              {filteredStudents.map((student: any) => (
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
                    <div className="flex-center flex-col">
                      <span className="text-gray-500 text-sm capitalize">
                        {student.Class?.classname || t("لا يوجد فصل")}
                      </span>
                      <span className="text-gray-500 text-sm capitalize">
                        {student.Class?.category || t("لا يوجد فصل")}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <h1 className="text-black font-medium">
                      {`${student.user.firstName} ${student.user.lastName}`}
                    </h1>
                    <div className="w-10 h-10 rounded-full overflow-hidden">
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

      {/* Navigation */}
      <TeacherNavbar />
    </div>
  );
};

export default ClassDetails;
