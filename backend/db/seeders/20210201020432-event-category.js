"use strict";

const dataFromApi = require("../../scripts/events.json");
const { EventCategory } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const uniqNames = [...new Set(dataFromApi.map((e) => e.categoryName))];
    const eventCategories = uniqNames.map((categoryName) => ({
      name: categoryName,
    }));

    return queryInterface.bulkInsert("EventCategories", eventCategories);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("EventCategories", null, {});
  },
};
