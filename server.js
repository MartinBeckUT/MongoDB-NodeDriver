const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 4000;

const customerRoutes = require('./routes/customer')

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(bodyParser.json());

const uri = process.env.MONGODB_URI

// Routes that should handle requests
app.use('/customer', customerRoutes)

// Catch errors that go beyond the above routes
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

// Passes direct errors
app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

app.listen(port, function() {
    console.log("Server is running on Port: " + port)
})