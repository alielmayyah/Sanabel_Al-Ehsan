import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

// Import avatar components correctly
import AvatarTest from "../../../assets/avatars/AvatarTest";
import AvatarTest2 from "../../../assets/avatars/AvatarTest2";

import { IoSparkles } from "react-icons/io5";
import { GiMale, GiFemale } from "react-icons/gi";

import { FaTshirt } from "react-icons/fa";
import { FaPaintBrush } from "react-icons/fa";
import { MdOutlineWallpaper } from "react-icons/md";
import { IoCheckmarkCircle } from "react-icons/io5";

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
    Component: AvatarTest,
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
  { color: "#000000" }, // Black
  { color: "#4B3621" }, // Dark Brown
  { color: "#8B4513" }, // Medium Brown
  { color: "#A0522D" }, // Light Brown
  { color: "#D2B48C" }, // Blonde
  { color: "#E6BE8A" }, // Light Blonde
  { color: "#A52A2A" }, // Auburn
  { color: "#FF6347" }, // Reddish Brown
];

const shirtColors = [
  { color: "#FFFFFF" }, // White
  { color: "#000000" }, // Black
  { color: "#1E90FF" }, // Dodger Blue
  { color: "#FF4500" }, // Orange Red
  { color: "#32CD32" }, // Lime Green
  { color: "#FFD700" }, // Gold
  { color: "#8A2BE2" }, // Blue Violet
  { color: "#FF69B4" }, // Hot Pink
];

const backgrounds = [
  { color: "#FFCDD2" }, // Light Pink
  { color: "#81D4FA" }, // Sky Blue
  { color: "#FFEB3B" }, // Bright Yellow
  { color: "#F48FB1" }, // Pink Lavender
  { color: "#4CAF50" }, // Vibrant Green
  { color: "#FF5722" }, // Vibrant Orange
  { color: "#9C27B0" }, // Bright Purple
  { color: "#E91E63" }, // Bold Red
];

const skinColor = [
  { color: "#FFEFD5" }, // Papaya Whip (Very Light)
  { color: "#FFDAB9" }, // Peachpuff (Light)
  { color: "#EACBA1" }, // Medium Light
  { color: "#D6A57A" }, // Medium Skin
  { color: "#C68A6D" }, // Medium Dark
  { color: "#A0522D" }, // Dark Skin
  { color: "#8B4513" }, // Darker Skin
  { color: "#654321" }, // Very Dark
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
  });

  console.log("Avatar State:", avatarState);
  // Current active tab
  const [currentTab, setCurrentTab] = useState("القميص");

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

  // The tabs definition
  const tabs = [
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
      icon: <MdOutlineWallpaper className="text-lg" />,
    },
  ];

  // Get current color options based on active tab
  const getCurrentColorOptions = () => {
    switch (currentTab) {
      case "الشعر":
        return hairColors;
      case "القميص":
        return shirtColors;
      case "الخلفية":
        return backgrounds;
      case "البشرة":
        return skinColor;
      default:
        return shirtColors;
    }
  };

  // Get current selected color based on active tab
  const getCurrentSelectedColor = () => {
    switch (currentTab) {
      case "الشعر":
        return avatarState.hairColor;
      case "القميص":
        return avatarState.tshirtColor;
      case "الخلفية":
        return avatarState.bgColor;
      case "البشرة":
        return avatarState.skinColor;
      default:
        return avatarState.tshirtColor;
    }
  };

  // Handle color selection
  const handleColorSelect = (color: string) => {
    switch (currentTab) {
      case "الشعر":
        updateAvatarProperty("hairColor", color);

        break;
      case "القميص":
        updateAvatarProperty("tshirtColor", color);

        break;
      case "الخلفية":
        updateAvatarProperty("bgColor", color);

        break;
      case "البشرة":
        updateAvatarProperty("skinColor", color);

        break;
    }
  };

  return (
    <div className="flex flex-col h-full w-full items-center gap-1 justify-between p-1 bg-gradient-to-b ">
      {/* Main Content */}
      <div className="flex flex-col items-center w-full gap-2 max-w-md mx-auto">
        {/* Avatar Display Section */}
        <motion.div
          className="flex flex-col items-center gap-5 w-full"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-blueprimary text-center">
            {t("!اختر شخصيتك")}
          </h2>

          {/* Avatar Preview */}
          <motion.div
            className="relative w-48 h-48"
            whileHover={{ scale: 1.05 }}
            animate={
              isAnimating ? { rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] } : {}
            }
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full transform -rotate-3 shadow-lg"></div>
            <div className="absolute inset-2 bg-white rounded-full shadow-inner"></div>

            {/* Avatar rendering with background color */}
            <div
              className="absolute inset-3 rounded-full overflow-hidden"
              style={{ backgroundColor: avatarState.bgColor }}
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

          {/* Gender Toggle */}
          <motion.div
            className="flex gap-4 bg-white p-2 rounded-full shadow-md"
            whileHover={{ scale: 1.05 }}
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

          {/* Avatars Gallery */}
          <AnimatePresence mode="wait">
            <motion.div
              key={gender}
              className="w-full"
              initial={{ opacity: 0, x: gender === "boy" ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: gender === "boy" ? 20 : -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-2xl p-4 shadow-lg">
                <div className="grid grid-cols-4 gap-3">
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
                          ✓
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Customization Tabs */}
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {/* Tab Navigation */}
            <div className="flex w-full bg-white rounded-t-xl shadow-md p-2 mb-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  className={`flex-1 flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-300 ${
                    currentTab === tab.id
                      ? "bg-blue-100 text-blue-600 shadow-sm"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentTab(tab.id as any)}
                >
                  <div className="text-xl mb-1">{tab.icon}</div>
                  <div className="text-sm font-medium">{tab.title}</div>
                </motion.button>
              ))}
            </div>

            {/* Color Selection Panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTab}
                className="bg-white rounded-xl shadow-md p-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-4 gap-3">
                  {getCurrentColorOptions().map((colorOption, index) => (
                    <motion.div
                      key={index}
                      className="flex flex-col items-center gap-1"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <motion.button
                        className={`w-12 h-12 rounded-full shadow-md relative flex items-center justify-center ${
                          getCurrentSelectedColor() === colorOption.color
                            ? "ring-4 ring-blue-400"
                            : ""
                        }`}
                        style={{ backgroundColor: colorOption.color }}
                        onClick={() => handleColorSelect(colorOption.color)}
                      >
                        {getCurrentSelectedColor() === colorOption.color && (
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
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Step1;
