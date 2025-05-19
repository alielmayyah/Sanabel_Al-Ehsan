import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import GoBackButton from "../../../components/GoBackButton";
import TeacherNavbar from "../../../components/navbar/TeacherNavbar";
import GetAvatar from "../../student/tutorial/GetAvatar";
import MedalAndLevel from "../../../components/MedalAndLevel";
import { calculateLevel } from "../../../utils/LevelCalculator";
import axios from "axios";

// Define types for better type safety
interface User {
  firstName: string;
  lastName: string;
  email?: string;
  profileImg: any;
  gender?: string;
  dateOfBirth?: string;
}

interface StudentData {
  id: number;
  userId: number;
  level: number;
  xp: number;
  medal: number;
  connectCode: string;
  snabelRed: number;
  snabelYellow: number;
  snabelBlue: number;
  treeProgress: number;
  createdAt: string;
  updatedAt: string;
  class: any;
  organization: any;
  user: User;
}

interface StudentResponse {
  student: StudentData;
  totalCompletedTasks: number;
  categoryCounts: {
    [key: string]: number;
  };
}

const StudentDetails: React.FC = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const history = useHistory();
  const { t } = useTranslation();
  const [studentData, setStudentData] = useState<StudentResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch student detailed data on component mount
  useEffect(() => {
    fetchStudentData();
  }, [studentId]);

  const fetchStudentData = async (token?: string) => {
    const authToken = token || localStorage.getItem("token");
    if (!authToken) return;

    try {
      const response = await axios.get(
        `http://localhost:3000/teachers/appear-student-detailed/1`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        setStudentData(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching student details:", error);
      setError("Failed to load student details");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  // Calculate last active date from updatedAt
  const getLastActiveDate = (updatedAt: string) => {
    try {
      return new Date(updatedAt).toLocaleDateString("ar-EG");
    } catch (error) {
      return t("غير متوفر");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-black text-lg font-bold">{t("جاري التحميل...")}</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-red-500 text-lg font-bold">{t(error)}</h1>
        <button
          className="mt-4 bg-blueprimary text-white px-4 py-2 rounded-xl"
          onClick={() => history.goBack()}
        >
          {t("العودة")}
        </button>
      </div>
    );
  }

  if (!studentData || !studentData.student) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-black text-lg font-bold">
          {t("لا توجد بيانات للطالب")}
        </h1>
        <button
          className="mt-4 bg-blueprimary text-white px-4 py-2 rounded-xl"
          onClick={() => history.goBack()}
        >
          {t("العودة")}
        </button>
      </div>
    );
  }

  const { student, totalCompletedTasks, categoryCounts } = studentData;
  const studentLevel = calculateLevel(student.xp);

  return (
    <div
      className="flex flex-col items-center justify-between gap-5 p-4"
      id="page-height"
    >
      {/* Header */}
      <div className="flex items-center w-full justify-between mb-4">
        <div className="w-16 h-16"></div>
        <div className="flex items-center justify-center flex-col gap-2">
          <h1 className="text-black font-bold text-2xl text-end">
            {t("تفاصيل الطالب")}
          </h1>
        </div>
        <GoBackButton />
      </div>

      {/* Student Profile Card */}
      <div className="flex flex-col items-center w-full bg-white shadow-md rounded-xl p-6 mb-4">
        <div className="w-24 h-24 rounded-full mb-4">
          <GetAvatar userAvatarData={student.user.profileImg} />
        </div>

        <h1 className="text-black text-2xl font-bold mb-1">
          {`${student.user.firstName} ${student.user.lastName}`}
        </h1>

        <div className="flex items-center gap-2 mb-3">
          <MedalAndLevel
            level={studentLevel.level}
            color="text-black text-lg"
            dir=""
            size={"w-16"}
          />
        </div>

        <div className="flex flex-col items-center gap-1 mb-4">
          <h2 className="text-gray-500">
            {student.class ? student.class.name : t("لا يوجد فصل")}
          </h2>
          <h2 className="text-gray-500">
            {student.organization
              ? student.organization.name
              : t("لا توجد مؤسسة")}
          </h2>
          <h2 className="text-gray-500">
            {t("كود الاتصال: ")} {student.connectCode}
          </h2>
        </div>

        {student.user.email && (
          <div className="flex items-center gap-2 mb-2">
            <span className="text-gray-700">{student.user.email}</span>
            <span className="text-gray-500">{t("البريد الإلكتروني:")}</span>
          </div>
        )}

        {student.user.dateOfBirth && (
          <div className="flex items-center gap-2">
            <span className="text-gray-700">
              {new Date(student.user.dateOfBirth).toLocaleDateString("ar-EG")}
            </span>
            <span className="text-gray-500">{t("تاريخ الميلاد:")}</span>
          </div>
        )}
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-2 gap-4 w-full mb-4">
        <div className="bg-white shadow-md rounded-xl p-4">
          <h3 className="text-black text-lg font-bold text-end mb-2">
            {t("التقدم الدراسي")}
          </h3>
          <div className="flex justify-between items-center mb-2">
            <span className="text-black">{totalCompletedTasks || 0}</span>
            <span className="text-gray-500">{t("المهام المكتملة")}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-black">{student.treeProgress || 0}</span>
            <span className="text-gray-500">{t("تقدم الشجرة")}</span>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-xl p-4">
          <h3 className="text-black text-lg font-bold text-end mb-2">
            {t("النقاط والمستوى")}
          </h3>
          <div className="flex justify-between items-center mb-2">
            <span className="text-blueprimary font-bold">
              {student.xp || 0}
            </span>
            <span className="text-gray-500">{t("النقاط")}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-blueprimary font-bold">{student.level}</span>
            <span className="text-gray-500">{t("المستوى")}</span>
          </div>
        </div>
      </div>

      {/* Snabel Stats */}
      <div className="w-full bg-white shadow-md rounded-xl p-4 mb-4">
        <h3 className="text-black text-lg font-bold text-end mb-3">
          {t("توزيع السنابل")}
        </h3>
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center p-2 bg-red-50 rounded-lg">
            <span className="text-red-500 font-bold text-lg">
              {student.snabelRed}
            </span>
            <span className="text-gray-500 text-sm">
              {t("السنابل الحمراء")}
            </span>
          </div>
          <div className="flex flex-col items-center p-2 bg-yellow-50 rounded-lg">
            <span className="text-yellow-500 font-bold text-lg">
              {student.snabelYellow}
            </span>
            <span className="text-gray-500 text-sm">
              {t("السنابل الصفراء")}
            </span>
          </div>
          <div className="flex flex-col items-center p-2 bg-blue-50 rounded-lg">
            <span className="text-blue-500 font-bold text-lg">
              {student.snabelBlue}
            </span>
            <span className="text-gray-500 text-sm">
              {t("السنابل الزرقاء")}
            </span>
          </div>
        </div>
      </div>

      {/* Category Counts */}
      <div className="w-full bg-white shadow-md rounded-xl p-4 mb-4">
        <h3 className="text-black text-lg font-bold text-end mb-3">
          {t("فئات المهام المكتملة")}
        </h3>
        {Object.entries(categoryCounts).map(([category, count], index) => (
          <div key={index} className="flex justify-between items-center mb-2">
            <span className="text-black">{count}</span>
            <span className="text-gray-500 text-right">{t(category)}</span>
          </div>
        ))}
      </div>

      {/* Activity */}
      <div className="w-full bg-white shadow-md rounded-xl p-4 mb-4">
        <h3 className="text-black text-lg font-bold text-end mb-2">
          {t("النشاط")}
        </h3>
        <div className="flex justify-between items-center">
          <span className="text-black">
            {getLastActiveDate(student.updatedAt)}
          </span>
          <span className="text-gray-500">{t("آخر نشاط")}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 w-full">
        <button className="bg-blueprimary text-white rounded-xl py-3 flex-1">
          {t("إرسال رسالة")}
        </button>
        <button className="bg-gray-200 text-black rounded-xl py-3 flex-1">
          {t("تحرير الملف الشخصي")}
        </button>
      </div>

      {/* Navigation */}
      <TeacherNavbar />
    </div>
  );
};

export default StudentDetails;
