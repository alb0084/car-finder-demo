const Automobile = require('../models/automobileModel');
const { Op } = require('sequelize');

// Get all automobiles with filtering, sorting, and pagination
exports.getAllAutomobiles = async (req, res) => {
    // Extract query parameters from the request
    const {
        page = 1,
        limit = 10,
        make,
        bodyStyle,
        minPrice = 0,
        maxPrice = 100000,
        sortBy = 'id',
        sortOrder = 'ASC',
    } = req.query;

    // Parse pagination parameters
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    try {
        // Build where condition for filtering based on query parameters
        const whereCondition = {
            price: {
                [Op.gte]: parseInt(minPrice, 10),
                [Op.lte]: parseInt(maxPrice, 10),
            },
        };

        if (make) {
            whereCondition.make = {
                [Op.like]: `%${make}%`,
            };
        }

        if (bodyStyle) {
            whereCondition.bodyStyle = {
                [Op.like]: `%${bodyStyle}%`,
            };
        }

        // Fetch paginated and filtered results from the database
        const { count, rows } = await Automobile.findAndCountAll({
            where: whereCondition,
            limit: limitNum,
            offset: (pageNum - 1) * limitNum,
            order: [[sortBy, sortOrder]],
        });

        // Send JSON response with automobiles and pagination data
        res.json({
            automobiles: rows,
            totalPages: Math.ceil(count / limitNum),
            currentPage: pageNum,
            totalItems: count,
        });
    } catch (error) {
        console.error('Error fetching automobiles:', error);
        res.status(500).json({ message: 'Error fetching automobiles', error });
    }
};

// Get automobile by ID
exports.getAutomobileById = async (req, res) => {
    try {
        const automobile = await Automobile.findByPk(req.params.id);
        if (!automobile) {
            return res.status(404).json({ message: 'Automobile not found' });
        }
        res.json(automobile);
    } catch (error) {
        console.error('Error fetching automobile by ID:', error);
        res.status(500).json({ message: 'Error fetching automobile', error });
    }
};

// Create a new automobile
exports.createAutomobile = async (req, res) => {
    try {
        const automobile = await Automobile.create(req.body);
        res.status(201).json(automobile);
    } catch (error) {
        console.error('Error creating automobile:', error);
        res.status(400).json({ message: 'Error creating automobile', error });
    }
};

// Update an existing automobile
exports.updateAutomobile = async (req, res) => {
    try {
        const automobile = await Automobile.findByPk(req.params.id);
        if (!automobile) {
            return res.status(404).json({ message: 'Automobile not found' });
        }
        await automobile.update(req.body);
        res.json(automobile);
    } catch (error) {
        console.error('Error updating automobile:', error);
        res.status(400).json({ message: 'Error updating automobile', error });
    }
};

// Delete an existing automobile
exports.deleteAutomobile = async (req, res) => {
    try {
        const automobile = await Automobile.findByPk(req.params.id);
        if (!automobile) {
            return res.status(404).json({ message: 'Automobile not found' });
        }
        await automobile.destroy();
        res.json({ message: 'Automobile successfully deleted' });
    } catch (error) {
        console.error('Error deleting automobile:', error);
        res.status(500).json({ message: 'Error deleting automobile', error });
    }
};
