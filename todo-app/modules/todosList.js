const todosList = todos => {
  let output = '<ul id="todos__list">';

  todos.forEach(({ id, content }) => {
    output += `
      <li class="todo">
        <div class="content content-${id}">
          <button class="complete__btn ${id}"></button>
          <span class="todo__content">${content}</span>
        </div>
        <div class="todo__action--btns">
          <span class="edit__btn--container">
            <button class="edit__btn ${id}" title="Edit todo">
              <i class="far fa-edit"></i>
            </button>
          </span>
          <span class="important__btn--container">
            <button class="important__btn ${id}" title="Mark todo as important">
              <i class="fas fa-exclamation-circle"></i>
            </button>
          </span>
          <span class="delete__btn--container">
            <button class="delete__btn ${id}" title="Delete todo">
              <i class="fas fa-comment-slash"></i>
            </button>
          </span>
        </div>
      </li>
    `;
  });
  output += "</ul>";

  return output;
};

export default todosList;
