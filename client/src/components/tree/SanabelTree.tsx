import StudentNavbar from "../navbar/StudentNavbar";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useUserContext } from "../../context/StudentUserProvider";

// Inventory Assets

import waterImg from "../../assets/resources/ماء.png";
import fertilizerImg from "../../assets/resources/سماد.png";

// Tree
import { treeStages } from "../../data/Tree";

const waterCost = 20;
const fertilzerCost = 30;

// treestage;
// water;
// fertilzer;
// waterNeeded;
// fertilzerNeeded;

const treeGrowth = [
  { frame: 1, water: 0, fertilizer: 0 },
  { frame: 2, water: 1, fertilizer: 1 },
  { frame: 3, water: 1, fertilizer: 1 },
  { frame: 4, water: 1, fertilizer: 1 },
  { frame: 5, water: 1, fertilizer: 1 },
  { frame: 6, water: 5, fertilizer: 5 },
  { frame: 7, water: 2, fertilizer: 2 },
  { frame: 8, water: 2, fertilizer: 2 },
  { frame: 9, water: 2, fertilizer: 2 },
  { frame: 10, water: 2, fertilizer: 2 },
  { frame: 11, water: 2, fertilizer: 2 },
  { frame: 12, water: 3, fertilizer: 2 },
  { frame: 13, water: 3, fertilizer: 2 },
  { frame: 14, water: 3, fertilizer: 2 },
  { frame: 15, water: 3, fertilizer: 2 },
  { frame: 16, water: 10, fertilizer: 10 },
  { frame: 17, water: 4, fertilizer: 3 },
  { frame: 18, water: 4, fertilizer: 3 },
  { frame: 19, water: 4, fertilizer: 3 },
  { frame: 20, water: 4, fertilizer: 3 },
  { frame: 21, water: 4, fertilizer: 3 },
  { frame: 22, water: 4, fertilizer: 3 },
  { frame: 23, water: 4, fertilizer: 3 },
  { frame: 24, water: 4, fertilizer: 3 },
  { frame: 25, water: 5, fertilizer: 3 },
  { frame: 26, water: 5, fertilizer: 3 },
  { frame: 27, water: 5, fertilizer: 3 },
  { frame: 28, water: 5, fertilizer: 3 },
  { frame: 29, water: 5, fertilizer: 3 },
  { frame: 30, water: 5, fertilizer: 3 },
  { frame: 31, water: 15, fertilizer: 15 },
  { frame: 32, water: 6, fertilizer: 4 },
  { frame: 33, water: 6, fertilizer: 4 },
  { frame: 34, water: 6, fertilizer: 4 },
  { frame: 35, water: 6, fertilizer: 4 },
  { frame: 36, water: 6, fertilizer: 4 },
  { frame: 37, water: 6, fertilizer: 4 },
  { frame: 38, water: 7, fertilizer: 4 },
  { frame: 39, water: 7, fertilizer: 4 },
  { frame: 40, water: 7, fertilizer: 4 },
  { frame: 41, water: 7, fertilizer: 4 },
  { frame: 42, water: 7, fertilizer: 4 },
  { frame: 43, water: 7, fertilizer: 4 },
  { frame: 44, water: 7, fertilizer: 4 },
  { frame: 45, water: 7, fertilizer: 4 },
  { frame: 46, water: 7, fertilizer: 4 },
  { frame: 47, water: 7, fertilizer: 4 },
  { frame: 48, water: 7, fertilizer: 4 },
  { frame: 49, water: 7, fertilizer: 4 },
  { frame: 50, water: 7, fertilizer: 4 },
  { frame: 51, water: 20, fertilizer: 20 },
];

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
            <div className="w-full flex justify-center items-end h-full rounded-2xl bg-[#D1E2EA] text-black relative">
              <div
                className="w-full rounded-2xl bg-gradient-to-t from-[#7F4333] to-[#b46a56] flex-center"
                style={{
                  height: `${(currentFertilizer / fertilizerNeeded) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <StudentNavbar />
    </div>
  );
};

export default SanabelTree;
