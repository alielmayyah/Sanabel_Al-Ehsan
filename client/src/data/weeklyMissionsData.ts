// Import Weekly Missions images
import mission1 from "../assets/missions/Weekly Missions/إعادة تدوير للأغراض.png";
import mission2 from "../assets/missions/Weekly Missions/زيارة المستشفيات.png";
import mission3 from "../assets/missions/Weekly Missions/إنشاء حديقة مجتمعية.png";
import mission4 from "../assets/missions/Weekly Missions/زيارة دور الرعاية.png";
import mission5 from "../assets/missions/Weekly Missions/اطعام الطعام.png";
import mission6 from "../assets/missions/Weekly Missions/مبادرة بيئية.png";
import mission7 from "../assets/missions/Weekly Missions/تعزيز الصحة.png";
import mission8 from "../assets/missions/Weekly Missions/مبادرة تجميل المجتمع.png";
import mission9 from "../assets/missions/Weekly Missions/جمع التبرعات.png";
import mission10 from "../assets/missions/Weekly Missions/مساعدة في دور العبادة.png";
import mission11 from "../assets/missions/Weekly Missions/حملة لتوفير المياه.png";
import mission12 from "../assets/missions/Weekly Missions/مساعدة كبار السن.png";

interface MissionItem {
    title: string;
    description: string;
    img: string;
    points: number;
  }
  
const weeklyMissionsData: MissionItem[] = [
  { title: "إعادة تدوير للأغراض", description: "إعادة تدوير الأغراض لإعادة استخدامها", img: mission1, points: 300 },
  { title: "زيارة المستشفيات", description: "زيارة المرضى في المستشفيات لدعمهم", img: mission2, points: 320 },
  { title: "إنشاء حديقة مجتمعية", description: "إنشاء حدائق لدعم المجتمع", img: mission3, points: 350 },
  { title: "زيارة دور الرعاية", description: "زيارة كبار السن في دور الرعاية", img: mission4, points: 340 },
  { title: "اطعام الطعام", description: "تقديم الطعام لمن يحتاجه", img: mission5, points: 310 },
  { title: "مبادرة بيئية", description: "تنظيم مبادرات بيئية", img: mission6, points: 360 },
  { title: "تعزيز الصحة", description: "ممارسة الأنشطة الصحية", img: mission7, points: 330 },
  { title: "مبادرة تجميل المجتمع", description: "المشاركة في تزيين الأماكن العامة", img: mission8, points: 340 },
  { title: "جمع التبرعات", description: "جمع تبرعات لدعم المبادرات الخيرية", img: mission9, points: 370 },
  { title: "مساعدة في دور العبادة", description: "المساعدة في تنظيف دور العبادة", img: mission10, points: 310 },
  { title: "حملة لتوفير المياه", description: "إطلاق حملات لتوفير المياه", img: mission11, points: 330 },
  { title: "مساعدة كبار السن", description: "تقديم المساعدة لكبار السن", img: mission12, points: 360 },
];

export default weeklyMissionsData;
