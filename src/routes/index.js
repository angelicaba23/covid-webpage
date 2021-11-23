var express = require('express');
var router = express.Router();

const {
    getIndex , getPrevention,
     getSymptoms, getLogin
} = require('./routes');

const {
    getGraph, getPie
} = require('../controller/apiController');

router.get('/', getIndex)
router.get('/prevention', getPrevention)
router.get('/symptoms', getSymptoms)
router.get('/login', getLogin)
router.get('/getgraph', getGraph)
router.get('/getpie', getPie)


module.exports = router;

