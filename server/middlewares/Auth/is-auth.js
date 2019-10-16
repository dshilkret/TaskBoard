const jwt = require('jsonwebtoken');

module.exports.isAuth = (req, res, next) => {

    const tokenHeader = req.get('Authorization');

    if(!tokenHeader) {
        const error = new Error('Niste prijavljeni');
        error.statusCode = 401;
        throw error;
    }

    const token = tokenHeader.split(' ')[1];
    let decodedToken;

    try {

        decodedToken = jwt.verify(token, 'secrettoken')
    
    } catch (err) {

        err.statusCode = 500;
        throw err;    

    }

    if(!decodedToken) {
        const error = new Error('Niste prijavljeni');
        error.statusCode = 401;
        throw error;
    }

    req.userId = decodedToken.userId;
    next();
}