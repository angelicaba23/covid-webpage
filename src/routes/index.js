var express = require('express');
var router = express.Router();

const {
    getIndex , getPrevention,
     getSymptoms, getLogin
} = require('./routes');

router.get('/', getIndex)
router.get('/prevention', getPrevention)
router.get('/symptoms', getSymptoms)
router.get('/login', getLogin)


module.exports = router;

