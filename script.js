// =========================================================================
// 1. SINGLE SOURCE OF TRUTH DATA STORE (Hardcoded Database Layer)
// =========================================================================
const PORTFOLIO_DATA = {
  achievements: [
    {
      id: "cert-java-core",
      title: "Advanced Java Programming Certification",
      category: "achievement",
      year: 2,
      term: 1,
      link: null,
      image: "Image/Certificates/Java Cert.png",
      description: "Validation of object-oriented concepts, Swing GUI frameworks, and robust class hierarchy models.",
      featured: true,
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
      description: "A comprehensive event platform designed to streamline room bookings, scheduling matrix constraints, and student-led college activities.",
      featured: true,
      tags: ["Java", "Swing", "SQL"]
    },
    {
      id: "Just-Do-It",
      title: "Just-Do-It Web App",
      category: "project",
      year: 2,
      term: 2,
      link: "https://Just-Do-It.vercel.app/",
      image: null, 
      description: "A sustainability habit tracker application utilizing milestone counters to reinforce eco-friendly routines and personal tracking metrics.",
      featured: true,
      tags: ["Next.js", "React", "Supabase"]
    },
    {
      id: "AtiCao",
      title: "AtiCao: Davao IoT Cacao Disease Risk Monitor",
      category: "project",
      year: 2,
      term: 3,
      link: "https://github.com/Yami2Danchou/aticao-project",
      image: null, 
      description: "An IoT monitoring system classifying 8 distinct cacao health categories via custom Roboflow datasets, providing real-time disease diagnostic metrics.",
      featured: true,
      tags: ["Java", "Mobile App", "Machine Learning", "IoT"]
    }
  ],
  assessments: [
    {
      id: "asm-it103-greensense",
      title: "IT103 Case Study: GreenSense",
      category: "assessment",
      year: 1,
      term: 1,
      link: "https://leafoo-0000.github.io/GreenSense/LandingPage.html",
      image: null,
      description: "An interactive web case study layout designed to analyze interface designs for green tracking and environmental sustainability systems.",
      featured: true,
      tags: ["HTML", "CSS", "UI/UX", "Case Study"]
    },
    {
      id: "asm-mp1-replaceall",
      title: "MP1: ReplaceAll",
      category: "assessment",
      year: 1,
      term: 2,
      link: "https://leafoo-0000.github.io/Hands-on-Activity/MP1/index.html",
      image: null,
      description: "A client-side laboratory machine problem implementing live DOM manipulation and programmatic substring text replacement algorithms.",
      featured: false,
      tags: ["JavaScript", "DOM Manipulation", "Strings"]
    },
    {
      id: "asm-mp2-searchword",
      title: "MP2: SearchWord",
      category: "assessment",
      year: 1,
      term: 2,
      link: "https://leafoo-0000.github.io/Hands-on-Activity/MP2/index.html",
      image: null,
      description: "A logical programming exercise focused on building string index parsing and text sequence tracking utilities.",
      featured: false,
      tags: ["JavaScript", "Search Algorithms", "Logic"]
    },
    {
      id: "asm-extra-1",
      title: "Extra Assessment 1",
      category: "assessment",
      year: 1,
      term: 3,
      link: null,
      image: null,
      description: "A milestone checkpoint tracking diagnostic software engineering proficiency or course baseline metrics.",
      featured: false,
      tags: ["Testing", "Milestone"]
    }
  ]
};

// =========================================================================
// 2. SYSTEM ROUTER & INITIALIZATION ENGINE
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
// 3. ENGINE A: HOMEPAGE PRESENTATION RENDERING LAYER
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
// 4. ENGINE B: TIMELINE ARCHIVE RENDERING LAYER (12-Bucket Matrix)
// =========================================================================
function renderArchiveTimeline() {
  for (let y = 1; y <= 4; y++) {
    for (let t = 1; t <= 3; t++) {
      const bucket = document.getElementById(`bucket-y${y}-t${t}`);
      if (bucket) {
        bucket.innerHTML = `<h4>Term ${t}</h4>`;
      }
    }
  }

  const allTimelineItems = [
    ...PORTFOLIO_DATA.projects,
    ...PORTFOLIO_DATA.achievements,
    ...PORTFOLIO_DATA.assessments
  ];

  const bucketRegistry = {};

  allTimelineItems.forEach(item => {
    const bucketId = `bucket-y${item.year}-t${item.term}`;
    const bucketElement = document.getElementById(bucketId);

    if (bucketElement) {
      bucketElement.innerHTML += createCardHTML(item);
      bucketRegistry[bucketId] = (bucketRegistry[bucketId] || 0) + 1;
    }
  });

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
  const titleMarkup = item.link ? `<a href="${item.link}" target="_blank" class="tile-title-link">${item.title}</a>` : item.title;
  
  // Directly bind color variables mapped from your root tokens
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
      <div class="tag-container">${tagBadges}</div>
    </li>
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
    const cards = document.querySelectorAll(".tile");

    cards.forEach(card => {
      const innerText = card.textContent.toLowerCase();
      const typeLabel = card.querySelector("span").textContent.toLowerCase();

      const matchesSearch = innerText.includes(query);
      const matchesCategory = (activeCategory === "all" || typeLabel === activeCategory);

      if (matchesSearch && matchesCategory) {
        // FIXED: Reverts style to standard layout rules defined in style.css
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
// 7. GLOBAL THEME MANAGER LAYER
// =========================================================================
function initGlobalTheme() {
  const themeToggleBtn = document.getElementById("theme-toggle");
  
  if (localStorage.getItem("portfolio_theme_state") === "light") {
    document.body.classList.remove("dark");
  } else {
    document.body.classList.add("dark");
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      const currentTheme = document.body.classList.contains("dark") ? "dark" : "light";
      localStorage.setItem("portfolio_theme_state", currentTheme);
    });
  }
}