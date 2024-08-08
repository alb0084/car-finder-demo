
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const SavedSearch = sequelize.define('SavedSearch', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fuelFilter: {
        type: DataTypes.STRING,
    },
    bodyStyleFilter: {
        type: DataTypes.STRING,
    },
    minPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
    },
    maxPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 100000,
    },
    sortOption: {
        type: DataTypes.STRING,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        },
    },
});

module.exports = SavedSearch;

module.exports = SavedSearch;
