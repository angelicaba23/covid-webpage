const pool = require("../accesDB");
const { check, validationResult } = require("express-validator");
const { hash, verify } = require("argon2");
const { Router } = require("express");
const router = Router();

async function insertUser(newLink) {
  const res = await pool
    .query(
      `INSERT INTO covid.users (name, lastname, cc, role, user, password) VALUES ("${newLink.name}", "${newLink.lastName}", "${newLink.cc}", "${newLink.role}", "${newLink.userName}", "${newLink.password}")`
    )
    .catch((e) => {
      throw e;
    });
  console.log("added: ", res);
}
async function loginDB(newLink) {
  const response = await pool
  .query(
    `SELECT * FROM covid.users WHERE user="${newLink.userName}"`
  )
  .catch((e) => {
    throw e;
  });
  console.log("Data selected: ", response);
  return response
}

const postAdd = async (req, res) => {
  const newLink = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const alert = errors.array();
    res.render("links/signup", {
      alert,
    });
  } else {
    //aqui si todo ok
    try {
      const hashedPassword = await hash(newLink.password);
      await insertUser({ ...newLink, password: hashedPassword });
      //renderiza la pagina a donde quieres que se diriga despues que se logge
      res.render("links/signup", { title: "Stay Safe Add " });
    } catch {
      console.error(e);
    }
  }
};

const postLoginAdmin = async (req, res) => {
  const newLink = req.body; 
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const alert = errors.array();
    res.render("links/loginAdmin", {alert, title: "Login admin"});
  } else {
    try {
      if (newLink.userName && newLink.password) {
        
        await pool.query(
          `SELECT * FROM covid.users WHERE user="${newLink.userName}"`, 
          async (error, results) =>{
            if(results.length==0){
              req.session.loggedin = false;
              console.log("LOGIN")
              res.render("links/loginAdmin", { title: "Login admin" }) 
            }else{
              req.session.loggedin = true;
              req.session.user = results[0].user
              if( await verify(results[0].password, newLink.password) ){
                console.log("REGISTER")
                res.render("links/signup", {title: "Register"}) 
              }                                        
            }
          } 
        )
      } else {
      }
    } catch { console.error(e) }    
  }
};

router.get("/", (_req, res) => {
  res.render("links/loginAdmin", { title: "Login admin" });
});
router.post("/",
  [
    check("password", "The password must containt 6 letters")
      .exists()
      .isLength({ min: 6 }),
  ],
  postLoginAdmin
);

router.get("/add", (req, res) => {
  if (req.session.loggedin) {
    res.render("links/signup", {
      login: true,
      title: "Register",
      user: req.session.user,
    });
  } else {
    res.render("links/loginAdmin", {
      title: "Login admin",
      login: false,
      user: "Debe iniciar sesion",
    });
  }
});

router.post("/add",
  [
    check("password", "The password must containt 6 letters")
      .exists()
      .isLength({ min: 6 }),
  ],
  postAdd
);

module.exports = router;
