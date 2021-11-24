const { application } = require("express");
const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const { getConnection } = require("../accesDB");

const getIndex = (req, res, next) => {
  res.render("index", { title: "Covid-19 Stats" });
};
const getPrevention = (req, res, next) => {
  res.render("prevention", { title: "Covid-19 Stats Prevention" });
};
const getSymptoms = (req, res, next) => {
  res.render("symptoms", { title: "Covid-19 Stats Symptoms" });
};
const getLogin = (req, res, next) => {
  res.render("login", { title: "Covid-19 Stats Login" });
};

const postLogin = async (req, res) => {
  data = req.body;
  console.log(data);
  let passwordHaash = await bcryptjs.hash(data.password, 10);
  console.log(passwordHaash);
};

module.exports = {
  router,
  getIndex,
  getPrevention,
  getSymptoms,
  getLogin,
  postLogin,
};
