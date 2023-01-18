const db = require('./db');
const { DataTypes } = require('sequelize');

const Rolehaspermission = db.define(
	'Rolehaspermission',
	{
		roleId: {
			type: DataTypes.INTEGER,
			references: {
			  model: 'Role',
			  key: 'id',
			  as: 'roleId',
			}
		},
		permissionId: {
			type: DataTypes.INTEGER,
			references: {
				model: 'Permission',
				key: 'id',
				as: 'permissionId',
			}
		},
	},
	{
		tableName: 'Rolehaspermissions',
	}
);

module.exports = Rolehaspermission;
