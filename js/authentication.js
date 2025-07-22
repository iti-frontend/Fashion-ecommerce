// REGISTRATION FUNCTION
var registrationButton = document.getElementById("registrationButton");
var localStorageUsers = JSON.parse(localStorage.getItem("users")) || [];

if (registrationButton) {
  registrationButton.addEventListener("click", registration);
}
function registration() {
  // get registration inputs
  var nameInput = document.getElementById("username");
  var emailInput = document.getElementById("email");
  var passwordInput = document.getElementById("pass");

  // to rest inputs after registration
  var name = nameInput.value.trim();
  var email = emailInput.value.trim();
  var password = passwordInput.value.trim();

  if (name.length < 3) {
    var InvalidUser = document.getElementById("InvalidUser");
    InvalidUser.classList.add("displayInvalid");
    InvalidUser.textContent = "Name must be at lest 3 char.";
    return;
  }
  if (email.indexOf("@") == -1) {
    var InvalidEmail = document.getElementById("InvalidEmail");
    InvalidEmail.classList.add("displayInvalid");
    InvalidEmail.textContent = "Please Enter valid email";
    return;
  }
  if (password.length < 8) {
    var invalidPass = document.getElementById("invalidPass");
    invalidPass.classList.add("displayInvalid");
    invalidPass.textContent = "password must be at least 8 char.";
    return;
  }

  //  to check if the email is already existed
  var existingEmail = false;
  for (var i = 0; i < localStorageUsers.length; i++) {
    if (localStorageUsers[i].email === email) {
      existingEmail = true;
      break;
    }
  }

  if (existingEmail) {
    alert("this email is already registered please login");
    window.location.href = "index.html";
    return;
  }

  //   add the new user to the array then save it in localstorage
  var user = { name, email, password };
  localStorageUsers.push(user);
  localStorage.setItem("users", JSON.stringify(localStorageUsers));
  alert("Registration successful you will be redirected to the login page");

  //   reset inputs
  nameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";

  window.location.href = "login.html";
}

// LOGIN FUNCTION
var loginButton = document.getElementById("loginButton");

if (loginButton) {
  loginButton.addEventListener("click", login);
}
function login() {
  // get login inputs
  var emailInput = document.getElementById("email");
  var passwordInput = document.getElementById("pass");

  // to rest inputs after login
  var email = emailInput.value.trim();
  var password = passwordInput.value.trim();

  if (!email) {
    var InvalidUser = document.getElementById("invalidUser");

    InvalidUser.classList.add("displayInvalid");
    InvalidUser.textContent = "please enter a valid email";
    return;
  }
  if (!password) {
    var invalidPass = document.getElementById("invalidPass");
    invalidPass.classList.add("displayInvalid");
    invalidPass.textContent = "please enter your password";

    return;
  }

  var foundUser = null;

  for (var i = 0; i < localStorageUsers.length; i++) {
    if (
      localStorageUsers[i].email === email &&
      localStorageUsers[i].password === password
    ) {
      foundUser = localStorageUsers[i];
      break;
    }
  }

  if (foundUser) {
    alert("Login successful");
    localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
    window.location.href = "index.html";
  } else {
    alert("Incorrect email or password");
  }
}

// LOGOUT FUNCTION
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}
