import showTodos from "./showTodos.js";
import storage from "./storage.js";

const completeTodo = btn => {
  btn.addEventListener("click", e => {
    const { getTodos, setTodos } = storage;
    const id = e.currentTarget.classList[1];
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
