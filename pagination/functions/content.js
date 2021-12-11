const content = (length, page, itemsPerPage) => {
  const contents = document.querySelector(".contents");

  const data = new Array(length);
  const dataKeys = Array.from(data.keys());

  const lastIndex = page * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  let html = "";

  dataKeys.slice(firstIndex, lastIndex).forEach(data => {
    html += `
      <div class="content__item">
        <p class="content">Record ${data + 1}</p>
      </div>
    `;
  });

  contents.innerHTML = html;
};

export default content;
