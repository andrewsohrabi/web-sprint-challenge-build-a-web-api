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

// [POST] /api/projects` returns the newly created project as the body of the _response_.

router.post('/', (req,res)=> {
    const {name,description} = req.body
    if (!name || !description) {
        res.status(400).json({message: 'missing name or description fields'})
    } else {
        Projects.insert(req.body)
            .then(res.status(202).json(req.body))
            .catch(()=> {res.status(500).json({message: 'error creating new project'})})
    }
})

// [PUT] /api/projects/:id` returns the updated project as the body of the _response_.

router.put('/:id',checkProjectId, (req,res)=> {
    const {name,description} = req.body
    if (!name || !description) {
        res.status(400).json({message: 'missing name or description fields'})
    } else {
        Projects.update(req.params.id, req.body)
            .then(res.status(202).json(req.body))
            .catch(()=> {res.status(500).json({message: `error updating project ${req.params.id}`})})
    }
})

// [DELETE] /api/projects/:id` returns no _response_ body.

router.delete('/:id',checkProjectId,(req,res)=> {
    Projects.remove(req.params.id)
        .then(res.status(200).json({}))
        .catch(res.status(500).json({message: 'error deleting project'}))
})

// [GET] /api/projects/:id/actions` sends an array of actions (or an empty array) as the body of the response.

router.get('/:id/actions',checkProjectId,(req,res)=> {
    Projects.getProjectActions(req.params.id)
        .then(actions => {
            res.status(200).json(actions)
        }).catch(err => {
            res.status(500).json({message: 'error fetching project action'})
        })
})

module.exports = router;