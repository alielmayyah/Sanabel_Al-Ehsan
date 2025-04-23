import StudentNavbar from "../../../components/navbar/StudentNavbar";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import trophy from "../../../assets/trophy.png";
import { useUserContext } from "../../../context/StudentUserProvider";
// Inventory Assets

import SanabelTree from "../../../components/tree/SanabelTree";
import Inventory from "../../../components/tree/Inventory";
import Shop from "../../../components/tree/Shop";

const Progress: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useUserContext();

  return (
    <div className="flex flex-col gap-0 w-full h-3/4 overflow-y-scroll ">
      <Inventory
        waterCount={Number(user?.water)}
        fertilizerCount={Number(user?.fertilizer)}
        blueCount={Number(user?.snabelBlue)}
        redCount={Number(user?.snabelRed)}
        yellowCount={Number(user?.snabelYellow)}
      />

      <Shop />
      {/* Tree */}
      <SanabelTree treeStage={0} />
    </div>
  );
};

export default Progress;
