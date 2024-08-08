// mockApp.js
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const mockApp = express();
mockApp.use(bodyParser.json());


let savedSearches = [
    { id: 1, title: 'Search 1', makeFilter: 'Toyota', bodyStyleFilter: 'Sedan', minPrice: 10000, maxPrice: 30000, sortOption: 'price', fuelFilter: 'Petrol', userId: 1 },
    { id: 2, title: 'Search 2', makeFilter: 'Honda', bodyStyleFilter: 'Coupe', minPrice: 15000, maxPrice: 35000, sortOption: 'year', fuelFilter: 'Diesel', userId: 1 }
];

// Mock authentication middleware
const ensureAuthenticated = (req, res, next) => {
    req.user = { id: 1 }; // Mock user
    next();
};

// Mock routes for automobiles
mockApp.get('/api/automobiles', (req, res) => {
    const automobiles = [
        { id: 1, make: 'Toyota', model: 'Corolla', year: 2020, price: 20000 },
        { id: 2, make: 'Honda', model: 'Civic', year: 2021, price: 22000 },
    ];

    if (req.query.page === 'invalid') {
        return res.status(400).json({ message: 'Invalid query parameters' });
    }

    if (req.query.make) {
        const filteredAutomobiles = automobiles.filter(car => car.make === req.query.make);
        return res.json({ automobiles: filteredAutomobiles, totalPages: 1, currentPage: 1, totalItems: filteredAutomobiles.length });
    }

    res.json({ automobiles, totalPages: 1, currentPage: 1, totalItems: automobiles.length });
});

mockApp.post('/api/automobiles', (req, res) => {
    const { make, model, year, price } = req.body;
    if (!make || !model || !year || !price || typeof year !== 'number' || typeof price !== 'number') {
        return res.status(400).json({ message: 'Error creating the automobile' });
    }
    const newCar = { id: 3, make, model, year, price };
    res.status(201).json(newCar);
});

// Mock routes for saved searches
mockApp.post('/api/saved-searches', ensureAuthenticated, (req, res) => {
    const { title, makeFilter, bodyStyleFilter, minPrice, maxPrice, sortOption, fuelFilter } = req.body;
    const newSearch = {
        id: savedSearches.length + 1,
        title,
        makeFilter,
        bodyStyleFilter,
        minPrice,
        maxPrice,
        sortOption,
        fuelFilter,
        userId: req.user.id,
    };
    savedSearches.push(newSearch);
    res.status(201).json({ message: 'Search saved successfully', search: newSearch });
});

mockApp.get('/api/saved-searches', ensureAuthenticated, (req, res) => {
    const userSearches = savedSearches.filter(search => search.userId === req.user.id);
    res.json(userSearches);
});

mockApp.delete('/api/saved-searches/:searchId', ensureAuthenticated, (req, res) => {
    const { searchId } = req.params;
    const index = savedSearches.findIndex(search => search.id === parseInt(searchId) && search.userId === req.user.id);
    if (index === -1) {
        return res.status(404).json({ message: 'Saved search not found or not authorized' });
    }
    savedSearches.splice(index, 1);
    res.json({ message: 'Saved search successfully deleted' });
});

// Mock route for sharing saved searches
mockApp.post('/api/share-search', ensureAuthenticated, (req, res) => {
    const { searchId, email, details } = req.body;
    const sortType = { priceLowToHigh: 'Price Low To High', priceHighToLow: 'Price High To Low', yearNewest: 'Newest Year', yearOldest: 'Oldest Year' };
    const sortTypeKey = details.sortOption;
    const search = savedSearches.find(s => s.id === parseInt(searchId));
    
    if (!search) {
        return res.status(404).json({ message: 'Search did not find' });
    }

    // Mock nodemailer
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'mockemail@gmail.com',
            pass: 'mockpassword',
        },
    });

    const mailOptions = {
        from: 'card-finder@gmail.com',
        to: email,
        subject: `Invitation to view the search "${search.title}"`,
        html: `<p>A User has invited you to view the his search <strong>"${search.title}"</strong>, with the following details:</p>
                <p>fuel: ${details.fuelFilter}</p>
                <p>Car body style: ${details.bodyStyleFilter}</p>
                <p>Min price: ${details.minPrice}</p>
                <p>Max price: ${details.maxPrice}</p>
                <p>Type sort: ${sortType[sortTypeKey]}</p>
       <p><a href="http://localhost:3000/invitation?searchId=${searchId}">Click here</a> to sign up and view the search's details.</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Error During sending an email.' });
        }
        res.status(200).json({ message: 'Sending Email successful.' });
    });
});

module.exports = mockApp;
