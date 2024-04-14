require('dotenv').config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const SECRET_KEY = process.env.SECRET_KEY;
const WAVE3_WALLET = process.env.WAVE3_WALLET;


module.exports = {
  PORT,
  MONGO_URI,
  SECRET_KEY,
  WAVE3_WALLET
};