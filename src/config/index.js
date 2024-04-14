require('dotenv').config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const SECRET_KEY = process.env.SECRET_KEY;


module.exports = {
  PORT,
  MONGO_URI,
  SECRET_KEY,

};