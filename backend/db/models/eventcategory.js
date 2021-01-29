"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EventCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      EventCategory.hasMany(models.Event, {
        foreignKey: "eventCategoryId",
      });
    }
  }
  EventCategory.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "EventCategory",
    }
  );
  return EventCategory;
};
