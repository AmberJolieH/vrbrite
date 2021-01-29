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
      website: DataTypes.STRING,
      state: DataTypes.STRING,
      lat: DataTypes.DECIMAL,
      long: DataTypes.DECIMAL,
      distance: DataTypes.FLOAT,
      startsAt: DataTypes.DATE,
      endsAt: DataTypes.DATE,
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
