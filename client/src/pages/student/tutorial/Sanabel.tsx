import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

// Sanabel type images
import sanabelType1Img from "../../../assets/sanabeltype/سنابل الإحسان في العلاقة مع الأسرة والمجتمع.png";
import sanabelType2Img from "../../../assets/sanabeltype/سنابل الإحسان في العلاقة مع النفس.png";
import sanabelType3Img from "../../../assets/sanabeltype/سنابل-الإحسان-في-العلاقة-مع-الأرض-والكون.png";
import sanabelType4Img from "../../../assets/sanabeltype/سنابل-الإحسان-في-العلاقة-مع-الله.png";

// Import all the sanabel images
import { sanabelImgs } from "../../../data/SanabelImgs";

interface SanabelTypesProps {
  onTypeChange: (index: number) => void;
  currentTypeIndex: number;
}

const SanabelOnboarding: React.FC<{
  onTypeChange: (index: number) => void;
  currentTypeIndex: number;
}> = ({ onTypeChange, currentTypeIndex }) => {
  const { t } = useTranslation();

  const [showItems, setShowItems] = useState(false);

  // Define type names for display
  const typeNames = [
    "سنابل الإحسان في العلاقة مع الله", // Relationship with Allah
    "سنابل الإحسان في العلاقة مع النفس", // Relationship with Self
    "سنابل الإحسان في العلاقة مع الأسرة والمجتمع", // Relationship with Family and Society
    "سنابل الإحسان في العلاقة مع الأرض والكون", // Relationship with Earth and Universe
  ];

  // Define item names for each type
  const itemNames = [
    // Type 0: Relationship with Allah
    [
      "الصلاة",
      "الصيام",
      "الصدقة",
      "العفو والصفح",
      "الشكر",
      "الصبر",
      "الذكر",
      "الدعاء",
    ],
    // Type 1: Relationship with Self
    ["الإحسان للجسد", "الإحسان للعقل", "الإحسان للروح", "الإحسان للقلب"],
    // Type 2: Relationship with Family and Society
    [
      "بر الوالدين",
      "صلة الرحم",
      "الصدق والأمانة",
      "إكرام الضيف",
      "الإحسان للجار",
      "توقير الكبير ورحمة الصغير",
      "التهادي",
      "الإطعام",
      "الرحمة والرفق",
      "الوفاء والامتنان",
      "إدخال السرور",
      "إيناس الوحشان وترك التناجي",
      "الإصلاح بين متخاصمين",
      "التبسم وإفشاء السلام",
      "اماطة الأذى",
      "التعاون",
      "الكلمة الطيبة والإحسان في القول",
      "المشاركة والإيثار",
      "قضاء الحوائج",
    ],
    // Type 3: Relationship with Earth and Universe
    [
      "عدم الإسراف",
      "الاحسان للمخلوقات (الطيور والحيوانات)",
      "الغرس",
      "الإحسان للأرض والنبات",
    ],
  ];

  // Type descriptions
  const typeDescriptions = [
    "أعمال الإحسان التي تقوي علاقتنا مع الله سبحانه وتعالى",
    "أعمال الإحسان التي تنمي الذات وتطورها",
    "أعمال الإحسان التي تعزز الروابط الاجتماعية والأسرية",
    "أعمال الإحسان التي تحافظ على البيئة والكائنات الحية",
  ];

  // Type background colors
  const typeColors = [
    "bg-blueprimary",
    "bg-redprimary",
    "bg-yellowprimary",
    "bg-greenprimary",
  ];

  // Type images
  const typeImages = [
    sanabelType4Img, // Allah
    sanabelType2Img, // Self
    sanabelType1Img, // Family and Society
    sanabelType3Img, // Earth and Universe
  ];

  // Auto-cycle through types
  // Auto-cycle through types
  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setShowItems(false);

      setTimeout(() => {
        // Update the parent state instead
        const nextIndex = (currentTypeIndex + 1) % 4;
        onTypeChange(nextIndex);
        setTimeout(() => setShowItems(true), 5000);
      }, 0);
    }, 5000);

    // Show initial items after component mounts
    setTimeout(() => setShowItems(true), 500);

    return () => clearInterval(cycleInterval);
  }, [currentTypeIndex, onTypeChange]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const typeVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
    exit: {
      scale: 0.9,
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  // Get current type's sanabel items
  const currentSanabelItems = sanabelImgs[currentTypeIndex];
  const currentItemNames = itemNames[currentTypeIndex];

  // Display only a subset of items for preview purposes
  const displayCount = Math.min(4, currentSanabelItems.length);
  const displayItems = currentSanabelItems.slice(0, displayCount);
  const displayNames = currentItemNames.slice(0, displayCount);

  return (
    <div
      className={`h-4/5 rounded-2xl w-full flex flex-col items-center justify-start p-6 ${typeColors[currentTypeIndex]} transition-colors duration-500`}
    >
      {/* Main heading */}
      <motion.h1
        className="text-2xl font-bold text-white-800 mb-4 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t("اكتشف سنابل الإحسان")}
      </motion.h1>

      {/* Type display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`type-${currentTypeIndex}`}
          className="flex flex-col items-center mb-6 px-4 py-6 rounded-xl bg-white/80 backdrop-blur-sm shadow-md w-full"
          variants={typeVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="w-20 h-20 mb-3 rounded-full overflow-hidden bg-white p-1 shadow-sm">
            <img
              src={typeImages[currentTypeIndex]}
              alt={typeNames[currentTypeIndex]}
              className="w-full h-full object-contain"
            />
          </div>
          <h2 className="text-xl font-bold text-gray-700 mb-1 text-center">
            {typeNames[currentTypeIndex]}
          </h2>
          <div
            className={`h-1 w-16 rounded-full bg-gradient-to-r ${typeColors[currentTypeIndex]}  my-2`}
          ></div>
        </motion.div>
      </AnimatePresence>

      {/* Sanabel items grid */}
      <AnimatePresence>
        {showItems && (
          <motion.div
            className="grid grid-cols-2 gap-3 w-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {displayItems.map((item, index) => (
              <motion.div
                key={`item-${currentTypeIndex}-${index}`}
                className="flex flex-col items-center bg-white/60 rounded-lg p-3 shadow-sm"
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="w-14 h-14 mb-2">
                  <img
                    src={item}
                    alt={displayNames[index]}
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-xs text-gray-700 text-center font-medium line-clamp-1 px-1">
                  {displayNames[index]}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress indicator */}
      <div className="flex justify-center mt-auto mb-4 pt-4 w-full gap-2">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={`dot-${index}`}
            className={`h-2 rounded-lg transition-all duration-500 w-1/4 ${
              index === currentTypeIndex ? "bg-white" : "bg-white/40"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SanabelOnboarding;
