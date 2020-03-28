import { eye, password, confirmPassword } from "./variables.js";

const setError = elem => {
  elem.style.backgroundColor = "#ffcccc";
  elem.style.borderColor = "#cc0000";
};

const inputHasFocus = e => {
  const { target } = e;

  target.style.backgroundColor = "#fff";
  target.style.borderColor = "rgba(96, 64, 32, 0.5)";
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

  if (child.classList.contains("fa-eye-slash")) {
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
