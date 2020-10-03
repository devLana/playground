const links = [
  {
    link: "/playground/js-greeter-app/",
    name: "JS Greeter App",
  },
  {
    link: "/playground/js-calculator/",
    name: "JS Calculator",
  },
  {
    link: "/playground/js-form-validator/",
    name: "JS Form Validator",
  },
  {
    link: "/playground/vanilla-js-crud-app/",
    name: "Vanilla JS CRUD App",
  },
  {
    link: "/playground/typewriter/",
    name: "Typewriter",
  },
  {
    link: "/playground/todo-app/",
    name: "Todo App",
  },
];

const wrapper = document.querySelector(".list-wrapper");
let list = '<ul id="apps">';
links.forEach(({ link, name }) => {
  list += `
    <li class="app">
      <a href=${link} class="app-link">${name}</a>
    </li>
  `;
});
list += "</ul>";
wrapper.innerHTML = list;

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/playground/sw.js")
      .then(() => {
        console.log("SW registered");
      })
      .catch(() => {
        console.log("SW registration failed");
      });
  });
}
