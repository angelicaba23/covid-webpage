const express = require("express");
const router = express.Router();

const pool = require("../accesDB");

router.get("/add", (req, res) => {
    res.render("links/add", { title: "Stay Safe Add " });
});

router.post("/add", async (req, res) => {
    const { name, lastName, cc, role, user, password } = req.body;
    //cc hace referencia a la cedula de ciudadania
    const newLink = { name, lastName, cc, role, user, password};
    //links es el nombre de la tabla, ya despues modificas como va el codigo
    res.send("Recived");
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
});

router.get("/", async (req, res) => {
    const links = await pool.query(`SELECT * FROM covid.users`);
    console.log(links);
    res.send("List will be here");
});

module.exports = router;
