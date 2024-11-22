import { Sequelize } from "@sequelize/core";
import { MySqlDialect } from "@sequelize/mysql";
import User from "../models/user.model";
import Student from "../models/student.model";
import Parent from "../models/parent.model";
import Teacher from "../models/teacher.model";
import Organization from "../models/oraganization.model"; // Fixed typo in import
import Representative from "../models/representative.model";
import Donation from "../models/donation.model";
import Challenge from "../models/challenge.model";
import Reward from "../models/reward.model";
import Task from "../models/task.model";
import Class from "../models/class.model";
import StudentTeacher from "../models/studentTeacher.model";
import StudentTask from "../models/student-task.model"; // Import the new model
import StudentChallenge from "../models/student-challenge.model";
import Groupe from "../models/groupe.model";
import { tasks } from "googleapis/build/src/apis/tasks";
const demoTaskSeeder = require("../seeders/20241118230008-demo-task");
const demoTasktypeSeeder = require("../seeders/tasktype-seeder");
const sequelize = new Sequelize({
  dialect: MySqlDialect,
  database: process.env.MYSQL_DB_NAME,
  user: process.env.MYSQL_DB_USER,
  password: process.env.MYSQL_DB_PASS,
  host: process.env.MYSQL_DB_HOST,
  port: Number(process.env.MYSQL_DB_PORT),
});

const connectToDb = async () => {
  try {
    await rundb(); // Call rundb before authenticate
    await sequelize.authenticate();
    console.log("Successfully connected to our db");
    const taskCount = await Task.count();

    if (taskCount === 0) {
      // Run the seeder only if there are no tasks already in the database
      await demoTaskSeeder.up(sequelize.queryInterface, Sequelize);
      console.log("Seeder data inserted successfully!");
    } else {
      console.log("Tasks already seeded. Skipping seeding process.");
    }
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

const rundb = async () => {
  // Initialize models
  User.initModel(sequelize);
  Organization.initModel(sequelize);
  Parent.initModel(sequelize);
  Class.initModel(sequelize);
  Student.initModel(sequelize);
  Groupe.initModel(sequelize);
  Teacher.initModel(sequelize);
  Representative.initModel(sequelize);
  Donation.initModel(sequelize);
  Challenge.initModel(sequelize);
  Reward.initModel(sequelize);
  Task.initModel(sequelize);
  StudentTeacher.initModel(sequelize);
  StudentTask.initModel(sequelize);
  StudentChallenge.initModel(sequelize);
  User.hasMany(Student, {
    foreignKey: "userId",
    sourceKey: "id",
    as: "Students",
  });
  Student.belongsTo(User, {
    foreignKey: "userId",
    targetKey: "id",
    as: "User",
  });

  User.hasMany(Teacher, {
    foreignKey: "userId",
    sourceKey: "id",
    as: "Teachers",
  });
  Teacher.belongsTo(User, {
    foreignKey: "userId",
    targetKey: "id",
    as: "User",
  });

  User.hasMany(Representative, {
    foreignKey: "userId",
    sourceKey: "id",
    as: "Representatives",
  });
  Representative.belongsTo(User, {
    foreignKey: "userId",
    targetKey: "id",
    as: "User",
  });

  User.hasMany(Parent, {
    foreignKey: "userId", // Fixed foreignKey name
    sourceKey: "id",
    as: "Parents",
  });
  Parent.belongsTo(User, {
    foreignKey: "userId", // Fixed foreignKey name
    targetKey: "id",
    as: "User",
  });

  Student.belongsTo(Parent, {
    foreignKey: "ParentId",
    targetKey: "id",
    as: "Parent",
  });
  Parent.hasMany(Student, {
    foreignKey: "ParentId",
    sourceKey: "id", // Changed to match the Student model
    as: "Students",
  });

  // Student and Teacher Relationships (Many-to-Many through StudentTeacher)
  Student.belongsToMany(Teacher, {
    through: StudentTeacher,
    foreignKey: "studentId", // use correct foreign key name
    as: "Teachers",
  });

  Teacher.belongsToMany(Student, {
    through: StudentTeacher,
    foreignKey: "teacherId", // use correct foreign key name
    as: "Students",
  });

  // Student and Task Relationships (Many-to-Many through StudentTask)
  Student.belongsToMany(Task, {
    through: StudentTask,
    foreignKey: "studentId",
    as: "Tasks",
  });
  Task.belongsToMany(Student, {
    through: StudentTask,
    foreignKey: "taskId",
    as: "Students",
  });
  Student.belongsToMany(Challenge, {
    through: StudentChallenge,
    foreignKey: "studentId", // Correct foreign key
    otherKey: "challengeId", // Specify the other key
    as: "Challenges",
  });

  Challenge.belongsToMany(Student, {
    through: StudentChallenge,
    foreignKey: "challengeId", // Correct foreign key
    otherKey: "studentId", // Specify the other key
    as: "Students",
  });
  // Student and Organization Relationships
  Student.belongsTo(Organization, {
    foreignKey: "organizationId",
    targetKey: "id", // Changed to 'id' to match the Organization model
    as: "Organization",
  });
  Organization.hasMany(Student, {
    foreignKey: "organizationId",
    sourceKey: "id", // Changed to 'id' to match the Organization model
    as: "Students",
  });

  // Teacher and Organization Relationships
  Teacher.belongsTo(Organization, {
    foreignKey: "organizationId",
    targetKey: "id",
    as: "Organization",
  });
  Organization.hasMany(Teacher, {
    foreignKey: "organizationId",
    sourceKey: "id",
    as: "Teachers",
  });
  // Class and Organization Relationships
  Class.belongsTo(Organization, {
    foreignKey: "organizationId",
    targetKey: "id",
    as: "Organization",
  });
  Organization.hasMany(Class, {
    foreignKey: "organizationId",
    sourceKey: "id",
    as: "Classes",
  });
  Representative.belongsTo(Organization, {
    foreignKey: "organizationId",
    targetKey: "id",
    as: "Organization",
  });
  Organization.hasMany(Representative, {
    foreignKey: "organizationId",
    sourceKey: "id",
    as: "Representatives",
  });

  // Donation and Student Relationships
  Donation.belongsTo(Student, {
    foreignKey: "donaterId",
    targetKey: "id",
    as: "Students",
  });
  Student.hasMany(Donation, {
    foreignKey: "donaterId",
    sourceKey: "id",
    as: "Donations",
  });

  // Reward and Student Relationships
  Reward.belongsTo(Student, {
    foreignKey: "id",
    targetKey: "id",
    as: "Student",
  });
  Student.hasMany(Reward, {
    foreignKey: "id",
    sourceKey: "id",
    as: "Rewards",
  });
  Groupe.belongsTo(Organization, {
    foreignKey: "organizationId",
    targetKey: "id",
    as: "Organization",
  });
  Organization.hasMany(Groupe, {
    foreignKey: "organizationId",
    sourceKey: "id",
    as: "Groupes",
  });
  Student.belongsTo(Class, {
    foreignKey: "classId", // Ensure it points to the correct foreign key in Student model
    targetKey: "id", // The target key in the Class model
    as: "Class", // Alias for this association
  });

  // In the Class model
  Class.hasMany(Student, {
    foreignKey: "classId", // Ensure it matches the foreign key defined in Student model
    sourceKey: "id", // The source key in the Class model
    as: "Students", // Alias for the reverse association
  });

  // Ensure the same pattern for the Groupe -> Student relationship
  Groupe.hasMany(Student, {
    foreignKey: "groupeId",
    sourceKey: "id",
    as: "Students", // Alias for the reverse association
  });

  // Student belongs to Groupe with the foreignKey: 'groupeId'
  Student.belongsTo(Groupe, {
    foreignKey: "groupeId",
    targetKey: "id",
    as: "Groupe", // Alias for the Groupe association
  });

  try {
    await sequelize.sync();
    console.log("Database & models table created/updated!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { sequelize, connectToDb, rundb };
