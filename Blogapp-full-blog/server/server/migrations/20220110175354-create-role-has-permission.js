module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Rolehaspermissions', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			roleId: {
				type: Sequelize.INTEGER,
				onDelete: 'CASCADE',
				references: {
					model: 'Roles',
					key: 'id',
					as: 'roleId',
				},
			},
			permissionId: {
				type: Sequelize.INTEGER,
				onDelete: 'CASCADE',
				references: {
					model: 'Permissions',
					key: 'id',
					as: 'permissionId',
				},
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: (queryInterface) /* , Sequelize */ =>
		queryInterface.dropTable('Rolehaspermissions'),
};
