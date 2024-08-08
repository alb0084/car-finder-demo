
const express = require('express');
const router = express.Router();
const { saveSearch, getSavedSearches, deleteSavedSearch } = require('../controllers/savedSearchController');
const { ensureAuthenticated } = require('../middleware/authMiddleware');

// resource for saving and search
router.post('/saved-searches', ensureAuthenticated, saveSearch);

// resource to gett all research saved for each user
router.get('/saved-searches', ensureAuthenticated, getSavedSearches);

// resource to delete a saved research
router.delete('/saved-searches/:searchId', ensureAuthenticated, deleteSavedSearch);

module.exports = router;
