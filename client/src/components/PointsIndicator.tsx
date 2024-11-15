import CoinImg from "../assets/profile/coin.png";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

interface PointsIndicatorProps {
  points: number;
  color: string;
}

function PointsIndicator({
  points,
  color = "text-[#333]",
}: PointsIndicatorProps) {
  const { t } = useTranslation();
  return (
    <div
      className={`flex-center ${color} rounded-3xl font-bold gap-3 p-1 px-1  w-32 h-10`}
    >
      <div className="p-1 bg-white rounded-full ">
        <img src={CoinImg} alt="" className="w-6 h-6 " />
      </div>

      <h1
        className=" text-sm text-end font-bold "
        dir={`${i18n.language === "ar" ? "rtl" : "ltr"}`}
      >
        <span>{`${points}`} </span>
        {t("حسنة")}
      </h1>
    </div>
  );
}
export default PointsIndicator;
