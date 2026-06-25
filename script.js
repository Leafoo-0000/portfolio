/* script.js
  - Single source of truth for portfolio content
  - Renders the homepage and catalogue from the same data
  - Persists edits in localStorage
  - Supports a simple add-item form for new portfolio entries
*/

/* ---------- theme toggle (keeps your existing) ---------- */
const toggleButton = document.getElementById('theme-toggle');
const body = document.body;
if (toggleButton) {
  toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark');
  });
}

/* ---------- data keys for localStorage ---------- */
const LS_KEYS = {
  achievements: 'portfolio_achievements_v1',
  projects: 'portfolio_projects_v1',
  assessments: 'portfolio_assessments_v1'
};

/* ---------- default data (used only when localStorage is empty) ---------- */
const DEFAULTS = {
  achievements: [
    {
      title: "Java Certificate",
      img: "Image/Java Cert.png",
      link: null,
      description: "Foundational Java training and hands-on practice."
    },
    {
      title: "CCIS Innovision 2026 Certificate of Participation",
      img: null,
      link: null,
      description: "Participation in the college-wide innovation event."
    },
    {
      title: "Coursera Certificates",
      img: null,
      link: null,
      description: "Online learning certificates earned during the term."
    },
    {
      title: "Other relevant certificates earned during the term",
      img: null,
      link: null,
      description: "Additional learning achievements and short-term credentials."
    },
    {
      title: "CCIS Innovision 2026 Award",
      img: null,
      link: null,
      description: "If your group received an award, replace this with the exact award name and a short reflection on what the experience taught you about teamwork, communication, or problem solving."
    }
  ],
  projects: [
    { title: "Easy-E (Event Management System)", link: "https://github.com/Leafoo-0000/Easy-E", img: null },
    { title: "Project 2", link: null, img: null },
    { title: "Project 3", link: null, img: null },
    { title: "Project 4", link: null, img: null }
  ],
  assessments: [
    { title: "IT103 Case Study: GreenSense", link: "https://leafoo-0000.github.io/GreenSense/LandingPage.html", img: null },
    { title: "MP1: ReplaceAll", link: "https://leafoo-0000.github.io/Hands-on-Activity/MP1/index.html", img: null },
    { title: "MP2: SearchWord", link: "https://leafoo-0000.github.io/Hands-on-Activity/MP2/index.html", img: null },
    { title: "Extra Assessment 1", link: "#", img: null }
  ]
};

/* ---------- current in-memory arrays (initialized from localStorage or defaults) ---------- */
let achievements = [];
let projects = [];
let assessments = [];

function getStore() {
  globalThis._portfolioStore = globalThis._portfolioStore || {};
  return globalThis._portfolioStore;
}

function canUseLocalStorage() {
  return typeof localStorage !== 'undefined';
}

/* ---------- helpers: save / load ---------- */
function saveCategory(key, arr) {
  try {
    const serialized = JSON.stringify(arr);
    if (canUseLocalStorage()) {
      localStorage.setItem(key, serialized);
    }
    getStore()[key] = arr;
  } catch (error) {
    console.warn('Failed to save:', error);
  }
}

function loadCategory(key, fallback) {
  try {
    if (canUseLocalStorage()) {
      const storedValue = localStorage.getItem(key);
      if (storedValue) {
        const parsedValue = JSON.parse(storedValue);
        if (Array.isArray(parsedValue)) {
          return parsedValue;
        }
      }
    }

    const store = getStore();
    const data = store[key];
    if (!Array.isArray(data)) return fallback.slice();
    return data;
  } catch (error) {
    console.warn('Failed to read:', error);
    return fallback.slice();
  }
}

function persistAll() {
  saveCategory(LS_KEYS.achievements, achievements);
  saveCategory(LS_KEYS.projects, projects);
  saveCategory(LS_KEYS.assessments, assessments);
}

function loadAll() {
  achievements = loadCategory(LS_KEYS.achievements, DEFAULTS.achievements);
  projects     = loadCategory(LS_KEYS.projects,     DEFAULTS.projects);
  assessments  = loadCategory(LS_KEYS.assessments,  DEFAULTS.assessments);
}

/* ---------- rendering helpers ---------- */
function renderTile(item) {
  const safeTitle = String(item.title || '').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  const safeDescription = String(item.description || '').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

  let inner = '';
  if (item.img) {
    inner += `<img src="${item.img}" class="cert-img" alt="${safeTitle}">`;
  }

  if (item.link) {
    inner += `<a href="${item.link}" target="_blank" rel="noopener noreferrer">${safeTitle}</a>`;
  } else {
    inner += `<h3>${safeTitle}</h3>`;
  }

  if (safeDescription) {
    inner += `<p class="tile-description">${safeDescription}</p>`;
  }

  if (item.category) {
    inner += `<span class="tile-badge">${item.category}</span>`;
  }

  return `<li class="tile">${inner}</li>`;
}

function renderPortfolioList(array, elementId, limit = 3) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const visibleItems = array.slice(0, limit);
  el.innerHTML = visibleItems.map(item => renderTile(item)).join('');
}

function renderCatalogueCategory(array, elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const extras = array.slice(3);
  if (extras.length === 0) {
    el.innerHTML = `<li class="tile">No extra items.</li>`;
    return;
  }
  el.innerHTML = extras.map(item => renderTile(item)).join('');
}

function renderAll() {
  renderPortfolioList(achievements, 'portfolio-achievements', 4);
  renderPortfolioList(projects, 'portfolio-projects');
  renderPortfolioList(assessments, 'portfolio-assessments');
  renderCatalogueCategory(achievements, 'catalogue-achievements');
  renderCatalogueCategory(projects, 'catalogue-projects');
  renderCatalogueCategory(assessments, 'catalogue-assessments');
}

function normalizeItem(payload) {
  const category = String(payload.category || 'achievements').trim();
  const title = String(payload.title || '').trim();
  const link = String(payload.link || '').trim();
  const img = String(payload.img || '').trim();
  const description = String(payload.description || '').trim();

  return {
    category,
    title,
    link: link || null,
    img: img || null,
    description: description || null
  };
}

function getCategoryList(category) {
  if (category === 'projects') return projects;
  if (category === 'assessments') return assessments;
  return achievements;
}

function addPortfolioItem(payload) {
  const item = normalizeItem(payload);
  if (!item.title) return false;
  const category = item.category === 'projects' || item.category === 'assessments' ? item.category : 'achievements';
  const list = getCategoryList(category);
  list.push(item);
  persistAll();
  renderAll();
  return true;
}

function addAchievement(title, link = null, img = null, description = null) {
  return addPortfolioItem({ category: 'achievements', title, link, img, description });
}

function addProject(title, link = null, img = null, description = null) {
  return addPortfolioItem({ category: 'projects', title, link, img, description });
}

function addAssessment(title, link = null, img = null, description = null) {
  return addPortfolioItem({ category: 'assessments', title, link, img, description });
}

function initPortfolioForm() {
  const form = document.getElementById('portfolio-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const category = document.getElementById('item-category')?.value || 'achievements';
    const title = document.getElementById('item-title')?.value || '';
    const link = document.getElementById('item-link')?.value || '';
    const image = document.getElementById('item-image')?.value || '';
    const description = document.getElementById('item-description')?.value || '';

    const added = addPortfolioItem({
      category,
      title,
      link,
      img: image,
      description
    });

    if (!added) {
      alert('Please enter a title for the new portfolio item.');
      return;
    }

    form.reset();
    alert('Portfolio item added successfully.');
  });
}

function removeItem(category, index) {
  const list = getCategoryList(category);
  if (index < 0 || index >= list.length) return;
  list.splice(index, 1);
  persistAll();
  renderAll();
}

loadAll();
document.addEventListener('DOMContentLoaded', () => {
  renderAll();
  initPortfolioForm();
});

globalThis.addAchievement = addAchievement;
globalThis.addProject = addProject;
globalThis.addAssessment = addAssessment;
globalThis.addPortfolioItem = addPortfolioItem;
globalThis.removeItem = removeItem;
globalThis._portfolioData = { loadAll, persistAll }; // debug helpers
