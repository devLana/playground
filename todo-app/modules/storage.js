const setTodos = arr => {
  const todos = JSON.stringify(arr);
  localStorage.setItem("todos", todos);
};

const getTodos = () => {
  const todos = localStorage.getItem("todos");
  return JSON.parse(todos);
};

const removeTodos = () => {
  localStorage.removeItem("todos");
};

export default { setTodos, getTodos, removeTodos };
