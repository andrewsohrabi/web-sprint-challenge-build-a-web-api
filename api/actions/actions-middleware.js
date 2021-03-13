const Actions = require('./actions-model');
const Projects = require('../projects/projects-model')

const checkId = async (req,res,next) => {
    try {
        const action = await Actions.get(req.params.id)
        if (!action) {
            res.status(404).json({message: 'no action associated with that id'})
        } else {
            req.action = action;
            next();
        }
    } catch (err) {
        next(err)
    }
}

const checkProjectId = async (req,res,next) => {
    try {
        const {project_id} = req.body;
        const validProject = await Projects.get(project_id);
        if(!validProject) {
            res.status(404).json({message: `no valid project with id:${project_id}`})
        } else {
            Actions.insert(req.body)
                .then(action => {
                    res.action = action;
                    next()
                }).catch(err => {
                    res.status(500).json({message: 'error creating new action'})
                })
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    checkId,
    checkProjectId
}