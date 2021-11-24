const { request } = require("express");
const express = require("express");
const router = express.Router();
const pool = require("../accesDB");
const app = express()

/*
  La variable medico permite o no editar la información de los 
  pacientes, hay que obtenerlo de la base de datos, si es posible
  concatenarlo con el constructor links seria mejor, así solo usamos una variable.
  Tambien hay que importar los estados del paciente y agregarlos si es posible 
  tambien al constructor link
*/

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
  id = 0;
  res.render("links/intern", { links: links, title: "Internes", idButton: id, edit: false });
});

router.get("/intern/patients", async (req, res) => {
  const links = await pool.query(`SELECT * FROM covid.cases`);
  const url = req.url;
  var id = url.toString().split("/");
  id = id[3];
  const medico = false;
  console.log(links)

  res.render("links/patients", {
    links: links, title: 'Edit case ' + id,
    idButton: id, edit: false, medico: medico
  });
});
router.get('/intern/patients/:id', async (req, res) => {
  const links = await pool.query(`SELECT * FROM covid.cases`);
  const url = req.url;
  var id = url.toString().split("/");
  id = id[3];
  const medico = false;

  res.render("links/patients", {
    links: links, title: 'Edit case ' + id,
    idButton: id, edit: false, medico: medico
  });
});

router.get('/intern/patients/:id/edit', async (req, res) => {
  const links = await pool.query(`SELECT * FROM covid.cases`);
  const url = req.url;
  var id = url.toString().split("/");
  id = id[3];
  const medico = false;

  res.render("links/patients", {
    links: links, title: 'Edit case ' + id,
    idButton: id, edit: true, medico: medico
  });
});
router.post('/intern/patients/:id/edit', async (req, res) => {
  const links = await pool.query(`SELECT * FROM covid.cases`);
  const url = req.url;
  var id = url.toString().split("/");
  id = id[3];
  const medico = false;

  res.render("links/patients", {
    links: links, title: 'Edit case ' + id,
    idButton: id, edit: true, medico: medico
  });
});

module.exports = router;
