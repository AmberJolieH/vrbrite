"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Events", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      website: {
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.STRING,
      },
      lat: {
        type: Sequelize.DECIMAL(19, 15),
      },
      long: {
        type: Sequelize.DECIMAL(19, 15),
      },
      distance: {
        type: Sequelize.FLOAT,
      },
      startsAt: {
        type: Sequelize.DATE,
      },
      description: {
        type: Sequelize.TEXT,
      },
      endsAt: {
        type: Sequelize.DATE,
      },
      capacity: {
        type: Sequelize.INTEGER,
      },
      eventCategoryId: {
        type: Sequelize.INTEGER,
        references: { model: "EventCategories" },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Events");
  },
};
