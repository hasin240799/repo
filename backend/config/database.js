// config/database.js
const Sequelize = require('sequelize');

const sequelize = new Sequelize('lms', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

// try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }

module.exports = sequelize;
