const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false, // Set to true to see SQL query logs if is needed.
});

sequelize
    .authenticate()
    .then(() => console.log('Database connection successful'))
    .catch((err) => console.error('Error connecting to the database:', err));

module.exports = sequelize;
