const db = require("./db");
const { DataTypes} = require("sequelize");

const Category = db.define(
  "Category",
  {
    categoryname: {
			type: DataTypes.STRING,
			allowNull: {
			  args: false,
			  msg: 'Please enter category name'
			}
		}
  },
  {
    tableName: "Categories",
  }
);

module.exports = Category;
