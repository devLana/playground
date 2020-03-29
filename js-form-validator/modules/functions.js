import { eye, password, confirmPassword } from "./variables.js";

const setError = elem => {
  elem.className = "danger";
};

const inputHasFocus = e => {
  const { target } = e;

  target.className = "";
  target.nextElementSibling.innerHTML = "";
};

const catchError = (elem, str) => {
  document.getElementById(elem).innerHTML = str;
};

const detectCapsLock = e => {
  const { target } = e;

  try {
    if (e.getModifierState("CapsLock")) {
      throw "Caps lock is on";
    } else {
      inputHasFocus(e);
    }
  } catch (err) {
    catchError(target.nextElementSibling.id, err);
  }
};

const togglePassword = () => {
  const child = eye.firstChild;

  if (password.type === "password" && confirmPassword.type === "password") {
    child.className = "fas fa-eye";
    password.type = "text";
    confirmPassword.type = "text";
  } else {
    child.className = "fas fa-eye-slash";
    password.type = "password";
    confirmPassword.type = "password";
  }
};

export { setError, inputHasFocus, catchError, detectCapsLock, togglePassword };
