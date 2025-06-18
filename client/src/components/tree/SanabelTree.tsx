import StudentNavbar from "../navbar/StudentNavbar";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useUserContext } from "../../context/StudentUserProvider";

// Inventory Assets

import waterImg from "../../assets/resources/ماء.png";
import fertilizerImg from "../../assets/resources/سماد.png";

// Tree
import { treeStages } from "../../data/Tree";

const SanabelTree = () => {
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

  // Check if tree is at final stage
  const isFinalStage = treeProgress >= 51;

  return (
    <div className="flex flex-col h-full w-full items-center justify-between shadow-md p-2 border-[1px] border-[#33333325] rounded-xl ">
      {/* Tree */}

      <div className="flex flex-col w-full gap-1 ">
        <h1 className="text-lg text-black text-end">
          {t("شجرة سنابل الإحسان")}
        </h1>

        <div
          className={`flex w-full h-full ${
            isFinalStage ? "justify-center" : "justify-between"
          } `}
        >
          {/* Water Indicator */}
          {!isFinalStage && (
            <div className="flex flex-col items-center gap-1 w-max">
              <img src={waterImg} alt="Water Icon" className="w-8" />
              <h1 className="text-sm text-black" dir="ltr">
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
          )}
          {/* Tree */}
          <div className="flex-col w-7/12 h-auto flex-center">
            <img
              src={treeStages[treeProgress + 2]}
              className="w-full h-full"
              alt=""
            />
          </div>

          {/* Fertilizer */}
          {!isFinalStage && (
            <div className="flex flex-col items-center gap-1 w-max">
              <img src={fertilizerImg} alt="fertilizerImg" className="w-8" />
              <h1 className="text-sm text-black" dir="ltr">
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
          )}
        </div>
      </div>
    </div>
  );
};

export default SanabelTree;
