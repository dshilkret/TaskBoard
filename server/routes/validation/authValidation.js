const { body, check } = require('express-validator');

const User = require('../../models/User');

module.exports.signUp = [

    body('username')
    .isLength({ min: 3, max: 50 })
    .not().isEmpty()
    .trim(),
    
    body('email')
    .isEmail()
    .normalizeEmail()
    .custom((value, {req}) => {
        return User.findOne({email: value})
        .then(userDoc => {
            if(userDoc){
                return Promise.reject('Korisnik s tom email adresom je vec registriran')
            }
        })
    }),

    body('password')
    .isLength({ min: 5 })
    .trim()
    .isAlphanumeric()
    .custom((value, { req }) => {
        if(value !== req.body.confirmPassword){
            throw new Error('Lozinke trebaju biti jednake');
        }
        return true;
    })

];


exports.signIn = [

    body('email')
    .isEmail()
    .normalizeEmail()
    .custom((value, {req}) => {
        User.findOne({email: value})
        .then(user => {
            if(!user) {
                return Promise.reject('Ne postoji korisnik s upisanim emailom')
            }

        })
    }),
    body('password')
    .trim()
    .isLength({min: 5}).withMessage('Lozinka treba imati najmanje 5 znakova')
]