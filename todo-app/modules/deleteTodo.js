import showTodos from "./showTodos.js";
import storage from "./storage.js";

const deleteTodo = btn => {
  btn.addEventListener("click", e => {
    const { getTodos, setTodos, removeTodos } = storage;
    const id = e.currentTarget.classList[1];

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
