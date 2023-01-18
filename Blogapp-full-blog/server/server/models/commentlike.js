const db = require("./db");
const { DataTypes } = require("sequelize");

const Commentlike = db.define(
  "Commentlike",
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
    },
    commentId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Comment',
          key: 'id',
          as: 'commentId',
        }
      }
  },
  {
    tableName: "Commentlikes",
  }
);
module.exports = Commentlike;