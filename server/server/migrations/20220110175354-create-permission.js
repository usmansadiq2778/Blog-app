module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Permissions', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			permissionname: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			permissiondescription: {
				allowNull: true,
				type: Sequelize.TEXT('long'),
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
		queryInterface.dropTable('Permissions'),
};
