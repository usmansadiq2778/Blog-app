const db = require('./db');
const { DataTypes } = require('sequelize');

const Role = db.define(
	'Role',
	{
		rolename: {
			type: DataTypes.STRING,
			allowNull: {
				args: false,
				msg: 'Please enter role name'
			}
		},
		roledescription: {
			type: DataTypes.TEXT('long'),
			allowNull: {
				args: true,
				msg: 'Please enter role description'
			}
		}
	},
	{
		tableName: 'Roles',
	}
);

module.exports = Role;
