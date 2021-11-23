const express = require("express");
const morgan = require("morgan");
var path = require("path");
const engine = require("ejs-mate");
const child_p = require("child_process");
var cookieParser = require("cookie-parser");
const flash = require('express-flash');
const session = require('express-session');

// initializations
const app = express();
require("./accesDB");

// settings
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.engine("ejs", engine);
app.set("port", process.env.WEBPORT || 80);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Global Variables
app.use((req, res, next) => {
  next();
});

//Routes
app.use(require("./routes"));
app.use("/admin",require("./routes/authentication"));
app.use("/links", require("./routes/links"));

//Public
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "lib")));
app.use(express.static(path.join(__dirname, "database")));

//Starting the server
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});


