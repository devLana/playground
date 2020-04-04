import { people } from "./people.js";
import { editFunc, deleteFunc, getId } from "./functions.js";

export function addNewUser(e) {
  e.preventDefault();

  const name = document.getElementById("name");
  const occupation = document.getElementById("occupation");
  const person = {
    id: null,
    name: "",
    occupation: ""
  }

  if (name.value === "" || occupation.value === "") return;

  person.id = getId();
  person.name = name.value;
  person.occupation = occupation.value;

  people.users.push(person);
  createTable();
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
