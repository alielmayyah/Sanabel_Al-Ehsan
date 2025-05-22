import { useState } from "react";
import {
  IoFilterOutline,
  IoClose,
  IoGridOutline,
  IoListOutline,
} from "react-icons/io5";
import { TbChecks, TbEye } from "react-icons/tb";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

interface FilterOption {
  id: string;
  label: string;
}

interface FilterProps {
  onApplyFilters: (filters: FilterState) => void;
  onViewChange: (viewType: ViewType, itemsPerPage: number) => void;
}

export type ViewType = "podium" | "list" | "grid";

interface FilterState {
  timePeriod: string;
  studentGroup: string;
  gradeLevel: string;
  medalType: string;
  sortBy: string;
  connectCode: string;
}

interface ViewState {
  type: ViewType;
  itemsPerPage: number;
}

const LeaderboardFilter: React.FC<FilterProps> = ({
  onApplyFilters,
  onViewChange,
}) => {
  const { t } = useTranslation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    timePeriod: "weekly",
    studentGroup: "students",
    gradeLevel: "all",
    medalType: "all",
    sortBy: "xp",
    connectCode: "all",
  });

  const [appliedFilters, setAppliedFilters] = useState<FilterState>({
    timePeriod: "weekly",
    studentGroup: "students",
    gradeLevel: "all",
    medalType: "all",
    sortBy: "xp",
    connectCode: "all",
  });

  const [viewState, setViewState] = useState<ViewState>({
    type: "podium",
    itemsPerPage: 10,
  });

  // Filter Options
  const timeOptions: FilterOption[] = [
    { id: "daily", label: t("يومي") },
    { id: "weekly", label: t("اسبوعي") },
    { id: "monthly", label: t("شهري") },
    { id: "allTime", label: t("كل الأوقات") },
  ];

  const groupOptions: FilterOption[] = [
    { id: "students", label: t("طلاب") },
    { id: "classes", label: t("فصول") },
    { id: "teams", label: t("فرق") },
    { id: "school", label: t("المدرسة") },
  ];

  const gradeOptions: FilterOption[] = [
    { id: "all", label: t("جميع المراحل") },
    { id: "KG", label: t("رياض الأطفال") },
    { id: "FS", label: t("التمهيدي") },
    { id: "G1-G5", label: t("الابتدائية (1-5)") },
    { id: "G6-G9", label: t("الإعدادية (6-9)") },
    { id: "G10-G12", label: t("الثانوية (10-12)") },
  ];

  const medalOptions: FilterOption[] = [
    { id: "all", label: t("جميع الميداليات") },
    { id: "1", label: t("ذهبية") },
    { id: "2", label: t("فضية") },
    { id: "3", label: t("برونزية") },
  ];

  const sortOptions: FilterOption[] = [
    { id: "xp", label: t("النقاط (XP)") },
    { id: "level", label: t("المستوى") },
    { id: "treeProgress", label: t("تقدم الشجرة") },
    { id: "water", label: t("المياه") },
    { id: "seeders", label: t("البذور") },
  ];

  // View Options
  const viewTypes: { id: ViewType; label: string; icon: React.ReactNode }[] = [
    {
      id: "podium",
      label: t("منصة التتويج"),
      icon: <IoGridOutline size={16} />,
    },
    { id: "list", label: t("قائمة"), icon: <IoListOutline size={16} /> },
    { id: "grid", label: t("شبكة"), icon: <IoGridOutline size={16} /> },
  ];

  const itemsPerPageOptions = [10, 20, 50, 100];

  const handleFilterChange = (category: keyof FilterState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleViewChange = (type: ViewType, itemsPerPage?: number) => {
    const newViewState = {
      type,
      itemsPerPage: itemsPerPage || viewState.itemsPerPage,
    };
    setViewState(newViewState);
    onViewChange(newViewState.type, newViewState.itemsPerPage);
  };

  const applyFilters = () => {
    setAppliedFilters(filters);
    onApplyFilters(filters);
    setIsFilterOpen(false);
  };

  const resetFilters = () => {
    const defaultFilters: FilterState = {
      timePeriod: "weekly",
      studentGroup: "students",
      gradeLevel: "all",
      medalType: "all",
      sortBy: "xp",
      connectCode: "all",
    };
    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
    onApplyFilters(defaultFilters);
  };

  const removeFilter = (key: keyof FilterState) => {
    const updatedFilters = { ...appliedFilters };
    if (key === "timePeriod") updatedFilters.timePeriod = "weekly";
    if (key === "studentGroup") updatedFilters.studentGroup = "students";
    if (key === "gradeLevel") updatedFilters.gradeLevel = "all";
    if (key === "medalType") updatedFilters.medalType = "all";
    if (key === "sortBy") updatedFilters.sortBy = "xp";
    if (key === "connectCode") updatedFilters.connectCode = "all";

    setFilters(updatedFilters);
    setAppliedFilters(updatedFilters);
    onApplyFilters(updatedFilters);
  };

  const getFilterLabel = (
    category: keyof FilterState,
    value: string
  ): string => {
    const optionsMap = {
      timePeriod: timeOptions,
      studentGroup: groupOptions,
      gradeLevel: gradeOptions,
      medalType: medalOptions,
      sortBy: sortOptions,
      connectCode: [{ id: "all", label: t("جميع الفصول") }],
    };

    return (
      optionsMap[category]?.find((option) => option.id === value)?.label || ""
    );
  };

  const renderFilterOption = (
    options: FilterOption[],
    category: keyof FilterState
  ) => {
    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {options.map((option) => (
          <button
            key={option.id}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filters[category] === option.id
                ? "bg-blueprimary text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => handleFilterChange(category, option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
    );
  };

  const hasActiveFilters = () => {
    return (
      appliedFilters.timePeriod !== "weekly" ||
      appliedFilters.studentGroup !== "students" ||
      appliedFilters.gradeLevel !== "all" ||
      appliedFilters.medalType !== "all" ||
      appliedFilters.sortBy !== "xp" ||
      appliedFilters.connectCode !== "all"
    );
  };

  const getActiveFilters = () => {
    const active: { key: keyof FilterState; value: string }[] = [];

    Object.entries(appliedFilters).forEach(([key, value]) => {
      const defaultValues = {
        timePeriod: "weekly",
        studentGroup: "students",
        gradeLevel: "all",
        medalType: "all",
        sortBy: "xp",
        connectCode: "all",
      };

      if (value !== defaultValues[key as keyof FilterState]) {
        active.push({ key: key as keyof FilterState, value });
      }
    });

    return active;
  };

  return (
    <div className="relative flex items-center gap-2">
      {/* View Options Button */}
      <div className="relative">
        <button
          onClick={() => setIsViewOpen(!isViewOpen)}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition-all"
        >
          <TbEye size={18} className="text-blueprimary" />
          <span className="text-gray-700 font-medium">{t("العرض")}</span>
        </button>

        <AnimatePresence>
          {isViewOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute z-50 right-0 mt-2 bg-white rounded-lg shadow-lg p-4 border border-gray-200"
              style={{ width: "280px" }}
            >
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={() => setIsViewOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <IoClose size={20} className="text-blueprimary" />
                </button>
                <h3 className="text-lg font-bold">{t("خيارات العرض")}</h3>
              </div>

              {/* View Type Selection */}
              <div className="mb-4 text-right">
                <h4 className="font-medium text-gray-700 mb-2">
                  {t("نوع العرض")}
                </h4>
                <div className="flex flex-col gap-2">
                  {viewTypes.map((type) => (
                    <button
                      key={type.id}
                      className={`flex items-center justify-between px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        viewState.type === type.id
                          ? "bg-blueprimary text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                      onClick={() => handleViewChange(type.id)}
                    >
                      <span>{type.label}</span>
                      {type.icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Items Per Page */}
              {viewState.type !== "podium" && (
                <div className="mb-4 text-right">
                  <h4 className="font-medium text-gray-700 mb-2">
                    {t("العناصر في الصفحة")}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {itemsPerPageOptions.map((count) => (
                      <button
                        key={count}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                          viewState.itemsPerPage === count
                            ? "bg-blueprimary text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                        onClick={() => handleViewChange(viewState.type, count)}
                      >
                        {count}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Filter Button */}
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition-all"
      >
        <IoFilterOutline size={18} />
        <span className="text-gray-700 font-medium">{t("فلترة")}</span>
        {hasActiveFilters() && (
          <span className="bg-blueprimary text-white text-xs px-2 py-1 rounded-full">
            {getActiveFilters().length}
          </span>
        )}
      </button>

      {/* Display applied filters as tags */}
      {getActiveFilters().map(({ key, value }) => (
        <div
          key={key}
          className="flex items-center bg-blue-50 text-blueprimary px-3 py-1 rounded-full"
        >
          <span className="text-sm">{getFilterLabel(key, value)}</span>
          <button
            className="mr-2 text-blueprimary hover:text-blue-600"
            onClick={() => removeFilter(key)}
          >
            <IoClose size={16} />
          </button>
        </div>
      ))}

      {/* Clear all filters button */}
      {hasActiveFilters() && (
        <button
          onClick={resetFilters}
          className="text-sm text-red-500 hover:text-red-600 underline"
        >
          {t("مسح الكل")}
        </button>
      )}

      {/* Filter Dropdown */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute z-50 right-0 mt-2 bg-white rounded-lg shadow-lg p-4 border border-gray-200 max-h-96 overflow-y-auto"
            style={{ width: "350px", top: "100%" }}
          >
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <IoClose size={20} />
              </button>
              <h3 className="text-lg font-bold">{t("فلترة المتصدرين")}</h3>
              <button
                onClick={resetFilters}
                className="text-xs text-blueprimary hover:text-blue-600"
              >
                {t("إعادة تعيين")}
              </button>
            </div>

            {/* Time Period Filter */}
            <div className="mb-4 text-right">
              <h4 className="font-medium text-gray-700 mb-1">
                {t("المدة الزمنية")}
              </h4>
              {renderFilterOption(timeOptions, "timePeriod")}
            </div>

            {/* Group Filter */}
            <div className="mb-4 text-right">
              <h4 className="font-medium text-gray-700 mb-1">
                {t("نوع المجموعة")}
              </h4>
              {renderFilterOption(groupOptions, "studentGroup")}
            </div>

            {/* Grade Level Filter */}
            <div className="mb-4 text-right">
              <h4 className="font-medium text-gray-700 mb-1">
                {t("المرحلة الدراسية")}
              </h4>
              {renderFilterOption(gradeOptions, "gradeLevel")}
            </div>

            {/* Medal Type Filter */}
            <div className="mb-4 text-right">
              <h4 className="font-medium text-gray-700 mb-1">
                {t("نوع الميدالية")}
              </h4>
              {renderFilterOption(medalOptions, "medalType")}
            </div>

            {/* Sort By Filter */}
            <div className="mb-6 text-right">
              <h4 className="font-medium text-gray-700 mb-1">
                {t("ترتيب حسب")}
              </h4>
              {renderFilterOption(sortOptions, "sortBy")}
            </div>

            {/* Apply Button */}
            <button
              onClick={applyFilters}
              className="w-full bg-blueprimary hover:bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-all"
            >
              <TbChecks size={18} />
              <span>{t("تطبيق الفلترة")}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LeaderboardFilter;
