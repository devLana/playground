import saveTodo from "../modules/addTodo.js";
import showTodos from "../modules/showTodos.js";
import completeTodo from "../modules/completeTodo.js";
import deleteAll from "../modules/deleteAll.js";
import deleteTodo from "../modules/deleteTodo.js";
import editTodo from "../modules/editTodo.js";
import markAsImportant from "../modules/importantTodo.js";
import storage from "../modules/storage.js";
import todosList from "../modules/todosList.js";

describe("Test localStorage", () => {
  const { setTodos, getTodos, removeTodos } = storage;

  it("1:- set up localStorage data", () => {
    const todos = [
      { id: 1, content: "make tests", completed: false, important: false },
      { id: 2, content: "run tests", completed: false, important: false },
    ];

    setTodos(todos);

    expect(localStorage.getItem("todos")).to.equal(JSON.stringify(todos));
  });

  it("2:- get localStorage data", () => {
    const todos = getTodos();
    const size = todos.length;

    expect(todos).to.be.an("array").and.have.lengthOf(size);

    todos.map(todo => {
      expect(todo)
        .to.be.an("object")
        .that.has.all.keys("id", "content", "completed", "important");
      expect(todo.id).to.be.a("number");
      expect(todo.content).to.be.a("string");
      expect(todo.completed).to.be.a("boolean");
      expect(todo.important).to.be.a("boolean");
    });
  });

  it("3:- remove localStorage data", () => {
    removeTodos();
    expect(localStorage.getItem("todos")).to.equal(null);
  });
});
