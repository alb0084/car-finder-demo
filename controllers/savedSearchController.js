const SavedSearch = require('../models/savedSearchModel');

exports.saveSearch = async (req, res) => {
    const { title, makeFilter, bodyStyleFilter, minPrice, maxPrice, sortOption, fuelFilter } = req.body;
    try {
        console.log('req.body', title, makeFilter, bodyStyleFilter, minPrice, maxPrice, sortOption, fuelFilter);
        const newSearch = await SavedSearch.create({
            title,
            makeFilter,
            bodyStyleFilter,
            minPrice,
            maxPrice,
            sortOption,
            fuelFilter,
            userId: req.user.id
        });

        res.status(201).json({ message: 'Search saved successfully', search: newSearch });
    } catch (error) {
        console.error('Error saving search:', error);
        res.status(500).json({ message: 'Error saving search' });
    }
};

exports.getSavedSearches = async (req, res) => {
    try {
        const savedSearches = await SavedSearch.findAll({
            where: { userId: req.user.id },
        });

        res.json(savedSearches);
    } catch (error) {
        console.error('Error retrieving saved searches:', error);
        res.status(500).json({ message: 'Error retrieving saved searches', error });
    }
};

// Function to delete a saved search
exports.deleteSavedSearch = async (req, res) => {
    try {
        const { searchId } = req.params; // Get the ID of the search to delete

        // Find the search by ID and delete
        const deletedCount = await SavedSearch.destroy({
            where: {
                id: searchId,
                userId: req.user.id // Ensure the user is authenticated
            }
        });

        if (deletedCount === 0) {
            return res.status(404).json({ message: 'Saved search not found or not authorized' });
        }

        res.json({ message: 'Saved search successfully deleted' });
    } catch (error) {
        console.error('Error deleting saved search:', error);
        res.status(500).json({ message: 'Error deleting saved search', error });
    }
};
