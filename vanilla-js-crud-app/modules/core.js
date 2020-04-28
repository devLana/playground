import { people } from "./data.js";
import { editFunc, deleteFunc, getId } from "./functions.js";

export function addNewUser(e) {
  e.preventDefault();

  const name = document.getElementById("add__user--name");
  const occupation = document.getElementById("add__user--occupation");
  const person = {
    id: null,
    name: "",
    occupation: "",
  };

  if (name.value.trim() === "" || occupation.value.trim() === "") return;

  person.id = getId();
  person.name = name.value.trim();
  person.occupation = occupation.value.trim();

  people.users = [...people.users, person];
  name.value = "";
  occupation.value = "";
  createTable();
}

export function editOneUser(e) {
  e.preventDefault();

  const wrapper = document.querySelector(".form-container");
  const id = document.getElementById("edit__user--id");
  const name = document.getElementById("edit__user--name");
  const occupation = document.getElementById("edit__user--occupation");
  const index = people.users.findIndex((user) => user.id === Number(id.value));

  if (name.value.trim() === "" || occupation.value.trim() === "") return;
  if (
    name.value.trim() === people.users[index].name &&
    occupation.value.trim() === people.users[index].occupation
  )
    return;

  people.users[index].name = name.value.trim();
  people.users[index].occupation = occupation.value.trim();
  wrapper.classList.remove("flip");
  people.edit = false;
  createTable();
}

export default function createTable() {
  const tbody = document.querySelector("table tbody");
  let row = "";

  if (people.users.length === 0) {
    row += '<tr><td colspan="3">No data available</td></tr>';
    tbody.innerHTML = row;
    return;
  }

  people.users.forEach((user) => {
    let deleteBtn;

    if (people.edit) {
      deleteBtn = `<button class="delete ${user.id} btn btn-danger disabled">Delete</button>`;
    } else {
      deleteBtn = `<button class="delete ${user.id} btn btn-danger">Delete</button>`;
    }

    row += `
      <tr>
        <td>
          ${user.name}
        </td>
        <td>
          ${user.occupation}
        </td>
        <td>
          <button class="edit ${user.id} btn btn-primary">Edit</button>
          ${deleteBtn}
        </td>
      </tr>`;
  });
  tbody.innerHTML = row;

  const editButtons = document.querySelectorAll(".edit");
  const deleteButtons = document.querySelectorAll(".delete");

  editButtons.forEach(editFunc);
  deleteButtons.forEach(deleteFunc);
}
