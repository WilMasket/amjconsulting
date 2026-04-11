document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const menu = document.getElementById("menu");
  const links = document.querySelectorAll(".menu a");
  const revealEls = document.querySelectorAll(".reveal");
  const sections = document.querySelectorAll("section[id]");

  if (menuBtn && menu) {
    menuBtn.addEventListener("click", () => {
      menu.classList.toggle("open");
    });
  }

  links.forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
    });
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  revealEls.forEach(el => io.observe(el));

  const setActiveLink = () => {
    let current = "";

    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 160) {
        current = section.id;
      }
    });

    links.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  };

  window.addEventListener("scroll", setActiveLink, { passive: true });
  window.addEventListener("resize", setActiveLink);
  setActiveLink();

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealEls.forEach(el => el.classList.add("visible"));
  }
});