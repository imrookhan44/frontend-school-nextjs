"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  class Excercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }
  Excercise.init(
    {
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
    },
    {
      sequelize,
      modelName: "Excercise",
    }
  );
  return Excercise;
};
