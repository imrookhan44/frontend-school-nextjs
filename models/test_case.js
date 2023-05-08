'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, Sequelize) => {
  class TestCase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }`
  }
  TestCase.init(
    {
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
    },
    {
      sequelize,
      modelName: 'TestCase',
    },
  )
  return TestCase
}
