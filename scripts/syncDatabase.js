const sequelize = require('../config/db');
const User = require('../models/User');

// Sync DB
const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: true }); 
        console.log('Database sinc successfull.');
        process.exit();
    } catch (error) {
        console.error('Error in script during sync in file syncDatabase:', error);
        process.exit(1);
    }
};

syncDatabase();
