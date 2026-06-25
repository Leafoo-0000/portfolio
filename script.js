// SINGLE SOURCE OF TRUTH DATA STORE
const PORTFOLIO_DATA = {
  achievements: [
    {
      id: "cert-java-core",
      title: "Advanced Java Programming Certification",
      category: "achievement",
      year: 2,
      term: 1,
      link: "https://github.com/...",
      image: "Image/Certificates/Java_Cert.png",
      description: "Validation of object-oriented concepts, Swing GUI frameworks, and robust class hierarchy models.",
      featured: false,
      tags: ["Java", "Swing", "OOP"]
    },
    {
      id: "cert-innovision2028",
      title: "CCIS InnoVision 2028",
      category: "achievement",
      year: 2,
      term: 3,
      link: null,
      image: "Image/Certificates/Certificate.png",
      description: "Project presentation and technical showcase deployment validation.",
      featured: true,
      tags: ["Presentation", "Showcase"]
    }
  ],
  projects: [
    {
      id: "Easy-E",
      title: "Easy-E (Event Management System)",
      category: "project",
      year: 1,
      term: 3,
      link: "https://github.com/Leafoo-0000/Easy-E/",
      image: null, 
      description: "A student support and task management web application featuring algorithmic prioritization mechanics.",
      featured: true,
      tags: ["Next.js", "React", "Supabase"]
    },
    {
      id: "Just-Do-It",
      title: "Just-Do-It Web App",
      category: "project",
      year: 2,
      term: 2,
      link: "https://Just-Do-It.vercel.app/",
      image: null, 
      description: "A student support and task management web application featuring algorithmic prioritization mechanics.",
      featured: true,
      tags: ["Next.js", "React", "Supabase"]
    }
  ],
  assessments: []
};

// =========================================================================
// 2. SYSTEM ROUTER & INITIALIZATION ENGINE
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Core Layout Features
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
// 3. ENGINE A: HOMEPAGE PRESENTATION RENDERING LAYER
// =========================================================================
function renderHomepageShowcase() {
  const projectList = document.getElementById("portfolio-projects");
  const achievementList = document.getElementById("portfolio-achievements");

  if (projectList) projectList.innerHTML = "";
  if (achievementList) achievementList.innerHTML = "";

  // Filter and draw pinned featured projects
  const featuredProjects = PORTFOLIO_DATA.projects.filter(p => p.featured);
  featuredProjects.forEach(project => {
    projectList.innerHTML += createCardHTML(project);
  });

  // Filter and draw pinned featured certificates
  const featuredAchievements = PORTFOLIO_DATA.achievements.filter(a => a.featured);
  featuredAchievements.forEach(achievement => {
    achievementList.innerHTML += createCardHTML(achievement);
  });
}

// =========================================================================
// 4. ENGINE B: TIMELINE ARCHIVE RENDERING LAYER (12-Bucket Matrix)
// =========================================================================
function renderArchiveTimeline() {
  // Reset all 12 buckets back to clear states, re-injecting clean titles
  for (let y = 1; y <= 4; y++) {
    for (let t = 1; t <= 3; t++) {
      const bucket = document.getElementById(`bucket-y${y}-t${t}`);
      if (bucket) {
        bucket.innerHTML = `<h4>Term ${t}</h4>`;
      }
    }
  }

  // Flatten all data arrays into a single chronological rendering sequence
  const allTimelineItems = [
    ...PORTFOLIO_DATA.projects,
    ...PORTFOLIO_DATA.achievements,
    ...PORTFOLIO_DATA.assessments
  ];

  const bucketRegistry = {};

  // Route items directly to their designated Year/Term DOM element boxes
  allTimelineItems.forEach(item => {
    const bucketId = `bucket-y${item.year}-t${item.term}`;
    const bucketElement = document.getElementById(bucketId);

    if (bucketElement) {
      bucketElement.innerHTML += createCardHTML(item);
      bucketRegistry[bucketId] = (bucketRegistry[bucketId] || 0) + 1;
    }
  });

  // Re-verify all buckets; map empty state notice cards if a block contains no entries
  for (let y = 1; y <= 4; y++) {
    for (let t = 1; t <= 3; t++) {
      const targetId = `bucket-y${y}-t${t}`;
      const element = document.getElementById(targetId);
      if (element && !bucketRegistry[targetId]) {
        element.innerHTML += `<div class="bucket-placeholder">No elements mapped to this block.</div>`;
      }
    }
  }
}

// =========================================================================
// 5. UTILITY ENGINE: STANDARDIZED DOM COMPONENT GENERATOR
// =========================================================================
function createCardHTML(item) {
  const imageMarkup = item.image ? `<img src="${item.image}" alt="${item.title}" style="width:100%; border-radius:6px; margin-bottom:10px; object-fit:cover;" />` : '';
  const titleMarkup = item.link ? `<a href="${item.link}" target="_blank" class="item-title-link">${item.title}</a>` : item.title;
  
  // Custom context branding parameters mapping to your styles
  const typeColor = item.category === 'project' ? 'var(--accent-blue, #00bcd4)' : item.category === 'achievement' ? '#4caf50' : '#ff9800';
  const tagBadges = item.tags.map(t => `<span class="badge" style="background:rgba(255,255,255,0.06); font-size:0.75rem; padding:3px 8px; border-radius:4px; border:1px solid rgba(255,255,255,0.08);">${t}</span>`).join('');

  return `
    <div class="portfolio-item-card" style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); padding:14px; border-radius:10px; margin-top:12px;">
      ${imageMarkup}
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <span style="font-size:0.7rem; text-transform:uppercase; font-weight:bold; letter-spacing:0.5px; color:${typeColor};">${item.category}</span>
        ${item.featured ? '<span style="color:#ffd700; font-size:0.8rem;">★ Featured</span>' : ''}
      </div>
      <h5 style="margin:4px 0; font-size:1.05rem; font-weight:600;">${titleMarkup}</h5>
      <p style="font-size:0.88rem; opacity:0.75; margin:6px 0 12px 0; line-height:1.4;">${item.description}</p>
      <div style="display:flex; flex-wrap:wrap; gap:6px;">${tagBadges}</div>
    </div>
  `;
}

// =========================================================================
// 6. CONTROL RUNTIME: IN-MEMORY ARCHIVE SEARCH & FILTER CONTROLLER
// =========================================================================
function setupArchiveFilters() {
  const searchInput = document.getElementById("archive-search");
  const selectFilter = document.getElementById("archive-category-filter");

  if (!searchInput || !selectFilter) return;

  function executeFilterCycle() {
    const query = searchInput.value.toLowerCase().trim();
    const activeCategory = selectFilter.value;
    const cards = document.querySelectorAll(".portfolio-item-card");

    cards.forEach(card => {
      const innerText = card.textContent.toLowerCase();
      const typeLabel = card.querySelector("span").textContent.toLowerCase();

      const matchesSearch = innerText.includes(query);
      const matchesCategory = (activeCategory === "all" || typeLabel === activeCategory);

      if (matchesSearch && matchesCategory) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  searchInput.addEventListener("input", executeFilterCycle);
  selectFilter.addEventListener("change", executeFilterCycle);
}

// =========================================================================
// 7. GLOBAL THEME MANAGER LAYER
// =========================================================================
function initGlobalTheme() {
  const themeToggleBtn = document.getElementById("theme-toggle");
  
  // Synchronize state via a clean preference reference string
  if (localStorage.getItem("portfolio_theme_state") === "light") {
    document.body.classList.remove("dark");
  } else {
    document.body.classList.add("dark"); // System defaults to Dark Mode
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      const currentTheme = document.body.classList.contains("dark") ? "dark" : "light";
      localStorage.setItem("portfolio_theme_state", currentTheme);
    });
  }
}