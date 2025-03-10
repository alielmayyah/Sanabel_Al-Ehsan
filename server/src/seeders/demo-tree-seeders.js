
const { Tree } = require("../models/tree.model");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Trees", [
      { treeProgress: 1 , water: 0, seeders: 1,  },
      { treeProgress: 2, water: 1,  seeders: 2,  },
      { treeProgress: 3, water: 1,  seeders: 3,  },
      { treeProgress: 4, water: 1,  seeders: 2, },
      { treeProgress: 5, water: 1,  seeders: 1, },
      { treeProgress: 6, water: 5,  seeders: 4,  },
      { treeProgress: 7, water: 2,  seeders: 3,  },
      { treeProgress: 8, water: 2,  seeders: 2, },
      { treeProgress: 9, water: 2,  seeders: 1,  },
      { treeProgress: 10, water: 2, seeders: 2,  },
      { treeProgress: 11, water: 2,  seeders: 3, },
      { treeProgress: 12, water: 3,  seeders: 1,  },
      { treeProgress: 13, water: 3,  seeders: 2,  },
      { treeProgress: 14, water: 3,  seeders: 3,  },
      { treeProgress: 15, water: 3,  seeders: 4, },
      { treeProgress: 16, water: 10,  seeders: 5,  },
      { treeProgress: 17, water: 4,  seeders: 3, },
      { treeProgress: 18, water: 4,  seeders: 2,  },
      { treeProgress: 19, water: 4,  seeders: 1,  },
      { treeProgress: 20, water: 4, seeders: 4, },
      { treeProgress: 21, water: 4,  seeders: 2,  },
      { treeProgress: 22, water: 4,  seeders: 3, },
      { treeProgress: 23, water: 4,  seeders: 1,  },
      { treeProgress: 24, water: 4,  seeders: 2,  },
      { treeProgress: 25, water: 5,  seeders: 4, },
      { treeProgress: 26, water: 5, seeders: 3,  },
      { treeProgress: 27, water: 5,  seeders: 2,  },
      { treeProgress: 28, water: 5,  seeders: 1,  },
      { treeProgress: 29, water: 5,  seeders: 3,  },
      { treeProgress: 30, water: 5,  seeders: 2,  },
      { treeProgress: 31, water: 15,  seeders: 5,  },
      { treeProgress: 32, water: 6,  seeders: 3,  },
      { treeProgress: 33, water: 6,  seeders: 2,  },
      { treeProgress: 34, water: 6,  seeders: 1,  },
      { treeProgress: 50, water: 7,  seeders: 2,  },
      { treeProgress: 51, water: 20,  seeders: 5,  },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Trees", null, {});
  },
};
