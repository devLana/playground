const pagination = (length, page, itemsPerPage) => {
  const element = document.querySelector(".pagination");
  const btnBreak = '<span class="btn__break">...</span>';

  const totalPages = Math.ceil(length / itemsPerPage);
  const rangeStart = 5;
  const rangeEnd = totalPages - rangeStart + 1;

  let html = "";

  if (page >= rangeStart && page <= rangeEnd) {
    html += '<button class="btn" value=1>1</button>';
    html += btnBreak;
    html += `<button class="btn" value=${page - 2}>${page - 2}</button>`;
    html += `<button class="btn" value=${page - 1}>${page - 1}</button>`;
    html += `<button class="btn active" value=${page}> ${page}</button>`;
    html += `<button class="btn" value=${page + 1}>${page + 1}</button>`;
    html += `<button class="btn" value=${page + 2}>${page + 2}</button>`;
    html += btnBreak;
    html += `<button class="btn" value=${totalPages}>${totalPages}</button>`;
  } else if (page <= rangeStart) {
    for (let i = 1; i <= rangeStart; i++) {
      const className = page === i ? "btn active" : "btn";

      html += `<button class="${className}" value=${i}>${i}</button>`;
    }

    html += btnBreak;
    html += `<button class="btn" value=${totalPages}>${totalPages}</button>`;
  } else if (page >= rangeEnd) {
    html += `<button class="btn" value=1>1</button>`;
    html += btnBreak;

    for (let i = rangeEnd; i <= totalPages; i++) {
      const className = page === i ? "btn active" : "btn";

      html += `<button class="${className}" value=${i}>${i}</button>`;
    }
  }

  element.innerHTML = html;
};

export default pagination;
