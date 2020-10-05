import showTodos from "./showTodos.js";
import storage from "./storage.js";

const markAsImportant = btn => {
  btn.addEventListener("click", e => {
    const { getTodos, setTodos } = storage;
    const idx = e.currentTarget.className.search(/\d/);
    const id = e.currentTarget.className.substr(idx);
    const newTodos = getTodos().map(todo => {
      if (todo.id === +id) {
        todo.important = !todo.important;
      }
      return todo;
    });

    setTodos(newTodos);
    showTodos();
  });
};

export default markAsImportant;
