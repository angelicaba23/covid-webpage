const pool = require("../accesDB");
const { check, validationResult } = require("express-validator");
const { hash, verify } = require("argon2");
const { Router } = require("express");
const router = Router();

async function insertUser(newLink) {
  const res = await pool
    .query(
      `INSERT INTO covid.users (name, lastname, cc, role, user, password) 
      VALUES ("${newLink.name}", "${newLink.lastName}", "${newLink.cc}", 
      "${newLink.role}", "${newLink.userName}", "${newLink.password}")`
    )
    .catch((e) => {
      throw e;
    });
}
async function loginDB(newLink) {
  const response = await pool
    .query(
      `SELECT * FROM covid.users WHERE user="${newLink.userName}"`
    )
    .catch((e) => {
      throw e;
    });
  return response
}


const postAdd = async (req, res) => {
  console.log("")
  const newLink = req.body;
  console.log("asdasd")
  console.log("")
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const alert = errors.array();
    res.render("links/signup", {
      title: "Stay Safe Add",
      alert,
    });
  } else {
    try {
      const hashedPassword = await hash(newLink.password);
      await insertUser({ ...newLink, password: hashedPassword });
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
    res.render("links/loginAdmin", { alert, title: "Login admin" });
  } else {
    try {
      if (newLink.userName && newLink.password) {

        await pool.query(//Buscar si el user es medico o es ayudante
          `SELECT user, password, role FROM covid.users WHERE user="${newLink.userName}"`,
          async (error, results) => {
            if (results.length == 0) {
              req.session.loggedin = false;
              res.redirect("/admin")
            } else {
              if (results[0].role == 3) {
                req.session.loggedin = true;
                req.session.user = results[0].user
                console.log(newLink.password)
                if (await verify(results[0].password, newLink.password)) {
                  res.redirect("/admin/add")
                }
              } else {
                res.redirect("/signin")
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
router.get("/add", (req, res) => {
  console.log("")
  console.log(req.body)
  console.log("")
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


router.post("/",
  [
    check("password", "The password must containt 6 letters")
      .exists()
      .isLength({ min: 6 }),
  ], postLoginAdmin
);
router.post("/add",
  [
    check("password", "The password must containt 6 letters")
      .exists()
      .isLength({ min: 6 }),
  ], postAdd
);

module.exports = router;
