import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../context/ThemeContext";
import TeacherNavbar from "../../../components/navbar/TeacherNavbar";
import SearchIcon from "../../../icons/SearchIcon";
import GoBackButton from "../../../components/GoBackButton";
import PrimaryButton from "../../../components/PrimaryButton";
import GetAvatar from "../../student/tutorial/GetAvatar";
import { FaCheck, FaTimes } from "react-icons/fa";
import { taskdata } from "../../../data/SanabelBackData";
import { taskCategories } from "../../../data/SanabelTypeBackData";
import { sanabelImgs } from "../../../data/SanabelDictionary";
// Sanabel Types
import sanabelType1Img from "../../../assets/sanabeltype/سنابل-الإحسان-في-العلاقة-مع-الله.png";
import sanabelType2Img from "../../../assets/sanabeltype/سنابل الإحسان في العلاقة مع النفس.png";
import sanabelType3Img from "../../../assets/sanabeltype/سنابل الإحسان في العلاقة مع الأسرة والمجتمع.png";
import sanabelType4Img from "../../../assets/sanabeltype/سنابل-الإحسان-في-العلاقة-مع-الأرض-والكون.png";
// Sanabel
import blueSanabel from "../../../assets/resources/سنبلة زرقاء.png";
import redSanabel from "../../../assets/resources/سنبلة حمراء.png";
import yellowSanabel from "../../../assets/resources/سنبلة صفراء.png";
import xpIcon from "../../../assets/resources/اكس بي.png";

// Define types for better type safety
interface User {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  profileImg: any;
}

interface StudentData {
  id: number;
  userId: number;
  user: User;
  class?: string;
}

interface TaskCategory {
  id: number;
  title: string;
  description: string;
}

interface Task {
  type: string;
  title: string;
  description: string;
  categoryId: number;
  xp: number;
  kind?: string;
  snabelRed: number;
  snabelYellow: number;
  snabelBlue: number;
}

// Confirmation Popup Component
const ConfirmationPopup = ({
  isOpen,
  onClose,
  onConfirm,
  selectedTask,
  selectedStudents,
  onRemoveStudent,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedTask: Task | null;
  selectedStudents: StudentData[];
  onRemoveStudent: (studentId: number) => void;
}) => {
  const { t } = useTranslation();

  if (!isOpen || !selectedTask) return null;

  const renderResources = (task: any) =>
    [
      { icon: blueSanabel, value: task.snabelBlue, label: "سنبلة زرقاء" },
      { icon: redSanabel, value: task.snabelRed, label: "سنبلة حمراء" },
      { icon: yellowSanabel, value: task.snabelYellow, label: "سنبلة صفراء" },
      { icon: xpIcon, value: task.xp, label: "نقاط الخبرة" },
    ].map((resource, index) => (
      <div key={index} className="flex flex-col items-center">
        <img
          src={resource.icon}
          alt={resource.label}
          className="w-auto h-5"
          loading="lazy"
        />
        <h1 className="text-black text-sm">{resource.value}</h1>
      </div>
    ));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-5 w-11/12 max-w-md max-h-90vh overflow-y-auto">
        <h2 className="text-black font-bold text-xl mb-4 text-center">
          {t("تأكيد تسجيل المهمة")}
        </h2>

        {/* Task Information */}
        <div className="mb-5 border-2 rounded-xl p-3">
          <h3 className="text-black font-bold text-lg text-right mb-2">
            {selectedTask.title}
          </h3>
          <div className="flex justify-end items-center gap-3 mb-2">
            <div className="flex gap-2">{renderResources(selectedTask)}</div>
          </div>
        </div>

        {/* Selected Students */}
        <div className="mb-5">
          <h3 className="text-black font-medium text-right mb-2">
            {t("الطلاب المختارين:")}
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {selectedStudents.map((student: any) => (
              <div
                key={student.id}
                className="flex flex-col items-center relative"
              >
                <div
                  className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer z-10"
                  onClick={() => onRemoveStudent(student.id)}
                >
                  <FaTimes className="text-white text-xs" />
                </div>
                <div className="w-14 h-14 rounded-full overflow-hidden">
                  <GetAvatar userAvatarData={student.user.profileImg} />
                </div>
                <span className="text-xs text-center mt-1 font-medium text-black">
                  {`${student.user.firstName}`}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 w-full">
          <PrimaryButton
            style="bg-gray-300 text-black flex-1"
            text={t("إلغاء")}
            arrow="none"
            onClick={onClose}
          />
          <PrimaryButton
            style="flex-1"
            text={t("تأكيد")}
            arrow="none"
            onClick={onConfirm}
          />
        </div>
      </div>
    </div>
  );
};

// Congratulations Popup Component
const CongratsPopup = ({
  isOpen,
  onClose,
  selectedTask,
  selectedStudents,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedTask: Task | null;
  selectedStudents: StudentData[];
}) => {
  const { t } = useTranslation();

  // Make the popup show even if task is null (for debugging purposes)
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-5 w-11/12 max-w-md text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <FaCheck className="text-green-500 text-3xl" />
          </div>
        </div>
        <h2 className="text-black font-bold text-xl mb-2">
          {t("تم تسجيل المهمة بنجاح!")}
        </h2>
        <p className="text-gray-600 mb-4">
          {t("تم تسجيل المهمة")} "{selectedTask?.title || "المحددة"}"{" "}
          {t("لعدد")} {selectedStudents.length} {t("طالب")}
        </p>
        <PrimaryButton
          style="w-full"
          text={t("حسناً")}
          arrow="none"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

const StudentList = () => {
  const { t } = useTranslation();
  const [selectedStudentIds, setSelectedStudentIds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [studentsData, setStudentsData] = useState<StudentData[]>([]);
  const [isStudentsSelected, setIsStudentsSelected] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [availableTypes, setAvailableTypes] = useState<string[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);

  const sanabelTypeImg = [
    sanabelType1Img,
    sanabelType2Img,
    sanabelType3Img,
    sanabelType4Img,
  ];

  // Fetch students data on component mount
  useEffect(() => {
    fetchStudentsData();
  }, []);

  // Update available types when category changes
  useEffect(() => {
    if (selectedCategoryId) {
      const typesForCategory = [
        ...new Set(
          taskdata
            .filter((task) => task.categoryId === selectedCategoryId)
            .map((task) => task.type)
        ),
      ];
      setAvailableTypes(typesForCategory);
      setSelectedType(null);
      setFilteredTasks([]);
    }
  }, [selectedCategoryId]);

  // Update filtered tasks when type changes
  useEffect(() => {
    if (selectedType) {
      const tasksForType = taskdata.filter(
        (task) =>
          task.categoryId === selectedCategoryId && task.type === selectedType
      );
      setFilteredTasks(tasksForType);
      setSelectedTaskId(null);
    }
  }, [selectedType, selectedCategoryId]);

  const fetchStudentsData = async () => {
    const authToken = localStorage.getItem("token");
    if (!authToken) return;
    try {
      // Using fetch instead of axios
      const response = await fetch(
        `http://localhost:3000/teachers/appear-student`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setStudentsData(data.data);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const toggleStudentSelection = (userId: number) => {
    setSelectedStudentIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
    console.log(userId);
  };

  const removeSelectedStudent = (userId: number) => {
    setSelectedStudentIds((prev) => prev.filter((id) => id !== userId));
  };

  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  const addProgress = async () => {
    if (!selectedStudentIds.length || !selectedTaskId) return;
    const authToken = localStorage.getItem("token");
    if (!authToken) return;
    try {
      // Find selected task
      const selectedTask = taskdata.find(
        (_, index) => index === selectedTaskId
      );
      if (!selectedTask) {
        console.error("Selected task not found");
        return;
      }
      // Using fetch instead of axios
      const response = await fetch(`http://localhost:3000/teachers/add-pros`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          taskId: selectedTaskId + 1,
          studentIds: selectedStudentIds.map((id) => id + 1),
          comment: "Great job!",
          time: getCurrentTime(),
        }),
      });

      console.log("Progress added successfully");
      // Always show congrats popup for testing purposes (remove this condition for production)
      setShowConfirmation(false);
      setShowCongrats(true);
    } catch (error) {
      console.error("Error adding progress:", error);
    }
  };

  // Reset form after congratulations
  const handleCongratsClose = () => {
    setShowCongrats(false);
    // Reset form
    setIsStudentsSelected(false);
    setSelectedCategoryId(null);
    setSelectedType(null);
    setSelectedTaskId(null);
    setSelectedStudentIds([]);
  };

  // Filter students based on search query
  const filteredStudents = studentsData.filter((student) =>
    `${student.user.firstName} ${student.user.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // Get selected student data
  const selectedStudents = selectedStudentIds
    .map((id) => studentsData.find((student, index) => index === id))
    .filter(Boolean) as StudentData[];

  const handleContinueClick = () => {
    if (isStudentsSelected) {
      addProgress();
    } else {
      setIsStudentsSelected(true);
    }
  };

  const getTaskTypeImage = (type: string) => {
    return sanabelImgs[type] || null;
  };

  const colors = [
    "text-blueprimary",
    "text-redprimary",
    "text-yellowprimary",
    "text-greenprimary",
  ];

  const renderResources = (items: any) =>
    [
      { icon: blueSanabel, value: items.snabelBlue },
      { icon: redSanabel, value: items.snabelRed },
      { icon: yellowSanabel, value: items.snabelYellow },
      { icon: xpIcon, value: items.xp },
    ].map((resource, index) => (
      <div key={index} className="flex flex-col items-center">
        <img
          src={resource.icon}
          alt="icon"
          className="w-auto h-4"
          loading="lazy"
        />
        <h1 className="text-black text-sm">{resource.value}</h1>
      </div>
    ));

  // Function to get the current step title
  const getCurrentStepTitle = () => {
    if (!isStudentsSelected) return t("الطلاب");
    if (selectedCategoryId === null) return t("اختر الفئة");
    if (selectedType === null) return t("اختر النوع");
    return t("اختر المهمة");
  };

  // Get current step number for progress indicator
  const getCurrentStep = () => {
    if (!isStudentsSelected) return 1;
    if (selectedCategoryId === null) return 2;
    if (selectedType === null) return 3;
    return 4;
  };

  const handleTaskRegister = () => {
    setShowConfirmation(true);
  };

  const getSelectedTask = () => {
    return selectedTaskId !== null ? filteredTasks[selectedTaskId] : null;
  };

  return (
    <div
      className="flex flex-col items-center justify-between gap-5 p-4"
      id="page-height"
    >
      {/* Header and Search */}
      <div className="flex-center flex-col gap-3 w-full">
        <div className="flex items-center w-full justify-between">
          <div className="w-16 h-16"></div>
          <h1 className="text-black font-bold text-2xl" dir="ltr">
            {getCurrentStepTitle()}
          </h1>
          <GoBackButton />
        </div>
        {!isStudentsSelected && (
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
        )}
      </div>

      {/* Selected Students Horizontal List - Always show when students are selected */}
      {isStudentsSelected && (
        <div className="w-full ">
          {/* Selected Students Row */}
          <div className="w-full overflow-x-auto flex flex-row gap-3 p-2">
            {selectedStudents.map((student) => (
              <div
                key={student.id}
                className="flex flex-col items-center relative"
              >
                <div
                  className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer z-10"
                  onClick={() =>
                    removeSelectedStudent(
                      studentsData.findIndex((s) => s.id === student.id)
                    )
                  }
                >
                  <FaTimes className="text-white text-xs" />
                </div>
                <div className="w-14 h-14 rounded-full overflow-hidden">
                  <GetAvatar userAvatarData={student.user.profileImg} />
                </div>
                <span className="text-xs text-center mt-1 font-medium text-black">
                  {`${student.user.firstName}`}
                </span>
              </div>
            ))}
          </div>

          {/* Step Indicator - Show only when in task selection mode */}
          {isStudentsSelected && (
            <div className="w-full flex justify-between items-center px-2">
              <div className="flex items-center w-full justify-between">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    getCurrentStep() >= 2
                      ? "bg-blueprimary text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                ></div>
                <div
                  className={`flex-1 h-1 mx-1 ${
                    getCurrentStep() >= 3 ? "bg-blueprimary" : "bg-gray-200"
                  }`}
                ></div>
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    getCurrentStep() >= 3
                      ? "bg-blueprimary text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                ></div>
                <div
                  className={`flex-1 h-1 mx-1 ${
                    getCurrentStep() >= 4 ? "bg-blueprimary" : "bg-gray-200"
                  }`}
                ></div>
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    getCurrentStep() >= 4
                      ? "bg-blueprimary text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                ></div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Content Area */}
      {!isStudentsSelected ? (
        // Student List View
        <div className="flex flex-col gap-2 justify-start overflow-y-auto w-full h-full">
          {filteredStudents.map((student, index) => (
            <div
              className="w-full flex p-3 justify-between items-center border-2 rounded-xl"
              key={student.id}
            >
              <div
                className={`w-10 h-10 flex-center rounded-xl ${
                  selectedStudentIds.includes(index)
                    ? "bg-blueprimary border-0"
                    : "bg-transparent border-2"
                }`}
                onClick={() => toggleStudentSelection(index)}
              >
                <FaCheck />
              </div>
              <div className="gap-3 flex-center">
                <div className="flex flex-col gap-3">
                  <h1 className="text-black">
                    {`${student.user.firstName} ${student.user.lastName}`}
                  </h1>
                  {student.class && (
                    <h1 className="text-black text-end">{student.class}</h1>
                  )}
                </div>
                <div className="w-12 h-12">
                  <GetAvatar userAvatarData={student.user.profileImg} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Task Selection Views
        <div className="w-full overflow-y-auto h-full">
          {selectedCategoryId === null ? (
            // Category Selection View
            <div className="w-full">
              <h2 className="text-black font-bold text-xl mb-4 text-center">
                {t("اختر الفئة")}
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {taskCategories.map((category, index) => (
                  <div
                    key={category.id}
                    className="flex flex-col items-center border-2 rounded-xl p-3 cursor-pointer"
                    onClick={() => setSelectedCategoryId(category.id)}
                  >
                    <img
                      src={sanabelTypeImg[index]}
                      alt={category.title}
                      className="w-16 h-16 object-contain"
                    />
                    <h3
                      className={`${colors[index]} font-bold text-center mt-2`}
                    >
                      {category.title}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          ) : selectedType === null ? (
            // Type Selection View
            <div className="w-full overflow-y-auto h-full">
              <h2 className="text-black font-bold text-xl mb-4 text-center ">
                {t("اختر النوع")}
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {availableTypes.map((type, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center border-2 rounded-xl p-3 cursor-pointer"
                    onClick={() => setSelectedType(type)}
                  >
                    <img
                      src={getTaskTypeImage(type)}
                      alt={type}
                      className="w-16 h-16 object-contain"
                    />
                    <h3 className="text-black font-bold text-center mt-2">
                      {type}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Task Selection View
            <div className="w-full overflow-y-auto h-full">
              <h2 className="text-black font-bold text-xl mb-4 text-center">
                {t("اختر المهمة")}
              </h2>
              <div className="flex flex-col gap-3">
                {filteredTasks.map((task, index) => (
                  <div
                    key={index}
                    className={`border-2 rounded-xl p-3 cursor-pointer ${
                      selectedTaskId === index ? "border-blueprimary" : ""
                    }`}
                    onClick={() => setSelectedTaskId(index)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">{renderResources(task)}</div>
                      <h3 className="text-black font-bold text-right">
                        {task.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      {!isStudentsSelected && selectedStudentIds.length > 0 && (
        <PrimaryButton
          style=""
          text={t("متابعة")}
          arrow="none"
          onClick={handleContinueClick}
        />
      )}

      {isStudentsSelected && (
        <div className="flex gap-3 w-full">
          <PrimaryButton
            style="bg-gray-300 text-black flex-1"
            text={t("رجوع")}
            arrow="none"
            onClick={() => {
              if (selectedTaskId !== null) {
                setSelectedTaskId(null);
              } else if (selectedType !== null) {
                setSelectedType(null);
              } else if (selectedCategoryId !== null) {
                setSelectedCategoryId(null);
              } else {
                setIsStudentsSelected(false);
              }
            }}
          />
          {selectedTaskId !== null && (
            <PrimaryButton
              style="flex-1"
              text={t("تسجيل ")}
              arrow="none"
              onClick={handleTaskRegister}
            />
          )}
        </div>
      )}

      {/* Confirmation Popup */}
      <ConfirmationPopup
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={addProgress}
        selectedTask={getSelectedTask()}
        selectedStudents={selectedStudents}
        onRemoveStudent={(studentId: any) => {
          const studentIndex = studentsData.findIndex(
            (s) => s.id === studentId
          );
          if (studentIndex !== -1) {
            removeSelectedStudent(studentIndex);
          }
        }}
      />

      {/* Congratulations Popup */}
      <CongratsPopup
        isOpen={showCongrats}
        onClose={handleCongratsClose}
        selectedTask={getSelectedTask()}
        selectedStudents={selectedStudents}
      />

      {/* Navigation */}
      <TeacherNavbar />
    </div>
  );
};

export default StudentList;
