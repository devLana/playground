import storage from "./storage.js";

const showTodos = () => {
  const todos = storage.getTodos();
  const todosContainer = document.querySelector("#todos__container");
  let output = '<ul id="todos__list">';

  if (!todos) {
    todosContainer.innerHTML = '<p class="no__todos">You have no todos</p>';
    return;
  }

  todos.forEach(({ id, content, completed, important }) => {
    output += `
    <li class="todo">
      <div class="content">
        <button class="complete__btn"></button>
        <span id="todo__content">${content}</span>
      </div>
      <div class="todo__action--btns">
        <span class="edit__btn--container">
          <button class="edit__btn title="Edit todo">
            <i class="far fa-edit"></i>
          </button>
        </span>
        <span class="important__btn--container">
          <button class="important__btn title="Mark todo as important">
            <i class="fas fa-exclamation-circle"></i>
          </button>
        </span>
        <span class="delete__btn--container">
          <button class="delete__btn title="Delete todo">
            <i class="fas fa-comment-slash"></i>
          </button>
        </span>
      </div>
    </li>
  `;
  });

  output += "</ul>";
  todosContainer.innerHTML = output;
};

export default showTodos;
