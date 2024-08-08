const SavedSearch = require('../models/savedSearchModel');
const nodemailer = require('nodemailer');


exports.shareSavedSearch = async (req, res) => {
    const { searchId, email, details } = req.body;
    const sortType = { priceLowToHigh: 'Price Low To High', priceHighToLow: 'Price High To Low', yearNewest: 'Newest Year', yearOldest: 'Oldest Year' };
    const sortTypeKey = details.sortOption;
    try {
        // get detail from search saved
        const search = await SavedSearch.findByPk(searchId);

        if (!search) {
            return res.status(404).json({ message: 'Search did not find' });
        }

        // nodemailer configuration
        console.log('transporter', process.env.EMAIL, process.env.PASSWORD_EMAIL);
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD_EMAIL,
            },
        });

        // Email configuration
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

        // Sending email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Sending Email successfull.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error During sending an email.' });
    }
}