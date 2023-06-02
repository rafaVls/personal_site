import ProjectCard from "./ProjectCard";
import projects from "./projects.json";

const hamburgerButton = document.getElementById("hamburger-button");
const projectSection = document.getElementById("projects");
const navigationPanel = document.getElementById("navigation");
const heroTitle = document.getElementById("hero-title");
const header = document.getElementById("header");
const btnAriaExpanded = "aria-expanded";

new IntersectionObserver(([entry, ..._rest], _observer) => {
  // isIntersecting is true on first load
  if (entry.isIntersecting && !header.classList.contains("header-with-shadow")) {
    return;
  }
  header.classList.toggle("header-with-shadow");
}, {}).observe(heroTitle);

const cards = projects.map(project =>
  new ProjectCard(
    project.title,
    project.description,
    project.stack,
    project.repo,
    project.website,
    project.image
  ).createCard()
);
projectSection.append(...cards);

(Array.from(projectSection.children) as HTMLElement[]).forEach(project => {
  project.addEventListener("click", () => project.focus());
});

let timer: number = null;
hamburgerButton.addEventListener("click", e => {
  const btn = e.currentTarget as HTMLButtonElement;

  if (btn.getAttribute(btnAriaExpanded) === "false") {
    navigationPanel.style.display = "grid";
    timer = setTimeout(() => btn.setAttribute(btnAriaExpanded, "true"), 50);
    return;
  }

  btn.setAttribute(btnAriaExpanded, "false");
  typeof timer === "number" && clearTimeout(timer);
});

document.addEventListener("keydown", e => {
  const btnAriaAttribute = hamburgerButton.getAttribute(btnAriaExpanded);
  if (e.key === "Escape" && btnAriaAttribute === "true") {
    hamburgerButton.click();
  }
});
