const { TaskCategory } = require("../models/task.model");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Tasks", [
      {
        title: "الصلاة في الوقت",
        description: "أداء جميع الصلوات في أوقاتها.",
        category: TaskCategory.Daily,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "الصلاة في الوقت",
        description: "أداء جميع الصلوات في أوقاتها.",
        category: TaskCategory.Daily,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "الصلاة في الوقت",
        description: "أداء جميع الصلوات في أوقاتها.",
        category: TaskCategory.Daily,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "الصلاة في الوقت",
        description: "أداء جميع الصلوات في أوقاتها.",
        category: TaskCategory.Daily,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "الصلاة في الوقت",
        description: "أداء جميع الصلوات في أوقاتها.",
        category: TaskCategory.Daily,

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "ابتسم لشخص ما",
        description: "نشر اللطف بابتسامة صادقة.",
        category: TaskCategory.Daily,

        createdAt: new Date(),
        updatedAt: new Date(),

      },
      {
        title: "المساعدة في الأعمال المنزلية",
        description: "المساعدة في مهمة منزلية مثل غسل الصحون أو ترتيب المكان.",
        category: TaskCategory.Daily,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Weekly Tasks
      {
        title: "زرع شجرة",
        description: "المساهمة في البيئة بزرع شجرة أو رعاية نبات.",
        category: TaskCategory.Weekly,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "زيارة جيران",
        description: "قضاء وقت مع الجيران أو مساعدتهم في مهمة أو حاجة.",
        category: TaskCategory.Weekly,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "التبرع للجمعيات الخيرية",
        description: "التبرع لقضية خيرية (مال، ملابس، أو وقت).",
        category: TaskCategory.Weekly,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "التطوع في ملجأ",
        description: "قضاء ساعة في مساعدة في مأوى مجتمعي.",
        category: TaskCategory.Weekly,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Tasks", null, {});
  },
};
