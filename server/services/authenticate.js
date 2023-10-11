const jwt = require("jsonwebtoken");
const session = require("express-session");
const mongosession = require("connect-mongodb-session")(session);

// const authenticate = (req, res, next) => {
//   try {

//     const token = req.headers.authorization.split(" ")[1];
//     const decode = jwt.verify(token, "secretValue"); //Can be anything or symbols but keep secret to ensure app security, must match in authcontrol.

//     req.user = decode;
//     console.log("1" + token);
//     console.log("Auth triggered try function");

//     next();
//   }
//    catch (error) {
//     console.error(error); // Log the error for debugging

//     if (error.email === "Tokenexpired") {
//       res.status(401).json({
//         message: "token expired,pleaase log in again",
//       });
//     } else {
//       res.redirect("/login");
//       console.log("Auth triggered catch redirect");
//     }
//   }
// };
const isAuth = (req, res, next) => {
  if (req.session && req.session.email) {
    console.log(session);
    return next();
  } else {
    res.redirect("/login");
  }
};

const authenticate = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      throw new Error("Invalid or missing Authorization header");
    }

    const token = authorizationHeader.split(" ")[1];
    const decode = jwt.verify(token, "secretValue");

    req.user = decode;
    console.log("Auth triggered try function");
    next();
  } catch (error) {
    console.error(error);
    if (error.name === "TokenExpiredError") {
      res.status(401).json({
        message: "Token expired, please log in again",
      });
    } else {
      res.status(401).json({
        message: "Authentication failed",
      });
    }
  }
};

module.exports = { authenticate, isAuth };
