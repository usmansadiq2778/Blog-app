const db = require("./db");
const { DataTypes } = require("sequelize");

const Like = db.define(
  "Like",
  {
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Post',
        key: 'id',
        as: 'postId',
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
        as: 'userId',
      }
    }
  },
  {
    tableName: "Likes",
  }
);
module.exports = Like;