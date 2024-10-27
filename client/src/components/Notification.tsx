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

function Notification() {
  const { t } = useTranslation();
  return (
    <div className="flex-center p-2 border-2 border-[#EAECF0] rounded-xl relative">
      <NotificationIcon />
      <div className="w-2 h-2 rounded-full bg-red-500 absolute right-1 top-1"></div>
    </div>
  );
}
export default Notification;
