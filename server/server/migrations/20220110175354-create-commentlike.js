'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Commentlikes', {
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
      postId: {
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
        references: {
          model: 'Posts',
          key: 'id',
          as: 'postId',
        }
      },
      commentId: {
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
        references: {
          model: 'Comments',
          key: 'id',
          as: 'commentId',
        }
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Commentlikes');
  }
};