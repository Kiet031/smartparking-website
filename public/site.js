const header = document.querySelector(".header");
const menuButton = header.querySelector(".menu-button");
const navigation = document.getElementById("nav");
const mobileViewport = window.matchMedia("(max-width: 790px)");
const sections = Array.from(navigation.querySelectorAll("a"), link => ({
  link,
  section: document.getElementById(link.hash.slice(1))
}));

function setMenuOpen(open) {
  navigation.hidden = mobileViewport.matches && !open;
  menuButton.setAttribute("aria-expanded", String(open));
}

function updateNavigation() {
  menuButton.hidden = !mobileViewport.matches;
  setMenuOpen(false);
}

menuButton.addEventListener("click", () => setMenuOpen(navigation.hidden));
navigation.addEventListener("click", event => {
  const link = event.target.closest("a");
  if (link && mobileViewport.matches) {
    setMenuOpen(false);
    const destination = document.getElementById(link.hash.slice(1));
    destination.tabIndex = -1;
    destination.focus({ preventScroll: true });
  }
});
header.addEventListener("keydown", event => {
  if (event.key === "Escape" && mobileViewport.matches && !navigation.hidden) {
    setMenuOpen(false);
    menuButton.focus();
  }
});
mobileViewport.addEventListener("change", updateNavigation);
updateNavigation();

function initializeTabs(group) {
  const tabList = group.querySelector("[role=tablist]");
  const tabs = Array.from(tabList.querySelectorAll("[role=tab]"));
  const panels = tabs.map(tab => document.getElementById(tab.getAttribute("aria-controls")));

  function selectTab(selectedIndex) {
    tabs.forEach((tab, index) => {
      const selected = index === selectedIndex;
      tab.tabIndex = selected ? 0 : -1;
      tab.setAttribute("aria-selected", String(selected));
      panels[index].hidden = !selected;
      panels[index].toggleAttribute("data-active", selected);
    });
    requestScrollUpdate();
  }

  tabs.forEach((tab, index) => {
    panels[index].setAttribute("role", "tabpanel");
    panels[index].setAttribute("aria-labelledby", tab.id);
    panels[index].tabIndex = 0;
    tab.addEventListener("click", () => selectTab(index));
  });

  tabList.addEventListener("keydown", event => {
    const current = tabs.indexOf(event.target);
    if (current === -1) return;

    let next;
    switch (event.key) {
      case "ArrowRight": next = (current + 1) % tabs.length; break;
      case "ArrowLeft": next = (current + tabs.length - 1) % tabs.length; break;
      case "Home": next = 0; break;
      case "End": next = tabs.length - 1; break;
      default: return;
    }

    event.preventDefault();
    selectTab(next);
    tabs[next].focus();
  });

  selectTab(0);
  tabList.hidden = false;
}

if ("IntersectionObserver" in window) {
  const reveal = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.12 });
  document.querySelectorAll("[data-reveal]").forEach(element => reveal.observe(element));
}

let frame = 0;
let currentLink;

function updateScrollState() {
  frame = 0;
  const page = document.documentElement;
  const scrollRange = page.scrollHeight - page.clientHeight;
  const progress = scrollRange > 0 ? Math.min(1, window.scrollY / scrollRange) : 0;
  const threshold = header.offsetHeight + 72;
  let visible = sections[0].link;

  for (const { link, section } of sections) {
    if (section.getBoundingClientRect().top <= threshold) visible = link;
  }
  if (progress >= 0.995) visible = sections.at(-1).link;

  header.style.setProperty("--progress", String(Math.max(0, progress)));
  if (visible !== currentLink) {
    currentLink?.removeAttribute("aria-current");
    visible.setAttribute("aria-current", "location");
    currentLink = visible;
  }
}

function requestScrollUpdate() {
  if (!frame) frame = window.requestAnimationFrame(updateScrollState);
}

document.querySelectorAll("[data-tabs]").forEach(initializeTabs);
document.querySelector(".map-hint").hidden = false;

const faq = document.querySelector(".faq");
const faqInput = document.getElementById("faq-search");
const faqCount = document.getElementById("faq-count");
const faqEmpty = faq.querySelector(".faq-empty");

function searchText(value) {
  return value.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "").replaceAll("đ", "d");
}

const questions = Array.from(faq.querySelectorAll("details"), details => ({
  details,
  text: searchText(details.textContent)
}));

function filterQuestions() {
  const query = searchText(faqInput.value).trim();
  const terms = query ? query.split(/\s+/) : [];
  let count = 0;

  for (const { details, text } of questions) {
    const matches = terms.every(term => text.includes(term));
    details.hidden = !matches;
    if (matches) count++;
  }

  faqCount.textContent = query ? `${count} câu hỏi phù hợp` : `${questions.length} câu hỏi`;
  faqEmpty.hidden = count > 0;
  requestScrollUpdate();
}

faqInput.addEventListener("input", filterQuestions);
faq.querySelector(".faq-tools").hidden = false;
filterQuestions();

const copyRepo = document.getElementById("copy-repo");
const repoLink = document.getElementById("github-repo");
const copyStatus = document.getElementById("copy-status");

if (navigator.clipboard?.writeText) {
  copyRepo.hidden = false;
  copyRepo.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(repoLink.href);
      copyStatus.textContent = "Đã sao chép liên kết GitHub.";
    } catch {
      copyStatus.textContent = "Bạn có thể mở GitHub và sao chép địa chỉ từ thanh trình duyệt.";
    }
  });
}

const hero = document.querySelector(".hero");
const spotlightMotion = window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)");
hero.addEventListener("pointermove", event => {
  if (!spotlightMotion.matches || event.pointerType !== "mouse") return;
  const bounds = hero.getBoundingClientRect();
  hero.style.setProperty("--light-x", `${event.clientX - bounds.left}px`);
  hero.style.setProperty("--light-y", `${event.clientY - bounds.top}px`);
}, { passive: true });
hero.addEventListener("pointerleave", () => {
  hero.style.removeProperty("--light-x");
  hero.style.removeProperty("--light-y");
});

window.addEventListener("scroll", requestScrollUpdate, { passive: true });
window.addEventListener("resize", requestScrollUpdate);
faq.addEventListener("toggle", requestScrollUpdate, true);
requestScrollUpdate();
