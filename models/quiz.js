'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class Quiz extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }
  Quiz.init(
    {
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
      }
    },
    {
      sequelize,
      modelName: 'Quiz'
    }
  );
  return Quiz;
};
