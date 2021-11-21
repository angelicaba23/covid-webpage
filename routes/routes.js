const express = require('express');
const router = express.Router();

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

module.exports = {
    router, getIndex ,getPrevention,
     getSymptoms, getLogin
};