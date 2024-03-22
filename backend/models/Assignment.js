'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Assignment extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }

  Assignment.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    filePath: {
      type: DataTypes.STRING,
      allowNull: false
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Assignment',
    tableName: 'Assignments',
    timestamps: true
  });

  return Assignment;
};
