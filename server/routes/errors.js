const path = require('path');
const express = require('express');

const app = express();

app.use((req, res, next) => {

    res.status(404).sendFile(path.join(__dirname, '..', 'views', '404.html'));

})



module.exports = app;