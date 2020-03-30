import {
  setError,
  inputHasFocus,
  catchError,
  detectCapsLock,
  togglePassword
} from "./modules/functions.js";

import {
  name,
  email,
  username,
  password,
  confirmPassword,
  msg,
  inputs,
  eye
} from "./modules/variables.js";

let nameErr, emailErr, usernameErr, passwordErr, confPassErr;

name.addEventListener("blur", validateName);
name.addEventListener("focus", inputHasFocus);

email.addEventListener("blur", validateEmail);
email.addEventListener("focus", inputHasFocus);

username.addEventListener("blur", validateUsername);
username.addEventListener("focus", inputHasFocus);

password.addEventListener("blur", validatePassword);
password.addEventListener("focus", inputHasFocus);
password.addEventListener("keyup", detectCapsLock);

confirmPassword.addEventListener("blur", validateConfPassword);
confirmPassword.addEventListener("focus", inputHasFocus);
confirmPassword.addEventListener("keyup", detectCapsLock);

eye.addEventListener("click", togglePassword);

document.querySelector("form").addEventListener("submit", e => {
  e.preventDefault();

  validateName();
  validateEmail();
  validateUsername();
  validatePassword();
  validateConfPassword();

  if (nameErr || emailErr || usernameErr || passwordErr || confPassErr) {
    msg.innerHTML = "";
    msg.className = "";
  } else {
    msg.innerHTML = "Registration Successful!";
    msg.className = "form-success";
    inputs.forEach(input => (input.className = "success"));
  }
});

function validateName() {
  const regex = /[^a-z0-9\s]/i;

  try {
    if (name.value === "") {
      nameErr = true;
      setError(name);
      throw "Name can't be empty";
    } else if (regex.test(name.value)) {
      nameErr = true;
      setError(name);
      throw "Name can only contain letters or numbers and space";
    }

    nameErr = false;
    name.value.trim();
  } catch (err) {
    catchError("name--error", err);
  }
}

async function validateEmail() {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  try {
    if (email.value === "") {
      emailErr = true;
      setError(email);
      throw "E-mail can't be empty";
    } else if (!regex.test(email.value)) {
      emailErr = true;
      setError(email);
      throw "Invalid e-mail";
    } else {
      const usersArr = await fetch("users.json");
      const users = await usersArr.json();
      users.map(user => {
        if (user.email.toLowerCase() == email.value.toLowerCase()) {
          emailErr = true;
          setError(email);
          throw "E-mail already exists";
        }
      });

      emailErr = false;
      email.value.trim();
    }
  } catch (err) {
    catchError("email--error", err);
  }
}

async function validateUsername() {
  const regex = /[^a-z0-9_]/i;

  try {
    if (username.value === "") {
      usernameErr = true;
      setError(username);
      throw "Username can't be empty";
    } else if (username.value.length < 4) {
      usernameErr = true;
      setError(username);
      throw "Username must be 4 or more characters";
    } else if (regex.test(username.value)) {
      usernameErr = true;
      setError(username);
      throw "Username can only contain letters, numbers and underscores";
    } else {
      const usersArr = await fetch("users.json");
      const users = await usersArr.json();

      users.map(user => {
        if (user.username.toLowerCase() === username.value.toLowerCase()) {
          usernameErr = true;
          setError(username);
          throw "Username already exists";
        }
      });

      usernameErr = false;
      username.value.trim();
    }
  } catch (err) {
    catchError("username--error", err);
  }
}

function validatePassword() {
  try {
    if (password.value === "") {
      passwordErr = true;
      setError(password);
      throw "Password can't be empty";
    } else if (password.value.length < 7) {
      passwordErr = true;
      setError(password);
      throw "Username must be 7 or more characters";
    }

    passwordErr = false;
  } catch (err) {
    catchError("password--error", err);
  }
}

function validateConfPassword() {
  try {
    if (confirmPassword.value === "") {
      confPassErr = true;
      setError(confirmPassword);
      throw "Password can't be empty";
    } else if (confirmPassword.value !== password.value) {
      confPassErr = true;
      setError(confirmPassword);
      throw "Passwords do not match";
    }

    confPassErr = false;
  } catch (err) {
    catchError("confirm_password--error", err);
  }
}
