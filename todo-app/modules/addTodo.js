import showTodos from "./showTodos.js";
import storage from "./storage.js";

const getId = todos => {
  if (!todos) return 1;

  const maxId = todos.reduce((acc, { id }) => Math.max(acc, id), 0);
  return maxId + 1;
};

const saveTodo = e => {
  const todo = e.target.value.trim();
  const { getTodos, setTodos } = storage;
  const todos = getTodos();

  if (!todo) return;
  const newTodo = {
    id: getId(todos),
    content: todo,
    completed: false,
    important: false,
  };

  if (!todos) {
    setTodos([newTodo]);
  } else {
    todos.push(newTodo);
    storage.setTodos(todos);
  }

  e.target.value = "";
  showTodos();
};

export default saveTodo;
