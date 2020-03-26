const name = document.getElementById("name");
const email = document.getElementById("email");
const username = document.getElementById("username");
const password = document.getElementById("password");
const confirm_password = document.getElementById("confirm_password");

const setError = elem => {
  elem.style.backgroundColor = "rgba(219, 71, 71, 0.856)";
  elem.style.borderColor = "red";
};

const unsetError = elem => {
  elem.style.backgroundColor = "white";
  elem.style.borderColor = "rgba(36, 1, 1, 0.185)";
  elem.nextElementSibling.innerHTML = "";
};

const inputHasFocus = e => {
  const { target } = e;
  unsetError(target);
};

const validatePassword = target => {
  if (target.value === "") {
    setError(target);
    throw "Password can't be empty";
  } else {
    if (target.value.length < 7) {
      setError(target);
      throw "Password should be 7 or more characters";
    }
  }
};

name.addEventListener("blur", onBlurName);
name.addEventListener("focus", inputHasFocus);

function onBlurName(e) {
  const { target } = e;

  try {
    if (target.value === "") {
      setError(target);
      throw "Name can't be empty";
    } else {
      const patt = /[!@#$%\^&\*()-=_\+\{\}\[\]\\|;:'",\.<>/\?`~]/;

      if (patt.test(target.value)) {
        setError(target);
        throw "Name can only contain letters, numbers and space";
      }
    }
  } catch (err) {
    document.getElementById("name--error").innerHTML = err;
  }
}

email.addEventListener("blur", onBlurEmail);
email.addEventListener("focus", inputHasFocus);

async function onBlurEmail(e) {
  const { target } = e;

  try {
    if (target.value === "") {
      setError(target);
      throw "Email can't be empty";
    } else {
      const patt = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!patt.test(target.value)) {
        setError(target);
        throw "Invalid e-mail";
      } else {
        const usersArr = await fetch("users.json");
        const users = await usersArr.json();
        users.map(user => {
          if (user.email.toLowerCase() === target.value.toLowerCase()) {
            setError(target);
            throw "This e-mail already exists";
          }
        });
      }
    }
  } catch(err) {
    document.getElementById("email--error").innerHTML = err;
  }
}

username.addEventListener("blur", onBlurUsername);
username.addEventListener("focus", inputHasFocus);

async function onBlurUsername(e) {
  const { target } = e;

  try {
    if (target.value === "") {
      setError(target);
      throw "Username can't be empty";
    } else {
      const patt = /^_*[a-z0-9]+_*[a-z0-9]*_*$/i;

      if (target.value.length < 4) {
        setError(target);
        throw "Username must be 4 or more characters";
      } else if (!patt.test(target.value)) {
        setError(target);
        throw "Username can only contain letters, numbers and underscore'_'";
      } else {
        const usersArr = await fetch("users.json");
        const users = await usersArr.json();
        users.map(user => {
          if (user.username.toLowerCase() === target.value.toLowerCase()) {
            setError(target);
            throw "Username already exists";
          }
        });
      }
    }
  } catch(err) {
    document.getElementById("username--error").innerHTML = err;
  }
}

password.addEventListener("blur", onBlurPassword);
password.addEventListener("focus", inputHasFocus);

function onBlurPassword(e) {
  const { target } = e;

  try {
    validatePassword(target);
  } catch(err) {
    document.getElementById("password--error").innerHTML = err;
  }
}

confirm_password.addEventListener("blur", onBlurConfirmPassword);
confirm_password.addEventListener("focus", inputHasFocus);

function onBlurConfirmPassword(e) {
  const { target } = e;

  try {
    validatePassword(target);
  } catch(err) {
    document.getElementById("confirm_password--error").innerHTML = err;
  }
}
