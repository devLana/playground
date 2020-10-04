import showTodos from "./showTodos.js";
import storage from "./storage.js";

const completeTodo = btn => {
  btn.addEventListener("click", e => {
    const { getTodos, setTodos } = storage;
    const idx = e.target.classList[1].search(/\d/);
    const id = e.target.classList[1].substr(idx);

    const newTodos = getTodos().map(todo => {
      if (todo.id === +id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });

    setTodos(newTodos);
    showTodos();
  });
};

export default completeTodo;
