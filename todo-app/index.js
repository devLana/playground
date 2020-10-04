import showTodos from "./modules/showTodos.js";
import saveTodo from "./modules/addTodo.js";
import deleteAll from "./modules/deleteAll.js";

window.onload = () => showTodos();
document.querySelector(".delete__all").addEventListener("click", deleteAll);
document.querySelector("#todo__input").addEventListener("keyup", e => {
  if (e.key === "Enter") saveTodo(e);
});
