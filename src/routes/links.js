const express = require('express');
const router = express.Router();

const pool = require('../accesDB');

router.get('/add',(req,res) => {
    res.send('Form');
})

router.post('/add',(req,res) => {
    res.send('recived');
})

module.exports = router;