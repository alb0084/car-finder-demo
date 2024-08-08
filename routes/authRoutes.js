const express = require('express');
const { passport } = require('../middleware/authMiddleware');

const router = express.Router();

// Run auth flow Google
router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
}));

// Callback management after auth with google 
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        console.log('Auth Google Sucessfull');
        res.redirect('http://localhost:3000/home');
    }
);

router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});

module.exports = router;
