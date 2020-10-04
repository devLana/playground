import showTodos from "./showTodos.js";
import storage from "./storage.js";

const deleteAll = () => {
  const deleteTodos = confirm("Delete all todos?");

  if (deleteTodos) {
    storage.removeTodos();
    showTodos();
  }
};

export default deleteAll;
