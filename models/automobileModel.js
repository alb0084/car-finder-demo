const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const Automobile = sequelize.define('Automobile', {
    symboling: {
        type: DataTypes.INTEGER,
        allowNull: true, 
    },
    normalized_losses: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    make: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fuel_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    aspiration: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    num_of_doors: {
        type: DataTypes.STRING,
        allowNull: true, 
    },
    body_style: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    drive_wheels: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    engine_location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    wheel_base: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    length: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    width: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    height: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    curb_weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    engine_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    num_of_cylinders: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    engine_size: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fuel_system: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bore: {
        type: DataTypes.FLOAT,
        allowNull: true, 
    },
    stroke: {
        type: DataTypes.FLOAT,
        allowNull: true, 
    },
    compression_ratio: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    horsepower: {
        type: DataTypes.INTEGER,
        allowNull: true, 
    },
    peak_rpm: {
        type: DataTypes.INTEGER,
        allowNull: true, 
    },
    city_mpg: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    highway_mpg: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: true, 
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: true, 
    },
    car_body: {
        type: DataTypes.STRING,
        allowNull: true, 
    },
});

module.exports = Automobile;
