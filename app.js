//Express Setup
const express = require("express");
const app = express();
//Routes
const eventRoutes = require('./apis/events/eventRoutes')
//Mongoose Setup
const connectDb = require("./database");
//database call
connectDb();
//Morgan Logger
const morgan = require('morgan')
//ErrorHandler Middleware
const errorHandler =require('./middleware/errorHandler')
//Json Middleware
app.use(express.json())
//Morgan Call
app.use(morgan("dev"))

//CRUD Routes
app.use("/api/events", eventRoutes)

//Error Handling Middleware
app.use(errorHandler)

//Server Activation
const PORT  = 8000
app.listen(PORT, () => {
    console.log('Express Server Running on localhost:8000')
}) 