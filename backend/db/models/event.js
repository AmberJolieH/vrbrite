"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      Event.belongsTo(models.EventCategory, {
        foreignKey: "eventCategoryId",
      });
      Event.hasMany(models.Ticket, {
        foreignKey: "eventId",
      });
    }
  }
  Event.init(
    {
      name: DataTypes.STRING,
      location: DataTypes.STRING,
      date: DataTypes.STRING,
      capacity: DataTypes.INTEGER,
      eventCategoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Event",
    }
  );
  return Event;
};
