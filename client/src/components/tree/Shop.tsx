import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import trophy from "../../../assets/trophy.png";

// Inventory Assets

import waterImg from "../../assets/resources/ماء.png";
import fertilizerImg from "../../assets/resources/سماد.png";

// Sanabel
import blueSanabel from "../../assets/resources/سنبلة زرقاء.png";
import redSanabel from "../../assets/resources/سنبلة حمراء.png";
import yellowSanabel from "../../assets/resources/سنبلة صفراء.png";
import xpIcon from "../../assets/resources/اكس بي.png";
import { useUserContext } from "../../context/StudentUserProvider";

import CheckmarkAnimation from "../../assets/checkmarkAnimation";
import { treeStages } from "../../data/Tree";
import axios from "axios";
const Shop: React.FC = () => {
  const { t } = useTranslation();
  const { user, refreshUserData } = useUserContext();

  const shop = [
    { icon: blueSanabel },
    { icon: redSanabel },
    { icon: yellowSanabel },
  ];

  const waterCost = 20;
  const fertilizerCost = 30;

  const waterCount = Number(user?.water);
  const fertilizerCount = Number(user?.fertilizer);
  const blueCount = Number(user?.snabelBlue);
  const redCount = Number(user?.snabelRed);
  const yellowCount = Number(user?.snabelYellow);

  const waterNeeded = Number(user?.waterNeeded);
  const fertilizerNeeded = Number(user?.fertilizerNeeded);

  //  المرحلة
  const treeStage = Number(user?.treeStage);

  const treeProgress = Number(user?.treeProgress);

  const [buyWaterCount, setBuyWaterCount] = useState(0);

  const [buyFertilizerCount, setBuyFertilizerCount] = useState(0);

  // Calculate remaining needed resources
  const remainingWaterNeeded = Math.max(0, waterNeeded - waterCount);
  const remainingFertilizerNeeded = Math.max(
    0,
    fertilizerNeeded - fertilizerCount
  );

  // Check if tree progress is ready
  const isProgressReady =
    waterCount >= waterNeeded && fertilizerCount >= fertilizerNeeded;

  function changeBuyWaterCount(operation: any) {
    if (operation === "-" && buyWaterCount !== 0) {
      setBuyWaterCount(buyWaterCount - 1);
    }
    if (operation === "+" && buyWaterCount !== remainingWaterNeeded) {
      setBuyWaterCount(buyWaterCount + 1);
    }
  }

  function changeBuyFertilzerCount(operation: any) {
    if (operation === "-" && buyFertilizerCount !== 0) {
      setBuyFertilizerCount(buyFertilizerCount - 1);
    }
    if (operation === "+" && buyFertilizerCount !== remainingFertilizerNeeded) {
      setBuyFertilizerCount(buyFertilizerCount + 1);
    }
  }

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isPurchaseConfirmed, setIsPurchaseConfirmed] = useState(false);

  const [isCelebrationVisible, setIsCelebrationVisible] = useState(false);

  // Buy Shop
  // Function to handle purchase
  const buyShop = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.patch(
        "http://localhost:3000/students/buy-water-seeder",
        {
          water: buyWaterCount,
          seeders: buyFertilizerCount, // "seeders" is the API param name for fertilizer
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setBuyWaterCount(0);
        setBuyFertilizerCount(0);
        setIsPopupVisible(false);
        setIsPurchaseConfirmed(true);
        setIsPopupVisible(false);

        // Refresh user data to update UI with new resource counts
        await refreshUserData();

        // Reset purchase counts after successful purchase
        setTimeout(() => {
          setBuyWaterCount(0);
          setBuyFertilizerCount(0);
        }, 2000);
      }
    } catch (error) {
      console.error("Error purchasing items:", error);
    }
  };

  // Progress TREE
  async function progressTree() {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.patch(
        "http://localhost:3000/students/grow-tree",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setIsCelebrationVisible(true);
        // Refresh user data to show updated tree stage
        await refreshUserData();
      }
    } catch (error) {}
  }
  return (
    <div className="flex-center flex-col w-full h-full">
      {isProgressReady == false ? (
        <div className="flex flex-col gap-1 w-full h-full">
          <h1 className="text-black text-end text-lg">{t("المتجر")}</h1>

          <div className="flex-col gap-2 bg-[#FFF8E5] rounded-xl w-full flex justify-between p-2">
            <div className="flex  justify-between">
              <div className="flex-center">
                <div className="flex-center gap-1 p-1 rounded-3xl bg-white">
                  {" "}
                  <div
                    className="w-6 h-6 flex-center bg-blueprimary rounded-full"
                    onClick={() => changeBuyFertilzerCount("-")}
                  >
                    <h1 className="text-white"> -</h1>
                  </div>
                  <h1 className="text-black"> x{buyFertilizerCount}</h1>
                  <div
                    className="w-6 h-6 flex-center bg-blueprimary rounded-full"
                    onClick={() => changeBuyFertilzerCount("+")}
                  >
                    <h1 className="text-white"> +</h1>
                  </div>
                </div>
                <img src={fertilizerImg} alt="" className="h-8 w-auto" />
              </div>
              <div className="flex-center">
                <div className="flex-center gap-1 p-1 rounded-3xl bg-white">
                  {" "}
                  <div
                    className="w-6 h-6 flex-center bg-blueprimary rounded-full"
                    onClick={() => changeBuyWaterCount("-")}
                  >
                    <h1 className="text-white"> -</h1>
                  </div>
                  <h1 className="text-black"> x{buyWaterCount}</h1>
                  <div
                    className="w-6 h-6 flex-center bg-blueprimary rounded-full"
                    onClick={() => changeBuyWaterCount("+")}
                  >
                    <h1 className="text-white"> +</h1>
                  </div>
                </div>
                <img src={waterImg} alt="" className="h-8 w-auto" />
              </div>
            </div>
            {(buyWaterCount > 0 || buyFertilizerCount > 0) && (
              <div className="flex flex-col w-full gap-1">
                <div className="flex w-full justify-between items-center  gap-2 bg-white border-2 rounded-3xl p-3">
                  <div className="flex-center gap-2">
                    {shop.map((item) => (
                      <div className="gap-1 flex-center">
                        <img
                          src={item.icon}
                          alt="icon"
                          className="w-auto h-8"
                        />
                        <h1 className="text-black text-sm">
                          x
                          {buyFertilizerCount * fertilizerCost +
                            buyWaterCount * waterCost}
                        </h1>
                      </div>
                    ))}
                  </div>
                  <h1 className=" text-black text-center font-bold py-1  text-sm">
                    {t("الاجمالي")}
                  </h1>
                </div>
                <div
                  className="w-full flex-center"
                  onClick={() => setIsPopupVisible(true)}
                >
                  <div className="w-1/3 ">
                    {" "}
                    <h1 className="bg-blueprimary rounded-3xl text-center py-2  text-sm">
                      {t("شراء")}
                    </h1>
                  </div>
                </div>
              </div>
            )}
            {isPopupVisible && (
              <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex-center z-50">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white rounded-2xl p-6 w-4/5 max-w-md text-center shadow-xl"
                >
                  <h1 className="text-black text-xl font-bold mb-4">
                    {t("تأكيد الشراء")}
                  </h1>

                  <div className="bg-[#FFF8E5] rounded-xl p-4 ">
                    <div className="flex justify-center items-center gap-8 my-3">
                      <div className="flex flex-col items-center">
                        <h2 className="text-black text-md mb-2">{t("ماء")}</h2>
                        <div className="bg-blue-100 p-3 rounded-full mb-2 shadow-md">
                          <img
                            src={waterImg}
                            alt=""
                            className="w-14 h-14 object-contain"
                          />
                        </div>
                        <div className="bg-blue-500 text-white px-3 py-1 rounded-full">
                          <h2 className="font-bold">x{buyWaterCount}</h2>
                        </div>
                      </div>

                      <div className="flex flex-col items-center">
                        <h2 className="text-black text-md mb-2">{t("سماد")}</h2>
                        <div className="bg-green-100 p-3 rounded-full mb-2 shadow-md">
                          <img
                            src={fertilizerImg}
                            alt=""
                            className="w-14 h-14 object-contain"
                          />
                        </div>
                        <div className="bg-green-500 text-white px-3 py-1 rounded-full">
                          <h2 className="font-bold">x{buyFertilizerCount}</h2>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-100/25 flex flex-col w-full justify-between items-center  gap-2  rounded-2xl p-2">
                      <h1 className=" text-black text-center font-bold text-md">
                        {t("الاجمالي")}
                      </h1>

                      <div className="flex-center gap-4 p-5 rounded-xl">
                        {shop.map((item) => (
                          <div className="gap-1 flex-center">
                            <img
                              src={item.icon}
                              alt="icon"
                              className="w-auto h-8"
                            />
                            <h1 className="text-black text-sm">
                              x
                              {buyFertilizerCount * fertilizerCost +
                                buyWaterCount * waterCost}
                            </h1>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center gap-4 mt-4">
                    <button
                      className="bg-blueprimary text-white px-6 py-3 rounded-xl font-bold shadow-md transition-transform transform hover:scale-105 active:scale-95 flex-1"
                      onClick={() => {
                        setBuyWaterCount(0);
                        setBuyFertilizerCount(0);
                        setIsPurchaseConfirmed(true);
                        setIsPopupVisible(false);
                      }}
                    >
                      {t("تأكيد الشراء")}
                    </button>
                    <button
                      className="bg-white border-2 border-gray-300 text-gray-700 px-4 py-3 rounded-xl font-bold shadow-sm transition-transform transform hover:scale-105 active:scale-95"
                      onClick={buyShop}
                    >
                      {t("إلغاء")}
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
            {/* // Add another popup to show after confirmation */}
            {isPurchaseConfirmed && (
              <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex-center z-50 ">
                <div className="bg-white rounded-xl p-4 w-2/3 text-center">
                  <CheckmarkAnimation />

                  <h1 className="text-black text-lg">
                    {t("تمت عملية الشراء بنجاح")}
                  </h1>
                  <button
                    className="mt-4 bg-blueprimary text-white px-4 py-2 rounded-xl"
                    onClick={() => setIsPurchaseConfirmed(false)}
                  >
                    {t("إغلاق")}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-2/3">
          {treeProgress < 51 && (
            <motion.button
              className="flex-center w-full px-6 py-3 bg-gradient-to-r from-blueprimary to-blue-400 text-white font-bold rounded-full shadow-lg"
              initial={{ scale: 1 }}
              animate={{
                y: [0, -5, 0],
                transition: { repeat: Infinity, duration: 1.5 },
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => progressTree()}
            >
              <div className="flex items-center gap-2">
                <span>🌟</span>
                {t("كبر الشجرة")}
              </div>
            </motion.button>
          )}

          {/* Celebration Popup */}

          {isCelebrationVisible && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              {/* Backdrop with blur effect */}
              <motion.div
                className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setIsCelebrationVisible(false)}
              />

              {/* Celebration popup content */}
              <motion.div
                className="relative bg-gradient-to-b from-white to-blue-50 rounded-2xl shadow-2xl p-6 mx-4 max-w-md w-full z-10 overflow-hidden"
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: "spring", damping: 12 }}
              >
                {/* Confetti particles */}
                <div className="absolute opacity-25 inset-0 overflow-hidden pointer-events-none">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      initial={{
                        x: Math.random() * 400 - 200,
                        y: -20,
                        rotate: Math.random() * 360,
                        opacity: 0,
                      }}
                      animate={{
                        y: Math.random() * 400 + 100,
                        opacity: [0, 1, 0],
                        rotate: Math.random() * 360 + 180,
                      }}
                      transition={{
                        duration: Math.random() * 3 + 2,
                        delay: Math.random() * 0.5,
                        repeat: Infinity,
                        repeatDelay: Math.random() * 2,
                      }}
                      style={{
                        left: `${Math.random() * 100}%`,
                        color: [
                          "#FFD700",
                          "#FF6347",
                          "#9ACD32",
                          "#20B2AA",
                          "#BA55D3",
                        ][Math.floor(Math.random() * 5)],
                      }}
                    >
                      {
                        ["✦", "★", "✴", "✷", "✸", "✹", "✺", "❀", "❁"][
                          Math.floor(Math.random() * 9)
                        ]
                      }
                    </motion.div>
                  ))}
                </div>

                {/* Growing tree animation */}
                {/* Popup Modal */}

                <div className="relative h-[50vh] w-[70vw] flex-center items-center justify-center mx-auto">
                  <AnimatePresence>
                    <motion.img
                      key={treeProgress - 1} // Trigger animation for the current frame
                      src={treeStages[treeProgress - 1 + 3]}
                      alt={`Current tree stage ${treeProgress}`}
                      className="absolute w-full h-auto"
                    />
                    <motion.img
                      key={treeProgress + 1} // Trigger animation for the next frame
                      src={treeStages[treeProgress + 3]}
                      alt={`Next tree stage ${treeProgress + 1}`}
                      className="absolute w-full h-auto "
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 1 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }} // Loop animation
                    />
                  </AnimatePresence>
                </div>

                {/* Congratulatory message */}
                <div className="text-center">
                  <motion.h2
                    className="text-xl font-bold text-green-700 mb-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {t("مبروك، شجرتك تزدهر وتثمر بنجاح")}
                  </motion.h2>

                  <motion.p
                    className="text-green-600 mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    {t("ثمار إحسانك تنمو لتضيء طريق الخير!")}
                  </motion.p>
                </div>

                {/* Call to action button */}
                <motion.button
                  className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-xl shadow-md"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 }}
                  onClick={() => setIsCelebrationVisible(false)}
                >
                  {t("رائع!")}
                </motion.button>
              </motion.div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Shop;
