const state = {
  end: 9,
  length: 500,
  itemsToLoad: 7,
};

export default function* generateHTML() {
  const { end, itemsToLoad, length } = state;
  const data = new Array(length);
  const dataKeys = Array.from(data.keys());
  let html = "";

  do {
    dataKeys.slice(0, end).forEach(item => {
      html += `
        <div class="content">
          <p>Record ${item + 1}</p>
        </div>
      `;
    });

    state.end = end + itemsToLoad;
    yield html;
  } while (true);
}
