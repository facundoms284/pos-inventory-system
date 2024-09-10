// Sequelize database
const { Sequelize } = require('sequelize');

// Environment variables
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: false,
  }
);

// Conecction to database by a function
const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado a la base de datos con éxito');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
};

connectToDatabase();

module.exports = sequelize;
