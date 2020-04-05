import createTable, { addNewUser, editOneUser } from "./modules/core.js";
import { closeEdit } from "./modules/functions.js";

const addUser = document.querySelector("#add__user");
const editUser = document.querySelector("#edit__user");
const close = document.querySelector(".ctrl__btns span");

document.body.onload = () => createTable();

addUser.addEventListener("submit", addNewUser);
editUser.addEventListener("submit", editOneUser);

close.addEventListener("click", closeEdit);
