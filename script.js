// =========================================================================
// 1. SYSTEM ROUTER & INITIALIZATION ENGINE
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
  initGlobalTheme();

  // Detect Homepage UI Footprint (index.html)
  if (document.getElementById("portfolio-projects")) {
    renderHomepageShowcase();
  }
  
  // Detect Archive UI Footprint (archive.html)
  if (document.getElementById("archive-search") || document.querySelector(".term-bucket")) {
    renderArchiveTimeline();
    setupArchiveFilters();
  }
});

// =========================================================================
// 2. ENGINE A: HOMEPAGE PRESENTATION RENDERING LAYER
// =========================================================================
function renderHomepageShowcase() {
  const projectList = document.getElementById("portfolio-projects");
  const achievementList = document.getElementById("portfolio-achievements");

  if (projectList) projectList.innerHTML = "";
  if (achievementList) achievementList.innerHTML = "";

  const featuredProjects = PORTFOLIO_DATA.projects.filter(p => p.featured);
  featuredProjects.forEach(project => {
    projectList.innerHTML += createCardHTML(project);
  });

  const featuredAchievements = PORTFOLIO_DATA.achievements.filter(a => a.featured);
  featuredAchievements.forEach(achievement => {
    achievementList.innerHTML += createCardHTML(achievement);
  });
}

// =========================================================================
// 3. ENGINE B: TIMELINE ARCHIVE RENDERING LAYER (12-Bucket Matrix)
// =========================================================================
function renderArchiveTimeline() {
  // Clear layout and inject an embedded semantic grid container inside each term bucket block
  for (let y = 1; y <= 4; y++) {
    for (let t = 1; t <= 3; t++) {
      const bucket = document.getElementById(`bucket-y${y}-t${t}`);
      if (bucket) {
        bucket.innerHTML = `<h4>Term ${t}</h4><ul class="tile-list" id="grid-y${y}-t${t}"></ul>`;
      }
    }
  }

  const allTimelineItems = [
    ...PORTFOLIO_DATA.projects,
    ...PORTFOLIO_DATA.achievements,
    ...PORTFOLIO_DATA.assessments
  ];

  const bucketRegistry = {};

  // Distribute records to their matching academic grid matrix location
  allTimelineItems.forEach(item => {
    const gridId = `grid-y${item.year}-t${item.term}`;
    const gridContainer = document.getElementById(gridId);

    if (gridContainer) {
      gridContainer.innerHTML += createCardHTML(item);
      bucketRegistry[gridId] = (bucketRegistry[gridId] || 0) + 1;
    }
  });

  // Evaluate empty grid modules and swap them cleanly for subtle fallback placeholders
  for (let y = 1; y <= 4; y++) {
    for (let t = 1; t <= 3; t++) {
      const gridId = `grid-y${y}-t${t}`;
      const gridContainer = document.getElementById(gridId);
      if (gridContainer && !bucketRegistry[gridId]) {
        gridContainer.remove(); // Drop the structural list container completely if unused
        const bucket = document.getElementById(`bucket-y${y}-t${t}`);
        bucket.innerHTML += `<div class="bucket-placeholder">No elements mapped to this block.</div>`;
      }
    }
  }
}

// =========================================================================
// 4. UTILITY ENGINE: STANDARDIZED DOM COMPONENT GENERATOR
// =========================================================================
function createCardHTML(item) {
  const imageMarkup = item.image ? `<img src="${item.image}" alt="${item.title}" style="width:100%; border-radius:6px; margin-bottom:10px; object-fit:cover;" />` : '';
  const titleMarkup = item.link ? `<a href="${item.link}" target="_blank" class="tile-title-link">${item.title}</a>` : item.title;
  
  const manuscriptMarkup = item.manuscript ? `
    <div style="margin-top: 8px;">
      <a href="${item.manuscript}" target="_blank" class="btn" style="padding: 4px 10px; font-size: 0.8rem; display: inline-flex; align-items: center; background: rgba(0, 122, 255, 0.15); color: var(--accent-blue); text-decoration: none; border-radius: 4px;">
        📄 View Manuscript (PDF)
      </a>
    </div>
  ` : '';
  
  const typeColor = `var(--color-${item.category})`;
  const tagBadges = item.tags.map(t => `<span class="tile-tag-badge">${t}</span>`).join('');

  return `
    <li class="tile card-${item.category}">
      ${imageMarkup}
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <span style="font-size:0.75rem; text-transform:uppercase; font-weight:bold; letter-spacing:0.5px; color:${typeColor};">${item.category}</span>
        ${item.featured ? '<span style="color:#ffd700; font-size:0.8rem;">★ Featured</span>' : ''}
      </div>
      <h5 style="margin:4px 0; font-size:1.1rem; font-weight:600;">${titleMarkup}</h5>
      <p class="tile-description">${item.description}</p>
      ${manuscriptMarkup} 
      <div class="tag-container" style="margin-top:10px;">${tagBadges}</div>
    </li>
  `;
}

// =========================================================================
// 5. CONTROL RUNTIME: IN-MEMORY ARCHIVE SEARCH & FILTER CONTROLLER
// =========================================================================
function setupArchiveFilters() {
  const searchInput = document.getElementById("archive-search");
  const selectFilter = document.getElementById("archive-category-filter");

  if (!searchInput || !selectFilter) return;

  function executeFilterCycle() {
    const query = searchInput.value.toLowerCase().trim();
    const activeCategory = selectFilter.value;
    const cards = document.querySelectorAll(".tile");

    cards.forEach(card => {
      const innerText = card.textContent.toLowerCase();
      const typeLabel = card.querySelector("span").textContent.toLowerCase();

      const matchesSearch = innerText.includes(query);
      const matchesCategory = (activeCategory === "all" || typeLabel === activeCategory);

      if (matchesSearch && matchesCategory) {
        card.style.display = ""; 
      } else {
        card.style.display = "none";
      }
    });
  }

  searchInput.addEventListener("input", executeFilterCycle);
  selectFilter.addEventListener("change", executeFilterCycle);
}

// =========================================================================
// 6. GLOBAL THEME MANAGER LAYER (With file:// Fail-safes)
// =========================================================================
function initGlobalTheme() {
  const themeToggleBtn = document.getElementById("theme-toggle");
  let savedTheme = "dark"; 

  try {
    const activeState = localStorage.getItem("portfolio_theme_state");
    if (activeState) {
      savedTheme = activeState;
    }
  } catch (securityException) {
    console.warn("Storage engine restricted locally. Running application in fallback runtime mode.");
  }

  if (savedTheme === "light") {
    document.body.classList.remove("dark");
  } else {
    document.body.classList.add("dark");
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      const currentTheme = document.body.classList.contains("dark") ? "dark" : "light";
      try {
        localStorage.setItem("portfolio_theme_state", currentTheme);
      } catch (saveException) {
        // Capture local writing restriction cases safely
      }
    });
  }
}