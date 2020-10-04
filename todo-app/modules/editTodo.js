import showTodos from "./showTodos.js";
import storage from "./storage.js";

const editTodo = btn => {
  btn.addEventListener("click", e => {
    const { getTodos, setTodos } = storage;
    const id = e.currentTarget.classList[1];
    const parentElem = document.querySelector(`.content-${id}`);
    const content = document.querySelector(`.content-${id} .todo__content`);
    const inputElem = document.createElement("INPUT");
    let todoToEdit;

    if (content) {
      todoToEdit = content.innerHTML;
    } else {
      return;
    }

    inputElem.className = "edit__input";
    inputElem.type = "text";
    inputElem.value = todoToEdit;
    inputElem.placeholder = "Enter a todo and press enter"
    parentElem.replaceChild(inputElem, content);
    inputElem.focus();

    inputElem.addEventListener("keyup", e => {
      const { target, key } = e;
      if (key === "Enter") {
        if (!target.value.trim()) return;
        const newTodos = getTodos().map(todo => {
          if (todo.id === +id) {
            todo.content = target.value.trim();
          }
          return todo;
        });

        setTodos(newTodos);
        showTodos();
      }
    });
  });
};

export default editTodo;
