// SINGLE SOURCE OF TRUTH DATA STORE
const PORTFOLIO_DATA = {
  achievements: [
    {
      id: "cert-java",
      title: "Java Certificate",
      category: "achievement",
      year: 2,
      term: 2,
      link: "https://github.com/...",
      image: "Image/Certificate/Java_Cert.png",
      description: "Foundational Java training and hands-on object-oriented programming practice.",
      featured: true,
      tags: ["Java", "OOP"]
    },
    {
      id: "cert-innovision2028",
      title: "CCIS InnoVision 2028",
      category: "achievement",
      year: 2,
      term: 3,
      link: null,
      image: "Image/Certificate/Certificate.png",
      description: "Project presentation and technical showcase deployment validation.",
      featured: true,
      tags: ["Presentation", "Showcase"]
    }
  ],
  projects: [
    {
      id: "proj-pet-management",
      title: "Pet Management System",
      category: "project",
      year: 1,
      term: 3,
      link: "https://github.com/...",
      image: null,
      description: "Desktop utility database built in C# utilizing Windows Forms architectures.",
      featured: true,
      tags: ["C#", "WinForms", "SQL"]
    }
  ],
  assessments: []
};

// Next, you'll have your clean rendering loops below this data object to write the elements out to the page templates!