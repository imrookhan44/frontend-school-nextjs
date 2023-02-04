"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Excercises", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      order: {
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      problemDescription: {
        type: Sequelize.STRING,
      },
      solutionDescription: {
        type: Sequelize.STRING,
      },
      videoLink: {
        type: Sequelize.STRING,
      },
      startingCode: {
        type: Sequelize.STRING,
      },
      testCases: {
        type: Sequelize.STRING,
      },
      testCaseResults: {
        type: Sequelize.STRING,
      },
      courseId: {
        type: Sequelize.UUID,
        onDelete: "CASCADE",
        references: {
          model: "Courses",
          key: "id",
          as: "courseId",
        },
      },
      sectionId: {
        type: Sequelize.UUID,
        onDelete: "CASCADE",
        references: {
          model: "Sections",
          key: "id",
          as: "sectionId",
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Excercises");
  },
};
