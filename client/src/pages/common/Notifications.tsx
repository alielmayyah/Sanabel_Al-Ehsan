import { useHistory } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { useState, useEffect } from "react";
import i18n from "../../i18n";

import nonotification from "../../assets/nonotification.png";
// overview icons

import GoBackButton from "../../components/GoBackButton";

const Profile: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();

  const notificationsData = [
    { title: "قائمة المتصدرين", content: "s" },
    { title: "تحديات", content: "s" },
    { title: "مجموع الحسنات", content: "s" },
    { title: "مستوي الشارة", content: "s" },
  ];

  return (
    <div
      className="flex flex-col h-full w-full items-center justify-between  p-4"
      id="page-height"
    >
      <div className="flex items-center w-full justify-between">
        <div className="opacity-0 w-[25px] " />
        <h1 className="text-black font-bold text-2xl self-center" dir="ltr">
          {t("الأشعارات")}
        </h1>
        <GoBackButton />
      </div>

      <div className="flex-center flex-col w-full gap-3 self-center">
        <img src={nonotification} alt="notifcation-bell" className="w-4/5" />
        <h1 className="text-black text-2xl -mt-6">{t("لا يوجد إشعارات!")}</h1>
        <h1 className="text-[#999] text-xl">
          {t("لم تتلقي اي إشعار حتي الأن")}
        </h1>
      </div>

      <div className="h-24" />

      <div className="flex w-full justify-between items-center ">
        <h1 className="text-[#999] w-max">منذ دقيقة</h1>
        <h1 className="text-black text-md text-end w-3/5">
          محمد منجي يدعوك للانضمام لمتابعة واحرز تقدمك في الحسنات{" "}
        </h1>
        <div className="w-12 h-12 bg-blueprimary rounded-full"></div>
      </div>
    </div>
  );
};

export default Profile;
