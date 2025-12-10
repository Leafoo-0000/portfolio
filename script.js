/* script.js
   - Keeps portfolio showing only first 3 items per category
   - Renders catalogue into 3 category lists:
       #catalogue-achievements, #catalogue-projects, #catalogue-assessments
   - Allows adding items at runtime via addAchievement / addProject / addAssessment
   - Persists data to localStorage
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
    { title: "Java Certificate", img: "Image/Java Cert.png", link: null },
    { title: "Achievement 2", img: null, link: null },
    { title: "Achievement 3", img: null, link: null },
    { title: "Achievement 4", img: null, link: null },
    { title: "Achievement 5", img: null, link: null }
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

/* ---------- helpers: save / load ---------- */
function saveCategory(key, arr) {
    try {
    const store = {};
    store[key] = arr;
    // Store in memory instead of localStorage
    window._portfolioStore = window._portfolioStore || {};
    window._portfolioStore[key] = arr;
    } catch (e) {
    console.warn('Failed to save:', e);
    }
}

function loadCategory(key, fallback) {
    try {
    if (!window._portfolioStore) window._portfolioStore = {};
    const data = window._portfolioStore[key];
    if (!data) return fallback.slice();
    if (!Array.isArray(data)) return fallback.slice();
    return data;
    } catch (e) {
    console.warn('Failed to read:', e);
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
  // item: { title, link?, img? }
  const safeTitle = (item.title || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // If there's an image, show it above the title. If there's a link, wrap the title (and image) in <a>.
  let inner = '';
  if (item.img) {
    inner += `<img src="${item.img}" class="cert-img" alt="${safeTitle}">`;
  }

  // title with or without link
  if (item.link) {
    inner += `<a href="${item.link}" target="_blank" rel="noopener noreferrer">${safeTitle}</a>`;
  } else {
    inner += `<h3>${safeTitle}</h3>`;
  }

  return `<li class="tile">${inner}</li>`;
}

/* Show first 3 items in portfolio for given array */
function renderPortfolioList(array, elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const firstThree = array.slice(0, 3);
  el.innerHTML = firstThree.map(item => renderTile(item)).join('');
}

/* For catalogue: show everything AFTER the first 3 for that category */
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

/* top-level render that updates both portfolio and catalogue depending on presence of elements */
function renderAll() {
  // Portfolio lists (IDs expected to exist in index.html)
  renderPortfolioList(achievements, 'portfolio-achievements');
  renderPortfolioList(projects, 'portfolio-projects');
  renderPortfolioList(assessments, 'portfolio-assessments');

  // Catalogue categories (IDs expected to exist in catalogue.html)
  renderCatalogueCategory(achievements, 'catalogue-achievements');
  renderCatalogueCategory(projects, 'catalogue-projects');
  renderCatalogueCategory(assessments, 'catalogue-assessments');
}

/* ---------- public API: add items at runtime ----------
   Usage (two options):
     addAchievement({ title: 'New', link: '...', img: '...' });
   OR
     addAchievement('New Title', 'https://...', 'Image/x.png');
   Each function saves to localStorage and re-renders pages.
*/
function normalizeNewItem(argOrTitle, link, img) {
  if (argOrTitle && typeof argOrTitle === 'object') {
    // assume object {title, link?, img?}
    return {
      title: String(argOrTitle.title || '').trim(),
      link: argOrTitle.link || null,
      img: argOrTitle.img || null
    };
  } else {
    return {
      title: String(argOrTitle || '').trim(),
      link: link || null,
      img: img || null
    };
  }
}

function addAchievement(argOrTitle, link = null, img = null) {
  const item = normalizeNewItem(argOrTitle, link, img);
  if (!item.title) return; // ignore empty
  achievements.push(item);
  persistAll();
  renderAll();
}
function addProject(argOrTitle, link = null, img = null) {
  const item = normalizeNewItem(argOrTitle, link, img);
  if (!item.title) return;
  projects.push(item);
  persistAll();
  renderAll();
}
function addAssessment(argOrTitle, link = null, img = null) {
  const item = normalizeNewItem(argOrTitle, link, img);
  if (!item.title) return;
  assessments.push(item);
  persistAll();
  renderAll();
}

/* ---------- UI event for add button ---------- */
function initAddAssessmentButton() {
  const addBtn = document.getElementById('add-assessment-btn');
  if (!addBtn) return; // button doesn't exist on this page
  
  addBtn.addEventListener('click', () => {
    const titleInput = document.getElementById('assessment-title');
    const linkInput = document.getElementById('assessment-link');
    
    const title = titleInput.value.trim();
    const link = linkInput.value.trim();

    if (!title) {
      alert('Please enter a title for the assessment.');
      return;
    }

    addAssessment(title, link || null);
    
    // Clear inputs
    titleInput.value = '';
    linkInput.value = '';
    
    alert('Assessment added successfully!');
  });
}

/* Optional: remove an item by category + index (index is full-array index, not catalogue index) */
function removeItem(category, index) {
  if (!['achievements','projects','assessments'].includes(category)) return;
  let arr = (category === 'achievements') ? achievements : (category === 'projects' ? projects : assessments);
  if (index < 0 || index >= arr.length) return;
  arr.splice(index, 1);
  persistAll();
  renderAll();
}

/* ---------- initialize ---------- */
loadAll();
document.addEventListener('DOMContentLoaded', () => {
  renderAll();
  initAddAssessmentButton(); // Add this line
});


/* expose API to window so you can call it from the console or add small UI */
window.addAchievement = addAchievement;
window.addProject = addProject;
window.addAssessment = addAssessment;
window.removeItem = removeItem;
window._portfolioData = { loadAll, persistAll }; // debug helpers
