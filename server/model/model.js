const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  salutation: {
    type: String,
    require: true,
  },
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  dob: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  qualification: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  country: {
    type: String,
    require: true,
  },
  state: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  pincode: {
    type: String,
    require: true,
  },
  // Add a field for the avatar image
  avatar: {
    // data: Buffer, // Store binary data of the image
    // contentType: String, // Content type of the image (e.g., "image/jpeg")
    // originalname: String, // Original name of the uploaded file
    path: String,
    // require: true,
  },
});

const EmployeeDB = mongoose.model("EmployeeDB", schema);

module.exports = EmployeeDB;
