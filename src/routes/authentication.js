const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const bcrypt = require('bcryptjs');
const passport = require('passport');
const pool = require("../accesDB");
const postAdd = async (req, res) => {
    const newLink = req.body;
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const alert = errors.array()
        res.render('links/signup', {
            alert
        })
    } else { //aqui si todo ok
        try {
            const hashedPassword = await bcrypt.hash(newLink.password, 10);
            await insertUser(hashedPassword)
            //renderiza la pagina a donde quieres que se diriga despues que se logge
            res.render("links/signup", { title: "Stay Safe Add " });
        } catch {
            console.error(e);
        }
    }

};
const postLoginAdmin = async (req, res) => {
    const newLink = req.body;
    console.log(newLink)
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        const alert = errors.array()
        res.render('links/loginAdmin', {
            alert
        })
    } else { //aqui si todo ok
        const hashedPassword = await bcrypt.hash(newLink.password, 10);
        newLink.password = hashedPassword;
        console.log(newLink.password)
        try {            
            if (newLink.userName && newLink.password) {
                await pool.query(`SELECT * FROM covid.users
                WHERE user = "${newLink.userName}"`,
                async (error, results, fields) => {
                    await bcrypt.compare(results[0].password, newLink.password, function(err,result){
                        console.log(err)
                    });
                    /*
                    if (results.length == 0 || !(await bcrypt.compare(results[0].password, newLink.password ))) { 
                        res.render("links/loginAdmin", { title: "Login admin"});
                        console.log(results[0].password)
                        // COLOCAR UNA ALERTA QUE DIGA QUE EL USUARIO O PASSWORD SON INCORRECTOS
                    }else{                        
                        res.render("index", { title: "Stay Safe Add "});
                        req.session.loggedin = true;                
				        req.session.name = results[0].user;
                    }        
                    */                      
                });  
            }else{                
            }
        } catch {
        }
    }
}

function insertUser(newLink) {
    pool.query(
        `INSERT INTO covid.users (
              name, lastname, cc, role, user, password)
                      VALUES ("${newLink.name}", "${newLink.lastName}", "${newLink.cc}"
                      , "${newLink.role}", "${newLink.userName}", "${newLink.password}")`,
        function (error, results) {
            if (error) {
                throw error;
            } else {
                console.log("Added :", results);
            }
        }
    );
}


router.get("/", (req, res) => {
    res.render("links/loginAdmin", { title: "Stay Safe Add " });
});
router.post("/", urlencodedParser, [
    check('password', 'The password must containt 6 letters')
        .exists()
        .isLength({ min: 6 }),
], postLoginAdmin);

router.get("/add", (req, res) => {
    if(req.session.loggedin){
        res.render("links/signup", { 
            login: true, 
            title: "Stay Safe Add ",
            name: req.session.name
        });
    }else{
        res.render('links/signup', {
            login: false,
            name: 'Debe iniciar sesion'
        })
    } 
});

router.post("/add", urlencodedParser, [
    check('password', 'The password must containt 6 letters')
        .exists()
        .isLength({ min: 6 }),
], postAdd);



module.exports = router;