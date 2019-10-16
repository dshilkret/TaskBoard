const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');



/** REGISTRACIJA KORISNIKA */

exports.store = (req, res, next) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){

        return res.status(422).json({
            errors: errors.array()
        })

    }
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    bcrypt.hash(password, 12)
    .then(hashedPassword => {

        const user = new User({
            username: username,
            email: email,
            password: hashedPassword
        })

        return user.save();
    })
    .then(user => {
        res.status(201).json({
            message: 'Uspješna registracija',
        })
    })
    .catch(err => {
        next(err);
    })
    
}

/** PRIJAVA KORISNIKA */

exports.signIn = (req, res, next) => {

    const errors = validationResult(req);
    
    if(!errors.isEmpty) {
        return res.status(422).json({
            errors: errors.array()
        })
    }

    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;

    User.findOne({email: email})
    .then(user => {

        if(!user) {
            const error = new Error('Ne postoji korisnik s upisanom email adresom');
            error.statusCode = 401;
            throw error;
        }

        loadedUser = user;

        return bcrypt.compare(password, user.password)
        
    })
    .then(doMatch => {

        if(!doMatch) {
            const error = new Error('Ne postoji korisnik s upisanom lozinkom');
            error.statusCode = 401;
            throw error;    
        }
        
        const token = jwt.sign({
            email: loadedUser.email,
            userId: loadedUser._id.toString()
        },
        'secrettoken',
        { expiresIn: '3h'}
        );

        return res.status(200).json({
            token: token,
            userId: loadedUser._id.toString() 
        });

    })
    .catch(err => {
        next(err);
    });

}