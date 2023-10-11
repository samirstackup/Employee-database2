const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser"); //for parsing body content
const path = require("path");
const hbs = require("hbs");
const multer = require("multer");
const connectDB = require("./server/database/connection");
const session = require("express-session");
const { redirect } = require("express/lib/response");
const mongosession = require("connect-mongodb-session")(session);

const app = express();

app.use(
  session({
    secret: "secretValue",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set secure to true if using HTTPS
  })
);

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 3030;

//Log requests
app.use(morgan("tiny"));

//mongoDB connection
connectDB();

//parse req to body parser
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

const partialsPath = path.join(__dirname, "views", "partials");
const ViewsPath = path.join(__dirname, "views");

//set view engine
app.set("view engine", "hbs"); //using hbs instead of ejs templATE
hbs.registerPartials(partialsPath);

// Define the storage strategy for file uploads
const storage = multer.memoryStorage(); // You can customize this storage strategy as needed
// Initialize multer with the storage strategy
const upload = multer({ storage: storage });

// app.set("views",path.resolve(__dirname,"views/ejs"))
// If you use ejs files in views folder then no need but if they are in an other folder in views then make this. Also const path needs to be made for this.

//load assets
app.use("/assets", express.static(path.resolve(__dirname, "assets")));

app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
//now we can use css/style.css instead of the whole path
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));
app.use("/avatars", express.static(path.resolve(__dirname, "avatars")));

//load routers
app.use("/", require("./server/routes/router"));

app.listen(PORT, () => {
  console.log(`Server is runnning on http://localhost:${PORT}`);
});
