import React from "react";
import {
  IonTabs,
  IonTab,
  IonToolbar,
  IonTabBar,
  IonTabButton,
  IonHeader,
  IonTitle,
  IonContent,
  IonIcon,
  IonRouterLink,
} from "@ionic/react";

import PointsIcon from "../icons/PointsIcon";

import { useTranslation } from "react-i18next";

function PointsIndicator() {
  const { t } = useTranslation();
  return (
    <div className="flex-center bg-yellowprimary rounded-xl font-bold gap-1 px-1 text-sm">
      <h1 className="text-[#333] text-xs"> ٢٠٠ نقطة </h1>
      <PointsIcon size={15} />
    </div>
  );
}
export default PointsIndicator;
