import {
  name,
  email,
  username,
  password,
  confirmPassword,
} from "./variables.js";

import {
  nameErr,
  emailErr,
  usernameErr,
  passwordErr,
  confPassErr,
  setError,
  catchError
} from "./variables.js";



function validateName() {
  const regex = /[!@#$%\^&\*()-=_\+\{\}\[\]\\|;:'",\.<>/\?`~]/;

  try {
    if (name.value === "") {
      setError(name);
      throw "Name can't be empty";
    } else if (regex.test(name.value)) {
      setError(name);
      throw "Invalid Name";
    }

    nameErr = false;
    name.value.trim();

  } catch(err) {
    catchError("name--error", err);
  }
}


async function validateEmail() {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  try {
    if (email.value === "") {
      setError(email);
      throw "E-mail can't be empty";
    } else if (!regex.test(email.value)) {
      setError(email);
      throw "Invalid e-mail";
    } else {
      const usersArr = await fetch("users.json");
      const users = await usersArr.json();
      users.map(user => {
        if (user.email.toLowerCase() == email.value.toLowerCase()) {
          setError(email);
          throw "E-mail already exists";
        }
      });

      emailErr = false;
      email.value.trim();
    }
  } catch(err) {
    catchError("email--error", err);
  }
}


async function validateUsername() {
  const regex = /^_*[a-z0-9]+_*[a-z0-9]*_*$/i;

  try {
    if (username.value === "") {
      setError(username);
      throw "Username can't be empty";
    } else if (username.value.length < 4) {
      setError(username);
      throw "Username must be 4 or more characters";
    } else if (!regex.test(username.value)) {
      setError(username);
      throw "Username can only contain letters, numbers and underscores";
    } else {
      const usersArr = await fetch("users.json");
      const users = await usersArr.json();

      users.map(user => {
        if (user.username.toLowerCase() === username.value.toLowerCase()) {
          setError(username);
          throw "Username already exists";
        }
      });

      usernameErr = false;
      username.value.trim();
    }
  } catch(err) {
    catchError("username--error", err);
  }
}


function validatePassword() {
  try {
    if (password.value === "") {
      setError(password);
      throw "Password can't be empty";
    } else if (password.value.length < 7) {
      setError(password);
      throw "Username must be 7 or more characters";
    }

    passwordErr = false;

  } catch(err) {
    catchError("password--error", err);
  }
}


function validateConfPassword() {
  try {
    if (confirmPassword.value === "") {
      setError(confirmPassword);
      throw "Password can't be empty";
    } else if (confirmPassword.value !== password.value) {
      setError(confirmPassword);
      throw "Passwords do not match";
    }

    confPassErr = false;

  } catch(err) {
    catchError("confirm_password--error", err);
  }
}


export {
  validateName,
  validateEmail,
  validateUsername,
  validatePassword,
  validateConfPassword,
}
