import { people } from "./people.js";
import createTable from "./core.js";

export function editFunc(btn) {
  btn.addEventListener("click", () => {
    
  });
}

export function deleteFunc(btn) {
  btn.addEventListener("click", (e) => {
    const num = e.target.classList[1];

    people.users = people.users.filter((user) => user.id !== Number(num));
    createTable();
  });
}

export function getId() {
  const len = people.users.length;

  if (len === 0) return 1;
  return people.users[len - 1].id + 1;
}
