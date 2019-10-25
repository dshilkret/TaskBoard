/** MAIN PACKAGES*/
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
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
const authRoutes = require('./routes/auth');
const errorRoutes = require('./routes/errors');

/** RUTES MIDDLEWARES */
// app.use(express.json());
app.use(basecampRoutes);
app.use(authRoutes);
app.use(errorRoutes);

app.use((error, req, res, next) => {

  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
      message: message,
      data: data
  })


})



const MONGODB_URI =
  'MONGO_URL';


mongoose.connect(MONGODB_URI)
.then(() => {

    app.listen(8080);

})
.catch(err => console.log(err));