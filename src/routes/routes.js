const express = require("express");
const router = express.Router();
const pool = require("../accesDB");
const bcryptjs = require("bcryptjs");
const { hash, verify } = require("argon2");
const { check, validationResult } = require("express-validator");
const { error } = require("npmlog");
const e = require("express");

const getIndex = (req, res, next) => {
  res.render("index", { title: "Covid-19 Stats",});
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
  const newLink = req.body;
  const errors = validationResult(req);

  try {
    if (newLink.userName && newLink.password) {
      await pool.query(
        //Hay que buscar si ese usuario está registrado como doctor o como ayudante
        `SELECT * FROM covid.users WHERE user="${newLink.userName}"`,
        async (error, results) => {

          if (results.length == 0) {
            req.session.inern = false;
            res.render("login", { title: "Login" });
          } else {
            req.session.inern = true;
            req.session.medic = false;
            req.session.user = results[0].user
            console.log(newLink.password)
            if (await verify(results[0].password, newLink.password)) {
              res.redirect("links/intern");
            }
          }

        }
      )
    } else {
      //Poner una alerta con swit alert que indique esto:
      console.log("Usuario o password NO validos")
      res.render("login", { title: "Login" });
    }
  } catch { console.error(e) }


};
const logout = async (req, res) => {
  req.session.destroy(()=>{
    res.redirect('/')
  })

}

module.exports = {
  router,
  getIndex,
  getPrevention,
  getSymptoms,
  getLogin,
  postLogin,
  logout
};
