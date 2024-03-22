'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AssignmentSubmissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      assignmentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Assignments', // Assuming 'Assignments' is the name of the referenced table
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      studentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      grade: {
        type: Sequelize.STRING
      },
      filePath: {
        type: Sequelize.STRING,
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

    // Add foreign key constraint
    await queryInterface.addConstraint('AssignmentSubmissions', {
      fields: ['assignmentId'],
      type: 'foreign key',
      name: 'fk_assignmentId', // Specify a name for the constraint if needed
      references: {
        table: 'Assignments',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },
  down: async (queryInterface, Sequelize) => {
    // Drop the foreign key constraint first
    await queryInterface.removeConstraint('AssignmentSubmissions', 'fk_assignmentId');

    // Then drop the table
    await queryInterface.dropTable('AssignmentSubmissions');
  }
};
