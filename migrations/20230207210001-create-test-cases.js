'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Test_cases', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      order: {
        type: Sequelize.INTEGER,
      },
      input: {
        type: Sequelize.STRING,
      },
      expectedOutput: {
        type: Sequelize.STRING,
      },
      hidden: {
        type: Sequelize.BOOLEAN,
      },
      excerciseId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Excercises',
          key: 'id',
          as: 'excerciseId',
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
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Test_cases')
  },
}
