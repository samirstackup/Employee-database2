function editEmployee(employeeId) {
  // Make an AJAX request to retrieve employee data based on the employeeId
  fetch(`/api/employees?id=${employeeId}`)
    .then((response) => response.json())
    .then((data) => {
      // Log the retrieved employee data to the console for testing
      console.log(data);

      // Now you can proceed to populate the form fields with this data
      populateFormFields(data);

      // Set the form's action attribute dynamically based on the employee's ID
      console.log(employeeId);
      const empeditform = document.getElementById("empeditform");
      empeditform.action = `/api/employees/${employeeId}`;
    })
    .catch((error) => {
      console.error("Error fetching employee data:", error);
    });
}

// Function to populate the form fields with the retrieved data
function populateFormFields(employeeData) {
  // Populate the form fields with the retrieved data
  document.getElementById("editedmrms").value = employeeData.salutation;
  document.getElementById("employeeId").value = employeeData._id;
  document.getElementById("editedFname").value = employeeData.firstName;
  document.getElementById("editedLname").value = employeeData.lastName;
  document.getElementById("editedusername").value = employeeData.username;
  document.getElementById("editedpassword").value = employeeData.password;
  document.getElementById("editedmobile").value = employeeData.phone;
  document.getElementById("editedemail").value = employeeData.email;
  document.getElementById("editedbirthday").value = employeeData.dob;
  // Select the appropriate radio button based on the employee's gender
  const maleRadioButton = document.getElementById("editedmaleoption");
  const femaleRadioButton = document.getElementById("editedfemaleoption");

  if (employeeData.gender && employeeData.gender.toLowerCase() === "male") {
    maleRadioButton.checked = true;
  } else {
    femaleRadioButton.checked = true;
  }

  document.getElementById("editedqual").value = employeeData.qualification;
  document.getElementById("editedaddress").value = employeeData.address;
  document.getElementById("editedcountry").value = employeeData.country;
  document.getElementById("editedstate").value = employeeData.state;
  document.getElementById("editedcity").value = employeeData.city;
  document.getElementById("editedpinzip").value = employeeData.pincode;
  document.getElementById("eAvatar").src = employeeData.avatar;

  const EditInputElement = document.getElementById("editavatar");

  EditInputElement.addEventListener("change", function () {
    const editImageElement = document.getElementById("eAvatar");

    if (EditInputElement.files[0]) {
      editImageElement.src = URL.createObjectURL(EditInputElement.files[0]);
      // selectedImageElement.style.display = "block";
  
    } else {
      editImageElement.src = employeeData.avatar; // Clear the image if no file is selected
      // selectedImageElement.style.display = "none";
    }
  });
}


const empeditform = document.getElementById("empeditform");

empeditform.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission
  const editedMrMsSelect = document.getElementById("editedmrms");
  const selectedOption =
    editedMrMsSelect.options[editedMrMsSelect.selectedIndex];
  const selectedValue = selectedOption.value;
  

  // Create a FormData object to store form data, including the avatar file
  let formData = new FormData();
  // Get the selected avatar file
   const avatarFile = document.getElementById("editavatar").files[0];

   // Check if an avatar file is selected
   if (avatarFile) {
     formData.append("avatar", avatarFile); // Append the avatar file to formData
   }
   formData.append("salutation", selectedValue);
  formData.append("firstName", document.getElementById("editedFname").value);
  formData.append("lastName", document.getElementById("editedLname").value);
  formData.append("email", document.getElementById("editedemail").value);
  formData.append("phone", document.getElementById("editedmobile").value);
  formData.append("dob", document.getElementById("editedbirthday").value);
  formData.append("gender", document.querySelector('i nput[name="editedgender"]:checked').value);
  formData.append("address", document.getElementById("editedaddress").value);
  formData.append("country", document.getElementById("editedcountry").value);
  formData.append("city", document.getElementById("editedcity").value);
  formData.append("state", document.getElementById("editedstate").value);
  formData.append("qualifications", document.getElementById("editedqual").value);
  formData.append("pincode", document.getElementById("editedpinzip").value);
  formData.append("username", document.getElementById("editedusername").value);
  formData.append("password", document.getElementById("editedpassword").value);
  formData.append("avatar", document.getElementById("eAvatar"));

   

  // Fetch or use an AJAX library to send a PUT request to the form's action URL
  // Example using Fetch API:
  console.log(employeeId.value);
  var empid = employeeId.value;
  fetch(`http://localhost:3031/api/employees/${empid}`, {
    method: "PUT",
    body: formData, // You might need to adjust this based on your form data
  })
    .then((response) => {
      // You can also check the response body here if needed
      return response.text(); // To get the response body as text
    })
    .then((data) => {
      console.log(data); // Log the response body as text
      // You can parse the response JSON data if it's JSON
      // const jsonData = JSON.parse(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

// =========================================================================
// DELETE FUNCTION

function deleteId(employeeId) {
  console.log(employeeId);
  var request = {
    method: "DELETE",
  };

  fetch(`http://localhost:3031/api/employees/${employeeId}`, request)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Handle the success response here
      console.log("Employee deleted successfully", data);
      location.reload();
    })
    .catch((error) => {
      // Handle errors here
      console.error("Error deleting employee:", error);
    });
}

// =========================================================================
// VALIDATION FUNCTION
var empform = document.getElementById("empform");

empform.addEventListener("submit", addemployee);
var fileInputElement = document.getElementById("avatar");
var selectedImageElement = document.getElementById("selectedImage"); // Add this line
var errormsg=document.getElementById("inputError");

function addemployee(event) {
  event.preventDefault();

  if (!validate()) {
    return;
  }

  var firstName = document.getElementById("Fname").value;
  var lastName = document.getElementById("Lname").value;
  var email = document.getElementById("email").value;
  var mobile = document.getElementById("mobile").value;
  var gender = document.querySelector('input[name="gender"]:checked').value;
  var DOB = document.getElementById("birthday").value;
  var qualifications = document.getElementById("qual").value;
  var address = document.getElementById("address").value;
  var country = document.getElementById("country").value;
  var state = document.getElementById("state").value;
  var city = document.getElementById("city").value;
  var pinzip = document.getElementById("pinzip").value;
  var salutation = document.getElementById("mrms").value;
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  const formData = new FormData();

  // Append employee data to FormData
  formData.append("salutation", salutation);
  formData.append("firstName", firstName);
  formData.append("lastName", lastName);
  formData.append("email", email);
  formData.append("phone", mobile);
  formData.append("gender", gender);
  formData.append("dob", DOB);
  formData.append("qualification", qualifications);
  formData.append("address", address);
  formData.append("country", country);
  formData.append("state", state);
  formData.append("city", city);
  formData.append("pincode", pinzip);
  formData.append("username", username);
  formData.append("password", password);

  // Append the avatar file to FormData
  formData.append("avatar", fileInputElement.files[0]);

  // Perform the fetch request
  fetch("http://localhost:3031/api/employees", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Employee added successfully:", data);
          // Display an alert after the employee is added successfully
          window.alert("Employee added successfully!");
      empform.reset();
      
    })
    .catch((error) => {
      console.error("Error adding employee:", error);
    });
}

fileInputElement.addEventListener("change", function () {
  if (fileInputElement.files[0]) {
    selectedImageElement.src = URL.createObjectURL(fileInputElement.files[0]);
    selectedImageElement.style.display = "block";

  } else {
    selectedImageElement.src = ""; // Clear the image if no file is selected
    selectedImageElement.style.display = "none";
  }
});
function validate() {
  var salut = document.getElementById("mrms").value;
  if (salut === "") {
    // alert("Please seledct a salutation");
    document.getElementById("mrms").focus();
    document.getElementById("mrms").style.border = "1px solid red";
    document.getElementById("salError").style.display="block";
  }
  else{
    document.getElementById("mrms").focus();
    document.getElementById("mrms").style.border = "1px solid green";
    document.getElementById("salError").style.display="none";

  }
  var firstName = document.getElementById("Fname").value;
  var namePattern = /^[A-Za-z]+$/;
  if (firstName === "") {
    // alert("Please provide your first name!");        //validating fname isnt empty
    document.getElementById("Fname").focus();
    document.getElementById("Fname").style.border = "1px solid red";
    document.getElementById("fNameError").style.display="block";

  } else if (!namePattern.test(firstName)) {
    // alert("First name should only contain letters.");
    document.getElementById("Fname").focus();
    document.getElementById("Fname").style.border = "1px solid red";
    document.getElementById("fNameError").style.display="block";

  }
  else{
    document.getElementById("Fname").focus();
    document.getElementById("Fname").style.border = "1px solid green";
    document.getElementById("fNameError").style.display="none";

  }

  var lastName = document.getElementById("Lname").value;
  var name2Pattern = /^[A-Za-z]+$/;

  if (lastName === "") {
    // alert("Please provide your name!");             //same for last name
    document.getElementById("Lname").focus();
    document.getElementById("Lname").style.border = "1px solid red";
    document.getElementById("lNameError").style.display="block";

  } else if (!name2Pattern.test(lastName)) {
    alert("Last name should only contain letters.");
    document.getElementById("Lname").focus();
    document.getElementById("Lname").style.border = "1px solid red";
    document.getElementById("lNameError").style.display="none";

  } else{
    document.getElementById("Lname").focus();
    document.getElementById("Lname").style.border = "1px solid green";
    document.getElementById("lNameError").style.display="none";

  }
  var username = document.getElementById("username").value;
  if (username === "") {
    document.getElementById("username").focus();
    document.getElementById("username").style.border = "1px solid red";
    document.getElementById("usernameError").style.display="block";

  } else{
    document.getElementById("username").focus();
    document.getElementById("username").style.border = "1px solid green";
    document.getElementById("usernameError").style.display="none";

  }

  var password = document.getElementById("password").value;
  // var passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Password pattern with minimum 8 characters, at least one letter, and one number
  if (password === "") {
    document.getElementById("password").focus();
    document.getElementById("password").style.border = "1px solid red";
    document.getElementById("passError").style.display="block";

  } //else if (!passwordPattern.test(password)) {
  //   document.getElementById("password").focus();
  //   document.getElementById("password").style.border = "1px solid red";
  // }
  else{
    document.getElementById("password").focus();
    document.getElementById("password").style.border = "1px solid green";
    document.getElementById("passError").style.display="none";

  }

  var mobile = document.getElementById("mobile").value;
  var regphone = /^[7-9][0-9]{9}$/;
  if (mobile === "") {
    //field cannot be blank
    document.getElementById("mobile").focus();
    document.getElementById("mobile").style.border = "1px solid red";
    document.getElementById("mobError").style.display="block";

  } else if (!regphone.test(mobile)) {
    document.getElementById("mobile").focus();
    document.getElementById("mobile").style.border = "1px solid red";
    document.getElementById("mobError").style.display="block";
    document.getElementById("mobError").textContent="Only numbers";

  } else{
    document.getElementById("mobile").focus();
    document.getElementById("mobile").style.border = "1px solid green";
    document.getElementById("mobError").style.display="none";

  }

  var email = document.getElementById("email").value;
  var regemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "") {
    //field cannot be blank
    document.getElementById("email").focus();
    document.getElementById("email").style.border = "1px solid red";
    document.getElementById("emailError").style.display="block";

  } else if (!regemail.test(email)) {
    document.getElementById("email").focus();
    document.getElementById("email").style.border = "1px solid red";
    document.getElementById("emailError").style.display="block";
    document.getElementById("emailError").textContent="Email error";

  } else{
    document.getElementById("email").focus();
    document.getElementById("email").style.border = "1px solid green";
    document.getElementById("emailError").style.display="none";

  }

  var DOB = document.getElementById("birthday").value;
  if (DOB === "") {
    document.getElementById("birthday").focus();
    document.getElementById("birthday").style.border = "1px solid red";
    document.getElementById("dobError").style.display="block";

    // alert("Please enter the date");
  } else{
    document.getElementById("birthday").focus();
    document.getElementById("birthday").style.border = "1px solid green";
    document.getElementById("dobError").style.display="none";

  }

  var genderRadios = document.querySelectorAll('input[name="gender"]');
  var genderSelected = false;

  for (var i = 0; i < genderRadios.length; i++) {
    if (genderRadios[i].checked) {
      genderSelected = true;
      break;
    }
  }

  if (!genderSelected) {
    for (var i = 0; i < genderRadios.length; i++) {
      var label = genderRadios[i].nextElementSibling; // Get the associated label element
      if (label && label.tagName === "LABEL") {
        label.style.border = "1px solid red";
      } else{
        label.style.border = "none";

      }
    }
  }

  var qualifications = document.getElementById("qual").value;
  if (qualifications === "") {
    document.getElementById("qual").focus();
    document.getElementById("qual").style.border = "1px solid red";
    document.getElementById("qualError").style.display="block";

    // alert("Please enter the relevent field");
  } else{
    document.getElementById("qual").focus();
    document.getElementById("qual").style.border = "1px solid green";
    document.getElementById("qualError").style.display="none";

  }

  var address = document.getElementById("address").value;
  if (address === "") {
    document.getElementById("address").focus();
    document.getElementById("address").style.border = "1px solid red";
    document.getElementById("addError").style.display="block";

  } else{
    document.getElementById("address").focus();
    document.getElementById("address").style.border = "1px solid green";
    document.getElementById("addError").style.display="none";

  }

  var countrySelect = document.getElementById("country");
  var selectedOption = countrySelect.options[countrySelect.selectedIndex].value;

  if (selectedOption === "Choose...") {
    document.getElementById("country").focus();
    countrySelect.style.border = "1px solid red";
  } else{
    countrySelect.style.border = "none";

  }

  var state = document.getElementById("state");
  var selectedOption = state.options[state.selectedIndex].value;

  if (selectedOption === "Choose...") {
    document.getElementById("state").focus();
    document.getElementById("state").style.border = "1px solid red";
    // alert("Please enter your state");
  } else{
    document.getElementById("state").style.border = "none";

  }

  var city = document.getElementById("city");
  var selectedOption = city.options[city.selectedIndex].value;

  if (selectedOption === "Choose...") {
    document.getElementById("city").focus();
    document.getElementById("city").style.border = "1px solid red";
    // alert("Please enter your city");
  } else{
    document.getElementById("city").style.border = "none";

  }

  var pinzip = document.getElementById("pinzip").value;
  if (pinzip === "") {
    document.getElementById("pinzip").focus();
    document.getElementById("pinzip").style.border = "1px solid red";
    document.getElementById("pinError").style.display="block";

  } else{
    document.getElementById("pinzip").focus();
    document.getElementById("pinzip").style.border = "1px solid green";
    document.getElementById("pinError").style.display="none";

  }

  return true;
}
// ============================================================================
// SEARCH FUNCTION

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
let selectedFile = null; // Create a variable to store the selected file
const table = document.getElementById("tableBody");
let employee = [];

searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase();

  // Loop through all rows in the table and hide those that don't match the search criteria
  const rows = table.getElementsByTagName("tr");
  for (let i = 0; i < rows.length; i++) {
    // Start from index 1 to skip the header row
    const row = rows[i];
    const fullName = row.cells[1].textContent.toLowerCase(); // Assuming the name is in the second cell
    const email = row.cells[2].textContent.toLowerCase(); // Assuming email is in the third cell
    const phone = row.cells[3].textContent.toLowerCase(); // Assuming phone is in the fourth cell

    // Check if any of the row's data matches the search term
    if (
      fullName.includes(searchTerm) ||
      email.includes(searchTerm) ||
      phone.includes(searchTerm)
    ) {
      row.style.display = "table-row"; // Show the row
    } else {
      row.style.display = "none"; // Hide the row
    }
  }
});
// ======================================================================

// PAGINATION

const tr = document.getElementById("tableBody").getElementsByTagName("tr");
var empnumber = tr.length;
console.log(empnumber);
var pgnum = document.getElementById("pgnum");
var display = 5;
var count = 1;
var btncount = Math.ceil(empnumber / display);
console.log(btncount);

for (let i = 1; i <= btncount; i++) {
  var button = document.createElement("button");
  button.innerHTML = i;
  pgnum.appendChild(button);
}

document.getElementById("pgprev").addEventListener("click", prev);
document.getElementById("pgnext").addEventListener("click", next);

document.getElementById("pgprev").setAttribute("disabled", true);

function main(pageNum) {
  var nextPage = display * pageNum; // 5
  var prevPage = display * (pageNum - 1); //0
  console.log("n=" + nextPage);
  console.log("p=" + prevPage);

  for (let i = 0; i < empnumber; i++) {
    tr[i].style.display = "none";

    if (i >= prevPage && i < nextPage) {
      tr[i].style.display = "table-row"; // Display the row
    }
  }
}

main(1);

var pgbutton = pgnum.getElementsByTagName("button"); //Button inside empty div

console.log(pgbutton.length);
for (i = 0; i < pgbutton.length; i++) {
  pgbutton[i].addEventListener("click", buttonClick);
}
pgbutton[count - 1].classList.add("pgbuttoncss");

function buttonClick() {
  // console.log(this.innerHTML);
  pgbutton[count - 1].classList.remove("pgbuttoncss");
  if (this.innerHTML == btncount) {
    document.getElementById("pgnext").setAttribute("disabled", true);
    document.getElementById("pgprev").removeAttribute("disabled");
  } else if (this.innerHTML == 1) {
    document.getElementById("pgnext").removeAttribute("disabled");
    document.getElementById("pgprev").setAttribute("disabled", true);
  } else {
    document.getElementById("pgprev").removeAttribute("disabled");
    document.getElementById("pgnext").removeAttribute("disabled");
  }
  count = this.innerHTML;
  main(count);
  this.classList.add("pgbuttoncss");
}

function prev() {
  pgbutton[count - 1].classList.remove("pgbuttoncss");
  pgbutton[count - 2].classList.add("pgbuttoncss");
  document.getElementById("pgnext").removeAttribute("disabled");
  if (count !== 1) {
    count--;
  }
  if (count == 1) {
    document.getElementById("pgprev").setAttribute("disabled", true);
  }

  main(count);
}
function next() {
  document.getElementById("pgprev").removeAttribute("disabled");
  console.log(btncount);
  if (count !== btncount) {
    pgbutton[count - 1].classList.remove("pgbuttoncss");
    pgbutton[count].classList.add("pgbuttoncss");
    count++;
  }
  if (count == pgbutton) {
    document.getElementById("pgnext").setAttribute("disabled", true);
  }
  main(count);
}

// ======================================================================
const selectCountry = document.getElementById("country");

fetch("https://restcountries.com/v3.1/all")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    // Iterate through the array of country objects
    data.forEach((country) => {
      // Access the common name of the country
      const commonName = country.name.common;

      // Create an option element and set its value and text
      const option = document.createElement("option");
      option.value = commonName;
      option.textContent = commonName;

      // Append the option to the select element
      selectCountry.appendChild(option);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// ===========================================================================================
