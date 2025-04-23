import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import GoBackButton from "../../../components/GoBackButton";
import sanabelLogo from "../../../assets/login/logo.png";
import { IoIosArrowDown } from "react-icons/io";

const HelpCenter: React.FC = () => {
  const { t } = useTranslation();

  // State to manage which question is open
  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(
    null
  );

  // Help Center content data
  const helpCenterQuestions = [
    {
      question: t("كيف أستعيد كلمة المرور الخاصة بي؟"),
      answer: t(
        "يمكنك استعادة كلمة المرور الخاصة بك عن طريق النقر على خيار 'نسيت كلمة المرور' في شاشة تسجيل الدخول، ثم اتباع التعليمات لإعادة تعيين كلمة المرور."
      ),
    },
    {
      question: t("كيف يمكنني إنشاء حساب جديد؟"),
      answer: t(
        "لإنشاء حساب جديد، افتح التطبيق وانقر على زر 'تسجيل'، ثم قم بإدخال البيانات المطلوبة مثل الاسم، البريد الإلكتروني، وكلمة المرور."
      ),
    },
    {
      question: t("ما هي الفئات العمرية التي يمكنها استخدام التطبيق؟"),
      answer: t(
        "التطبيق مصمم للأطفال من سن 6 إلى 12 عامًا، مع إمكانية الإشراف من أولياء الأمور والمعلمين."
      ),
    },
    {
      question: t("كيف يمكنني تحديث بياناتي الشخصية؟"),
      answer: t(
        "يمكنك تحديث بياناتك الشخصية عن طريق الذهاب إلى صفحة 'الإعدادات' داخل التطبيق، ثم تعديل المعلومات وحفظ التغييرات."
      ),
    },
    {
      question: t("كيف أبلغ عن مشكلة في التطبيق؟"),
      answer: t(
        "إذا واجهتك مشكلة، يمكنك الإبلاغ عنها من خلال قسم 'الدعم' داخل التطبيق، أو التواصل معنا عبر البريد الإلكتروني."
      ),
    },
    {
      question: t("كيف يمكنني التواصل مع فريق الدعم؟"),
      answer: t(
        "يمكنك التواصل مع فريق الدعم من خلال قسم 'الدعم' داخل التطبيق، أو إرسال استفساراتك عبر البريد الإلكتروني الخاص بالدعم."
      ),
    },
    {
      question: t("هل يمكنني حذف حسابي؟"),
      answer: t(
        "نعم، يمكنك طلب حذف حسابك من خلال إعدادات التطبيق، أو عن طريق التواصل مع فريق الدعم لتقديم طلب حذف الحساب."
      ),
    },
  ];

  const toggleQuestion = (index: number) => {
    setOpenQuestionIndex(openQuestionIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-2 w-full h-full p-4 text-black">
      {/* Header Section */}
      <div className="flex items-center justify-between w-full">
        <div className="w-12 h-12"></div>
        <h1 className="text-black font-bold text-2xl" dir="ltr">
          {t("مركز المساعدة")}
        </h1>
        <GoBackButton />
      </div>

      {/* Logo */}
      <img
        src={sanabelLogo}
        alt="Help Center Logo"
        className="mx-auto my-4 w-1/2"
      />
      <p className="text-[#666] text-sm text-end mb-4">
        {t(
          "نحن هنا لمساعدتك في الإجابة عن أي أسئلة أو مشكلات قد تواجهها أثناء استخدام تطبيقنا. يمكنك تصفح الموضوعات الشائعة أدناه، أو التواصل معنا مباشرةً للحصول على دعم شخصي."
        )}
      </p>

      {/* Help Center Sections */}
      <div
        className="flex flex-col w-full h-2/3 overflow-y-auto text-end"
        dir="rtl"
      >
        <div className="">
          {helpCenterQuestions.map((section, index) => (
            <section
              key={index}
              className="mb-4 border-gray-300  border-b-[1px]"
            >
              <h2
                className="text-lg font-bold mb-2 text-blueprimary flex w-full justify-between items-center cursor-pointer"
                onClick={() => toggleQuestion(index)}
              >
                {section.question}
                <IoIosArrowDown
                  className={`text-blueprimary transition-transform duration-200 ${
                    openQuestionIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                />
              </h2>
              {openQuestionIndex === index && (
                <p className="text-black mt-2 text-sm">{section.answer}</p>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
