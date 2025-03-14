import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
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

const Shop: React.FC = () => {
  const { t } = useTranslation();

  const shop = [
    { icon: blueSanabel },
    { icon: redSanabel },
    { icon: yellowSanabel },
  ];

  const waterCost = 20;
  const fertilizerCost = 30;

  const [buyWaterCount, setBuyWaterCount] = useState(0);

  const [buyFertilizerCount, setBuyFertilizerCount] = useState(0);

  function changeBuyWaterCount(operation: any) {
    if (operation === "-" && buyWaterCount !== 0) {
      setBuyWaterCount(buyWaterCount - 1);
    }
    if (operation === "+" && buyWaterCount !== 20) {
      setBuyWaterCount(buyWaterCount + 1);
    }
  }

  function changeBuyFertilzerCount(operation: any) {
    if (operation === "-" && buyFertilizerCount !== 0) {
      setBuyFertilizerCount(buyFertilizerCount - 1);
    }
    if (operation === "+" && buyFertilizerCount !== 20) {
      setBuyFertilizerCount(buyFertilizerCount + 1);
    }
  }

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isPurchaseConfirmed, setIsPurchaseConfirmed] = useState(false);

  return (
    <div className="flex flex-col gap-1 w-full h-full">
      <h1 className="text-black text-end text-lg">{t("المتجر")}</h1>

      <div className="flex-col gap-2 bg-[#FFF8E5] w-full flex justify-between p-2">
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
            <div className="flex w-full justify-between items-center  gap-2 bg-white border-2 rounded-3xl p-2">
              <div className="flex-center gap-2">
                {shop.map((item) => (
                  <div className="gap-1 flex-center">
                    <img src={item.icon} alt="icon" className="w-auto h-8" />
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
                <h1 className="bg-blueprimary rounded-3xl text-center py-1  text-sm">
                  {t("شراء")}
                </h1>
              </div>
            </div>
          </div>
        )}

        {isPopupVisible && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex-center z-50">
            <div className="bg-white rounded-xl p-4 w-2/3 text-center">
              <h1 className="text-black text-lg">
                {t("هل أنت متأكد من شراء")}
              </h1>
              <h2 className="text-black text-lg">
                {buyWaterCount} {t("ماء")} و {buyFertilizerCount} {t("سماد")}
              </h2>
              <h2 className="text-black text-lg">
                {t("بمبلغ إجمالي")}{" "}
                {buyFertilizerCount * fertilizerCost +
                  buyWaterCount * waterCost}
              </h2>
              <div className="flex justify-around mt-4">
                <button
                  className="bg-blueprimary text-white px-4 py-2 rounded-xl"
                  onClick={() => {
                    setIsPurchaseConfirmed(true);
                    setIsPopupVisible(false);
                  }}
                >
                  {t("نعم")}
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-xl"
                  onClick={() => setIsPopupVisible(false)}
                >
                  {t("لا")}
                </button>
              </div>
            </div>
          </div>
        )}
        {/* // Add another popup to show after confirmation */}
        {isPurchaseConfirmed && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex-center z-50">
            <div className="bg-white rounded-xl p-4 w-2/3 text-center">
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
      <div className="border-2 bg-blueprimary text-white rounded-xl">
        <h1 className="text-md text-black">{t("كبر الشجرة")}</h1>
      </div>
    </div>
  );
};

export default Shop;
