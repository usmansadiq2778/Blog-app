module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Userprofiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
				type: Sequelize.INTEGER,
				onDelete: 'CASCADE',
				references: {
				  model: 'Users',
				  key: 'id',
				  as: 'userId',
				}
			},
      gender: {
        allowNull: true,
        type: Sequelize.STRING
      },
      phonenumber: {
        allowNull: true,
        type: Sequelize.STRING
      },
      bio: {
        allowNull: true,
        type: Sequelize.STRING
      },
      picture: {
        allowNull: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: queryInterface /* , Sequelize */ =>  queryInterface.dropTable('Userprofiles')
};
