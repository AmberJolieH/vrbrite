"use strict";
const dataFromApi = require("../../scripts/events.json");
const { EventCategory } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let events = [];

    for (let event of dataFromApi) {
      // find or create category
      const eventCategory = await EventCategory.findOne({
        where: { name: event.categoryName },
      });
      // replace name string w/ id
      delete event.categoryName;
      event.eventCategoryId = eventCategory.id;
      // replace dates
      // let startDateString =
      //   parseInt(event.startsAt.split("-")[0], 10) + 43200000; // adds 12 hours for TZs
      // event.startsAt = new Date(startDateString);
      // let endDateString =
      //   parseInt(event.endsAt.split("-")[0], 10) + 43200000; // adds 12 hours for TZs
      // event.endsAt = new Date(endDateString);

      // add to bulk attrs
      events.push(event);
    }

    return queryInterface.bulkInsert("Events", events);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Events", null, {});
    // return  queryInterface.bulkDelete("EventCategories", null, {})
  },
};
