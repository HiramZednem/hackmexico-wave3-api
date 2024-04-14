const UserModel = require('../models/user.model'); 
const bcrypt = require('bcrypt');
const { encrypt, decrypt } = require('../util/crypto');
const { createWallet } = require('../util/web3');

const createUserService = async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const wallet = await createWallet();
        console.log(wallet.privateKey);

        // Create a new user using the UserModel
        const user = new UserModel({
            email,
            password: hashedPassword,
            walletaddress: wallet.address,
            pvwalletaddress: encrypt(wallet.privateKey)
        });

        // Save the user to the database
        await user.save();

        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create user', error });
    }
}

const loginService = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ message: 'Failed to login', error });
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


const updateUserInfoService = async (req, res) => {
    try {
        const { email, fullname, phone, dateOfBirth, state, address, cp } = req.body;
        const user = await UserModel.findOne({email});

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.fullname = fullname;
        user.phone = phone;
        user.dateOfBirth = dateOfBirth;
        user.state = state;
        user.address = address;
        user.cp = cp;
        await user.save();
        

        res.status(200).json({ message: 'User info updated succsesfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update user info', error });
    }
}

module.exports = {
    createUserService,
    loginService,
    getAllUsersService,
    updateUserInfoService,
};