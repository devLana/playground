const todosList = todos => {
  let output = '<ul style="list-style: none;">';

  todos
    .sort((a, b) => b.important - a.important)
    .sort((a, b) => b.completed - a.completed)
    .forEach(({ id, content, completed, important }) => {
      const checkIcon = completed ? '<i class="fas fa-check-circle"></i>' : "";
      const styles = completed
        ? "border: none; background-color: transparent"
        : "";
      let classes;

      if (completed) {
        classes = "completed todo__content";
      } else if (important) {
        classes = "important todo__content";
      } else {
        classes = "todo__content";
      }

      output += `
        <li class="todo">
          <div class="content content--${id}">
            <button class="complete__btn complete__btn--${id}" style="${styles}">
              ${checkIcon}
            </button>
            <span class="${classes}">${content}</span>
          </div>
          <div class="todo__action--btns">
            <span class="edit__btn">
              <button class="edit__btn--${id}" style="color: #448d76;" title="Edit todo">
                <i class="fas fa-edit"></i>
              </button>
            </span>
            <span class="important__btn">
              <button class="important__btn--${id}" style="color: #08142b;" title="Mark todo as important">
                <i class="fas fa-exclamation-circle"></i>
              </button>
            </span>
            <span class="delete__btn">
              <button class="delete__btn--${id}" style="color: #1258dc;" title="Delete todo">
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
