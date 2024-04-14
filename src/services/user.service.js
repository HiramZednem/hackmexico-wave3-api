const UserModel = require('../models/user.model'); 
const bcrypt = require('bcrypt');
const { encrypt, decrypt } = require('../util/crypto');

const createUserService = async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user using the UserModel
        const user = new UserModel({
            email,
            hashedPassword,
        });

        // Save the user to the database
        await user.save();

        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create user', error });
    }
}

const getAllUsersService = async (req, res) => {
    try {
        const users = await UserModel.find();

        
        const decrypted = decrypt('67ce0cd87cdc8e50060f9ec846d4dd57')
        console.log(decrypted);

        res.status(200).json({ message: 'Users retrieved successfully', users });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve users', error });
    }
}



module.exports = {
    createUserService,
    getAllUsersService,
};