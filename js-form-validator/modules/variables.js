export const name = document.getElementById("name");
export const email = document.getElementById("email");
export const username = document.getElementById("username");
export const password = document.getElementById("password");
export const confirmPassword = document.getElementById("confirm_password");

export let nameErr = true;
export let emailErr = true;
export let usernameErr = true;
export let passwordErr = true;
export let confPassErr = true;

export const setError = elem => {
  elem.style.backgroundColor = "rgba(219, 71, 71, 0.856)";
  elem.style.borderColor = "red";
};

export const inputHasFocus = e => {
  const { target } = e;

  target.style.backgroundColor = "white";
  target.style.borderColor = "rgba(36, 1, 1, 0.185)";
  target.nextElementSibling.innerHTML = "";
};

export const catchError = (elem, str) => {
  document.getElementById(elem).innerHTML = str;
};
