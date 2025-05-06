import { useState } from "react";
import { IoFilterOutline, IoClose } from "react-icons/io5";
import { TbChecks } from "react-icons/tb";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

interface FilterOption {
  id: string;
  label: string;
}

interface FilterProps {
  onApplyFilters: (filters: FilterState) => void;
}

interface FilterState {
  timePeriod: string;
  studentGroup: string;
  gradeLevel: string;
}

const LeaderboardFilter: React.FC<FilterProps> = ({ onApplyFilters }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    timePeriod: "weekly",
    studentGroup: "students",
    gradeLevel: "all",
  });
  const [appliedFilters, setAppliedFilters] = useState<FilterState>({
    timePeriod: "weekly",
    studentGroup: "students",
    gradeLevel: "all",
  });

  const timeOptions: FilterOption[] = [
    { id: "daily", label: t("يومي") },
    { id: "weekly", label: t("اسبوعي") },
    { id: "monthly", label: t("شهري") },
  ];

  const groupOptions: FilterOption[] = [
    { id: "classes", label: t("فصول") },
    { id: "teams", label: t("فرق") },
    { id: "students", label: t("طلاب") },
  ];

  const gradeOptions: FilterOption[] = [
    { id: "all", label: t("الكل") },
    { id: "elementary", label: t("الابتدائية") },
    { id: "middle", label: t("الاعدادية") },
    { id: "high", label: t("الثانوية") },
  ];

  const handleFilterChange = (category: keyof FilterState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const applyFilters = () => {
    setAppliedFilters(filters);
    onApplyFilters(filters);
    setIsOpen(false);
  };

  const resetFilters = () => {
    const defaultFilters: FilterState = {
      timePeriod: "weekly",
      studentGroup: "students",
      gradeLevel: "all",
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

    setFilters(updatedFilters);
    setAppliedFilters(updatedFilters);
    onApplyFilters(updatedFilters);
  };

  const getFilterLabel = (
    category: keyof FilterState,
    value: string
  ): string => {
    if (category === "timePeriod") {
      return timeOptions.find((option) => option.id === value)?.label || "";
    } else if (category === "studentGroup") {
      return groupOptions.find((option) => option.id === value)?.label || "";
    } else if (category === "gradeLevel") {
      return gradeOptions.find((option) => option.id === value)?.label || "";
    }
    return "";
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
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => handleFilterChange(category, option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
    );
  };

  // Check if any non-default filters are applied
  const hasActiveFilters = () => {
    return (
      appliedFilters.timePeriod !== "weekly" ||
      appliedFilters.studentGroup !== "students" ||
      appliedFilters.gradeLevel !== "all"
    );
  };

  // Get active filters for display
  const getActiveFilters = () => {
    const active: { key: keyof FilterState; value: string }[] = [];

    if (appliedFilters.timePeriod !== "weekly") {
      active.push({ key: "timePeriod", value: appliedFilters.timePeriod });
    }

    if (appliedFilters.studentGroup !== "students") {
      active.push({ key: "studentGroup", value: appliedFilters.studentGroup });
    }

    if (appliedFilters.gradeLevel !== "all") {
      active.push({ key: "gradeLevel", value: appliedFilters.gradeLevel });
    }

    return active;
  };

  return (
    <div className="relative">
      {/* Filter Button and Applied Filters */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition-all"
        >
          <IoFilterOutline size={18} />
          <span className="text-gray-700 font-medium">{t("فلترة")}</span>
        </button>

        {/* Display applied filters as tags */}
        {getActiveFilters().map(({ key, value }) => (
          <div
            key={key}
            className="flex items-center bg-blue-50 text-blueprimary px-3 py-1 rounded-full"
          >
            <span className="text-sm">{getFilterLabel(key, value)}</span>
            <button
              className="mr-2 text-blueprimary"
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
            className="text-sm text-red-500 hover:text-red-600"
          >
            {t("مسح الكل")}
          </button>
        )}
      </div>

      {/* Filter Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute z-50 right-0 mt-2 bg-white rounded-lg shadow-lg p-4 border border-gray-200"
            style={{ width: "300px" }}
          >
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <IoClose size={20} />
              </button>
              <h3 className="text-lg font-bold">{t("فلترة")}</h3>
              <button
                onClick={resetFilters}
                className="text-xs text-blueprimary"
              >
                {t("إعادة تعيين")}
              </button>
            </div>

            {/* Time Period Filter */}
            <div className="mb-4 text-right">
              <h4 className="font-medium text-gray-700 mb-1">{t("المدة")}</h4>
              {renderFilterOption(timeOptions, "timePeriod")}
            </div>

            {/* Group Filter */}
            <div className="mb-4 text-right">
              <h4 className="font-medium text-gray-700 mb-1">{t("الفئات")}</h4>
              {renderFilterOption(groupOptions, "studentGroup")}
            </div>

            {/* Grade Level Filter */}
            <div className="mb-6 text-right">
              <h4 className="font-medium text-gray-700 mb-1">
                {t("المراحل الدراسية")}
              </h4>
              {renderFilterOption(gradeOptions, "gradeLevel")}
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
