const path = require('path');
const express = require('express');

const router = express.Router();

const ProjectsController = require('../controllers/ProjectsController');

router.get('/projects', ProjectsController.index);

router.post('/projects', ProjectsController.store);


// router.get('/', basecampController.index);


module.exports = router;