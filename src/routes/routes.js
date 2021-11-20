const express = require('express');
const router = express.Router();

const getIndex = function (req, res, next) {
    res.render('layouts/index', { title: 'Stay Safe Home' });
};
const getBlog = function (req, res, next) {
    res.render('layouts/blog', { title: 'Stay Safe Blog' });
};
const getContact = function (req, res, next) {
    res.render('layouts/contact', { title: 'Stay Safe Contact' });
};
const getPrevention = function (req, res, next) {
    res.render('layouts/prevention', { title: 'Stay Safe Prevention' });
};
const getSymptoms = function (req, res, next) {
    res.render('layouts/symptoms', { title: 'Stay Safe Symptoms' });
};
const getAbout = function (req, res, next) {
    res.render('layouts/about', { title: 'Stay Safe About' });
};
const getLogin = function (req, res, next) {
    res.render('layouts/login', { title: 'Stay Safe Login' });
};

module.exports = {
    router, getIndex , getBlog, getContact,
    getPrevention, getSymptoms, getAbout, getLogin
};