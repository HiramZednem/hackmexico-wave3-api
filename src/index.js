const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connectDB } = require ('./database/db');
const { PORT } = require('./config');
const userRoutes = require('./routes/user.routes');

const app = express();

connectDB();

// Middlewares
app.use(express.json())
app.use(cors());
app.use(morgan('dev'));

// Routes
app.get('/', (req, res)=>{
    res.status(200).json({
      name:'API WAVE3'
    })
  });

app.use('/api', userRoutes );

// Server
app.listen(PORT, ( ) => { 
    console.log(`listening on port ${PORT}`) 
});

