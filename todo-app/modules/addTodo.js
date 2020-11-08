import showTodos from "./showTodos.js";
import storage from "./storage.js";

const getId = todos => {
  if (!todos) return 1;

  const maxId = todos.reduce((acc, { id }) => Math.max(acc, id), 0);
  return maxId + 1;
};

const saveTodo = e => {
  const todo = e.target.value.trim().replace(/ +/g, " ");

  if (!todo) return;

  const { getTodos, setTodos } = storage;
  const todos = getTodos();


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
    setTodos(todos);
  }

  e.target.value = "";
  e.target.blur();
  showTodos();
};

export default saveTodo;
