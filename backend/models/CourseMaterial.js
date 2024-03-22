// models/CourseMaterial.js

'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class CourseMaterial extends Model {}

  CourseMaterial.init(
    {

      user_id: {
        type: DataTypes.STRING,
        allowNull: false
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      department: {
        type: DataTypes.STRING,
        allowNull: true
      },
      fileUrl: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    {
      sequelize,
      modelName: 'CourseMaterial',
    }
  );

  return CourseMaterial;
};
