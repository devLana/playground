import showTodos from "./showTodos.js";
import storage from "./storage.js";

const deleteTodo = btn => {
  btn.addEventListener("click", e => {
    const { getTodos, setTodos, removeTodos } = storage;
    const todos = getTodos();

    const idx = e.currentTarget.className.search(/\d/);
    const id = e.currentTarget.className.substr(idx);

    if (todos.length === 1) {
      removeTodos();
      showTodos();
      return;
    }

    const newTodos = todos.filter(todo => todo.id !== +id);

    setTodos(newTodos);
    showTodos();
  });
};

export default deleteTodo;
