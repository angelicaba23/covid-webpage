var express = require('express');
var router = express.Router();

const {
    getIndex , getPrevention, getSymptoms,
    getLogin, postLogin
} = require('./routes');

const {
    getGraph, getPie
} = require('../controller/apiController');


router.get('/', getIndex)
router.get('/prevention', getPrevention)
router.get('/symptoms', getSymptoms)
router.get('/signin', getLogin)
router.post('/signin', postLogin)
router.get('/getgraph', getGraph)
router.get('/getpie', getPie)


module.exports = router;

