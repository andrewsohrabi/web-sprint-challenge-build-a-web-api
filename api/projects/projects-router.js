// Write your "projects" router here!!
const express = require('express');
const router = express.Router();
const Projects = require('./projects-model');

// [GET] /api/projects` returns an array of projects (or an empty array) as the body of the response.
router.get('/', (req,res)=> {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects)
        }).catch(err => {
            res.status(500).json({message: 'error fetching projects'})
        })
})





module.exports = router;