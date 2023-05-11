"use strict";
const { Model } = require("sequelize");
const { hashingPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Username Cannot Be Empty" },
          notNull: { msg: "Username Cannot Be Empty" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { msg: "Email Cannot Be Empty" },
          notNull: { msg: "Email Cannot Be Empty" },
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Password Cannot Be Empty" },
          notNull: { msg: "Password Cannot Be Empty" },
          validatePassword() {
            if (this.password.length < 4) {
              throw new Error("Password Min Length 4");
            }
          },
        },
      },
      phoneNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Phone Number Cannot Be Empty" },
          notNull: { msg: "Phone Number Cannot Be Empty" },
          validatePhonenumber() {
            if (this.phoneNumber.length > 15) {
              throw new Error("Password Max Length 15");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((user) => {
    user.password = hashingPassword(user.password);
  });
  return User;
};
