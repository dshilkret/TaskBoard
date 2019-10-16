const { validationResult } = require('express-validator');

const errorValidation = require('../middlewares/Errors');

const Project = require('../models/Project');
const User = require('../models/User');


exports.index = (req, res, next) => {

    // .find({'owner': req.userId})
    Project
    .find()
    .then(projects => {
     
        res.status(200).json({
            projects: projects
        })

    })
    .catch(err => {
        next(err);
    });
}

exports.store = async (req, res, next) => {
    
    const errors = validationResult(req);

    if(!errors.isEmpty()){

        return res.status(422).json({
            errors: errors.array()
        });

    }

    const title = req.body.title;
    const description = req.body.description;

    const project = new Project({
        title: title,
        description: description,
        owner: req.userId
    })

    project.save()
    .then(project => {

        return User.findById(req.userId)
    
    })
    .then(user => {
    
        user.projects.push(project);
        return user.save()
    
    })
    .then(() => {

        res.status(201).json({
            message: 'Product successfully created',
            project: project
        });
        
    })
    .catch(err =>{
        next(err);
    });

}

exports.show = (req, res, next) => {

    const projectId = req.params.projectId;

    Project.findById(projectId)
    .then(project => {
        if(project.owner.toString() !== req.userId) {
            const error = new Error('Zabranjen pristup');
            error.statusCode = 403;
            throw error;
        }

        res.status(200).json({
            project: project
        })

    })
    .catch(err => {
        next(err);
    })

}