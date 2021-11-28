const express = require("express");
const router = express.Router();
const pool = require("../accesDB");

router.get("/intern", async (req, res) => {
  if (req.session.inern) {
    iidcase = ''
    nameee = ''
    idd = ''
    newQuery = `WITH ONEQUERY AS (
      SELECT  s.idcase, MAX(s.idstatepatient) AS laststate
      FROM covid.statepatient as s
      GROUP BY idcase
      )
      SELECT c.*, cs.state as covidresult, s.state as numstate, st.state, st.color, s.datestate
      FROM covid.statepatient as s
      INNER JOIN ONEQUERY AS q ON s.idcase = q.idcase AND s.idstatepatient = laststate
      INNER JOIN covid.cases AS c ON s.idcase = c.idcase
      INNER JOIN covid.covidstate AS cs ON cs.idcovidstate = c.resultcovid
      INNER JOIN covid.states AS st ON st.idstate = s.state
      WHERE c.name LIKE "${nameee}%"AND c.cc LIKE "${idd}%" AND c.idcase LIKE "${iidcase}%"`

    const links = await pool.query(newQuery);
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
router.post('/register', async (req, res) => {
  if (req.session.inern) {
    console.log("register");
    infoNewP = req.body;
    console.log(infoNewP.patientName);
    
    const res = await pool
    .query(
      `INSERT INTO covid.cases (name, lastname, cc, gender, birthdate, addresshome, addresswork, resultcovid, dateexam)
       VALUES  ("${infoNewP.patientName}", "${infoNewP.patientLastName}", "${infoNewP.patientCC}", "${infoNewP.patientGender}", "${infoNewP.patientBirthdate}", "${infoNewP.addressHome}", "${infoNewP.addressWork}", "${infoNewP.resultCovid}", "2021-11-23")`
    )
    .catch((e) => {
      throw e;
    });
    console.log("added: ", res);

  } else {
    res.redirect("/links/intern");
  }  
});

router.post('/filter', async (req, res) => {
  console.log("filter")
  if (req.session.inern) {
    infoFilter = req.body;
    console.log(infoFilter);
    iidcase = infoFilter[0]
    nameee = infoFilter[1]
    idd = infoFilter[2]
    try{
    newQuery = `WITH ONEQUERY AS (
    SELECT  s.idcase, MAX(s.idstatepatient) AS laststate
    FROM covid.statepatient as s
    GROUP BY idcase
    )
    SELECT c.*, cs.state as covidresult, s.state as numstate, st.state, st.color, s.datestate
    FROM covid.statepatient as s
    INNER JOIN ONEQUERY AS q ON s.idcase = q.idcase AND s.idstatepatient = laststate
    INNER JOIN covid.cases AS c ON s.idcase = c.idcase
    INNER JOIN covid.covidstate AS cs ON cs.idcovidstate = c.resultcovid
    INNER JOIN covid.states AS st ON st.idstate = s.state
    WHERE c.name LIKE "${nameee}%"AND c.cc LIKE "${idd}%" AND c.idcase LIKE "${iidcase}%"`
    const response = await pool.query(newQuery);
    res.json(response);
    }catch(e) {}
  } else {
    res.redirect("/signin");
  }
});

module.exports = router;