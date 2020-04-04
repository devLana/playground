import createTable, {addNewUser} from "./modules/core.js";

const form = document.querySelector("form");

document.body.onload = () => createTable();

form.addEventListener("submit", addNewUser);
