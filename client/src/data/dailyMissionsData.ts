// Import Daily Missions images
import mission1 from "../assets/missions/Daily Missions/الإحسان داخل الأسرة.png"
import mission2 from "../assets/missions/Daily Missions/الادخار للخير.png";
import mission3 from "../assets/missions/Daily Missions/تشجيع الآخرين.png";
import mission4 from "../assets/missions/Daily Missions/تقدير العمال.png";
import mission5 from "../assets/missions/Daily Missions/التحدث بلطف.png";
import mission6 from "../assets/missions/Daily Missions/تقديم المساعدة الدراسية.png";
import mission7 from "../assets/missions/Daily Missions/التواصل مع الجيران.png";
import mission8 from "../assets/missions/Daily Missions/توفير الماء والطعام للحيوانات.png";
import mission9 from "../assets/missions/Daily Missions/العناية بالبيئة.png";
import mission10 from "../assets/missions/Daily Missions/صنع بطاقات شكر.png";
import mission11 from "../assets/missions/Daily Missions/الكتابة الإيجابية.png";
import mission12 from "../assets/missions/Daily Missions/ممارسة اللطف.png";

interface MissionItem {
  title: string;
  description: string;
  img: string;
  points: number;
}

const dailyMissionsData: MissionItem[] = [
  { title: "الإحسان داخل الأسرة", description: "تقوية الروابط العائلية من خلال الإحسان داخل الأسرة", img: mission1, points: 100 },
  { title: "الادخار للخير", description: "ادخر بعض الأموال للأعمال الخيرية", img: mission2, points: 150 },
  { title: "تشجيع الآخرين", description: "كلمات التشجيع تزيد الثقة بالنفس", img: mission3, points: 120 },
  { title: "تقدير العمال", description: "قدّر جهود العمال وتقديم الشكر لهم", img: mission4, points: 130 },
  { title: "التحدث بلطف", description: "تحدث بلطف وتجنب الكلمات الجارحة", img: mission5, points: 110 },
  { title: "تقديم المساعدة الدراسية", description: "ساعد زملائك في الدراسة", img: mission6, points: 140 },
  { title: "التواصل مع الجيران", description: "احرص على التواصل مع جيرانك", img: mission7, points: 115 },
  { title: "توفير الماء والطعام للحيوانات", description: "قدّم الماء والطعام للحيوانات المحتاجة", img: mission8, points: 125 },
  { title: "العناية بالبيئة", description: "حافظ على نظافة البيئة", img: mission9, points: 150 },
  { title: "صنع بطاقات شكر", description: "قدّم بطاقات شكر لأحبائك", img: mission10, points: 135 },
  { title: "الكتابة الإيجابية", description: "انشر الإيجابية عبر الكتابة", img: mission11, points: 140 },
  { title: "ممارسة اللطف", description: "اجعل اللطف جزءًا من حياتك", img: mission12, points: 110 },
];

export default dailyMissionsData;
