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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rundb = exports.connectToDb = exports.sequelize = void 0;
const core_1 = require("@sequelize/core");
const mysql_1 = require("@sequelize/mysql");
const user_model_1 = __importDefault(require("../models/user.model"));
const student_model_1 = __importDefault(require("../models/student.model"));
const parent_model_1 = __importDefault(require("../models/parent.model"));
const teacher_model_1 = __importDefault(require("../models/teacher.model"));
const oraganization_model_1 = __importDefault(require("../models/oraganization.model")); // Fixed typo in import
const representative_model_1 = __importDefault(require("../models/representative.model"));
const donation_model_1 = __importDefault(require("../models/donation.model"));
const challenge_model_1 = __importDefault(require("../models/challenge.model"));
const reward_model_1 = __importDefault(require("../models/reward.model"));
const task_model_1 = __importDefault(require("../models/task.model"));
const class_model_1 = __importDefault(require("../models/class.model"));
const studentTeacher_model_1 = __importDefault(require("../models/studentTeacher.model"));
const student_task_model_1 = __importDefault(require("../models/student-task.model")); // Import the new model
const student_challenge_model_1 = __importDefault(require("../models/student-challenge.model"));
const groupe_model_1 = __importDefault(require("../models/groupe.model"));
const tasktype_model_1 = __importDefault(require("../models/tasktype.model"));
const sequelize = new core_1.Sequelize({
    dialect: mysql_1.MySqlDialect,
    database: process.env.MYSQL_DB_NAME,
    user: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASS,
    host: process.env.MYSQL_DB_HOST,
    port: Number(process.env.MYSQL_DB_PORT),
});
exports.sequelize = sequelize;
const connectToDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield rundb(); // Call rundb before authenticate
        yield sequelize.authenticate();
        console.log("Successfully connected to our db");
    }
    catch (error) {
        console.error("Database connection error:", error);
    }
});
exports.connectToDb = connectToDb;
const rundb = () => __awaiter(void 0, void 0, void 0, function* () {
    // Initialize models
    user_model_1.default.initModel(sequelize);
    oraganization_model_1.default.initModel(sequelize);
    parent_model_1.default.initModel(sequelize);
    class_model_1.default.initModel(sequelize);
    student_model_1.default.initModel(sequelize);
    groupe_model_1.default.initModel(sequelize);
    teacher_model_1.default.initModel(sequelize);
    representative_model_1.default.initModel(sequelize);
    donation_model_1.default.initModel(sequelize);
    challenge_model_1.default.initModel(sequelize);
    reward_model_1.default.initModel(sequelize);
    task_model_1.default.initModel(sequelize);
    studentTeacher_model_1.default.initModel(sequelize);
    student_task_model_1.default.initModel(sequelize);
    tasktype_model_1.default.initModel(sequelize);
    student_challenge_model_1.default.initModel(sequelize);
    user_model_1.default.hasMany(student_model_1.default, {
        foreignKey: "userId",
        sourceKey: "id",
        as: "Students",
    });
    student_model_1.default.belongsTo(user_model_1.default, {
        foreignKey: "userId",
        targetKey: "id",
        as: "User",
    });
    user_model_1.default.hasMany(teacher_model_1.default, {
        foreignKey: "userId",
        sourceKey: "id",
        as: "Teachers",
    });
    teacher_model_1.default.belongsTo(user_model_1.default, {
        foreignKey: "userId",
        targetKey: "id",
        as: "User",
    });
    user_model_1.default.hasMany(representative_model_1.default, {
        foreignKey: "userId",
        sourceKey: "id",
        as: "Representatives",
    });
    representative_model_1.default.belongsTo(user_model_1.default, {
        foreignKey: "userId",
        targetKey: "id",
        as: "User",
    });
    user_model_1.default.hasMany(parent_model_1.default, {
        foreignKey: "userId", // Fixed foreignKey name
        sourceKey: "id",
        as: "Parents",
    });
    parent_model_1.default.belongsTo(user_model_1.default, {
        foreignKey: "userId", // Fixed foreignKey name
        targetKey: "id",
        as: "User",
    });
    student_model_1.default.belongsTo(parent_model_1.default, {
        foreignKey: "ParentId",
        targetKey: "id",
        as: "Parent",
    });
    parent_model_1.default.hasMany(student_model_1.default, {
        foreignKey: "ParentId",
        sourceKey: "id", // Changed to match the Student model
        as: "Students",
    });
    // Student and Teacher Relationships (Many-to-Many through StudentTeacher)
    student_model_1.default.belongsToMany(teacher_model_1.default, {
        through: studentTeacher_model_1.default,
        foreignKey: "studentId", // use correct foreign key name
        as: "Teachers",
    });
    teacher_model_1.default.belongsToMany(student_model_1.default, {
        through: studentTeacher_model_1.default,
        foreignKey: "teacherId", // use correct foreign key name
        as: "Students",
    });
    // Student and Task Relationships (Many-to-Many through StudentTask)
    student_model_1.default.belongsToMany(task_model_1.default, {
        through: student_task_model_1.default,
        foreignKey: "studentId",
        as: "Tasks",
    });
    task_model_1.default.belongsToMany(student_model_1.default, {
        through: student_task_model_1.default,
        foreignKey: "taskId",
        as: "Students",
    });
    student_model_1.default.belongsToMany(challenge_model_1.default, {
        through: student_challenge_model_1.default,
        foreignKey: "studentId", // Correct foreign key
        otherKey: "challengeId", // Specify the other key
        as: "Challenges",
    });
    challenge_model_1.default.belongsToMany(student_model_1.default, {
        through: student_challenge_model_1.default,
        foreignKey: "challengeId", // Correct foreign key
        otherKey: "studentId", // Specify the other key
        as: "Students",
    });
    // Student and Organization Relationships
    student_model_1.default.belongsTo(oraganization_model_1.default, {
        foreignKey: "organizationId",
        targetKey: "id", // Changed to 'id' to match the Organization model
        as: "Organization",
    });
    oraganization_model_1.default.hasMany(student_model_1.default, {
        foreignKey: "organizationId",
        sourceKey: "id", // Changed to 'id' to match the Organization model
        as: "Students",
    });
    // Teacher and Organization Relationships
    teacher_model_1.default.belongsTo(oraganization_model_1.default, {
        foreignKey: "organizationId",
        targetKey: "id",
        as: "Organization",
    });
    oraganization_model_1.default.hasMany(teacher_model_1.default, {
        foreignKey: "organizationId",
        sourceKey: "id",
        as: "Teachers",
    });
    // Class and Organization Relationships
    class_model_1.default.belongsTo(oraganization_model_1.default, {
        foreignKey: "organizationId",
        targetKey: "id",
        as: "Organization",
    });
    oraganization_model_1.default.hasMany(class_model_1.default, {
        foreignKey: "organizationId",
        sourceKey: "id",
        as: "Classes",
    });
    representative_model_1.default.belongsTo(oraganization_model_1.default, {
        foreignKey: "organizationId",
        targetKey: "id",
        as: "Organization",
    });
    oraganization_model_1.default.hasMany(representative_model_1.default, {
        foreignKey: "organizationId",
        sourceKey: "id",
        as: "Representatives",
    });
    // Donation and Student Relationships
    donation_model_1.default.belongsTo(student_model_1.default, {
        foreignKey: "donaterId",
        targetKey: "id",
        as: "Students",
    });
    student_model_1.default.hasMany(donation_model_1.default, {
        foreignKey: "donaterId",
        sourceKey: "id",
        as: "Donations",
    });
    tasktype_model_1.default.belongsTo(task_model_1.default, {
        foreignKey: "TaskId",
        targetKey: "id",
        as: "Tasks",
    });
    task_model_1.default.hasMany(tasktype_model_1.default, {
        foreignKey: "TaskId",
        sourceKey: "id",
        as: "TaskTypes",
    });
    // Reward and Student Relationships
    reward_model_1.default.belongsTo(student_model_1.default, {
        foreignKey: "id",
        targetKey: "id",
        as: "Student",
    });
    student_model_1.default.hasMany(reward_model_1.default, {
        foreignKey: "id",
        sourceKey: "id",
        as: "Rewards",
    });
    groupe_model_1.default.belongsTo(oraganization_model_1.default, {
        foreignKey: "organizationId",
        targetKey: "id",
        as: "Organization",
    });
    oraganization_model_1.default.hasMany(groupe_model_1.default, {
        foreignKey: "organizationId",
        sourceKey: "id",
        as: "Groupes",
    });
    student_model_1.default.belongsTo(class_model_1.default, {
        foreignKey: "classId", // Ensure it points to the correct foreign key in Student model
        targetKey: "id", // The target key in the Class model
        as: "Class", // Alias for this association
    });
    // In the Class model
    class_model_1.default.hasMany(student_model_1.default, {
        foreignKey: "classId", // Ensure it matches the foreign key defined in Student model
        sourceKey: "id", // The source key in the Class model
        as: "Students", // Alias for the reverse association
    });
    // Ensure the same pattern for the Groupe -> Student relationship
    groupe_model_1.default.hasMany(student_model_1.default, {
        foreignKey: "groupeId",
        sourceKey: "id",
        as: "Students", // Alias for the reverse association
    });
    // Student belongs to Groupe with the foreignKey: 'groupeId'
    student_model_1.default.belongsTo(groupe_model_1.default, {
        foreignKey: "groupeId",
        targetKey: "id",
        as: "Groupe", // Alias for the Groupe association
    });
    try {
        yield sequelize.sync({ force: true });
        console.log("Database & models table created/updated!");
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
});
exports.rundb = rundb;
