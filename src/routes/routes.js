const { application } = require('express');
const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const { getConnection } = require('../accesDB');

const getIndex =  (req, res, next) => {
    res.render('index', { title: 'Stay Safe Home' });
};
const getPrevention = (req, res, next) => {
    res.render('prevention', { title: 'Stay Safe Prevention' });
};
const getSymptoms = (req, res, next) => {
    res.render('symptoms', { title: 'Stay Safe Symptoms' });
};
const getLogin = (req, res, next) => {
    res.render('login', { title: 'Stay Safe Login' });
};

const postLogin = async (req, res) =>{
    data = req.body;
    console.log(data)
    let passwordHaash = await bcryptjs.hash(data.password, 10);
    console.log(passwordHaash)
}

module.exports = {
    router, getIndex ,getPrevention, getSymptoms, getLogin, postLogin
};