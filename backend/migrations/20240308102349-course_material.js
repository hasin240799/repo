// migrations/YYYYMMDDHHMMSS-create-course-material.js

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CourseMaterials', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      fileUrl: {
        type: Sequelize.STRING,
        allowNull: false
      },
      courseId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      department: {
        type: Sequelize.STRING, // Adjust the data type as needed
        allowNull: false
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
    await queryInterface.dropTable('CourseMaterials');
  }
};
