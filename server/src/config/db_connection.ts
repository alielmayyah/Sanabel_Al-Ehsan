// Sequelize core & dialect
import { Sequelize } from "@sequelize/core";
import { MySqlDialect } from "@sequelize/mysql";

// Sequelize models
import User from "../models/user.model";
import Student from "../models/student.model";
import Parent from "../models/parent.model";
import Teacher from "../models/teacher.model";
import Organization from "../models/oraganization.model"; // If typo is fixed in filename, change path too
import Representative from "../models/representative.model";
import Donation from "../models/donation.model";
import Challenge from "../models/challenge.model";
import Reward from "../models/reward.model";
import Task from "../models/task.model";
import Class from "../models/class.model";
import StudentTask from "../models/student-task.model";
import StudentChallenge from "../models/student-challenge.model";
import Groupe from "../models/groupe.model";
import TaskCategory from "../models/task-category.model";
import Tree from "../models/tree.model";

// Seeder data
import taskCategorySeed from "../seeders/task-category";
import demoTree from "../seeders/demo-tree-seeders";
const demoTaskSeeder = require("../seeders/20241118230008-demo-task");
const demoChallengeSeeder = require("../seeders/challange-seeder");

// Utils & libraries
import _ from "lodash";

require("dotenv").config();
const sequelize = new Sequelize({
  dialect: MySqlDialect,
  database: process.env.MYSQL_DB_NAME,
  user: process.env.MYSQL_DB_USER,
  password: process.env.MYSQL_DB_PASS,
  host: process.env.MYSQL_DB_HOST,
  port: Number(process.env.MYSQL_DB_PORT),
});
const rundb = async () => {
  const models = {
    User,
    Parent,
    Student,
    Teacher,
    Organization,
    Representative,
    Donation,
    Challenge,
    Reward,
    TaskCategory,
    Task,
    Class,
    StudentTask,
    StudentChallenge,
    Groupe,

    Tree,
  };
  Object.values(models).forEach((model) => {
    model.initModel(sequelize);
  });

  // Instead of assigning to sequelize.models (readonly), keep your own:
  const registeredModels = { ...models };

  // Call associate with registeredModels
  Object.values(registeredModels).forEach((model) => {
    if (typeof model.associate === "function") {
      model.associate(registeredModels);
    }
  });

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
    const seedCategories: any[] = taskCategorySeed.data || [];

    // Identify categories to insert or update
    const taskCategoryToUpsert = seedCategories.filter((seedCategory) => {
      const existingTaskCategory = existingCategories.find(
        (TaskCategory) => TaskCategory.id === seedCategory.id
      );
      if (!existingTaskCategory) return true; // New task, needs insertion

      // Compare attributes
      const existingFiltered = _.omit(existingTaskCategory.toJSON(), [
        "createdAt",
        "updatedAt",
      ]);
      const seedFiltered = _.omit(seedCategory, ["createdAt", "updatedAt"]);
      return !_.isEqual(existingFiltered, seedFiltered);
    });

    // Identify categories to delete
    const categoriesToDelete = existingCategories.filter((existingCategory) => {
      return !seedCategories.some(
        (seedCategory) => seedCategory.title === existingCategory.title
      );
    });

    // Perform upserts and deletions
    if (taskCategoryToUpsert.length > 0) {
      console.log("🔍 Upserting Task Categories:", taskCategoryToUpsert.length);
      await Promise.all(
        taskCategoryToUpsert.map((category) => TaskCategory.upsert(category))
      );
      console.log("✅ Task Category data upserted successfully!");
    } else {
      console.log("✔️ Task Category data is already up to date.");
    }

    if (categoriesToDelete.length > 0) {
      console.log("🔍 Deleting Task Categories:", categoriesToDelete.length);
      await Promise.all(
        categoriesToDelete.map((category) => category.destroy())
      );
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
