const express = require("express");
const router = express.Router();
const pool = require("../accesDB");
var id;
async function pullDB(nameee, iidcase, idd) {
  if (iidcase == '') {
    var pullDB2 = (await pool.query(
      `WITH ONEQUERY AS (
        SELECT  s.idcase, MAX(s.idstatepatient) AS laststate
        FROM covid.statepatient as s
        GROUP BY idcase
        )
        SELECT c.*, cs.state as covidresult, s.state as numstate, st.state, g.gender as gen, s.datestate, st.color
        FROM covid.statepatient as s
        INNER JOIN ONEQUERY AS q ON s.idcase = q.idcase AND s.idstatepatient = laststate
        INNER JOIN covid.cases AS c ON s.idcase = c.idcase
        INNER JOIN covid.covidstate AS cs ON cs.idcovidstate = c.resultcovid
        INNER JOIN covid.states AS st ON st.idstate = s.state
        INNER JOIN covid.gender AS g ON c.gender = g.idgender
        WHERE c.name LIKE "${nameee}%"AND c.cc LIKE "${idd}%" AND c.idcase LIKE "${iidcase}%"
        ORDER BY c.idcase ASC`
      )
    )
  } else {
    var pullDB2 = (await pool.query(
      `WITH ONEQUERY AS (
        SELECT  s.idcase, MAX(s.idstatepatient) AS laststate
        FROM covid.statepatient as s
        GROUP BY idcase
        )
        SELECT c.*, cs.state as covidresult, s.state as numstate, st.state, g.gender as gen, s.datestate, st.color
        FROM covid.statepatient as s
        INNER JOIN ONEQUERY AS q ON s.idcase = q.idcase AND s.idstatepatient = laststate
        INNER JOIN covid.cases AS c ON s.idcase = c.idcase
        INNER JOIN covid.covidstate AS cs ON cs.idcovidstate = c.resultcovid
        INNER JOIN covid.states AS st ON st.idstate = s.state
        INNER JOIN covid.gender AS g ON c.gender = g.idgender
        WHERE c.name LIKE "${nameee}%"AND c.cc LIKE "${idd}%" AND c.idcase = "${iidcase}%"
        ORDER BY c.idcase ASC`
      )
    )
  }
  return pullDB2
}
async function pull2DB(idcase) {
  const pull2DB2 = (await pool.query(
    `
    SELECT * FROM covid.statepatient as s
    INNER JOIN covid.states AS st ON st.idstate = s.state
    WHERE idcase = "${idcase}"
    ORDER BY idstatepatient DESC`
  )
  )
  return pull2DB2
}
router.get("/intern", async (req, res) => {
  iidcase = ''
  nameee = ''
  idd = ''
  if (req.session.inern) {  
    const url = req.url;
    const links = await pullDB(nameee, iidcase, idd);
    id = 0;
    numPos = 0
    numNeg = 0
    links.forEach(patient => {
      if (patient.covidresult == 'Positive') {
        numPos++
      } else {
        numNeg++
      }
    });
    res.render("links/intern", {
      links: links, title: "Dashboard",
      idButton: id, edit: false, numPos: numPos, numNeg: numNeg,
      medico: req.session.medic, url: url
    });
  } else {
    res.redirect("/signin");
  }
});
router.get('/intern/patientRegister', async (req, res) => {
  if (req.session.inern) {
    console.log("")
    console.log("REGISTER PATIENTS")
    console.log("")

    if (!req.session.medic){
      const links = await pullDB(nameee, iidcase, idd);
      const url = req.url;
      var id = url.toString().split("/");
      id = id[2];
      res.render("links/register", {
        links: links, title: 'Edit case ' + id,
        idButton: id, edit: false, medico: req.session.medic, url: url
      });
    } else{
      res.redirect("/intern");
    }
    
  } else {
    res.redirect("/signin");
  }
});
router.get('/intern/mapIntern', async (req, res) => {
  if (req.session.inern) {
    if(req.session.medic){
      const url = req.url;
      console.log("")
      console.log(url)
      console.log("")
      var id = url.toString().split("/");
      id = id[2];
      res.render("links/mapIntern", {
      title: 'Map' + id, idButton: id, medico: req.session.medic, 
      url: url
    });
    }else{
      res.redirect("/links/intern")
    }
    
  } else {
    res.redirect("/signin");
  }
});
router.get('/intern/:id', async (req, res) => {
  if (req.session.inern) {
    iidcase = ''
    nameee = ''
    idd = ''
    const links = await pullDB(nameee, iidcase, idd);
    const url = req.url;
    var id = url.toString().split("/");
    id = id[2];
    const allStates = await pull2DB(id);
    console.log(allStates)
    res.render("links/intern", {
      links: links, title: 'Edit case ' + id,
      idButton: id, edit: false, medico: req.session.medic,
      url: url, allStates: allStates
    });
  } else {
    res.redirect("/signin");
  }
});
router.get('/intern/:id/edit', async (req, res) => {
  if (req.session.inern) {
    iidcase = ''
    nameee = ''
    idd = ''
    const links = await pullDB(nameee, iidcase, idd);
    const url = req.url;
    var id = url.toString().split("/");
    id = id[2];
    const allStates = await pull2DB(id);
    res.render("links/intern", {
      links: links, title: 'Edit case ' + id,
      idButton: id, edit: true, medico: req.session.medic,
      url: url, allStates: allStates
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
    const newState = req.body;
    const res = await pool
      .query(
        `INSERT INTO covid.statepatient (idcase, state) VALUES ("${id}", "${newState.statePatient}");`
      )
      .catch((e) => {
        throw e;
      });
  } else {
    res.redirect("/links/intern");
  }
  res.redirect("/links/intern/" + id);
});
router.post('/intern/:id', async (req, res) => {
  if (req.session.inern) {
    const url = req.url;
    var id = url.toString().split("/"); id = id[2];
    const newLink = req.body;
    res.redirect("/links/intern/" + id);

  } else {
    res.redirect("/links/intern");
  }
});
router.post('/register', async (req, res) => {
  if (req.session.inern) {
    infoNewP = req.body;

    const res = await pool
      .query(
        `INSERT INTO covid.cases (name, lastname, cc, gender, birthdate, addresshome, addresswork, resultcovid, dateexam)
      VALUES  ("${infoNewP.patientName}", "${infoNewP.patientLastName}", "${infoNewP.patientCC}","${infoNewP.patientGender}", "${infoNewP.patientBirthdate}", "${infoNewP.addressHome}", "${infoNewP.addressWork}", "${infoNewP.resultCovid}", "${infoNewP.examDate}")`
      )
      .catch((e) => {
        throw e;
      });
    console.log("added: ", res);

    const res2 = await pool
      .query(
        `INSERT INTO covid.statepatient (idcase, state) VALUES ("${res.insertId}", "0");`
      )
      .catch((e) => {
        throw e;
      });
    console.log("added: ", res2);
  } else {
    console.log("not register");
  }
  const url = req.url;
  var id = url.toString().split("/"); id = id[2];
  res.redirect("/links/intern/patientRegister");
});
router.post('/filter', async (req, res) => {
  if (req.session.inern) {
    infoFilter = req.body;
    console.log(infoFilter);
    iidcase = infoFilter[0]
    nameee = infoFilter[1]
    idd = infoFilter[2]
    try {
      const response = await pullDB(nameee, iidcase, idd);
      res.json(response);
    } catch (e) { }
  } else {
    res.redirect("/signin");
  }
});

module.exports  = router;