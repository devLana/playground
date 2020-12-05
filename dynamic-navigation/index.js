import linkLists from "./components/menuLinks.js";

const btn = document.querySelector(".hamburger");
const demoNav = document.getElementById("demo__nav");
demoNav.innerHTML = linkLists;

const toggles = document.querySelectorAll(".sub-nav--toggle");

btn.addEventListener("click", e => {
  func(demoNav, "show");
  func(e.target, "active");
});

toggles.forEach(toggle => {
  toggle.addEventListener("click", e => {
    const parentContainer = toggle.parentElement;
    const nestedList = toggle.nextElementSibling;

    func(e.target, "rotate");
    func(parentContainer, "bg-color");
    func(nestedList, "open");
  });
});

const func = (elem, name) => {
  if (elem.classList.contains(name)) {
    elem.classList.remove(name);
  } else {
    elem.classList.add(name);
  }
};
