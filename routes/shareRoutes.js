const express = require('express');
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const { shareSavedSearch } = require('../controllers/shareSavedSearchController');

const router = express.Router();

//resource to share search saved content
router.post('/share-search', ensureAuthenticated, shareSavedSearch);

module.exports = router;
