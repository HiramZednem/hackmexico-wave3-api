const UserModel = require('../models/user.model');

const createUserService = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Create a new user using the UserModel
        const user = new UserModel({
            email,
            password,
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

        res.status(200).json({ message: 'Users retrieved successfully', users });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve users', error });
    }
}
module.exports = {
    createUserService,
    getAllUsersService,
};