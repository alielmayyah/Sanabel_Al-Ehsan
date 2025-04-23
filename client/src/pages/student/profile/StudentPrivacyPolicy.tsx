import React from "react";
import { useTranslation } from "react-i18next";
import GoBackButton from "../../../components/GoBackButton";
import sanabelLogo from "../../../assets/login/logo.png";

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  // Privacy Policy content data
  const privacyPolicyContent = [
    {
      title: t("مقدمة"),
      content: [
        "نرحب بكم في تطبيقنا. تشرح هذه السياسة كيفية تعاملنا مع البيانات التي يتم جمعها من المستخدمين.",
      ],
    },
    {
      title: t("المعلومات التي نجمعها"),
      content: [
        "المعلومات الشخصية مثل الاسم، العمر، والبريد الإلكتروني.",
        "بيانات الحساب مثل اسم المستخدم، كلمة المرور، ونوع الحساب (ولي أمر، معلم، طالب).",
        "معلومات النشاط داخل التطبيق مثل المهام المكتملة.",
        "بيانات تقنية مثل نوع الجهاز، نظام التشغيل، وعنوان IP لتحسين أداء التطبيق.",
      ],
    },
    {
      title: t("كيفية استخدام المعلومات"),
      content: [
        "تحسين تجربة المستخدم داخل التطبيق.",
        "تخصيص المهام والتحديات بما يناسب عمر المستخدم واحتياجاته.",
        "توفير إحصائيات وتقارير لأولياء الأمور والمعلمين.",
        "تحليل البيانات لتحسين الأداء والوظائف.",
      ],
    },
    {
      title: t("مشاركة المعلومات"),
      content: [
        "لا نقوم بمشاركة بياناتك الشخصية مع أطراف ثالثة إلا في الحالات التالية:",
        "بموافقتك الصريحة على مشاركة بياناتك مع جهات معينة (مثل الجوائز أو الشركاء).",
        "عند الحاجة للامتثال للقوانين واللوائح.",
        "لتحقيق الأمان ومنع الاحتيال أو الأنشطة غير القانونية.",
      ],
    },
    {
      title: t("حماية البيانات"),
      content: [
        "نتخذ كافة التدابير اللازمة لحماية بياناتك الشخصية من الوصول غير المصرح به أو التعديل أو الكشف أو الإتلاف. تشمل هذه التدابير تقنيات التشفير وإجراءات الأمان المادية والإلكترونية.",
      ],
    },
    {
      title: t("حقوق المستخدم"),
      content: [
        "الوصول إلى البيانات الشخصية وتحديثها.",
        "طلب حذف الحساب والبيانات المرتبطة به.",
        "تقديم استفسارات أو شكاوى بخصوص خصوصيتك عبر قنوات الدعم الخاصة بالتطبيق.",
      ],
    },
    {
      title: t("تحديثات سياسة الخصوصية"),
      content: [
        "قد نقوم بتحديث هذه السياسة من وقت لآخر لتلبية المتطلبات القانونية أو تحسين خدماتنا. سيتم إشعار المستخدمين بأي تغييرات رئيسية.",
      ],
    },
    {
      title: t("التواصل"),
      content: [
        "إذا كانت لديك أي أسئلة أو مخاوف بشأن سياسة الخصوصية هذه، يُرجى التواصل معنا عبر البريد الإلكتروني أو من خلال الدعم داخل التطبيق.",
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-2 w-full h-full p-4 text-black">
      {/* Header Section */}
      <div className="flex items-center justify-between w-full">
        <div className="w-12 h-12"></div>
        <h1 className="text-black font-bold text-2xl" dir="ltr">
          {t("سياسة الخصوصية")}
        </h1>
        <GoBackButton />
      </div>

      {/* Logo */}
      <img src={sanabelLogo} alt="Logo" className="mx-auto my-4 w-1/2" />

      {/* Privacy Policy Sections */}
      <div
        className="flex flex-col w-full h-2/3 overflow-y-auto text-end"
        dir="rtl"
      >
        {privacyPolicyContent.map((section, index) => (
          <section key={index} className="mb-4">
            <h2 className="text-lg font-bold mb-2 text-blueprimary">
              {section.title}
            </h2>
            {Array.isArray(section.content) ? (
              <ul className="list-disc list-inside p-2 ">
                {section.content.map((item, i) => (
                  <li key={i} className="text-sm py-2">
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm">{section.content}</p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
