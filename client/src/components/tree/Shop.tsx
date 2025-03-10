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
  return (
    <div className="flex flex-col gap-3 w-full h-3/4  ">
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-black text-end text-lg">{t("المتجر")}</h1>
      </div>

      <div className="bg-[#FFF8E5] w-full flex justify-between ">
        <div className="flex w-full justify-between">
          <div className="flex gap-2">
            {shop.map((item) => (
              <div className="flex-col flex-center">
                <img src={item.icon} alt="icon" className="w-auto h-6" />
                <h1 className="text-black text-sm">x2</h1>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-center gap-1">
          <div className="flex-center gap-1 p-1 rounded-3xl bg-white">
            {" "}
            <h1 className="text-black"> 0</h1>
            <div className="w-6 h-6 flex-center bg-blueprimary rounded-full">
              <h1 className="text-white"> +</h1>
            </div>
            <div className="w-6 h-6 flex-center bg-blueprimary rounded-full">
              <h1 className="text-white"> -</h1>
            </div>
          </div>
          <img src={waterImg} alt="" className="w-6" />
        </div>
        counnt - ( decrease ) blue (count ) cost yellow (count ) cost red (count
        )
      </div>
    </div>
  );
};

export default Shop;
