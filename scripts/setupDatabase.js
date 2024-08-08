const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const sequelize = require('../config/db');
const Automobile = require('../models/automobileModel');

const setupDatabase = async () => {
    try {
        // Sync Db and recreate table
        await sequelize.sync({ force: true });
        console.log('Database syncronized');

        const automobiles = [];
        const filePath = path.join(__dirname, 'Automobile_data.csv');

        fs.createReadStream(filePath)
            .pipe(csv.parse({ headers: true }))
            .on('data', (row) => {
                //Map field ena value management  
                const formattedRow = {
                    symboling: row['symboling'] ? parseInt(row['symboling'], 10) : null,
                    normalized_losses: row['normalized-losses'] ? parseFloat(row['normalized-losses']) : null,
                    make: row['make'],
                    fuel_type: row['fuel-type'],
                    aspiration: row['aspiration'],
                    num_of_doors: row['num-of-doors'],
                    body_style: row['body-style'],
                    drive_wheels: row['drive-wheels'],
                    engine_location: row['engine-location'],
                    wheel_base: row['wheel-base'] ? parseFloat(row['wheel-base']) : null,
                    length: row['length'] ? parseFloat(row['length']) : null,
                    width: row['width'] ? parseFloat(row['width']) : null,
                    height: row['height'] ? parseFloat(row['height']) : null,
                    curb_weight: row['curb-weight'] ? parseInt(row['curb-weight'], 10) : null,
                    engine_type: row['engine-type'],
                    num_of_cylinders: row['num-of-cylinders'],
                    engine_size: row['engine-size'] ? parseInt(row['engine-size'], 10) : null,
                    fuel_system: row['fuel-system'],
                    bore: row['bore'] ? parseFloat(row['bore']) : null,
                    stroke: row['stroke'] ? parseFloat(row['stroke']) : null,
                    compression_ratio: row['compression-ratio'] ? parseFloat(row['compression-ratio']) : null,
                    horsepower: row['horsepower'] ? parseInt(row['horsepower'], 10) : null,
                    peak_rpm: row['peak-rpm'] ? parseInt(row['peak-rpm'], 10) : null,
                    city_mpg: row['city-mpg'] ? parseInt(row['city-mpg'], 10) : null,
                    highway_mpg: row['highway-mpg'] ? parseInt(row['highway-mpg'], 10) : null,
                    price: row['price'] ? parseFloat(row['price']) : null,
                    year: row['year'] ? parseInt(row['year'], 10) : null,
                    car_body: row['car_body'] || null
                };

                automobiles.push(formattedRow);
            })
            .on('end', async () => {
                try {
                    await Automobile.bulkCreate(automobiles);
                    console.log('Data imported');
                    process.exit();
                } catch (error) {
                    console.error("Error insert data in setupDatabase script:", error);
                }
            })
            .on('error', (error) => {
                console.error('Error during reading CSV file:', error);
            });
    } catch (error) {
        console.error('Errore during database configuration:', error);
    }
};

setupDatabase();
