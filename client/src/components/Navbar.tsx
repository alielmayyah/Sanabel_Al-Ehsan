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

import HomeIcon from "../icons/HomeIcon";
import ChallengesIcon from "../icons/ChallengesIcon";
import LeaderboardsIcon from "../icons/LeaderboardsIcon";
import ProgressIcon from "../icons/ProgressIcon";
import ProfileIcon from "../icons/ProfileIcon";

import { useTranslation } from "react-i18next";
import i18n from "i18next";

import { useLocation } from "react-router-dom";

const navList = [
  { title: "الرئيسية", icon: <HomeIcon size={30} />, to: "/home" },
  {
    title: "التحديات",
    icon: <ChallengesIcon size={30} />,
    to: "/challenges",
  },
  {
    title: "المتصدرين",
    icon: <LeaderboardsIcon size={30} />,
    to: "/leaderboards",
  },
  {
    title: "التقدم",
    icon: <ProgressIcon size={30} />,
    to: "/progress",
  },
  {
    title: "البروفايل",
    icon: <ProfileIcon size={30} />,
    to: "/profile",
  },
];

function Navbar() {
  const { t } = useTranslation();
  const currentLanguage = i18n.language;
  const location = useLocation();

  return (
    <div
      className={`flex h-20 bg-white dark:bg-[#121212] absolute bottom-0 ${
        currentLanguage === "ar" ? "flex-row-reverse" : "flex-row"
      } justify-around w-full p-3`}
    >
      {navList.map((item, key) => (
        <IonRouterLink routerLink={item.to}>
          <div className="flex flex-col gap-1 items-center ">
            <div
              className={` flex items-center justify-end ${
                location.pathname === item.to
                  ? "text-blueprimary"
                  : "text-[#666] dark:text-[#cccccc]"
              }`}
            >
              {item.icon}
            </div>

            <h1
              className={`text-md  ${
                location.pathname === item.to
                  ? "text-blueprimary"
                  : "text-[#666] dark:text-[#cccccc]"
              }`}
            >
              {t(item.title)}
            </h1>
          </div>
        </IonRouterLink>
      ))}
    </div>
  );
}
export default Navbar;