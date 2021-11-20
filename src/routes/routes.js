const express = require('express');
const router = express.Router();

const getIndex = function (req, res, next) {
    res.render('layouts/index', { title: 'TaxiFlow' });
};
const getBlog = function (req, res, next) {
    res.render('layouts/blog', { title: 'TaxiFlow' });
};
const getContact = function (req, res, next) {
    res.render('layouts/contact', { title: 'TaxiFlow' });
};
const getPrevention = function (req, res, next) {
    res.render('layouts/prevention', { title: 'TaxiFlow' });
};
const getSymptoms = function (req, res, next) {
    res.render('layouts/symptoms', { title: 'TaxiFlow' });
};
const getAbout = function (req, res, next) {
    res.render('layouts/about', { title: 'TaxiFlow' });
};
const getLogin = function (req, res, next) {
    res.render('layouts/login', { title: 'TaxiFlow' });
};

module.exports = {
    router, getIndex , getBlog, getContact,
    getPrevention, getSymptoms, getAbout, getLogin
};