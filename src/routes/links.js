const express = require('express');
const router = express.Router();

const pool = require('../accesDB');

router.get('/add',(req,res) => {
    res.send('Form');
})

router.post('/add', async (req,res) => {
    const {
        name, lastName, cedula, 
        user, password
    } = req.body;
    const newLink = {
        name, lastName, cedula, 
        user, password
    }
    //links es el nombre de la tabla, ya despues modificas como va el codigo
    //await pool.query('INSERT INTO links set ?', [newLink]);
    res.send('Recived');
})

router.get('/', async(req,res) =>{
    //const links = await pool.query('SELEC * FROM links');
    res.send('List will be here');
})

module.exports = router;