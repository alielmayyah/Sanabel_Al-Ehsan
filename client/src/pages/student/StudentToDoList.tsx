import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import TeacherNavbar from "../../components/navbar/TeacherNavbar";
import StudentNavbar from "../../components/navbar/StudentNavbar";
import ParentNavbar from "../../components/navbar/ParentNavbar";
import SearchIcon from "../../icons/SearchIcon";
import GoBackButton from "../../components/GoBackButton";
import PrimaryButton from "../../components/PrimaryButton";
import { FaCheck, FaTimes, FaPlus, FaTrash } from "react-icons/fa";
import { taskdata } from "../../data/SanabelBackData";
import { taskCategories } from "../../data/SanabelTypeBackData";
import { sanabelImgs } from "../../data/SanabelDictionary";

// Import resource images
import blueSanabel from "../../assets/resources/سنبلة زرقاء.png";
import redSanabel from "../../assets/resources/سنبلة حمراء.png";
import yellowSanabel from "../../assets/resources/سنبلة صفراء.png";
import xpIcon from "../../assets/resources/اكس بي.png";

// Import category type images
import sanabelType1Img from "../../assets/sanabeltype/سنابل-الإحسان-في-العلاقة-مع-الله.png";
import sanabelType2Img from "../../assets/sanabeltype/سنابل الإحسان في العلاقة مع النفس.png";
import sanabelType3Img from "../../assets/sanabeltype/سنابل الإحسان في العلاقة مع الأسرة والمجتمع.png";
import sanabelType4Img from "../../assets/sanabeltype/سنابل-الإحسان-في-العلاقة-مع-الأرض-والكون.png";

// Define types
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

interface TodoItem {
  id: string;
  task: Task;
  completed: boolean;
  addedDate: string;
}

interface TaskCategory {
  id: number;
  title: string;
  description: string;
}

// Add Mission Modal Component
const AddMissionModal = ({
  isOpen,
  onClose,
  onAddMission,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAddMission: (task: Task) => void;
}) => {
  const { t } = useTranslation();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [availableTypes, setAvailableTypes] = useState<string[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  const sanabelTypeImg = [
    sanabelType1Img,
    sanabelType2Img,
    sanabelType3Img,
    sanabelType4Img,
  ];

  const colors = [
    "text-blueprimary",
    "text-redprimary",
    "text-yellowprimary",
    "text-greenprimary",
  ];

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

  const getTaskTypeImage = (type: string) => {
    return sanabelImgs[type] || null;
  };

  const renderResources = (task: Task) =>
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
          className="w-auto h-4"
          loading="lazy"
        />
        <h1 className="text-xs text-black">{resource.value}</h1>
      </div>
    ));

  const handleAddMission = () => {
    if (selectedTaskId !== null) {
      onAddMission(filteredTasks[selectedTaskId]);
      resetModal();
      onClose();
    }
  };

  const resetModal = () => {
    setSelectedCategoryId(null);
    setSelectedType(null);
    setSelectedTaskId(null);
    setAvailableTypes([]);
    setFilteredTasks([]);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-xl p-5">
        <h2 className="mb-4 text-xl font-bold text-center text-black">
          {t("إضافة مهمة جديدة")}
        </h2>

        {/* Category Selection */}
        {selectedCategoryId === null && (
          <div className="mb-4">
            <h3 className="mb-3 text-lg font-semibold text-right text-black">
              {t("اختر الفئة")}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {taskCategories.map((category, index) => (
                <div
                  key={category.id}
                  className="flex flex-col items-center p-3 border-2 cursor-pointer rounded-xl hover:border-blueprimary"
                  onClick={() => setSelectedCategoryId(category.id)}
                >
                  <img
                    src={sanabelTypeImg[index]}
                    alt={category.title}
                    className="object-contain w-16 h-16"
                  />
                  <h3
                    className={`${colors[index]} font-bold text-center mt-2 text-sm`}
                  >
                    {t(category.title)}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Type Selection */}
        {selectedCategoryId !== null && selectedType === null && (
          <div className="mb-4">
            <h3 className="mb-3 text-lg font-semibold text-right text-black">
              {t("اختر النوع")}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {availableTypes.map((type, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-3 border-2 cursor-pointer rounded-xl hover:border-blueprimary"
                  onClick={() => setSelectedType(type)}
                >
                  <img
                    src={getTaskTypeImage(type)}
                    alt={type}
                    className="object-contain w-16 h-16"
                  />
                  <h3 className="mt-2 text-sm font-bold text-center text-black">
                    {t(type)}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Task Selection */}
        {selectedType !== null && (
          <div className="mb-4">
            <h3 className="mb-3 text-lg font-semibold text-right text-black">
              {t("اختر المهمة")}
            </h3>
            <div className="flex flex-col gap-3 overflow-y-auto max-h-60">
              {filteredTasks.map((task, index) => (
                <div
                  key={index}
                  className={`border-2 rounded-xl p-3 cursor-pointer ${
                    selectedTaskId === index
                      ? "border-blueprimary bg-blue-50"
                      : "hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedTaskId(index)}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex gap-2">{renderResources(task)}</div>
                    <h3 className="text-sm font-medium text-right text-black">
                      {t(task.title)}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex w-full gap-3 mt-4">
          <PrimaryButton
            style="stroke"
            text={t("إلغاء")}
            arrow="none"
            onClick={handleClose}
          />
          {selectedTaskId !== null && (
            <PrimaryButton
              style="flex-1"
              text={t("إضافة")}
              arrow="none"
              onClick={handleAddMission}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const TodoList = () => {
  const { t } = useTranslation();
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  const role = localStorage.getItem("role");

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("todoList");
    if (savedTodos) {
      try {
        setTodoItems(JSON.parse(savedTodos));
      } catch (error) {
        console.error("Error parsing saved todos:", error);
      }
    }
  }, []);

  // Save todos to localStorage whenever todoItems changes
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoItems));
  }, [todoItems]);

  const addMission = (task: Task) => {
    const newTodoItem: TodoItem = {
      id: Date.now().toString(),
      task,
      completed: false,
      addedDate: new Date().toISOString(),
    };
    setTodoItems((prev) => [...prev, newTodoItem]);
  };

  const toggleComplete = (id: string) => {
    setTodoItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodoItems((prev) => prev.filter((item) => item.id !== id));
  };

  const getCategoryTitle = (categoryId: number) => {
    const category = taskCategories.find((cat) => cat.id === categoryId);
    return category ? t(category.title) : "";
  };

  const getTaskTypeImage = (type: string) => {
    return sanabelImgs[type] || null;
  };

  const renderResources = (task: Task) =>
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
          className="w-auto h-4"
          loading="lazy"
        />
        <h1 className="text-xs text-black">{resource.value}</h1>
      </div>
    ));

  // Filter todos based on search and completion status
  const filteredTodos = todoItems.filter((item) => {
    const matchesSearch =
      item.task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t(item.task.title).toLowerCase().includes(searchQuery.toLowerCase());

    if (filter === "completed") return matchesSearch && item.completed;
    if (filter === "pending") return matchesSearch && !item.completed;
    return matchesSearch;
  });

  const getStats = () => {
    const total = todoItems.length;
    const completed = todoItems.filter((item) => item.completed).length;
    const pending = total - completed;
    return { total, completed, pending };
  };

  const stats = getStats();

  return (
    <div
      className="flex flex-col items-center justify-between gap-5 p-4"
      id="page-height"
      dir="ltr"
    >
      {/* Header */}
      <div className="flex-col w-full gap-3 flex-center">
        <div className="flex items-center justify-between w-full">
          <div className="w-16 h-16"></div>
          <h1 className="text-2xl font-bold text-black" dir="ltr">
            {t("قائمة المهام")}
          </h1>
          <GoBackButton />
        </div>

        {/* Search Bar */}
        <div className="flex items-center justify-between w-full px-2 py-1 border-2 rounded-xl">
          <div className="w-10 h-10 bg-blueprimary rounded-xl flex-center">
            <SearchIcon className="text-white" size={20} />
          </div>
          <input
            type="text"
            placeholder={t("ابحث عن مهمة")}
            className="w-full py-3 text-black bg-transparent drop-shadow-sm text-end"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Statistics */}
        <div className="flex justify-between w-full gap-2">
          <div className="flex-1 p-3 bg-blue-50 rounded-xl">
            <div className="text-center">
              <div className="text-2xl font-bold text-blueprimary">
                {stats.total}
              </div>
              <div className="text-sm text-gray-600">{t("المجموع")}</div>
            </div>
          </div>
          <div className="flex-1 p-3 bg-green-50 rounded-xl">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {stats.completed}
              </div>
              <div className="text-sm text-gray-600">{t("مكتملة")}</div>
            </div>
          </div>
          <div className="flex-1 p-3 bg-yellow-50 rounded-xl">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {stats.pending}
              </div>
              <div className="text-sm text-gray-600">{t("معلقة")}</div>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex w-full gap-2">
          <button
            className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium ${
              filter === "all"
                ? "bg-blueprimary text-white"
                : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => setFilter("all")}
          >
            {t("الكل")}
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium ${
              filter === "pending"
                ? "bg-blueprimary text-white"
                : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => setFilter("pending")}
          >
            {t("معلقة")}
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium ${
              filter === "completed"
                ? "bg-blueprimary text-white"
                : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => setFilter("completed")}
          >
            {t("مكتملة")}
          </button>
        </div>
      </div>

      {/* Todo List */}
      <div className="flex flex-col justify-start w-full h-full gap-3 overflow-y-auto">
        {filteredTodos.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <div className="mb-4 text-6xl">📝</div>
            <div className="text-lg font-medium">{t("لا توجد مهام")}</div>
            <div className="text-sm">
              {t("اضغط على زر الإضافة لإنشاء مهمة جديدة")}
            </div>
          </div>
        ) : (
          filteredTodos.map((item) => (
            <div
              key={item.id}
              className={`border-2 rounded-xl p-4 ${
                item.completed
                  ? "bg-green-50 border-green-200"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between w-full">
                {/* Task Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleComplete(item.id)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          item.completed
                            ? "bg-green-500 border-green-500 text-white"
                            : "border-gray-300 hover:border-green-500"
                        }`}
                      >
                        {item.completed && <FaCheck size={12} />}
                      </button>
                      <button
                        onClick={() => deleteTodo(item.id)}
                        className="flex items-center justify-center w-6 h-6 text-white bg-red-500 rounded-full hover:bg-red-600"
                      >
                        <FaTrash size={10} />
                      </button>
                    </div>
                    <h3
                      className={`text-right font-medium ${
                        item.completed
                          ? "text-gray-500 line-through"
                          : "text-black"
                      }`}
                    >
                      {t(item.task.title)}
                    </h3>
                  </div>

                  {/* Task Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {/* Rewards */}
                      <div className="flex gap-1">
                        {renderResources(item.task)}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Category and Type */}
                      <div className="flex items-center gap-1">
                        <img
                          src={getTaskTypeImage(item.task.type)}
                          alt={item.task.type}
                          className="w-6 h-6"
                        />
                        <span className="text-xs text-gray-600">
                          {t(item.task.type)}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-600">
                        {getCategoryTitle(item.task.categoryId)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Mission Button */}
      <div className="w-full">
        <PrimaryButton
          style="w-full bg-blueprimary"
          text={t("إضافة مهمة جديدة")}
          arrow="none"
          onClick={() => setShowAddModal(true)}
        />
      </div>

      {/* Add Mission Modal */}
      <AddMissionModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddMission={addMission}
      />

      {/* Navigation */}
      {role === "Student" ? (
        <StudentNavbar />
      ) : role === "Teacher" ? (
        <TeacherNavbar />
      ) : (
        <ParentNavbar />
      )}
    </div>
  );
};

export default TodoList;
