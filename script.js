/* script.js
  - Single source of truth for portfolio content
  - Renders presentation views and timeline archives from unified data
  - Persists edits securely in localStorage with unique versioned keys
*/

/* ---------- THEME TOGGLE ---------- */
const toggleButton = document.getElementById('theme-toggle');
const body = document.body;
if (toggleButton) {
  toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark');
  });
}

/* ---------- LOCALSTORAGE VERSIONED KEYS ---------- */
const LS_KEYS = {
  achievements: 'portfolio_achievements_v1',
  projects: 'portfolio_projects_v1',
  assessments: 'portfolio_assessments_v1'
};

/* ---------- SEED DATA (Fallback Core Portfolio History) ---------- */
const DEFAULTS = {
  achievements: [
    {
      id: "ach-01",
      title: "Java Certificate",
      type: "achievement",
      year: 1,
      term: 3,
      date: "2025-06-15",
      link: null,
      img: "Image/Java Cert.png",
      description: "Foundational Java training and hands-on object-oriented programming practice.",
      featured: true,
      tags: ["Java", "OOP"]
    },
    {
      id: "ach-02",
      title: "CCIS Innovision Certificate of Participation",
      type: "achievement",
      year: 2,
      term: 2,
      date: "2026-02-20",
      link: null,
      img: null,
      description: "Participation and project exhibition in the college-wide innovation event.",
      featured: false,
      tags: ["Exhibition", "Presentation"]
    }
  ],
  projects: [
    {
      id: "proj-librotrack",
      title: "LibroTrack",
      type: "project",
      year: 1,
      term: 3,
      date: "2025-06-01",
      link: null,
      img: null,
      description: "Library management application designed using Java Swing framework and clean OOP class structures.",
      featured: false,
      tags: ["Java", "Swing", "GUI"]
    },
    {
      id: "proj-petmanagement",
      title: "Pet Management System",
      type: "project",
      year: 2,
      term: 1,
      date: "2025-11-15",
      link: null,
      img: null,
      description: "Desktop database administration system engineered with C# and Windows Forms structures.",
      featured: false,
      tags: ["C#", "WinForms", "SQL"]
    },
    {
      id: "proj-unsatoh",
      title: "Unsatoh Task Manager",
      type: "project",
      year: 2,
      term: 2,
      date: "2026-02-10",
      link: null,
      img: null,
      description: "Student support and intuitive web application featuring smart priority task structures.",
      featured: true,
      tags: ["Web Dev", "Next.js", "AI-Prioritization"]
    },
    {
      id: "proj-justdoit",
      title: "Just Do It",
      type: "project",
      year: 2,
      term: 3,
      date: "2026-03-22",
      link: "https://github.com/Leafoo-0000/Easy-E",
      img: null,
      description: "Sustainability habit tracker built utilizing custom Next.js configurations, Supabase backends, and Builder.io integration.",
      featured: true,
      tags: ["Next.js", "Supabase", "Tailwind"]
    }
  ],
  assessments: [
    {
      id: "ass-greensense",
      title: "IT103 Case Study: GreenSense",
      type: "assessment",
      year: 1,
      term: 2,
      date: "2025-03-10",
      link: "https://leafoo-0000.github.io/GreenSense/LandingPage.html",
      img: null,
      description: "Comprehensive case study platform analyzing environmental performance matrices.",
      featured: false,
      tags: ["HTML", "CSS", "Case Study"]
    },
    {
      id: "ass-replaceall",
      title: "MP1: ReplaceAll",
      type: "assessment",
      year: 1,
      term: 2,
      date: "2025-04-05",
      link: "https://leafoo-0000.github.io/Hands-on-Activity/MP1/index.html",
      img: null,
      description: "Algorithmic hands-on activity manipulating text patterns within web environments.",
      featured: false,
      tags: ["JavaScript", "Algorithms"]
    }
  ]
};

/* ---------- MEMORY DATA STORE INITIALIZATION ---------- */
let achievements = [];
let projects = [];
let assessments = [];

function canUseLocalStorage() {
  try { return typeof localStorage !== 'undefined'; } catch { return false; }
}

/* ---------- DATA UTILITIES: STORAGE READ/WRITE ---------- */
function saveCategory(key, arr) {
  try {
    if (canUseLocalStorage()) localStorage.setItem(key, JSON.stringify(arr));
  } catch (error) {
    console.error('Data persistence failure:', error);
  }
}

function loadCategory(key, fallback) {
  try {
    if (canUseLocalStorage()) {
      const stored = localStorage.getItem(key);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    }
  } catch (error) {
    console.warn(`Storage reading issue for key "${key}":`, error);
  }
  return JSON.parse(JSON.stringify(fallback)); // Clean deep copy
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

/* ---------- SECURITY AND RENDERING HELPERS ---------- */
function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderTile(item) {
  const safeTitle = escapeHTML(item.title);
  const safeDescription = escapeHTML(item.description);
  const typeClass = item.type ? `card-${item.type}` : '';

  let inner = '';
  if (item.img) {
    inner += `<img src="${escapeHTML(item.img)}" class="cert-img" alt="${safeTitle}">`;
  }

  if (item.link) {
    inner += `<a href="${escapeHTML(item.link)}" target="_blank" rel="noopener noreferrer" class="tile-title-link">${safeTitle}</a>`;
  } else {
    inner += `<h3 class="tile-title">${safeTitle}</h3>`;
  }

  if (safeDescription) {
    inner += `<p class="tile-description">${safeDescription}</p>`;
  }

  if (item.tags && Array.isArray(item.tags)) {
    inner += `<div class="tag-container">`;
    item.tags.forEach(tag => {
      inner += `<span class="tile-tag-badge">${escapeHTML(tag)}</span>`;
    });
    inner += `</div>`;
  }

  return `<li class="tile ${typeClass}">${inner}</li>`;
}

function renderPortfolioList(array, elementId, limit = 3) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const visibleItems = array.slice(0, limit);
  el.innerHTML = visibleItems.map(item => renderTile(item)).join('');
}

function renderAll() {
  // Combine items for universal modules on homepage if required
  const combinedHighlights = [...projects, ...assessments].filter(i => i.featured);
  
  renderPortfolioList(achievements.filter(i => i.featured), 'portfolio-achievements', 4);
  renderPortfolioList(combinedHighlights.length ? combinedHighlights : projects, 'portfolio-projects', 6);
}

/* ---------- PERSISTENCE MUTATIONS (CRUD) ---------- */
function addPortfolioItem(payload) {
  if (!payload.title || !payload.type) return false;

  const newItem = {
    id: `item-${Date.now()}`,
    title: String(payload.title).trim(),
    type: payload.type, // 'project', 'achievement', 'assessment'
    year: parseInt(payload.year) || 1,
    term: parseInt(payload.term) || 1,
    date: payload.date || new Date().toISOString().slice(0, 10),
    link: payload.link ? String(payload.link).trim() : null,
    img: payload.img ? String(payload.img).trim() : null,
    description: payload.description ? String(payload.description).trim() : null,
    featured: !!payload.featured,
    tags: Array.isArray(payload.tags) ? payload.tags : []
  };

  if (newItem.type === 'project') projects.push(newItem);
  else if (newItem.type === 'assessment') assessments.push(newItem);
  else achievements.push(newItem);

  persistAll();
  renderAll();
  return true;
}

function removeItem(type, id) {
  if (type === 'project') projects = projects.filter(i => i.id !== id);
  else if (type === 'assessment') assessments = assessments.filter(i => i.id !== id);
  else achievements = achievements.filter(i => i.id !== id);

  persistAll();
  renderAll();
}

/* ---------- FORM SUBSCRIPTION HANDLING ---------- */
function initPortfolioForm() {
  const form = document.getElementById('portfolio-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('item-title')?.value;
    const type = document.getElementById('item-type')?.value || 'project';
    const year = document.getElementById('item-year')?.value;
    const term = document.getElementById('item-term')?.value;
    const link = document.getElementById('item-link')?.value;
    const image = document.getElementById('item-image')?.value;
    const description = document.getElementById('item-description')?.value;
    const rawTags = document.getElementById('item-tags')?.value || '';
    const featured = document.getElementById('item-featured')?.checked;

    const tagsArray = rawTags.split(',').map(t => t.trim()).filter(t => t.length > 0);

    const added = addPortfolioItem({
      title, type, year, term, link, img: image, description, featured, tags: tagsArray
    });

    if (!added) {
      alert('Please validation requirements: Title and Category Type are mandatory.');
      return;
    }

    form.reset();
    alert('Dynamic portfolio card committed successfully.');
    window.location.reload();
  });
}

/* ---------- HIGH-RELIABILITY DATA BACKUP SYSTEM ---------- */
function initBackupSystem() {
  const exportBtn = document.getElementById("export-btn");
  const importBtn = document.getElementById("import-btn");
  const fileInput = document.getElementById("import-file-input");

  if (exportBtn) exportBtn.addEventListener("click", exportPortfolioData);
  if (importBtn) importBtn.addEventListener("click", () => fileInput.click());
  if (fileInput) fileInput.addEventListener("change", importPortfolioData);
}

function exportPortfolioData() {
  const backupData = {
    achievements: localStorage.getItem(LS_KEYS.achievements),
    projects: localStorage.getItem(LS_KEYS.projects),
    assessments: localStorage.getItem(LS_KEYS.assessments)
  };

  const jsonString = JSON.stringify(backupData, null, 2);
  const dataUri = "data:text/json;charset=utf-8," + encodeURIComponent(jsonString);

  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataUri);
  downloadAnchor.setAttribute("download", `portfolio_timeline_backup_${new Date().toISOString().slice(0,10)}.json`);
  
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

function importPortfolioData(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const parsedData = JSON.parse(e.target.result);
      
      if (!parsedData.projects && !parsedData.achievements && !parsedData.assessments) {
        throw new Error("Invalid payload mapping structure.");
      }

      if (parsedData.achievements) localStorage.setItem(LS_KEYS.achievements, parsedData.achievements);
      if (parsedData.projects) localStorage.setItem(LS_KEYS.projects, parsedData.projects);
      if (parsedData.assessments) localStorage.setItem(LS_KEYS.assessments, parsedData.assessments);

      alert("Data synchronizations successful! Refreshing live timeline views...");
      window.location.reload();
      
    } catch (err) {
      alert("Error parsing backup package. Please check integrity properties of target JSON.");
      console.error(err);
    }
  };
  reader.readAsText(file);
}

/* ---------- LIFECYCLE INITIALIZATION ---------- */
loadAll();
document.addEventListener('DOMContentLoaded', () => {
  renderAll();
  initPortfolioForm();
  initBackupSystem();
});

// Debug Global Mappings
globalThis.portfolioInterface = { addPortfolioItem, removeItem, persistAll, loadAll };