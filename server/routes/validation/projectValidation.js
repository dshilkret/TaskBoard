const { body, check } = require('express-validator');

module.exports.storeProject = [

    check('title')
    .isLength({ min: 3 })
    .not().isEmpty()
    .trim(),

    body('description')
    .isLength({ min: 8 })
    .trim(),

];