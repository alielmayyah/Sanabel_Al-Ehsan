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
import TaskCategory from "../models/task-category.model";
import task_category from "../seeders/task-category"; // Import your seed data

import _ from "lodash";

import Tree from "../models/tree.model";
const demoTree = require("../seeders/demo-tree-seeders");
const demoTaskSeeder = require("../seeders/20241118230008-demo-task");
const demoChallengeSeeder = require("../seeders/challange-seeder");

const sequelize = new Sequelize({
  dialect: MySqlDialect,
  database: process.env.MYSQL_DB_NAME,
  user: process.env.MYSQL_DB_USER,
  password: process.env.MYSQL_DB_PASS,
  host: process.env.MYSQL_DB_HOST,
  port: Number(process.env.MYSQL_DB_PORT),
});

const rundb = async () => {
  // Initialize models
  User.initModel(sequelize);
  Tree.initModel(sequelize);
  Organization.initModel(sequelize);
  Parent.initModel(sequelize);
  Class.initModel(sequelize);
  Student.initModel(sequelize);
  Groupe.initModel(sequelize);
  Teacher.initModel(sequelize);
  Representative.initModel(sequelize);
  Donation.initModel(sequelize);
  TaskCategory.initModel(sequelize);
  Task.initModel(sequelize);
  Challenge.initModel(sequelize);
  Reward.initModel(sequelize);
  StudentTeacher.initModel(sequelize);
  StudentTask.initModel(sequelize);
  StudentChallenge.initModel(sequelize);
  Challenge.associate();

  // Define associations
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
    foreignKey: "userId",
    sourceKey: "id",
    as: "Parents",
  });
  Parent.belongsTo(User, {
    foreignKey: "userId",
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
    sourceKey: "id",
    as: "Students",
  });

  // Student and Teacher Relationships (Many-to-Many through StudentTeacher)
  Student.belongsToMany(Teacher, {
    through: StudentTeacher,
    foreignKey: "studentId",
    as: "Teachers",
  });

  Teacher.belongsToMany(Student, {
    through: StudentTeacher,
    foreignKey: "teacherId",
    as: "Students",
  });

  Challenge.belongsToMany(Student, {
    through: StudentChallenge,
    foreignKey: "challengeId",
    otherKey: "studentId",
    as: "Students",
  });

  // Student and Organization Relationships
  Student.belongsTo(Organization, {
    foreignKey: "organizationId",
    targetKey: "id",
    as: "Organization",
  });
  Organization.hasMany(Student, {
    foreignKey: "organizationId",
    sourceKey: "id",
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

  Class.belongsTo(Teacher, {
    foreignKey: "teacherId",
    targetKey: "id",
    as: "Teachers",
  });
  Teacher.hasMany(Class, {
    foreignKey: "teacherId",
    sourceKey: "id",
    as: "Classes",
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
    foreignKey: "studentId",
    targetKey: "id",
    as: "Student",
  });
  Student.hasMany(Reward, {
    foreignKey: "studentId",
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
    foreignKey: "classId",
    targetKey: "id",
    as: "Class",
  });

  Class.hasMany(Student, {
    foreignKey: "classId",
    sourceKey: "id",
    as: "Students",
  });

  Student.belongsTo(Tree, {
    foreignKey: "treeProgress",
    targetKey: "id",
    as: "Tree",
  });

  Tree.hasMany(Student, {
    foreignKey: "treeProgress",
    sourceKey: "id",
    as: "Students",
  });

  Groupe.hasMany(Student, {
    foreignKey: "groupeId",
    sourceKey: "id",
    as: "Students",
  });

  Student.belongsTo(Groupe, {
    foreignKey: "groupeId",
    targetKey: "id",
    as: "Groupe",
  });

StudentTask.belongsTo(Student, { foreignKey: "studentId", as: "student" }); // ✅ alias: "Student"
StudentTask.belongsTo(Task, { foreignKey: "taskId", as: "task" }); // ✅ alias: "Task"


TaskCategory.associate();
Task.associate();
  try {
    await sequelize.sync({ alter: true });
    console.log("Database & models table created/updated!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const connectToDb = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log("✅ Successfully connected to our DB");

    // Initialize models and associations
    await rundb();
    
    // -----------------------------
    // Handle TasksCategory seeding/updating
    // -----------------------------
    console.log("🔍 Fetching existing Task Categories...");
    const existingCategories = await TaskCategory.findAll();
    const seedCategories: any[] = task_category.data || [];

    // Identify categories to insert or update
    const taskCategoryToUpsert = seedCategories.filter((seedCategory) => {
      const existingTaskCategory = existingCategories.find(
        (TaskCategory) => TaskCategory.id === seedCategory.id
      );
      if (!existingTaskCategory) return true; // New task, needs insertion
    
    
      // Compare attributes
      const existingFiltered = _.omit(existingTaskCategory.toJSON(), ["createdAt", "updatedAt"]);
      const seedFiltered = _.omit(seedCategory, ["createdAt", "updatedAt"]);
      return !_.isEqual(existingFiltered, seedFiltered);
    });
    
    // Identify categories to delete
    const categoriesToDelete = existingCategories.filter((existingCategory) => {
      return !seedCategories.some(
        (seedCategory) =>
          seedCategory.title === existingCategory.title
      );
    });
    

    // Perform upserts and deletions
    if (taskCategoryToUpsert.length > 0) {
      console.log("🔍 Upserting Task Categories:", taskCategoryToUpsert.length);
      await Promise.all(taskCategoryToUpsert.map((category) => 
        TaskCategory.upsert(category)
      ));
            console.log("✅ Task Category data upserted successfully!");
    } else {
      console.log("✔️ Task Category data is already up to date.");
    }

    if (categoriesToDelete.length > 0) {
      console.log("🔍 Deleting Task Categories:", categoriesToDelete.length);
      await Promise.all(categoriesToDelete.map((category) => category.destroy()));
      console.log("✅ Task Category data deleted successfully!");
    } else {
      console.log("✔️ No Task Categories to delete.");
    }


    // -----------------------------
    // Handle Tasks seeding/updating
    // -----------------------------
    const existingTasks = await Task.findAll();
    const seedTasks: any[] = demoTaskSeeder.data || [];

    // Identify tasks to insert or update
    const tasksToUpsert = seedTasks.filter((seedTask) => {
      const existingTask = existingTasks.find(
        (task) => task.id === seedTask.id
      );
      if (!existingTask) return true; // New task, needs insertion

      // Compare all attributes (excluding metadata like createdAt, updatedAt)
      const existingFiltered = _.omit(existingTask.toJSON(), [
        "createdAt",
        "updatedAt",
      ]);
      const seedFiltered = _.omit(seedTask, ["createdAt", "updatedAt"]);

      return !_.isEqual(existingFiltered, seedFiltered);
    });

    // Identify tasks to delete (exist in DB but not in seed data)
    const tasksToDelete = existingTasks.filter((existingTask) => {
      return !seedTasks.some((seedTask) => seedTask.id === existingTask.id);
    });

    // Perform upserts and deletions
    if (tasksToUpsert.length > 0) {
      console.log("🔍 Upserting Tasks:", tasksToUpsert.length);
      await Promise.all(tasksToUpsert.map((task) => Task.upsert(task)));
      console.log("✅ Task data upserted successfully!");
    } else {
      console.log("✔️ Task data is already up to date.");
    }

    if (tasksToDelete.length > 0) {
      console.log("🔍 Deleting Tasks:", tasksToDelete.length);
      await Promise.all(tasksToDelete.map((task) => task.destroy()));
      console.log("✅ Task data deleted successfully!");
    } else {
      console.log("✔️ No tasks to delete.");
    }

    // -----------------------------
    // Handle Trees seeding/updating
    // -----------------------------
    const existingTrees = await Tree.findAll();
    const seedTrees: any[] = demoTree.data || [];

    // Identify trees to insert or update
    const treesToUpsert = seedTrees.filter((seedTree) => {
      const existingTree = existingTrees.find(
        (tree) => tree.id === seedTree.id
      );
      if (!existingTree) return true; // New tree, needs insertion

      // Compare all attributes (excluding metadata like createdAt, updatedAt)
      const existingFiltered = _.omit(existingTree.toJSON(), [
        "createdAt",
        "updatedAt",
      ]);
      const seedFiltered = _.omit(seedTree, ["createdAt", "updatedAt"]);

      return !_.isEqual(existingFiltered, seedFiltered);
    });

    // Identify trees to delete (exist in DB but not in seed data)
    const treesToDelete = existingTrees.filter((existingTree) => {
      return !seedTrees.some((seedTree) => seedTree.id === existingTree.id);
    });

    // Perform upserts and deletions
    if (treesToUpsert.length > 0) {
      console.log("🔍 Upserting Trees:", treesToUpsert.length);
      await Promise.all(treesToUpsert.map((tree) => Tree.upsert(tree)));
      console.log("✅ Tree data upserted successfully!");
    } else {
      console.log("✔️ Tree data is already up to date.");
    }

    if (treesToDelete.length > 0) {
      console.log("🔍 Deleting Trees:", treesToDelete.length);
      await Promise.all(treesToDelete.map((tree) => tree.destroy()));
      console.log("✅ Tree data deleted successfully!");
    } else {
      console.log("✔️ No trees to delete.");
    }
    // -----------------------------
    // Handle Challange seeding/updating
    // -----------------------------
    const existingChallanges = await Challenge.findAll();
    const seedChallanges: any[] = demoChallengeSeeder.data || [];
    // Identify trees to insert or update
    const ChallangeToUpsert = seedChallanges.filter((seedChallange) => {
      const existingChallange = existingChallanges.find(
        (challange) => challange.id === seedChallange.id
      );
      if (!existingChallange) return true; // New tree, needs insertion

      // Compare all attributes (excluding metadata like createdAt, updatedAt)
      const existingFiltered = _.omit(existingChallange.toJSON(), [
        "createdAt",
        "updatedAt",
      ]);
      const seedFiltered = _.omit(seedChallange, ["createdAt", "updatedAt"]);

      return !_.isEqual(existingFiltered, seedFiltered);
    });

    // Identify trees to delete (exist in DB but not in seed data)
    const ChallangeToDelete = existingChallanges.filter((existingChallange) => {
      return !seedChallanges.some(
        (seedChallange) => seedChallange.id === existingChallange.id
      );
    });

    // Perform upserts and deletions
    if (ChallangeToUpsert.length > 0) {
      console.log("🔍 Upserting Challenges:", ChallangeToUpsert.length);
      await Promise.all(
        ChallangeToUpsert.map((challange) => Challenge.upsert(challange))
      );
      console.log("✅ Challenge data upserted successfully!");
    } else {
      console.log("✔️ Challenge data is already up to date.");
    }

    if (ChallangeToDelete.length > 0) {
      console.log("🔍 Deleting Challenges:", ChallangeToDelete.length);
      await Promise.all(
        ChallangeToDelete.map((challange) => challange.destroy())
      );
      console.log("✅ Challenge data deleted successfully!");
    } else {
      console.log("✔️ No Challenges to delete.");
    }
  } catch (error) {
    console.error("❌ Database connection error:", error);
  }
};

export { sequelize, connectToDb, rundb };
