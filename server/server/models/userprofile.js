const db = require("./db");
const { DataTypes } = require("sequelize");

const Userprofile = db.define(
  "Userprofile",
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
        as: 'userId',
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: {
        args: true,
        msg: 'Pease enter a gender'
      }
    },
    phonenumber: {
      type: DataTypes.STRING,
      allowNull: {
        args: true,
        msg: 'Pease enter your phone number'
      }
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: {
        args: true,
        msg: 'Pease enter your bio'
      }
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: {
        args: true,
        msg: 'Pease upload profile picture'
      }
    }
  },
  {
    tableName: "Userprofiles",
  }
);

module.exports = Userprofile;
