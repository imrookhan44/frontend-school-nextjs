'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Videos', // table name
        'sectionId', // new field name
        {
          type: Sequelize.UUID,
          onDelete: 'CASCADE',
          references: {
            model: 'Sections',
            key: 'id',
            as: 'sectionId'
          }
        }
      )
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([queryInterface.removeColumn('Videos', 'sectionId')]);
  }
};
