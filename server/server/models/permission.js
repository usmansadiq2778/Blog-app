const db = require('./db');
const { DataTypes} = require('sequelize');

const Permission = db.define(
	'Permission',
	{
		permissionname: {
			type: DataTypes.STRING,
			allowNull: {
			  args: false,
			  msg: 'Please enter permission name'
			}
		},
		permissiondescription: {
			type: DataTypes.TEXT('long'),
			allowNull: {
			  args: true,
			  msg: 'Please enter permission description'
			}
		}
	},
	{
		tableName: 'Permissions',
	}
);

module.exports = Permission;
