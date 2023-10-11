const axios = require("axios");

exports.homeRoute = (req, res) => {
  //make a get req to api
  axios
    .get("http://localhost:3031/api/employees")
    .then(function (response) {
      res.render("index", { employees: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.editEmp = (req, res) => {
  // Fetch the details of a specific employee based on the ID
  const employeeId = req.params.id; // Assuming you can get the employee ID from the URL

  axios
    .get(`http://localhost:3031/api/employees/?id=${employeeId}`) //enter emp id next
    // .then(res.send(employeeId))
    .then(function (response) {
      const baseUrl = req.protocol + "://" + req.get("host");
      const avatarUrl = `${baseUrl}/${response.data.avatar}`;
      response.data.avatar = avatarUrl;
      // Render the "empdetails" page with the employee details
      res.render("empdetails", { employee: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

// Define a route to render the login page
exports.login = (req, res) => {
  // Add your login rendering logic here
  res.render("login"); // Assuming "login.hbs" is in your views folder
};

// Define a route to render the login page
exports.register = (req, res) => {
  // Add your login rendering logic here
  res.render("register"); // Assuming "login.hbs" is in your views folder
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    }
    res.redirect("/login");
  });
};
