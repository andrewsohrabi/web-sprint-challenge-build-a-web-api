// Write your "projects" router here!!
const express = require('express');
const router = express.Router();
const Projects = require('./projects-model');
const {checkProjectId} = require('./projects-middleware')

// [GET] /api/projects` returns an array of projects (or an empty array) as the body of the response.
router.get('/', (req,res)=> {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects)
        }).catch(err => {
            res.status(500).json({message: 'error fetching projects'})
        })
})

//[GET] /api/projects/:id` returns a project with the given `id` as the body of the _response_.

router.get('/:id',checkProjectId, (req,res)=> {
    res.status(200).json(req.projects)
})



module.exports = router;