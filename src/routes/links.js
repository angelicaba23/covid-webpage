const express = require("express");
const router = express.Router();
const pool = require("../accesDB");
/*
const validate_unique_user = body('user').custom(async user => {
    const response = await pool.query(`
    SELECT user FROM covid.users 
    WHERE user='${user}'`);

    if (response.user !=0) throw new Error(`El usuario '${user}' ya está registrado`);
    return false
});
*/
router.get("/add", (req, res) => {
  res.render("links/add", { title: "Stay Safe Add " });
});
router.post("/add", async (req, res) => {
  const { name, lastName, cc, role, user, password } = req.body;
  //cc hace referencia a la cedula de ciudadania
  const newLink = { name, lastName, cc, role, user, password };
  console.log(role);
  //links es el nombre de la tabla, ya despues modificas como va el codigo
  try {
    await pool.query(
      `INSERT INTO covid.users (
                name, lastname, cc, role, user, password) 
                        VALUES ("${newLink.name}", "${newLink.lastName}", "${newLink.cc}"
                        , "${newLink.role}", "${newLink.user}", "${newLink.password}")`,
      function (error, results) {
        if (error) {
          throw error;
        } else {
          console.log("Added :", results);
        }
      }
    );
  } catch (e) {
    console.error();
  }
});

router.get("/intern", async (req, res) => {
  const links = await pool.query(`SELECT * FROM covid.cases`);
  console.log(links[1].name);
  res.render("links/intern", { links: links, title: "Intern" });
});
router.get("/intern/patients", async (req, res) => {
  const links = await pool.query(`SELECT * FROM covid.cases`);
  console.log(links[1].name);
  res.render("links/patients", { links: links, title: "Patients" });
});
module.exports = router;
