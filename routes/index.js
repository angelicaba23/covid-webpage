var express = require('express');
var router = express.Router();

const {
    getIndex,
    getHistory
} = require('../controller/indexController');

const {
    gpsLocation,
    gpsDates,
    timestamp
} = require('../controller/apiController');

/* GET home page. */
router.get('/', getIndex);
router.get('/historial', getHistory);
router.get('/live',  gpsLocation);
router.post('/dates', gpsDates);
router.post('/timestamp', timestamp);

module.exports = router;

