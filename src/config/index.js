require('dotenv').config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const MY_SECRET = process.env.MY_SECRET;

module.exports = {
  PORT,
  MONGO_URI,
  MY_SECRET
};