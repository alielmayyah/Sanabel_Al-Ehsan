"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { TaskCategory } = require("../src/models/task.model");
module.exports = {
    up: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.bulkInsert("Tasks", [
            // Daily Tasks
            {
                title: "الصلاة في الوقت",
                description: "أداء جميع الصلوات في أوقاتها.",
                category: TaskCategory.Daily,
                points: 10,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "ابتسم لشخص ما",
                description: "نشر اللطف بابتسامة صادقة.",
                category: TaskCategory.Daily,
                points: 5,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "المساعدة في الأعمال المنزلية",
                description: "المساعدة في مهمة منزلية مثل غسل الصحون أو ترتيب المكان.",
                category: TaskCategory.Daily,
                points: 15,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            // Weekly Tasks
            {
                title: "زرع شجرة",
                description: "المساهمة في البيئة بزرع شجرة أو رعاية نبات.",
                category: TaskCategory.Weekly,
                points: 50,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "زيارة جيران",
                description: "قضاء وقت مع الجيران أو مساعدتهم في مهمة أو حاجة.",
                category: TaskCategory.Weekly,
                points: 30,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "التبرع للجمعيات الخيرية",
                description: "التبرع لقضية خيرية (مال، ملابس، أو وقت).",
                category: TaskCategory.Weekly,
                points: 40,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                title: "التطوع في ملجأ",
                description: "قضاء ساعة في مساعدة في مأوى مجتمعي.",
                category: TaskCategory.Weekly,
                points: 50,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    }),
    down: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        // This will delete all the data inserted by the seed
        yield queryInterface.bulkDelete("Tasks", {});
    }),
};
