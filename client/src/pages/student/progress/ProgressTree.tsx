import StudentNavbar from "../../../components/navbar/StudentNavbar";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import trophy from "../../../assets/trophy.png";

// Inventory Assets

import waterImg from "../../../assets/resources/ماء.png";
import fertilizerImg from "../../../assets/resources/سماد.png";
import redImg from "../../../assets/resources/سنبلة حمراء.png";
import yellowImg from "../../../assets/resources/سنبلة صفراء.png";
import blueImg from "../../../assets/resources/سنبلة زرقاء.png";

import { treeStages } from "../../../data/Tree";

import SanabelTree from "../../../components/tree/SanabelTree";
import Inventory from "../../../components/tree/Inventory";
import Shop from "../../../components/tree/Shop";

const Progress: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-3 w-full h-3/4 overflow-y-auto ">
      <Inventory
        waterCount={10}
        fertilizerCount={10}
        blueCount={10}
        redCount={10}
        yellowCount={10}
      />
      <Shop />
      {/* Tree */}
      <SanabelTree treeStage={40} />
    </div>
  );
};

export default Progress;
