import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import GoBackButton from "../../components/GoBackButton";
import nonotification from "../../assets/nonotification.png";
import defaultAvatar from "../../assets/avatars/Boys/boy1.png";

const Profile: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();

  // Updated notification data with more realistic content
  const notificationsData = [
    {
      id: 1,
      userPhoto: defaultAvatar,
      username: "محمد منجي",
      content: "يدعوك للانضمام لمتابعة واحرز تقدمك في الحسنات",
      timeAgo: "منذ دقيقة",
      read: false,
    },
    {
      id: 2,
      userPhoto: defaultAvatar,
      username: "أحمد محمود",
      content: "قام بمشاركة إنجاز جديد معك",
      timeAgo: "منذ ٢٠ دقيقة",
      read: true,
    },
    {
      id: 3,
      userPhoto: defaultAvatar,
      username: "لجنة المسابقات",
      content: "تم إضافة تحدي جديد! شارك الآن للفوز بجوائز قيمة",
      timeAgo: "منذ ساعتين",
      read: false,
    },
  ];

  return (
    <div
      className="flex flex-col h-full w-full items-center justify-between p-4"
      id="page-height"
    >
      <div className="flex items-center w-full justify-between">
        <div className="opacity-0 w-[25px] " />
        <h1 className="text-black font-bold text-2xl self-center" dir="ltr">
          {t("الإشعارات")}
        </h1>
        <GoBackButton />
      </div>

      {notificationsData.length === 0 ? (
        // No notifications view
        <div className="flex-center flex-col w-full gap-3 self-center">
          <img src={nonotification} alt="notification-bell" className="w-4/5" />
          <h1 className="text-black text-2xl -mt-6">{t("لا يوجد إشعارات")}</h1>
          <h1 className="text-[#999] text-xl">
            {t("لم تتلقَ أي إشعار حتى الآن")}
          </h1>
        </div>
      ) : (
        // Enhanced notifications list view
        <div className="flex flex-col w-full gap-4 mt-4">
          {notificationsData.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border rounded-lg shadow-sm ${
                notification.read
                  ? "bg-white"
                  : "bg-green-50 border-l-4 border-l-green-500"
              } flex items-start`}
              onClick={() => history.push(`/notification/${notification.id}`)}
            >
              <div className="flex-shrink-0 relative">
                <img
                  src={notification.userPhoto}
                  alt={notification.username}
                  className="w-12 h-12 rounded-full object-cover border-2 border-green-100"
                />
                {!notification.read && (
                  <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full"></span>
                )}
              </div>

              <div className="ml-4 mr-3 flex-grow" dir="rtl">
                <div className="flex justify-between items-start w-full">
                  <div>
                    <span className="font-bold text-black">
                      {notification.username}
                    </span>
                    <p className="text-gray-700 mt-1">{notification.content}</p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {notification.timeAgo}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="h-1/8" />
    </div>
  );
};

export default Profile;
