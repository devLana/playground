import generateHTML from "./modules/generateHTML.js";

const generate = () => {
  const gen = generateHTML();
  document.querySelector(".wrapper").innerHTML = gen.next().value;
};

window.addEventListener("load", () => {
  generate();
});

window.addEventListener("scroll", () => {
  if (window.innerHeight + window.pageYOffset >= document.body.scrollHeight) {
    generate();
  }
});
