import {
  inputHasFocus,
  name,
  email,
  username,
  password,
  confirmPassword
} from "./modules/variables.js";

import {
  validateName,
  validateEmail,
  validateUsername,
  validatePassword,
  validateConfPassword,
} from "./modules/functions.js";

import {
  nameErr,
  emailErr,
  usernameErr,
  passwordErr,
  confPassErr
} from "./modules/variables.js";

name.addEventListener("blur", validateName);
name.addEventListener("focus", inputHasFocus);

email.addEventListener("blur", validateEmail);
email.addEventListener("focus", inputHasFocus);

username.addEventListener("blur", validateUsername);
username.addEventListener("focus", inputHasFocus);

password.addEventListener("blur", validatePassword);
password.addEventListener("focus", inputHasFocus);

confirmPassword.addEventListener("blur", validateConfPassword);
confirmPassword.addEventListener("focus", inputHasFocus);

document.querySelector("form").addEventListener("submit", e => {
  e.preventDefault();

  validateName();
  validateEmail();
  validateUsername();
  validatePassword();
  validateConfPassword();

  if ((nameErr || emailErr || usernameErr || passwordErr || confPassErr) === true) {
    return false;
  } else {
    document.write("Registration Successful");
  }
});
