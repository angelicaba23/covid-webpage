const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const engine = require("ejs-mate");
var path = require("path");
require("dotenv").config();

// initializations
const app = express();
require("./accesDB");

// settings
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.engine("ejs", engine);
app.set("port", process.env.WEBPORT || 80);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Global Variables

//Routes
app.use(require("./routes"));
app.use("/admin", require("./routes/authentication"));
app.use("/links", require("./routes/links"));

//Public
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "lib")));
app.use(express.static(path.join(__dirname, "database")));

//Starting the server
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
