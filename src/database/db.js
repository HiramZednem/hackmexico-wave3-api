const { MONGO_URI } = require('../config');
const mongoose = require('mongoose');

const { connect } = mongoose;

const connectDB = () => {
    mongoose.connect(MONGO_URI);
}

module.exports = {
    connectDB
};