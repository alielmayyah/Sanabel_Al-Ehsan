import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useUserContext } from "../../context/UserProvider";

// Inventory Assets

import waterImg from "../../assets/resources/ماء.png";
import fertilizerImg from "../../assets/resources/سماد.png";
import redImg from "../../assets/resources/سنبلة حمراء.png";
import yellowImg from "../../assets/resources/سنبلة صفراء.png";
import blueImg from "../../assets/resources/سنبلة زرقاء.png";

interface Props {
  waterCount: number;
  fertilizerCount: number;
  blueCount: number;
  redCount: number;
  yellowCount: number;
}
const Inventory: React.FC<Props> = ({
  waterCount,
  fertilizerCount,
  blueCount,
  redCount,
  yellowCount,
}) => {
  const { t } = useTranslation();

  const inventory = [
    { name: "سنبلة", img: blueImg, count: blueCount },
    { name: "سنبلة", img: yellowImg, count: yellowCount },
    { name: "سنبلة", img: redImg, count: redCount },
    { name: "سماد", img: fertilizerImg, count: fertilizerCount },
    { name: "ماء", img: waterImg, count: waterCount },
  ];

  return (
    <div
      className="flex flex-col h-full w-full items-center justify-between  gap-3 "
      id="page-height"
    >
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-black text-end text-lg">
          {t("الموارد الخاص بيك")}
        </h1>
        <div className="flex w-full justify-between ">
          {inventory.map((items) => (
            <div className="w-1/6 h-[80px] flex flex-col items-center rounded-lg bg-[#FFF8E5] p-1 text-sm">
              <h1 className="text-black">{items.name}</h1>
              <img className="h-2/5" src={items.img}></img>
              <h1 className="text-[#E14E54] font-bold self-start">
                x{items.count}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
