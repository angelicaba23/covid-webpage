var express = require('express');
var router = express.Router();

const {
    getIndex , getBlog, getContact,
    getPrevention, getSymptoms, getAbout, getLogin
} = require('./routes');

router.get('/', getIndex)
router.get('/blog', getBlog)
router.get('/contact', getContact)
router.get('/prevention', getPrevention)
router.get('/symptoms', getSymptoms)
router.get('/about', getAbout)
router.get('/login', getLogin)


module.exports = router;

