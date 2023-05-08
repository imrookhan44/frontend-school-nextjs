'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Quizzes', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      order: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      json: {
        type: Sequelize.STRING
      },
      courseId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Courses',
          key: 'id',
          as: 'courseId'
        }
      },
      sectionId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Sections',
          key: 'id',
          as: 'sectionId'
        }
      },
      userId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId'
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
    await queryInterface.dropTable('Quizzes');
  }
};
