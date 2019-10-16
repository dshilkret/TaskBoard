const express = require('express');

const ProjectsController = require('../controllers/ProjectsController');

const router = express.Router();

/** CUSTOM VALIDATION MIDDLEWARES */
const projectValidation = require('./validation/projectValidation');

/** CUSTOM AUTH MIDDLEWARE */
const isAuth = require('../middlewares/Auth/is-auth').isAuth;

router.get('/projects', ProjectsController.index);
router.post('/projects', isAuth, projectValidation.storeProject, ProjectsController.store);
router.get('/projects/:projectId', isAuth, ProjectsController.show);

// router.get('/', basecampController.index);


module.exports = router;