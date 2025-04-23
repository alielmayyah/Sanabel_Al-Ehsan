import StudentNavbar from "../navbar/StudentNavbar";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useUserContext } from "../../context/StudentUserProvider";

// Inventory Assets

import waterImg from "../../assets/resources/ماء.png";
import fertilizerImg from "../../assets/resources/سماد.png";

// Tree
import { treeStages } from "../../data/Tree";

// treestage;
// water;
// fertilzer;
// waterNeeded;
// fertilzerNeeded;

interface SanabelTreeProps {
  treeStage: number; // Prop for the tree stage
}

const SanabelTree: React.FC<SanabelTreeProps> = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const { user } = useUserContext();

  const currentWater = Number(user?.water);
  const currentFertilizer = Number(user?.fertilizer);

  const waterNeeded = Number(user?.waterNeeded);
  const fertilizerNeeded = Number(user?.fertilizerNeeded);

  //  المرحلة
  const treeStage = Number(user?.treeStage);

  const treeProgress = Number(user?.treeProgress);

  return (
    <div className="flex flex-col h-full w-full items-center justify-between  ">
      {/* Tree */}

      <div className="w-full flex flex-col gap-1 ">
        <h1 className="text-black text-end text-lg">
          {t("شجرة سنابل الحسنات")}
        </h1>
        <div className="flex w-full h-full  justify-between">
          {/* Water Indicator */}
          <div className="flex items-center flex-col w-max gap-1">
            <img src={waterImg} alt="Water Icon" className="w-8" />
            <h1 className="text-black text-sm">
              {currentWater} / {waterNeeded}{" "}
            </h1>
            <div className="relative w-full h-full rounded-2xl bg-[#D1E2EA] overflow-hidden">
              <div
                className="absolute bottom-0 w-full rounded-2xl bg-gradient-to-t from-[#4AAAD6] to-[#8ED6F8] transition-all duration-300"
                style={{
                  height: `${(currentWater / waterNeeded) * 100}%`,
                }}
              ></div>
            </div>
          </div>
          {/* Tree */}
          <div className="flex-center flex-col w-7/12  h-auto">
            <img
              src={treeStages[treeProgress + 3]}
              className="h-full w-full"
              alt=""
            />
          </div>

          {/* Fertilizer */}
          <div className="flex items-center flex-col w-max gap-1">
            <img src={fertilizerImg} alt="fertilizerImg" className="w-8" />
            <h1 className="text-black text-sm">
              {" "}
              {currentFertilizer} / {fertilizerNeeded}{" "}
            </h1>
            <div className="relative w-full h-full rounded-2xl bg-[#D1E2EA] overflow-hidden">
              <div
                className="absolute bottom-0 w-full rounded-2xl bg-gradient-to-t from-[#7F4333] to-[#b46a56] flex-center transition-all duration-300"
                style={{
                  height: `${(currentFertilizer / fertilizerNeeded) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SanabelTree;
