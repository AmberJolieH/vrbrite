"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ticket.belongsTo(models.Event, {
        foreignKey: "eventId",
      });
      Ticket.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  Ticket.init(
    {
      price: DataTypes.FLOAT,
      eventId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Ticket",
    }
  );
  return Ticket;
};
