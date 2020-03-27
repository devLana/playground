const name = document.getElementById("name");
const email = document.getElementById("email");
const username = document.getElementById("username");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm_password");
const msg = document.querySelector("#msg");
const inputs = document.querySelectorAll("input[id]");
const container = document.querySelectorAll(".pw-container");
const eyes = document.querySelectorAll(".eye");

eyes.forEach(eye => {
  eye.addEventListener("click", () => {
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
  });
});


const setError = elem => {
  elem.style.backgroundColor = "#ffcccc";
  elem.style.borderColor = "#cc0000";
};

const inputHasFocus = e => {
  const { target } = e;

  if (target.id === "password" || target.id === "confirm_password") {
    target.parentElement.style.backgroundColor = "#fff";
    target.parentElement.style.borderColor = "rgba(96, 64, 32, 0.5)";
    target.parentElement.style.outline = "1px solid rgb(77, 77, 243)";
    target.parentElement.nextElementSibling.innerHTML = "";
  } else {
    target.style.backgroundColor = "#fff";
    target.style.borderColor = "rgba(96, 64, 32, 0.5)";
    target.style.outline = "1px solid rgb(77, 77, 243)";
    target.nextElementSibling.innerHTML = "";
  }
};

const catchError = (elem, str) => {
  document.getElementById(elem).innerHTML = str;
};

const detectCapsLock = e => {
  const { target } = e;

  try {
    if (e.getModifierState("CapsLock")) {
      setError(target);
      throw "Caps lock is on";
    } else {
      inputHasFocus(e);
    }
  } catch (err) {
    catchError(target.nextElementSibling.id, err);
  }
};

let nameErr = (emailErr = usernameErr = passwordErr = confPassErr = true);

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

document.querySelector("form").addEventListener("submit", e => {
  e.preventDefault();

  validateName();
  validateEmail();
  validateUsername();
  validatePassword();
  validateConfPassword();

  if (
    (nameErr || emailErr || usernameErr || passwordErr || confPassErr) === true
  ) {
    return false;
  } else {
    msg.innerHTML = "Registration Successful!";
    msg.className = "success";
    inputs.forEach(input => input.style.borderColor = "#00ff00");
  }
});

function validateName() {
  const regex = /^[a-z0-9]+\s?[a-z0-9]*$/i;
  name.style.outline = "none";

  try {
    if (name.value === "") {
      setError(name);
      throw "Name can't be empty";
    } else if (!regex.test(name.value)) {
      setError(name);
      throw "Invalid Name";
    }

    nameErr = false;
    name.value.trim();
  } catch (err) {
    catchError("name--error", err);
  }
}

async function validateEmail() {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  email.style.outline = "none";

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
  } catch (err) {
    catchError("email--error", err);
  }
}

async function validateUsername() {
  const regex = /^_*[a-z0-9]+_*[a-z0-9]*_*$/i;
  username.style.outline = "none";

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
  } catch (err) {
    catchError("username--error", err);
  }
}

function validatePassword() {
  password.parentElement.style.outline = "none";

  try {
    if (password.value === "") {
      setError(container[0]);
      throw "Password can't be empty";
    } else if (password.value.length < 7) {
      setError(container[0]);
      throw "Username must be 7 or more characters";
    }

    passwordErr = false;
  } catch (err) {
    catchError("password--error", err);
  }
}

function validateConfPassword() {
  confirmPassword.parentElement.style.outline = "none";

  try {
    if (confirmPassword.value === "") {
      setError(container[1]);
      throw "Password can't be empty";
    } else if (confirmPassword.value !== password.value) {
      setError(container[1]);
      throw "Passwords do not match";
    }

    confPassErr = false;
  } catch (err) {
    catchError("confirm_password--error", err);
  }
}
