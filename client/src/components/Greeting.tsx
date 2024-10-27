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

import NotificationIcon from "../icons/NotificationIcon";

import { useTranslation } from "react-i18next";

function Greeting() {
  const { t } = useTranslation();
  return (
    <div className="flex-center p-2 gap-3">
      <div className="flex flex-col text-end">
        <h1 className="text-[#040415]"> {t("مرحباً")} علي</h1>
        <h1 className="text-[#B3B3B3]">{t("!هيا بنا نصنع الخير معًا")}</h1>
      </div>
      <div className="w-12 h-12 bg-red-300 rounded-full"></div>
    </div>
  );
}
export default Greeting;
