import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";

// Import avatar components correctly
import Boy1 from "../../../assets/avatars/Boys/Boy1";
import Boy2 from "../../../assets/avatars/Boys/Boy2";

import AvatarTest2 from "../../../assets/avatars/AvatarTest2";

import { IoSparkles } from "react-icons/io5";
import { GiMale, GiFemale } from "react-icons/gi";

import { FaTshirt } from "react-icons/fa";
import { FaPaintBrush } from "react-icons/fa";
import { MdOutlineWallpaper } from "react-icons/md";
import { IoCheckmarkCircle } from "react-icons/io5";
import { BsPerson } from "react-icons/bs";
import { MdPalette } from "react-icons/md";

// Define interfaces for our avatar components
interface CustomIconProps {
  tshirtColor?: string;
  hairColor?: string;
  skinColor?: string;
  className?: string;
}

// Define avatar types for easier manipulation
interface AvatarOption {
  id: string;
  Component: React.FC<CustomIconProps>;
}

// Group avatars by category with proper typing
const boysAvatars: AvatarOption[] = [
  {
    id: "boy-1",
    Component: Boy1,
  },
  {
    id: "boy-2",
    Component: Boy2,
  },
  {
    id: "boy-3",
    Component: Boy2,
  },
  {
    id: "boy-4",
    Component: Boy2,
  },
  {
    id: "boy-5",
    Component: Boy2,
  },
  {
    id: "boy-6",
    Component: Boy2,
  },
  {
    id: "boy-7",
    Component: Boy2,
  },
  {
    id: "boy-8",
    Component: Boy2,
  },
];

const girlsAvatars: AvatarOption[] = [
  {
    id: "girl-1",
    Component: AvatarTest2,
  },
];

// Enhanced color palettes with exactly 8 colors per category
const hairColors = [
  { color: "#000000", name: "أسود" }, // Black
  { color: "#4B3621", name: "بني داكن" }, // Dark Brown
  { color: "#8B4513", name: "بني متوسط" }, // Medium Brown
  { color: "#A0522D", name: "بني فاتح" }, // Light Brown
  { color: "#D2B48C", name: "أشقر" }, // Blonde
  { color: "#E6BE8A", name: "أشقر فاتح" }, // Light Blonde
  { color: "#A52A2A", name: "كستنائي" }, // Auburn
  { color: "#FF6347", name: "أحمر" }, // Reddish Brown
];

const shirtColors = [
  { color: "#FFFFFF", name: "أبيض" }, // White
  { color: "#000000", name: "أسود" }, // Black
  { color: "#1E90FF", name: "أزرق" }, // Dodger Blue
  { color: "#FF4500", name: "برتقالي" }, // Orange Red
  { color: "#32CD32", name: "أخضر" }, // Lime Green
  { color: "#FFD700", name: "ذهبي" }, // Gold
  { color: "#8A2BE2", name: "بنفسجي" }, // Blue Violet
  { color: "#FF69B4", name: "وردي" }, // Hot Pink
];

const backgrounds = [
  { color: "#FFCDD2", name: "وردي فاتح" }, // Light Pink
  { color: "#81D4FA", name: "أزرق سماوي" }, // Sky Blue
  { color: "#FFEB3B", name: "أصفر" }, // Bright Yellow
  { color: "#F48FB1", name: "وردي لافندر" }, // Pink Lavender
  { color: "#4CAF50", name: "أخضر" }, // Vibrant Green
  { color: "#FF5722", name: "برتقالي" }, // Vibrant Orange
  { color: "#9C27B0", name: "أرجواني" }, // Bright Purple
  { color: "#E91E63", name: "أحمر" }, // Bold Red
];

// Define background patterns for the background tab
const backgroundPatterns = [
  { id: "solid", name: "لون واحد" },
  { id: "gradient", name: "تدرج" },
  { id: "dots", name: "نقاط" },
  { id: "lines", name: "خطوط" },
];

const skinColor = [
  { color: "#FFEFD5", name: "فاتح جداً" }, // Papaya Whip (Very Light)
  { color: "#FFDAB9", name: "فاتح" }, // Peachpuff (Light)
  { color: "#EACBA1", name: "فاتح متوسط" }, // Medium Light
  { color: "#D6A57A", name: "متوسط" }, // Medium Skin
  { color: "#C68A6D", name: "متوسط داكن" }, // Medium Dark
  { color: "#A0522D", name: "داكن" }, // Dark Skin
  { color: "#8B4513", name: "داكن جداً" }, // Darker Skin
  { color: "#654321", name: "غامق جداً" }, // Very Dark
];

const Step1 = () => {
  const { t } = useTranslation();

  const [gender, setGender] = useState<"boy" | "girl">("boy");
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarOption>(
    boysAvatars[0]
  );
  const [isAnimating, setIsAnimating] = useState(false);

  // Avatar customization state
  const [avatarState, setAvatarState] = useState({
    avatar: selectedAvatar,
    gender: gender,
    hairColor: hairColors[0].color,
    tshirtColor: shirtColors[1].color,
    bgColor: backgrounds[0].color,
    skinColor: skinColor[0].color,

    bgPattern: backgroundPatterns[0].id,
  });
  console.log(avatarState);
  // Current active tab
  const [currentTab, setCurrentTab] = useState("الشخصية");

  // Toggle between boy and girl avatars
  const toggleGender = () => {
    const newGender = gender === "boy" ? "girl" : "boy";
    setGender(newGender);
    // Set default avatar for the selected gender
    setSelectedAvatar(newGender === "boy" ? boysAvatars[0] : girlsAvatars[0]);

    // Trigger animation
    triggerAnimation();
  };

  // Get current avatar list based on gender
  const currentAvatarList = gender === "boy" ? boysAvatars : girlsAvatars;

  // Update any avatar property
  const updateAvatarProperty = (
    property: keyof typeof avatarState,
    value: string
  ) => {
    setAvatarState((prev) => ({ ...prev, [property]: value }));
    triggerAnimation();
  };

  // Trigger animation effect
  const triggerAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // The tabs definition with added avatar tab
  const tabs = [
    { id: "الشخصية", title: "الشخصية", icon: <BsPerson className="text-lg" /> },
    { id: "الشعر", title: "الشعر", icon: <FaPaintBrush className="text-lg" /> },
    { id: "القميص", title: "القميص", icon: <FaTshirt className="text-lg" /> },
    {
      id: "الخلفية",
      title: "الخلفية",
      icon: <MdOutlineWallpaper className="text-lg" />,
    },
    {
      id: "البشرة",
      title: "البشرة",
      icon: <MdPalette className="text-lg" />,
    },
  ];

  // Helper function to generate a gradient string
  const getGradientString = (color: string) => {
    return `linear-gradient(135deg, ${color} 0%, ${adjustColorBrightness(
      color,
      -30
    )} 100%)`;
  };

  // Helper function to adjust color brightness
  const adjustColorBrightness = (hex: string, percent: number) => {
    // Convert hex to RGB
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);

    // Adjust brightness
    r = Math.max(0, Math.min(255, r + percent));
    g = Math.max(0, Math.min(255, g + percent));
    b = Math.max(0, Math.min(255, b + percent));

    // Convert back to hex
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  // Render content based on current tab
  const renderTabContent = () => {
    // Common style for all tab content containers
    const contentContainerStyle =
      "bg-white rounded-xl shadow-md p-4 w-full h-64 overflow-y-auto";

    if (currentTab === "الشخصية") {
      return (
        <motion.div
          className={contentContainerStyle}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {/* Avatars Gallery */}
          <AnimatePresence mode="wait">
            {/* Gender Toggle */}
            <motion.div
              className="flex gap-4  p-2 rounded-full mb-3 justify-center"
              whileHover={{ scale: 1.02 }}
            >
              <button
                onClick={toggleGender}
                className={`px-5 py-2 flex items-center justify-center gap-1 rounded-full font-bold text-md transition-all duration-300 ${
                  gender === "boy"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <GiMale />
                {t("ولد")}
              </button>
              <button
                onClick={toggleGender}
                className={`px-5 py-2 flex items-center justify-center gap-1 rounded-full font-bold text-md transition-all duration-300 ${
                  gender === "girl"
                    ? "bg-pink-500 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <GiFemale />
                {t("بنت")}
              </button>
            </motion.div>
            <motion.div
              key={gender}
              initial={{ opacity: 0, x: gender === "boy" ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: gender === "boy" ? 20 : -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-4 gap-4">
                {currentAvatarList.map((avatar) => (
                  <motion.div
                    key={avatar.id}
                    className={`relative w-16 h-16 rounded-full cursor-pointer transition-all duration-200 ${
                      selectedAvatar.id === avatar.id
                        ? "ring-4 ring-yellow-400 scale-110"
                        : ""
                    }`}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedAvatar(avatar);
                      triggerAnimation();
                    }}
                  >
                    <div
                      className="w-full h-full rounded-full overflow-hidden"
                      style={{ backgroundColor: avatarState.bgColor }}
                    >
                      <avatar.Component
                        tshirtColor={avatarState.tshirtColor}
                        hairColor={avatarState.hairColor}
                        skinColor={avatarState.skinColor}
                      />
                    </div>
                    {selectedAvatar.id === avatar.id && (
                      <motion.div
                        className="absolute -top-1 -right-1 bg-green-500 rounded-full w-6 h-6 flex items-center justify-center text-white text-xs"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring" }}
                      >
                        <IoCheckmarkCircle size={16} />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      );
    } else if (currentTab === "القميص") {
      // Shirt tab with shirt icons and colors
      return (
        <motion.div
          className={contentContainerStyle}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid grid-cols-4 gap-3">
            {shirtColors.map((colorOption, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center gap-1"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.button
                  className={`w-full h-full border-[1px] rounded-lg relative flex items-center justify-center overflow-hidden ${
                    avatarState.tshirtColor === colorOption.color
                      ? "ring-3 ring-blue-400"
                      : ""
                  }`}
                  onClick={() =>
                    updateAvatarProperty("tshirtColor", colorOption.color)
                  }
                >
                  <FaTshirt
                    className="w-full h-full p-1"
                    style={{ color: colorOption.color }}
                  />

                  {avatarState.tshirtColor === colorOption.color && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute text-white bg-blue-500 rounded-full p-1"
                    >
                      <IoCheckmarkCircle size={16} />
                    </motion.div>
                  )}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      );
    } else if (currentTab === "الخلفية") {
      // Background tab with patterns and colors
      return (
        <motion.div
          className={contentContainerStyle}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-bold mb-3 text-blueprimary">
            نمط الخلفية
          </h3>
          <div className="grid grid-cols-4 gap-3 mb-5">
            {backgroundPatterns.map((pattern) => (
              <motion.div
                key={pattern.id}
                className={`flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer ${
                  avatarState.bgPattern === pattern.id
                    ? "bg-blue-100 ring-2 ring-blue-400"
                    : "bg-gray-50"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => updateAvatarProperty("bgPattern", pattern.id)}
              >
                <div
                  className="w-10 h-10 rounded-md mb-1 overflow-hidden"
                  style={{
                    background:
                      pattern.id === "gradient"
                        ? getGradientString(avatarState.bgColor)
                        : pattern.id === "dots"
                        ? `radial-gradient(circle, ${avatarState.bgColor} 1px, transparent 1px) 0 0 / 10px 10px`
                        : pattern.id === "lines"
                        ? `repeating-linear-gradient(45deg, ${
                            avatarState.bgColor
                          }, ${
                            avatarState.bgColor
                          } 5px, ${adjustColorBrightness(
                            avatarState.bgColor,
                            20
                          )} 5px, ${adjustColorBrightness(
                            avatarState.bgColor,
                            20
                          )} 10px)`
                        : avatarState.bgColor,
                  }}
                ></div>
                <span className="text-xs font-medium">{pattern.name}</span>
              </motion.div>
            ))}
          </div>

          <h3 className="text-lg font-bold mb-3 text-blueprimary">
            لون الخلفية
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {backgrounds.map((bgOption, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center gap-1"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.button
                  className={`w-12 h-12 rounded-md shadow-md relative flex items-center justify-center ${
                    avatarState.bgColor === bgOption.color
                      ? "ring-3 ring-blue-400"
                      : ""
                  }`}
                  style={{
                    background:
                      avatarState.bgPattern === "gradient"
                        ? getGradientString(bgOption.color)
                        : avatarState.bgPattern === "dots"
                        ? `radial-gradient(circle, ${bgOption.color} 2px, transparent 2px) 0 0 / 10px 10px`
                        : avatarState.bgPattern === "lines"
                        ? `repeating-linear-gradient(45deg, ${
                            bgOption.color
                          }, ${bgOption.color} 5px, ${adjustColorBrightness(
                            bgOption.color,
                            20
                          )} 5px, ${adjustColorBrightness(
                            bgOption.color,
                            20
                          )} 10px)`
                        : bgOption.color,
                  }}
                  onClick={() =>
                    updateAvatarProperty("bgColor", bgOption.color)
                  }
                >
                  {avatarState.bgColor === bgOption.color && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute text-white bg-blue-500 rounded-full p-1"
                    >
                      <IoCheckmarkCircle size={16} />
                    </motion.div>
                  )}
                </motion.button>
                <span className="text-xs">{bgOption.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      );
    } else if (currentTab === "الشعر") {
      // Hair color tab
      return (
        <motion.div
          className={contentContainerStyle}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-bold mb-3 text-blueprimary">لون الشعر</h3>
          <div className="grid grid-cols-4 gap-3">
            {hairColors.map((colorOption, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center gap-1"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.button
                  className={`w-12 h-12 rounded-full shadow-md relative flex items-center justify-center ${
                    avatarState.hairColor === colorOption.color
                      ? "ring-3 ring-blue-400"
                      : ""
                  }`}
                  style={{ backgroundColor: colorOption.color }}
                  onClick={() =>
                    updateAvatarProperty("hairColor", colorOption.color)
                  }
                >
                  {avatarState.hairColor === colorOption.color && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-white"
                    >
                      <IoCheckmarkCircle size={24} />
                    </motion.div>
                  )}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      );
    } else if (currentTab === "البشرة") {
      // Skin color tab
      return (
        <motion.div
          className={contentContainerStyle}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-bold mb-3 text-blueprimary">
            لون البشرة
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {skinColor.map((colorOption, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center gap-1"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.button
                  className={`w-12 h-12 rounded-full shadow-md relative flex items-center justify-center ${
                    avatarState.skinColor === colorOption.color
                      ? "ring-3 ring-blue-400"
                      : ""
                  }`}
                  style={{ backgroundColor: colorOption.color }}
                  onClick={() =>
                    updateAvatarProperty("skinColor", colorOption.color)
                  }
                >
                  {avatarState.skinColor === colorOption.color && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-white"
                    >
                      <IoCheckmarkCircle size={24} />
                    </motion.div>
                  )}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      );
    }
  };

  return (
    <div className="flex flex-col h-full w-full items-center gap-3 justify-between p-1">
      {/* Main Content */}
      <div className="flex flex-col items-center w-full gap-4 mx-auto">
        {/* Header */}
        <motion.div
          className="w-full text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-blueprimary">
            {t("!اختر شخصيتك")}
          </h2>
          <p className="text-gray-500 text-sm">
            {t("صمم الشخصية المثالية للمغامرة")}
          </p>
        </motion.div>

        {/* Avatar Preview */}
        <motion.div
          className="relative w-44 h-44"
          whileHover={{ scale: 1.05 }}
          animate={
            isAnimating ? { rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] } : {}
          }
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full transform -rotate-3 shadow-lg"></div>
          <div className="absolute inset-2 bg-white rounded-full shadow-inner"></div>

          {/* Avatar rendering with background color and pattern */}
          <div
            className="absolute inset-3 rounded-full overflow-hidden"
            style={{
              background:
                avatarState.bgPattern === "gradient"
                  ? getGradientString(avatarState.bgColor)
                  : avatarState.bgPattern === "dots"
                  ? `radial-gradient(circle, ${
                      avatarState.bgColor
                    } 2px, ${adjustColorBrightness(
                      avatarState.bgColor,
                      30
                    )} 2px) 0 0 / 10px 10px`
                  : avatarState.bgPattern === "lines"
                  ? `repeating-linear-gradient(45deg, ${avatarState.bgColor}, ${
                      avatarState.bgColor
                    } 5px, ${adjustColorBrightness(
                      avatarState.bgColor,
                      20
                    )} 5px, ${adjustColorBrightness(
                      avatarState.bgColor,
                      20
                    )} 10px)`
                  : avatarState.bgColor,
            }}
          >
            {selectedAvatar && (
              <selectedAvatar.Component
                tshirtColor={avatarState.tshirtColor}
                hairColor={avatarState.hairColor}
                skinColor={avatarState.skinColor}
              />
            )}
          </div>

          {/* Decorative elements */}
          <motion.div
            className="absolute -top-1 -right-1 text-yellowprimary"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <IoSparkles className="w-6 h-6" />
          </motion.div>
          <motion.div
            className="absolute -bottom-2 -left-2 text-yellowprimary"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <IoSparkles className="w-6 h-6" />
          </motion.div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex w-full bg-white rounded-t-xl shadow-md p-2">
          <div className="grid grid-cols-5 gap-1 w-full">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-300 ${
                  currentTab === tab.id
                    ? "bg-blue-100 text-blue-600 shadow-sm"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentTab(tab.id)}
              >
                <div className="text-xl mb-1">{tab.icon}</div>
                <div className="text-xs font-medium">{tab.title}</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">{renderTabContent()}</AnimatePresence>
      </div>
    </div>
  );
};

export default Step1;
