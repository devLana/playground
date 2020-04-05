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

  if (name.value === "" || occupation.value === "") return;

  person.id = getId();
  person.name = name.value;
  person.occupation = occupation.value;

  people.users.push(person);
  createTable();
  name.value = "";
  occupation.value = "";
}

export function editOneUser(e) {
  e.preventDefault();

  const wrapper = document.querySelector(".form-container");
  const id = document.getElementById("edit__user--id");
  const name = document.getElementById("edit__user--name");
  const occupation = document.getElementById("edit__user--occupation");
  const index = people.users.findIndex((user) => user.id === Number(id.value));

  if (name.value === "" || occupation.value === "") return;
  if (
    name.value === people.users[index].name &&
    occupation.value === people.users[index].occupation
  )
    return;

  people.users[index].name = name.value;
  people.users[index].occupation = occupation.value;
  createTable();
  wrapper.classList.remove("flip");
  people.edit = false;
}

export default function createTable() {
  const tbody = document.querySelector("table tbody");
  let row = "";

  if (people.users.length === 0) {
    row += '<td colspan="3">No data available</td>';
    tbody.innerHTML = row;
    return;
  }

  people.users.forEach((user) => {
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
          <button class="delete ${user.id} btn btn-danger">Delete</button>
        </td>
      </tr>`;
  });
  tbody.innerHTML = row;

  const editButtons = document.querySelectorAll(".edit");
  const deleteButtons = document.querySelectorAll(".delete");

  editButtons.forEach(editFunc);
  deleteButtons.forEach(deleteFunc);
}
