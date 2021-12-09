const paginate = (page = 1) => {
  const length = 100;
  const rangeStart = 5;
  const rangeEnd = length - rangeStart + 1;

  const btnBreak = '<span class="btn__break">...</span>';

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
    html += `<button class="btn" value=${length}>${length}</button>`;
  } else if (page <= rangeStart) {
    for (let i = 1; i <= rangeStart; i++) {
      const className = page === i ? "btn active" : "btn";

      html += `<button class="${className}" value=${i}>${i}</button>`;
    }

    html += btnBreak;
    html += `<button class="btn" value=${length}>${length}</button>`;
  } else if (page >= rangeEnd) {
    html += `<button class="btn" value=1>1</button>`;
    html += btnBreak;

    for (let i = rangeEnd; i <= length; i++) {
      const className = page === i ? "btn active" : "btn";

      html += `<button class="${className}" value=${i}>${i}</button>`;
    }
  }

  const wrapper = document.querySelector(".wrapper");
  wrapper.innerHTML = html;

  wrapper.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", e => {
      paginate(+e.target.value);
    });
  });
};

window.onload = () => paginate();
