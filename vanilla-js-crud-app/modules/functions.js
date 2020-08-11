import { people } from "./data.js";
import createTable from "./core.js";

export function editFunc(btn) {
  btn.addEventListener("click", e => {
    const id = e.target.classList[1];
    const wrapper = document.querySelector(".form-container");
    const userId = document.getElementById("edit__user--id");
    const name = document.getElementById("edit__user--name");
    const occupation = document.getElementById("edit__user--occupation");
    const userToEdit = people.users.find(user => user.id === Number(id));

    wrapper.classList.add("flip");
    userId.value = id;
    name.value = userToEdit.name;
    occupation.value = userToEdit.occupation;
    people.edit = true;
    createTable();
  });
}

export function deleteFunc(btn) {
  btn.addEventListener("click", e => {
    const id = e.target.classList[1];

    if (people.edit) return;
    people.users = people.users.filter(user => user.id !== Number(id));
    createTable();
  });
}

export function getId() {
  const len = people.users.length;

  if (len === 0) return 1;
  return people.users[len - 1].id + 1;
}

export function closeEdit() {
  const wrapper = document.querySelector(".form-container");

  wrapper.classList.remove("flip");
  people.edit = false;
  createTable();
}
