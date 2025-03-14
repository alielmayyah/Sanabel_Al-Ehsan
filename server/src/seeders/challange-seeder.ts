import { QueryInterface, Sequelize } from "sequelize";
import { TaskCategory } from "../models/challenge.model"; // Import TaskCategory enum

interface ChallengeData {
  id: number; // Incrementing ID
  title: string; // Represents the milestone level
  description: string; // Description of the challenge
  level: number; // Represents the trophy milestone level
  snabelBlue: number; // Blue rewards
  snabelYellow: number; // Yellow rewards
  snabelRed: number; // Red rewards
  xp: number; // XP rewards
  point: number; // Represents the trophy milestone point
  category: TaskCategory; // Category of the challenge
  taskCategory: string | null; // Foreign key to Task (optional)
  water?: number; // Optional water property
  seeder?: number; // Optional seeder property
}

// Generate challenge data based on configuration
let globalIdCounter = 1; // 🌍 Global counter to ensure unique IDs

const generateChallenges = (
  missionName: string,
  config: {
    blue: number;
    yellow: number;
    red: number;
    xp: number;
    trophyMilestones: number[];
    xpMultiplier: number;
    blueMultiplier: number;
    yellowMultiplier: number;
    redMultiplier: number;
    water? : number;
    seeder? : number;
    
  },
  category: TaskCategory,
  taskCategory?: string
): ChallengeData[] => {
  const challenges: ChallengeData[] = [];
  
  config.trophyMilestones.forEach((milestone, index) => {
    const snabelBlue = Math.round(config.blue * config.blueMultiplier * milestone);
    const snabelYellow = Math.round(config.yellow * config.yellowMultiplier * milestone);
    const snabelRed = Math.round(config.red * config.redMultiplier * milestone);
    const xp = Math.round(config.xp * config.xpMultiplier * milestone);
    const water = config.water ? Math.round(config.water * milestone) : 0;
    const seeder = config.seeder ? Math.round(config.seeder * milestone) : 0;
    challenges.push({
      id: globalIdCounter++, // 🔥 Use global counter instead of resetting each time
      title: `${missionName} - Level ${index + 1}`,
      description: `Complete ${milestone} tasks to unlock this challenge.`,
      level: index + 1,
      snabelBlue,
      snabelYellow,
      snabelRed,
      xp,
      point: milestone,
      category,
      taskCategory: taskCategory ?? null,
      water, // Include water in the challenge data
      seeder, // Include seeder in the challenge data
    });
  });

  return challenges;
};
const milestones = {
  treeStage: [2, 3, 4],
  progressTree: [1, 5, 10, 15, 30, 40],
  missionsFinished: [1, 5, 10, 25, 50, 75, 100, 150, 250, 500, 750, 1000],
  totalBluePoints: [5, 10, 25, 50, 100, 250, 500, 1000],
  totalYellowPoints: [5, 10, 25, 50, 100, 250, 500, 1000],
  totalRedPoints: [5, 10, 25, 50, 100, 250, 500, 1000],
  totalMixedPoints: [10, 25, 50, 100, 250, 500, 750, 1000, 2500],
  totalXP: [100, 250, 500, 1000, 2500, 5000, 7500, 10000, 25000],
  totalWaterBought: [5, 10, 25, 50, 75, 100, 150],
  totalFertilizerBought: [5, 10, 25, 50, 75, 100],
};

// Generate all challenge data
const challengeData: ChallengeData[] = [
  ...generateChallenges(
    "sanabelA",
    {
      blue: 2,
      yellow: 2,
      red: 2,
      xp: 5,
      trophyMilestones: [1, 5, 10, 25, 50, 75, 100],
      xpMultiplier: 1,
      blueMultiplier: 0.6 * 0.5,
      yellowMultiplier: 0.6 * 0.5,
      redMultiplier: 0.6 * 0.5,
    },
    TaskCategory.task,
    "سنابل الإحسان في العلاقة مع الله"
  ),

  ...generateChallenges(
    "sanabelB",
    {
      blue: 2,
      yellow: 1,
      red: 1,
      xp: 5,
      trophyMilestones: [1, 5, 10, 25, 50, 75, 100],
      xpMultiplier: 1,
      blueMultiplier: 0.6 * 0.5,
      yellowMultiplier: 0.3 * 0.5,
      redMultiplier: 0.3 * 0.5,
    },
    TaskCategory.task,
    "سنابل الإحسان في العلاقة مع النفس"
  ),

  ...generateChallenges(
    "sanabelC",
    {
      blue: 1,
      yellow: 2,
      red: 1,
      xp: 5,
      trophyMilestones: [1, 5, 10, 25, 50, 75, 100],
      xpMultiplier: 1,
      blueMultiplier: 0.3 * 0.5,
      yellowMultiplier: 0.6 * 0.5,
      redMultiplier: 0.3 * 0.5,
    },
    TaskCategory.task,
    "سنابل الإحسان في العلاقة مع الأسرة والمجتمع"
  ),

  ...generateChallenges(
    "sanabelD",
    {
      blue: 1,
      yellow: 1,
      red: 2,
      xp: 5,
      trophyMilestones: [1, 5, 10, 25, 50, 75, 100],
      xpMultiplier: 1,
      blueMultiplier: 0.3 * 0.5,
      yellowMultiplier: 0.3 * 0.5,
      redMultiplier: 0.6 * 0.5,
    },
    TaskCategory.task,
    "سنابل الإحسان في العلاقة مع الأرض والكون"
  ),
  
  ...generateChallenges(
    "Tree Stage",
    {
      blue: 10,
      yellow: 10,
      red: 10,
      xp: 30,
      trophyMilestones: milestones.treeStage,
      xpMultiplier: 1,
      blueMultiplier: 1,
      yellowMultiplier: 1,
      redMultiplier: 1,
    },
    TaskCategory.treestage,
    "Tree Stage Milestones"
  ),

  ...generateChallenges(
    "Progress Tree",
    {
      blue: 10,
      yellow: 10,
      red: 10,
      xp: 50,
      trophyMilestones: milestones.progressTree,
      xpMultiplier: 1,
      blueMultiplier: 1,
      yellowMultiplier: 1,
      redMultiplier: 1,
    },
    TaskCategory.treelevel,
    "Progress Tree Milestones"
  ),

  ...generateChallenges(
    "Missions Finished",
    {
      blue: 1,
      yellow: 1,
      red: 1,
      xp: 1,
      trophyMilestones: milestones.missionsFinished,
      xpMultiplier: 1,
      blueMultiplier: 1,
      yellowMultiplier: 1,
      redMultiplier: 1,
    },
    TaskCategory.alltask,
    "Missions Finished Milestones"
  ),

  ...generateChallenges(
    "Total Blue Points",
    {
      blue: 1,
      yellow: 0,
      red: 0,
      xp: 0,
      trophyMilestones: milestones.totalBluePoints,
      xpMultiplier: 1,
      blueMultiplier: 1,
      yellowMultiplier: 1,
      redMultiplier: 1,
    },
    TaskCategory.snabelBlue,
    "Total Blue Points Milestones"
  ),

  ...generateChallenges(
    "Total Yellow Points",
    {
      blue: 0,
      yellow: 1,
      red: 0,
      xp: 0,
      trophyMilestones: milestones.totalYellowPoints,
      xpMultiplier: 1,
      blueMultiplier: 1,
      yellowMultiplier: 1,
      redMultiplier: 1,
    },
    TaskCategory.snabelYellow,
    "Total Yellow Points Milestones"
  ),

  ...generateChallenges(
    "Total Red Points",
    {
      blue: 0,
      yellow: 0,
      red: 1,
      xp: 0,
      trophyMilestones: milestones.totalRedPoints,
      xpMultiplier: 1,
      blueMultiplier: 1,
      yellowMultiplier: 1,
      redMultiplier: 1,
    },
    TaskCategory.snabelRed,
    "Total Red Points Milestones"
  ),

  ...generateChallenges(
    "Total Mixed Points",
    {
      blue: 2,
      yellow: 2,
      red: 2,
      xp: 0,
      trophyMilestones: milestones.totalMixedPoints,
      xpMultiplier: 1,
      blueMultiplier: 1,
      yellowMultiplier: 1,
      redMultiplier: 1,
    },
    TaskCategory.snabelMixed,
    "Total Mixed Points Milestones"
  ),

  ...generateChallenges(
    "Total XP",
    {
      blue: 0,
      yellow: 0,
      red: 0,
      xp: 20,
      trophyMilestones: milestones.totalXP,
      xpMultiplier: 1,
      blueMultiplier: 1,
      yellowMultiplier: 1,
      redMultiplier: 1,
    },
    TaskCategory.xp,
    "Total XP Milestones"
  ),

  ...generateChallenges(
    "Total Water Bought",
    {
      blue: 0,
      yellow: 0,
      red: 0,
      xp: 0,
      water: 1,
      trophyMilestones: milestones.totalWaterBought,
      xpMultiplier: 1,
      blueMultiplier: 1,
      yellowMultiplier: 1,
      redMultiplier: 1,
    },
    TaskCategory.water,
    "Total Water Bought Milestones"
  ),

  ...generateChallenges(
    "Total Fertilizer Bought",
    {
      blue: 0,
      yellow: 0,
      red: 0,
      xp: 0,
      seeder: 1,
      trophyMilestones: milestones.totalFertilizerBought,
      xpMultiplier: 1,
      blueMultiplier: 1,
      yellowMultiplier: 1,
      redMultiplier: 1,
    },
    TaskCategory.seeder,
    "Total Fertilizer Bought Milestones"
  ),
];

// Export the data and migration functions
module.exports = {
  data: challengeData, // Explicitly export the data
  up: async (queryInterface: QueryInterface, Sequelize:  Sequelize) => {
    await queryInterface.bulkInsert("Challenges", challengeData);
  },

  down: async (queryInterface: QueryInterface, Sequelize:  Sequelize) => {
    await queryInterface.bulkDelete("Challenges", {});
  },
};