// Write your "actions" router here!
const express = require('express');
const router = express.Router();
const Actions = require('./actions-model');
const {checkId, checkProjectId} = require('./actions-middleware');

//[GET] /api/actions
router.get('/', (req,res) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions)
        }).catch(err => {
            res.status(500).json({message: 'error getting actions'})
        })
})

// [GET] /api/action/:id

router.get('/:id', checkId, (req,res)=> {
    res.status(200).json(req.action)
})

// [POST] /api/actions 
//returns the newly created action as the body of the _response_.

router.post('/', checkProjectId, (req,res)=> {
    res.status(202).json(res.action);
})

//[PUT] /api/actions/:id` 
//returns the updated action as the body of the _response_.




module.exports = router;