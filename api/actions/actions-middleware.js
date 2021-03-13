const Actions = require('./actions-model');

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

module.exports = {
    checkId
}