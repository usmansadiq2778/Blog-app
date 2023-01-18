module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          allowNull: true,
          type: Sequelize.STRING
        },
        email: {
          allowNull: false,
          unique: true,
          type: Sequelize.STRING
        },
        password: {
          allowNull: false,
          type: Sequelize.STRING
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
  down: queryInterface /* , Sequelize */ => queryInterface.dropTable('Users')
};