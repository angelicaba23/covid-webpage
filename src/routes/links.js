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
