import storage from "./storage.js";
import todosList from "./todosList.js";
import deleteTodo from "./deleteTodo.js";
import markAsImportant from "./importantTodo.js";
import completeTodo from "./completeTodo.js";

const showTodos = () => {
  const todos = storage.getTodos();
  const todosContainer = document.querySelector("#todos__container");
  const deleteAllBtn = document.querySelector(".delete__all");

  if (!todos) {
    todosContainer.innerHTML = '<p class="no__todos">You have no todos</p>';
    deleteAllBtn.disabled = true;
    deleteAllBtn.style.cursor = "not-allowed";
    return;
  }

  todosContainer.innerHTML = todosList(todos);
  deleteAllBtn.removeAttribute("disabled");
  deleteAllBtn.style.cursor = "pointer";

  const deleteBtn = document.querySelectorAll(".delete__btn");
  const importantBtn = document.querySelectorAll(".important__btn");
  const completeBtn = document.querySelectorAll(".complete__btn");

  deleteBtn.forEach(deleteTodo);
  importantBtn.forEach(markAsImportant);
  completeBtn.forEach(completeTodo);
};

export default showTodos;
