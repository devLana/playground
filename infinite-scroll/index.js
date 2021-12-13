import generateHTML from "./modules/generateHTML.js";

const generate = () => {
  const gen = generateHTML();
  document.querySelector(".wrapper").innerHTML = gen.next().value;
};

window.addEventListener("load", () => {
  generate();
});

window.addEventListener("scroll", () => {
  const wrapper = document.querySelector(".wrapper");

  if (window.innerHeight + window.pageYOffset >= wrapper.offsetHeight) {
    generate();
  }
});
