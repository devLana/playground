import storage from "./storage.js";
import todosList from "./todosList.js";
import deleteTodo from "./deleteTodo.js";
import markAsImportant from "./importantTodo.js";
import completeTodo from "./completeTodo.js";
import editTodo from "./editTodo.js";

const showTodos = () => {
  const todos = storage.getTodos();
  const todosContainer = document.querySelector("#todos__container");
  const deleteAllBtn = document.querySelector(".delete__all");

  if (!todos) {
    todosContainer.innerHTML = '<p style="font-size: 1.8rem">You have no todos</p>';
    deleteAllBtn.disabled = true;
    deleteAllBtn.style.cursor = "not-allowed";
    return;
  }

  todosContainer.innerHTML = todosList(todos);
  deleteAllBtn.removeAttribute("disabled");
  deleteAllBtn.style.cursor = "pointer";

  const deleteBtn = document.querySelectorAll(".delete__btn button");
  const importantBtn = document.querySelectorAll(".important__btn button");
  const completeBtn = document.querySelectorAll(".complete__btn");
  const editBtn = document.querySelectorAll(".edit__btn button");

  deleteBtn.forEach(deleteTodo);
  importantBtn.forEach(markAsImportant);
  completeBtn.forEach(completeTodo);
  editBtn.forEach(editTodo);
};

export default showTodos;
