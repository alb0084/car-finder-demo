const bcrypt = require('bcrypt');
const User = require('../models/User');

async function createUser() {
    const username = 'test';
    const password = 'test';

    // Hash la pass
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user 
    await User.create({
        username: username,
        password: hashedPassword,
        googleId: null
    });

    console.log('User created successfully');
}

createUser().catch(console.error);
