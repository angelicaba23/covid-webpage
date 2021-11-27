const { request } = require("express");
const express = require("express");
const router = express.Router();
const pool = require("../accesDB");
const app = express();

router.get("/intern", async (req, res) => {
  if (req.session.inern) {
    const links = await pool.query(`SELECT * FROM covid.cases`);
    console.log(links[1].name);
    id = 0;
    res.render("links/intern", {
      links: links, title: "Dashboard",
      idButton: id, edit: false
    });
  } else {
    res.redirect("/signin");
  }
});
router.get("/intern/patients", async (req, res) => {
  if (req.session.inern) {
    const links = await pool.query(`SELECT * FROM covid.cases`);
    const url = req.url;

    res.render("links/patients", {
      links: links, title: 'Edit case ',
      idButton: id, edit: false, medico: req.session.medic
    });
  } else {
    res.redirect("/signin");
  }
});
router.get('/intern/patients/:id', async (req, res) => {

  if (req.session.inern) {
    const links = await pool.query(`SELECT * FROM covid.cases`);
    const url = req.url;
    var id = url.toString().split("/");
    id = id[3];

    res.render("links/patients", {
      links: links, title: 'Edit case ' + id,
      idButton: id, edit: false, medico: req.session.medic
    });
  } else {
    res.redirect("/signin");
  }
});
router.get('/intern/patients/:id/edit', async (req, res) => {

  if (req.session.inern) {
    const links = await pool.query(`SELECT * FROM covid.cases`);
    const url = req.url;
    var id = url.toString().split("/");
    id = id[3];

    res.render("links/patients", {
      links: links, title: 'Edit case ' + id,
      idButton: id, edit: true, medico: req.session.medic
    });
  } else {
    res.redirect("/signin");
  }
});
router.post('/intern/patients/:id/edit', async (req, res) => {
  const links = await pool.query(`SELECT * FROM covid.cases`);
  if (req.session.inern) {
    const url = req.url;
    var id = url.toString().split("/"); id = id[3];
    const newLink = req.body; 
    console.log("");
    console.log(newLink)
    console.log("");
    res.redirect("/links/intern/patients/"+id);
  } else {
    res.redirect("/links/intern/patients/");
  }
});

router.post('/intern', async (req, res) => {
if (req.session.inern) {
  const links = await pool.query(`SELECT * FROM covid.cases WHERE `);
  const url = req.url;
  var id = url.toString().split("/");
  id = id[3];

  res.render("links/patients", {
    links: links, title: 'Edit case ' + id,
    idButton: id, edit: true, medico: req.session.medic
  });
} else {
  res.redirect("/signin");
}
});
module.exports = router;