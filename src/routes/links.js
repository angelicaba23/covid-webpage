const express = require("express");
const router = express.Router();
const pool = require("../accesDB");

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
router.get('/intern/:id', async (req, res) => {
  if (req.session.inern) {
    const links = await pool.query(`SELECT * FROM covid.cases`);
    const url = req.url;
    var id = url.toString().split("/");
    id = id[2];

    res.render("links/intern", {
      links: links, title: 'Edit case ' + id,
      idButton: id, edit: false, medico: req.session.medic, url: url
    });
  } else {
    res.redirect("/signin");
  }
});
router.get('/intern/:id/edit', async (req, res) => {
  if (req.session.inern) {
    const links = await pool.query(`SELECT * FROM covid.cases`);
    const url = req.url;
    var id = url.toString().split("/");
    id = id[2];
    console.log("")
    console.log(id)
    console.log("")

    res.render("links/intern", {
      links: links, title: 'Edit case ' + id,
      idButton: id, edit: true, medico: req.session.medic, url: url
    });
  } else {
    res.redirect("/signin");
  }
});

// Desde aqui van post para lo de Register Patients y subir datos a la DB
router.post('/intern/:id/edit', async (req, res) => {
  if (req.session.inern) {
    const url = req.url;
    var id = url.toString().split("/"); id = id[2];
    const newLink = req.body;
    console.log("");
    console.log(newLink)
    console.log("");
    console.log(url);
    console.log("");
    res.redirect("/links/intern/" + id);
  } else {
    res.redirect("/links/intern");
  }
});

router.post('/intern/:id', async (req, res) => {
  if (req.session.inern) {
    const url = req.url;
    var id = url.toString().split("/"); id = id[2];
    const newLink = req.body;
    console.log("");
    console.log(newLink)
    console.log("");
    console.log(url);
    console.log("");
    res.redirect("/links/intern/"+id);
  } else {
    res.redirect("/links/intern");
  }  
});



module.exports = router;