var EmployeeDB = require("../model/model");
const path = require("path");
const express = require("express");
const multer = require("multer");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "avatars"); // Destination folder for uploaded avatars
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Multer upload configuration
const upload = multer({ storage: storage }).single("avatar");

//create and save new employee
exports.create = (req, res) => {
  console.log(req.files);
  upload(req, res, async (error) => {
    if (error instanceof multer.MulterError) {
      console.log(req.body.avatar);
      return res.status(400).json({ error: "image error" + error });
    } else if (error) {
      return res.status(500).json({ error: "server error " + error });
    } else {
      // Validate required fields
      const requiredFields = [
        "salutation",
        "firstName",
        "lastName",
        "gender",
        "dob",
        "email",
        "phone",
        "username",
        "password",
        "qualification", // Make sure this matches your field name
        "address",
        "country",
        "state",
        "city",
        "pincode", // Make sure this matches your field name
      ];

      for (const field of requiredFields) {
        if (!req.body[field]) {
          console.log(req.body);
          return res
            .status(400)
            .send({ message: `Error: Missing ${field} field` });
        }
      }

      // Log the received data
      console.log("Received Data:", req.body);
      // console.log("Received File:", req.file.path); // Check if a file was uploaded
      console.log("Received File:", req.files); // Check if a file was uploaded

      // if (!req.file) {
      //   return res.status(400).send({ message: "No avatar image uploaded." });
      // }
      const avatarPath = req.file ? req.file.path : null; // Replace backslashes with forward slashes

      //new user
      const employee = new EmployeeDB({
        salutation: req.body.salutation,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        dob: req.body.dob,
        email: req.body.email,
        phone: req.body.phone,
        username: req.body.username,
        password: req.body.password,
        qualification: req.body.qualification,
        address: req.body.address,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        pincode: req.body.pincode,
        // avatar: {
        //   data: req.file.buffer, // Assuming you are storing binary data
        //   contentType: req.file.mimetype, // Content type of the file (e.g., image/jpeg)
        //   originalname: req.file.originalname, // Original name of the uploaded file
        // },
        avatar: avatarPath, // Store the file path if a file was uploaded
      });

      //save employee to DB
      employee
        .save(employee)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Some error occured while creating the create operation",
          });
        });
    }
  });
};

// exports.uploadAvatar = (req, res) => {
//   if (!req.file) {
//     return res.status(400).send({ message: "No file uploaded." });
//   }

//   // Handle the uploaded file here and save it as needed in your database

//   // Example: You can access the file using req.file, for instance:
//   const filename = req.file.filename;
//   const originalname = req.file.originalname;
//   const mimetype = req.file.mimetype;
//   const size = req.file.size;

//   // You can now save this file information to your database or use it as required
//   // Example: Save the file path to the employee's avatar field
//   const employeeId = req.params.id; // Get the employee ID from the URL
//   const filePath = `/assets/avatars/${filename}`; // Adjust the path as needed

//   // Update the employee record with the file path
//   EmployeeDB.findByIdAndUpdate(
//     employeeId,
//     { avatar: filePath },
//     { useFindAndModify: false }
//   )
//     .then((data) => {
//       res.status(200).send({ message: "File uploaded and employee updated." });
//     })
//     .catch((err) => {
//       res.status(500).send({ message: "Error updating employee avatar." });
//     });
// };

//retreive employee data
exports.find = (req, res) => {
  if (req.query.id) {
    let id = req.query.id;
    EmployeeDB.findById(id)
      .then((data) => {
        if (!data) {
          return res
            .status(404)
            .send({ message: "No user found with id" + id });
        }
        return res.send(data);
      })
      .catch((err) => {
        return res
          .status(500)
          .send({ message: "Error retreiving employee with id:" + id });
      });
  } else {
    EmployeeDB.find()
      .then((employee) => {
        res.send(employee);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error occured while using find function",
        });
      });
  }
};

//update employee by id
exports.update = (req, res) => {

  upload(req,res, async(error)=>{
    if(error instanceof multer.MulterError){
      res.status(400).json({err:"image upload erroe"})
    }
    else if(error){
      res.status(500).json({error:"server error"})
    }

    
    let avatarPath;
    if (req.file) {
      avatarPath = path.join('avatars', req.file.filename);
    } else {
      // If no new file is uploaded, keep the existing avatar path
      const emp = await EmployeeDB.findById(req.params.id);
      if (!emp) {
        res.status(404).json({ error: "employee not found" });
        return;
      }
      avatarPath = emp.avatar; // Use the existing avatar path
    }

    const emp = await EmployeeDB.findById(req.params.id);
    if(!emp){
        res.status(404);
        throw new Error("employee not found")
    }
    // Update avatar only if a new file was uploaded
    const updateData = {
      ...req.body,
      ...(avatarPath ? { avatar: avatarPath } : {}), // Conditionally include avatar field
    };
    
    console.log(avatarPath)
    const upd = await EmployeeDB.findByIdAndUpdate(req.params.id, updateData, { new: true });
    console.log(upd)
    res.status(200).json(upd);
  })

  
};

//delete employee with id
exports.delete = (req, res) => {
  const id = req.params.id;

  EmployeeDB.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete employee with ${id}. Check if employee exists.`,
        });
      } else {
        res.send({
          message: "Employee deleted succefully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Couldnt delete employee of id:" + id,
      });
    });
};

// upload(req, res, async (error) => {
//   if (error instanceof multer.MulterError) {
//     console.log(req.body.avatar);
//     return res.status(400).json({ error: "image error" + error });
//   } else if (error) {
//     return res.status(500).json({ error: "server error " + error });
//   } else {
//   }
// })