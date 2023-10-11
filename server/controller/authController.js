const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {
      console.error("Error hashing password:", err);
      return res.status(500).json({
        error: err,
      });
    }

    let user = new User({
      email: req.body.email,
      password: hashedPass,
    });

    user
      .save()
      .then((user) => {
        console.log("user");
        console.log(req.body);

        return res.status(201).json({
          message: "User added successfully",
        });
      })
      .catch((error) => {
        return res.status(500).json({
          message: "An error occurred",
          error: error,
        });
      });
  });
};

const login = (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;

  User.findOne({ $or: [{ email: email }] }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          res.json({
            error: err,
          });
        }
        // if (result) {
        //   req.session.email = user.email; // create a session variable to store user email

        //   res.redirect("/");
        //   axios
        //     .get("http://localhost:3031/api/employees")
        //     .then(function (response) {
        //       res.render("index", { employees: response.data });
        //     })
        //     .catch((err) => {
        //       res.send(err);
        //     });
        // } else {
        //   // Password doesn't match, render the login page with the error message
        //   res.render("login", { displayPassError: true });
        // }
        if (result) {
          req.session.email = user.email; // create a session variable to store user email
          // res.status(200).json({ message: "Login successful" });
          axios
            .get("http://localhost:3031/api/employees")
            .then(function (response) {
              res.render("index", { employees: response.data });
            })
            .catch((err) => {
              res.send(err);
            });
          res.redirect("/"); // Redirect to the index page after successful login
        } else {
          res.render("login", { displayPassError: true });
        }
      });
    } else {
      //   res.json({
      //     message: "User doesnt exist",
      //   });
      // Password doesn't match, render the login page with the error message
      res.render("login", { displayemailError: true });
    }
  });
};

const refreshtoken = (req, res, next) => {
  const refreshtoken = req.body.refreshtoken;
  jwt.verify(refreshtoken, "refreshtokensecret", function (err, decode) {
    if (err) {
      res.status(400).json({
        err,
      });
    } else {
      let token = jwt.sign({ email: decode.email }, "secretValue", {
        expiresIn: "1d",
      });
      let refreshtoken = req.body.refreshtoken;
      res.status(200).json({
        message: "token refreshed succesfully",
        token,
        refreshtoken,
      });
    }
  });
};

module.exports = {
  register,
  login,
  refreshtoken,
};
