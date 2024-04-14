const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
    },
    phone: {
        type: String,
    },
    dateOfBirth: {
        type: Date,
    },
    state: {
        type: String,
    },
    address: {
        type: String,
    },
    cp: {
        type: String,
    },
    walletaddress: {
        type: String,
    },
    pvwalletaddress: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;