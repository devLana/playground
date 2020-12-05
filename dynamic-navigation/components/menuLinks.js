const links = [
  "Home",
  "About",
  {
    id: "services",
    name: "Services",
    services: ["UI/UX", "Front End", "Back End", "Dev Ops"],
  },
  "Registrations",
  {
    id: "products",
    name: "Products",
    products: ["Websites", "Social Media", "Mobile Apps", "PWAs"],
  },
  "Admissions",
  {
    id: "news",
    name: "News",
    news: ["Journals", "Blog", "Diaries", "Talks"],
  },
  "Contact",
];

let linkLists = "<ol>";

links.forEach(link => {
  if (typeof link === "object") {
    let nestedList = '<ul class="nested__links">';

    link[link.id].forEach(item => {
      nestedList += `<li>${item}</li>`;
    });
    nestedList += "</ul>";

    linkLists += `
      <li class="nav--toggle">
        ${link.name} <button class="sub-nav--toggle"></button>
        ${nestedList}
      </li>
    `;
  }

  if (typeof link !== "object") {
    linkLists += `<li>${link}</li>`;
  }
});
linkLists += "</ol>";

export default linkLists;
