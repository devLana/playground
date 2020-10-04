import showTodos from "./showTodos.js";
import storage from "./storage.js";

const deleteTodo = btn => {
  btn.addEventListener("click", e => {
    const { getTodos, setTodos, removeTodos } = storage;
    const idx = e.currentTarget.classList[1].search(/\d/);
    const id = e.currentTarget.classList[1].substr(idx);

    if (getTodos().length === 1) {
      removeTodos();
      showTodos();
      return;
    }

    const newTodos = getTodos().filter(todo => todo.id !== +id);

    setTodos(newTodos);
    showTodos();
  });
};

export default deleteTodo;
