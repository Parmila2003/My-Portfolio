const dynamic = document.getElementById("dynamicContent");
const navMenu = document.getElementById("navLinks");
const navToggle = document.getElementById("navToggle");
const hero = document.getElementById("homeHero");

function setActive(page) {
  document.querySelectorAll(".nav-link").forEach(a => a.classList.remove("active"));
  const active = document.querySelector(`.nav-link[data-page="${page}"]`);
  if (active) active.classList.add("active");
}

function clearDynamic() {
  dynamic.classList.remove("fade-in");
  dynamic.innerHTML = "";
}

function showHeroOnly() {
  hero.style.display = "grid";
  clearDynamic();
  setActive("home");
}

function loadPage(page) {
  if (page === "home") {
    showHeroOnly();
    navMenu?.classList.remove("show");
    return;
  }

  const tpl = document.getElementById(`tpl-${page}`);
  if (!tpl) return;

  hero.style.display = "none";

  dynamic.classList.remove("fade-in");
  dynamic.classList.add("fade-out");

  setTimeout(() => {
    dynamic.innerHTML = "";
    dynamic.appendChild(tpl.content.cloneNode(true));
    dynamic.classList.remove("fade-out");
    dynamic.classList.add("fade-in");
  }, 150);

  setActive(page);
  navMenu?.classList.remove("show");
}

// nav clicks
document.querySelectorAll("[data-page]").forEach(el => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    const page = el.dataset.page;
    if (!page) return;
    loadPage(page);
  });
});

// mobile toggle
navToggle?.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

// year
document.getElementById("year").textContent = new Date().getFullYear();

// default
showHeroOnly();