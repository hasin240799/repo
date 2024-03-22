'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class AssignmentSubmission extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }
  AssignmentSubmission.init(
    {
      assignmentId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      studentId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      grade: {
        type: DataTypes.STRING
      },
      filePath: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'AssignmentSubmission',
      
    }
  );

  // Define association inside the init method
  AssignmentSubmission.belongsTo(sequelize.models.Assignment, { foreignKey: 'assignmentId' }); // Assuming the foreign key in AssignmentSubmission model is assignmentId

  return AssignmentSubmission;
};
