import pagination from "./functions/pagination.js";
import content from "./functions/content.js";

const paginate = (page = 1) => {
  const length = 630;
  const itemsPerPage = 8;

  content(length, page, itemsPerPage);
  pagination(length, page, itemsPerPage);

  const element = document.querySelector(".pagination");

  element.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", e => {
      paginate(+e.target.value);
    });
  });
};

window.onload = () => paginate();
