const express = require("express");
const router = express.Router();
const pool = require("../accesDB");
const { hash, verify } = require("argon2");
const { check, validationResult } = require("express-validator");
const { error } = require("npmlog");
const e = require("express");

const getIndex = (req, res, next) => {
  console.log(req.url)
  res.render("index", { title: "Covid-19 Stats", url: req.url});
};
const getPrevention = (req, res, next) => {
  console.log(req.url)
  res.render("index", { title: "Covid-19 Stats Prevention", url: req.url});
};
const getSymptoms = (req, res, next) => {
  console.log(req.url)
  res.render("index", { title: "Covid-19 Stats Symptoms", url: req.url });
};
const getLogin = (req, res, next) => {
  console.log(req.url);
  res.render("login", { title: "Covid-19 Stats Login", url: req.url });
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
            res.redirect("/signin");
          } else {
            req.session.user = results[0].user

            if (results[0].role == '3') {
              res.redirect("/admin");
            } else {
              if (results[0].role == '1') {
                req.session.medic = true;
              } else {
                req.session.medic = false;
              }
              if (await verify(results[0].password, newLink.password)) {
                req.session.inern = true;
                res.redirect("links/intern");
              } else {
                res.redirect("/signin");
              }
            }
          }
        }
      )
    } else {
      //Poner una alerta con swit alert que indique esto:
      console.log("Missing user or pass")
      res.render("login", { title: "Login" });
    }
  } catch { console.error(e) }


};
const logout = async (req, res) => {
  req.session.destroy(() => {
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