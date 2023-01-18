const db = require("./db");
const { DataTypes } = require("sequelize");

const Comment = db.define(
  "Comment",
  {
    commenttext: {
      type: DataTypes.TEXT('long'),
      allowNull: {
        args: false,
        msg: 'Pease enter a comment'
      }
    },
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
    tableName: "Comments",
  }
);

module.exports = Comment;