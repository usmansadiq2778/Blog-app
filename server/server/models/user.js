const db = require("./db");
const { DataTypes } = require("sequelize");
const User = db.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: {
        args: true,
        msg: 'Please enter your name'
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your email address'
      },
      unique: {
        args: true,
        msg: 'Email already exists'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Please enter a valid email address'
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter a password'
      },
      validate: {
        isNotShort: (value) => {
          if (value.length < 8) {
            throw new Error('Password should be at least 8 characters!');
          }
        },
      },
    },
    roleId: {
			type: DataTypes.INTEGER,
			references: {
			  model: 'Role',
			  key: 'id',
			  as: 'roleId',
			}
		}
  },
  {
    tableName: "Users",
  }
);
module.exports = User;
