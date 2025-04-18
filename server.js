
const express = require('express')
const colors = require('colors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

//config
dotenv.config()

//mongoDB connection
connectDB()

//rest object
const app = express()

// middlewares
app.use(express.json())   //helps in parsing the json data , request body data can be shown
app.use(morgan('dev'))

//routes

app.use('/api/v1/user', require("./routes/userRoutes"));



// port

const port = process.env.PORT || 8080   //fallbacks to 8080 

// listen port



app.listen(port, () => {
    console.log(`Server Running in ${process.env.NODE_MODE} Mode on port ${port}`.bgCyan.white);
  });


