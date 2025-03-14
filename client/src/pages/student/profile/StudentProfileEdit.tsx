import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PrimaryButton from "../../../components/PrimaryButton";
import GoBackButton from "../../../components/GoBackButton";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cropper from "react-easy-crop";

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
import girl9 from "../../../assets/avatars/Girls/girl9.png";

import { IoSparkles } from "react-icons/io5";
import { FaCamera, FaRegSave, FaArrowLeft, FaCheck } from "react-icons/fa";
import { GiMale, GiFemale } from "react-icons/gi";
import { RiCloseLine } from "react-icons/ri";
import { CgZoomIn, CgZoomOut } from "react-icons/cg";

// Grouped arrays for easier access
const boysAvatars = [boy1, boy2, boy3, boy4, boy5, boy6, boy7];
const girlsAvatars = [girl1, girl2, girl3, girl4, girl5, girl6, girl7, girl8];

// Function to create image from canvas
const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.src = url;
  });

// Function to get cropped image
const getCroppedImg = async (imageSrc, pixelCrop) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Set canvas size to desired dimensions (always a square for avatar)
  const size = Math.min(image.width, image.height);
  canvas.width = size;
  canvas.height = size;

  // Draw the cropped image
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    size,
    size
  );

  // Return as base64 string
  return canvas.toDataURL("image/jpeg");
};

const Toaster = () => (
  <ToastContainer
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
  />
);

const Step1 = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const [gender, setGender] = useState("boy");
  const [character, setCharacter] = useState(boy1);
  const [tempCharacter, setTempCharacter] = useState(character);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showUploadOption, setShowUploadOption] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [saveButtonActive, setSaveButtonActive] = useState(false);

  // Cropper state
  const [showCropper, setShowCropper] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [originalImageSrc, setOriginalImageSrc] = useState(null);

  // Check if changes were made to enable save button
  useEffect(() => {
    const hasChanges = uploadedImage !== null || tempCharacter !== character;
    setSaveButtonActive(hasChanges);
  }, [uploadedImage, tempCharacter, character]);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast.error(
          t("الصورة كبيرة جدًا! يرجى اختيار صورة أقل من 5 ميجابايت.")
        );
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setOriginalImageSrc(reader.result);
        setShowCropper(true);
        setShowUploadOption(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropCancel = () => {
    setShowCropper(false);
    setOriginalImageSrc(null);
  };

  const handleCropConfirm = async () => {
    try {
      const croppedImage = await getCroppedImg(
        originalImageSrc,
        croppedAreaPixels
      );
      setUploadedImage(croppedImage);
      setShowCropper(false);
      setOriginalImageSrc(null);
      toast.success(t("تم اقتصاص الصورة بنجاح!"));
    } catch (e) {
      console.error(e);
      toast.error(t("حدث خطأ أثناء معالجة الصورة"));
    }
  };

  const handleSave = () => {
    if (!saveButtonActive) return;

    setIsAnimating(true);
    setTimeout(() => {
      if (uploadedImage) {
        setCharacter(uploadedImage);
      } else {
        setCharacter(tempCharacter);
      }
      toast.success(t("!تم تحديث صورة الملف الشخصي"));
      setIsAnimating(false);

      // Here you would typically update the user's profile in your database
      // For example: updateUserProfile(userId, { avatar: uploadedImage || tempCharacter });
    }, 500);
  };

  const toggleGender = () => {
    const newGender = gender === "boy" ? "girl" : "boy";
    setGender(newGender);
    setTempCharacter(newGender === "boy" ? boysAvatars[0] : girlsAvatars[0]);
    setUploadedImage(null);
  };

  const resetSelection = () => {
    setTempCharacter(character);
    setUploadedImage(null);
    setSaveButtonActive(false);
  };

  return (
    <div className="flex flex-col h-full w-full items-center gap-1 justify-between p-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="absolute">
        <Toaster />
      </div>

      {/* Header Section */}
      <div className="flex flex-row-reverse items-center w-full gap-3">
        <GoBackButton />
        <h1 className="text-black font-bold text-2xl text-end" dir="rtl">
          {t("تعديل الملف الشخصي")}
        </h1>
      </div>

      {/* Image Cropper Modal */}
      <AnimatePresence>
        {showCropper && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-full max-w-md rounded-2xl p-4 flex flex-col"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">
                  {t("اقتصاص الصورة")}
                </h3>
                <button onClick={handleCropCancel} className="text-gray-600">
                  <RiCloseLine size={24} />
                </button>
              </div>

              <div className="relative h-80 w-full bg-gray-100 rounded-lg overflow-hidden">
                <Cropper
                  image={originalImageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  cropShape="round"
                />
              </div>

              <div className="flex items-center justify-center mt-4 gap-2">
                <button
                  className="text-gray-600"
                  onClick={() => setZoom(Math.max(1, zoom - 0.1))}
                >
                  <CgZoomOut size={24} />
                </button>
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <button
                  className="text-gray-600"
                  onClick={() => setZoom(Math.min(3, zoom + 0.1))}
                >
                  <CgZoomIn size={24} />
                </button>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={handleCropCancel}
                  className="w-1/2 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold"
                >
                  {t("إلغاء")}
                </button>
                <button
                  onClick={handleCropConfirm}
                  className="w-1/2 py-3 bg-blue-500 text-white rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  <FaCheck />
                  {t("تأكيد")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex flex-col items-center w-full gap-2">
        {/* Avatar Display Section */}
        <motion.div
          className="flex flex-col items-center gap-5 w-full"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold text-purple-700">
            {t("!اختر شخصيتك")}
          </h2>

          {/* Avatar Preview */}
          <motion.div
            className="relative w-48 h-48"
            whileHover={{ scale: 1.05 }}
            animate={isAnimating ? { rotate: 360 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full transform -rotate-3 shadow-lg"></div>
            <div className="absolute inset-2 bg-white rounded-full shadow-inner"></div>
            <motion.img
              src={uploadedImage || tempCharacter}
              alt="Avatar"
              className="absolute inset-3 rounded-full object-cover"
              animate={{ scale: isAnimating ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.5 }}
            />

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
        </motion.div>

        {/* Avatars Gallery */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <div className="grid grid-cols-4 gap-3">
              {(gender === "boy" ? boysAvatars : girlsAvatars).map(
                (avatar, index) => (
                  <motion.div
                    key={index}
                    className={`relative w-16 h-16 rounded-full cursor-pointer transition-all duration-200 ${
                      tempCharacter === avatar
                        ? "ring-4 ring-yellow-400 scale-110"
                        : ""
                    }`}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={avatar}
                      alt={`Avatar ${index + 1}`}
                      className="w-full h-full rounded-full object-cover shadow-sm"
                      onClick={() => {
                        setTempCharacter(avatar);
                        setUploadedImage(null);
                      }}
                    />
                    {tempCharacter === avatar && (
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
                )
              )}
            </div>
          </div>
        </motion.div>

        {/* Upload Section */}
        <motion.div
          className="w-full mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <AnimatePresence>
            {showUploadOption ? (
              <motion.div
                className="bg-white rounded-2xl p-5 shadow-lg border-blueprimary border-[1px]"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col items-center gap-3">
                  <p className="text-center text-gray-600" dir="rtl">
                    {t("اختر صورة من جهازك")}
                  </p>

                  <div className="flex w-full gap-2">
                    <label className="cursor-pointer w-2/3">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      <motion.div
                        className="bg-gradient-to-t from-blue-500 to-blueprimary text-white py-3 rounded-xl shadow-md text-center font-bold flex items-center justify-center gap-2"
                        whileHover={{
                          scale: 1.03,
                          boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
                        }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <FaCamera />
                        {t("اختر صورة")}
                      </motion.div>
                    </label>
                    <motion.button
                      className="text-gray-500 mt-2 w-1/3"
                      onClick={() => setShowUploadOption(false)}
                      whileHover={{ scale: 1.05 }}
                    >
                      {t("إلغاء")}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.button
                className="bg-white text-blue-600 border border-blue-300 py-3 rounded-xl shadow-sm w-full font-bold flex items-center justify-center gap-2"
                onClick={() => setShowUploadOption(true)}
                whileHover={{ scale: 1.03, backgroundColor: "#f0f9ff" }}
                whileTap={{ scale: 0.97 }}
              >
                <FaCamera />
                {t("اختر صورة من جهازك")}
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div
        className="w-full flex flex-col gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {/* Reset button shows only when changes are made */}
        {saveButtonActive && (
          <motion.button
            className="text-gray-600 text-center py-2"
            onClick={resetSelection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
          >
            {t("إعادة تعيين التغييرات")}
          </motion.button>
        )}

        {/* Save Button */}
        <div onClick={handleSave}>
          <PrimaryButton
            style={saveButtonActive ? "fill" : "outline"}
            text={t("حفظ")}
            arrow="none"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Step1;
