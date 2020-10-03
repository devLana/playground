import showTodos from "./modules/showTodos.js";
import saveTodo from "./modules/addTodo.js";

document.body.onload = () => showTodos();
document.querySelector("#todo__input").addEventListener("keyup", e => {
  if (e.key === "Enter") saveTodo(e);
});
