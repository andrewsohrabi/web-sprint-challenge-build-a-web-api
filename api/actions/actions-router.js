// Write your "actions" router here!
const express = require('express');
const router = express.Router();
const Actions = require('./actions-model');

//[GET] /api/actions
router.get('/', (req,res) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions)
        }).catch(err => {
            res.status(500).json({message: 'error getting actions'})
        })
})

module.exports = router;