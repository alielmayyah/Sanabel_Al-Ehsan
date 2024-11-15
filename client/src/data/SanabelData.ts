// Import images

import sanabel1 from "../assets/sanabel/1.png";
import sanabel2 from "../assets/sanabel/2.png";
import sanabel3 from "../assets/sanabel/3.png";
import sanabel4 from "../assets/sanabel/4.png";
import sanabel5 from "../assets/sanabel/5.png";
import sanabel6 from "../assets/sanabel/6.png";
import sanabel7 from "../assets/sanabel/7.png";
import sanabel8 from "../assets/sanabel/8.png";
import sanabel9 from "../assets/sanabel/9.png";
import sanabel10 from "../assets/sanabel/10.png";
import sanabel11 from "../assets/sanabel/11.png";
import sanabel12 from "../assets/sanabel/12.png";
import sanabel13 from "../assets/sanabel/13.png";
import sanabel14 from "../assets/sanabel/14.png";
import sanabel15 from "../assets/sanabel/15.png";
import sanabel16 from "../assets/sanabel/16.png";
import sanabel17 from "../assets/sanabel/17.png";
import sanabel18 from "../assets/sanabel/18.png";

// Define data structure
interface SanabelItem {
  title: string;
  description: string;
  img: string;
  points : number;
}

// Create data array
const sanabelData: SanabelItem[] = [
  { title: "سنبلة الصلاة", description: "اجعل صلاتك نورًا لحياتك وقوة لروحك وتقربًا من الله", img: sanabel1 ,points: 150 },
  { title: "سنبلة الصيام", description: "عزز طاقتك الروحية والتقرب إلى الله من خلال الصيام", img: sanabel2 ,points: 200},
  { title: "سنبلة الصدقة", description: "ازرع الخير في قلوب الآخرين بصدقة تسعد بها روحك", img: sanabel3 ,points: 200},
  { title: "سنبلة العفو", description: "ارتقِ بروحك بالعفو والمسامحة، وكن من الكاظمين الغيظ", img: sanabel4 ,points: 200},
  { title: "سنبلة ادخال السرور", description: "املأ قلوب الناس فرحًا وكن سببًا في نشر السعادة", img: sanabel5 ,points: 200},
  { title: "سنبلة التبسم", description: "اجعل ابتسامتك صدقة تزرع بها السعادة من حولك", img: sanabel6,points: 200 },
  { title: "سنبلة الكلمة الطيبة", description: "كلمة طيبة تنير القلوب وتزيدك قربًا من الله", img: sanabel7,points: 200 },
  { title: "سنبلة الغرس", description: "اغرس شجرة أو ازرع نباتًا، وكن سببا في إحياء الأرض", img: sanabel8 ,points: 200},
  { title: "سنبلة اماطة الأذي", description: "ارفع الأذى عن الطريق واحرص على حماية الآخرين", img: sanabel9 ,points: 200},
  { title: "سنبلة ايناس الوحشان", description: "كن جليسًا ومؤنسًا لمن يحتاج إلى الرفقة والاهتمام", img: sanabel10 ,points: 200},
  { title: "سنبلة صلة الارحام", description: "تقرب إلى الله بصلة الأرحام وتقوية الروابط الأسرية", img: sanabel11,points: 200 },
  { title: "سنبلة تهادوا تحابوا", description: "انشر المحبة والود من خلال الهدايا والتواصل", img: sanabel12 ,points: 200},
  { title: "سنبلة قضاء الحوائج", description: "ساعد الآخرين في قضاء حوائجهم وكن عونًا للمحتاجين", img: sanabel13 ,points: 200},
  { title: "سنبلة بر الوالدين", description: "اعمل على بر الوالدين، فهما طريقك إلى رضا الله", img: sanabel14,points: 200 },
  { title: "سنبلة الاحسان للحيوانات", description: "كن رفيقًا للحيوانات وقدم لها العون والرحمة", img: sanabel15 ,points: 200},
  { title: "سنبلة إكرام الجار", description: "احسن إلى جارك وأكرمه، فهذا من مكارم الأخلاق", img: sanabel16 ,points: 200},
  { title: "سنبلة الاصلاح بين المتخاصمين", description: "اجعل من نفسك حمامة سلام للإصلاح بين المتخاصمين", img: sanabel17 ,points: 200},
  { title: "سنبلة الاطعام", description: "أطعم الجائعين وكن سببا في تخفيف معاناتهم", img: sanabel18 ,points: 200},
];

// Export the data
export default sanabelData;
