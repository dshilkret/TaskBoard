/** MAIN PACKAGES*/
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

/** EJS */
// app.set('view engine', 'ejs');

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

/** CORS ORIGIN */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization');
    next();
})

/** ROUTES REQUIRE*/
const basecampRoutes = require('./routes/basecamp');
const errorRoutes = require('./routes/errors');

/** RUTES MIDDLEWARES */
app.use(basecampRoutes);
app.use(errorRoutes);


app.listen(8080);