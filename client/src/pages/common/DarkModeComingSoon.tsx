import { FaStar, FaMoon } from "react-icons/fa";
import { useTranslation } from "react-i18next";

type DarkModeComingSoonProps = {
  isOpen: boolean;
  onClose: () => void;
};

const DarkModeComingSoon: React.FC<DarkModeComingSoonProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation();
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full relative overflow-hidden"
        style={{ direction: "rtl" }}
      >
        {/* Animation elements */}
        <div className="absolute top-2 right-2 animate-ping">
          <FaStar className="text-yellow-400" size={12} />
        </div>
        <div className="absolute top-10 left-6 animate-bounce">
          <FaStar className="text-yellow-400" size={8} />
        </div>
        <div className="absolute bottom-8 right-8 animate-pulse">
          <FaStar className="text-yellow-400" size={10} />
        </div>

        {/* Moon animation */}
        <div className="w-full flex justify-center mb-4">
          <div className="animate-bounce">
            <FaMoon className="text-purple-600 text-4xl" />
          </div>
        </div>

        <h2 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-3">
          {t("الوضع الليلي قادم قريباً")}
        </h2>

        <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
          {t("نحن نعمل بجد لتوفير تجربة مظلمة مريحة للعينين. ترقبوا")}
        </p>

        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-blueprimary text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            {"حسناً، سأنتظر"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DarkModeComingSoon;
