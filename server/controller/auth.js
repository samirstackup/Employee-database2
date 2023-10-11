const User = require("../model/userModel");
console.log(User.data);

module.exports.isAuthorized = function (req, res, next) {
  // Assuming you store the user's ID in req.session.userId during authentication
  const userId = req.session.email;
  console.log(userId);

  if (!userId) {
    // Handle the case where the user ID is not set in the session (user not logged in)
    const err = new Error("Unauthorized, please log in");
    err.status = 401;
    return next(err);
  }

  // Check if the user with the given ID exists in the database
  if (user && user.email === userId) {
    // User found, authorize the request
    return next();
  } else {
    // Handle the case where the user with the given ID is not found in the database
    const err = new Error("Unauthorized, user not found");
    err.status = 401;
    return next(err);
  }
};
