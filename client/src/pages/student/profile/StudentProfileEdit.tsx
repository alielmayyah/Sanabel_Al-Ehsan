import { useState } from "react";
import { motion } from "framer-motion";
import PrimaryButton from "../../../components/PrimaryButton";
import { IonRouterLink } from "@ionic/react";
import GenericInput from "../../../components/GenericInput";
import GoBackButton from "../../../components/GoBackButton";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import AVATARS
// Boys Avatars
import boy1 from "../../../assets/avatars/Boys/boy1.png";
import boy2 from "../../../assets/avatars/Boys/boy2.png";
import boy3 from "../../../assets/avatars/Boys/boy3.png";
import boy4 from "../../../assets/avatars/Boys/boy4.png";
import boy5 from "../../../assets/avatars/Boys/boy5.png";
import boy6 from "../../../assets/avatars/Boys/boy6.png";
import boy7 from "../../../assets/avatars/Boys/boy7.png";

// Girls Avatars
import girl1 from "../../../assets/avatars/Girls/girl1.png";
import girl2 from "../../../assets/avatars/Girls/girl2.png";
import girl3 from "../../../assets/avatars/Girls/girl3.png";
import girl4 from "../../../assets/avatars/Girls/girl4.png";
import girl5 from "../../../assets/avatars/Girls/girl5.png";
import girl6 from "../../../assets/avatars/Girls/girl6.png";
import girl7 from "../../../assets/avatars/Girls/girl7.png";
import girl8 from "../../../assets/avatars/Girls/girl8.png";

import i18n from "../../../i18n";
import axios from "axios";

// Grouped arrays for easier access
const boysAvatars = [boy1, boy2, boy3, boy4, boy5, boy6, boy7];
const girlsAvatars = [girl1, girl2, girl3, girl4, girl5, girl6, girl7, girl8];

import "react-toastify/dist/ReactToastify.css";
import { FaCamera, FaRegSave } from "react-icons/fa";
import { GiMale, GiFemale } from "react-icons/gi";

const Toaster = () => (
  <ToastContainer
    position="top-center"
    autoClose={3000}
    hideProgressBar
    newestOnTop
    closeOnClick
    theme="colored"
    toastStyle={{ backgroundColor: "#F9A826", fontSize: "1.2rem" }}
  />
);

const Step1: React.FC = () => {
  const { t } = useTranslation();
  const [gender, setGender] = useState("boy");
  const [character, setCharacter] = useState(boy1);
  const [tempCharacter, setTempCharacter] = useState(character);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // New animation variants
  const avatarVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1 },
    selected: { scale: 1.2, rotate: [0, 10, -10, 0] },
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
        toast.success(t("Photo uploaded! 🎉"));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const finalImage = uploadedImage || tempCharacter;
    setCharacter(finalImage);
    // Here you would typically send to backend
    localStorage.setItem("profileImage", finalImage);
    toast.success(t("All set! 🚀"));
  };

  return (
    <div className="flex flex-col h-full w-full items-center justify-between p-4  ">
      <div className="absolute">
        <Toaster />
      </div>

      {/* Header */}
      <div className="flex flex-row-reverse items-center w-full gap-3">
        <GoBackButton />

        <h1 className="text-black font-bold text-2xl text-end " dir="ltr">
          {t("تعديل الملف الشخصي")}
        </h1>
      </div>

      {/* Main Content */}

      {/* Gender Selector */}
      <motion.div
        className="flex justify-center gap-4 "
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        <div
          className={`p-2 px-3 rounded-2xl flex items-center gap-2 text-xl ${
            gender === "girl"
              ? "bg-pink-500 text-white"
              : "bg-white text-gray-600"
          }`}
          onClick={() => setGender("girl")}
        >
          <GiFemale className="text-2xl" />
          {t("بنت")}
        </div>
        <div
          className={`p-2 px-3 rounded-2xl flex items-center gap-2 text-xl ${
            gender === "boy"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-600"
          }`}
          onClick={() => setGender("boy")}
        >
          <GiMale className="text-2xl" />
          {t("ولد")}
        </div>
      </motion.div>

      {/* Avatar Preview */}
      <motion.div
        className="relative w-48 h-48 mx-auto "
        whileHover={{ rotate: [0, 5, -5, 0] }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full transform -rotate-6 scale-105" />
        <motion.img
          src={uploadedImage || tempCharacter}
          alt="Avatar"
          className="relative z-10 w-full h-full rounded-full object-cover border-8 border-white shadow-xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        />
      </motion.div>

      {/* Avatar Grid */}
      <motion.div
        className="grid grid-cols-4 gap-4 "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {(gender === "boy" ? boysAvatars : girlsAvatars).map(
          (avatar, index) => (
            <motion.div
              key={index}
              variants={avatarVariants}
              initial="hidden"
              animate="visible"
              whileHover="selected"
              className="relative cursor-pointer"
              onClick={() => {
                setTempCharacter(avatar);
                setUploadedImage(null);
              }}
            >
              <img
                src={avatar}
                alt={`Avatar ${index + 1}`}
                className={`w-full h-auto rounded-xl transition-all ${
                  tempCharacter === avatar
                    ? "ring-4 ring-yellow-400 shadow-xl"
                    : " ring-blue-200"
                }`}
              />
            </motion.div>
          )
        )}
      </motion.div>

      {/* Upload Section */}
      <motion.div className="text-center border-t-2 w-full pt-1 ">
        <label className="inline-block cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          <div className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center gap-2 text-blue-600">
              <FaCamera className="text-3xl" />
              <span className="text-xl font-bold">{t("Upload My Photo!")}</span>
            </div>
          </div>
        </label>
      </motion.div>

      {/* Save Button */}
      <motion.button
        onClick={handleSave}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full py-2 bg-green-500 text-white rounded-xl 
        text-xl font-bold shadow-lg
         flex items-center justify-center gap-2"
      >
        <FaRegSave />
        {t("حفظ")}
      </motion.button>
    </div>
  );
};

export default Step1;
