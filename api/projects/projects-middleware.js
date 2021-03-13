const Projects = require('./projects-model')


const checkProjectId = async (req,res,next) => {
    try {
        const {id} = req.params;
        const validProject = await Projects.get(id);
        if(!validProject) {
            res.status(404).json({message: `no valid project with id:${id}`})
        } else {
           Projects.get(id)
            .then(projects => {
                req.projects = projects
                next()
            }).catch(err => {
                res.status(500).json({message: 'error fetching projects'})
            })
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    checkProjectId
}