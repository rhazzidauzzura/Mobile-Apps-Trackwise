"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Report.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Name Cannot Be Empty" },
          notNull: { msg: "Name Cannot Be Empty" },
        },
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Age Cannot Be Empty" },
          notNull: { msg: "Age Cannot Be Empty" },
        },
      },
      characteristic: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Characteristic Cannot Be Empty" },
          notNull: { msg: "Characteristic Cannot Be Empty" },
        },
      },
      long: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Long Cannot Be Empty" },
          notNull: { msg: "Long Cannot Be Empty" },
        },
      },
      lat: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Lat Cannot Be Empty" },
          notNull: { msg: "Lat Cannot Be Empty" },
        },
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Photo Cannot Be Empty" },
          notNull: { msg: "Photo Cannot Be Empty" },
        },
      },
    },

    {
      sequelize,
      modelName: "Report",
    }
  );
  return Report;
};