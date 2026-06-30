// =========================================================================
// SINGLE SOURCE OF TRUTH DATA STORE (Centralized Database Layer)
// =========================================================================
const PORTFOLIO_DATA = {
  achievements: [
    {
      id: "cert-java-core",
      title: "Java Programming Certification",
      category: "achievement",
      year: 2,
      term: 1,
      link: null,
      image: "Image/Certificates/Java Cert.png",
      description:
        "Validation of object-oriented concepts, Swing GUI frameworks, and robust class hierarchy models.",
      featured: true,
      tags: ["Java", "Swing", "OOP"],
    },
    {
      id: "cert-innovision2028",
      title: "CCIS InnoVision 2028",
      category: "achievement",
      year: 2,
      term: 3,
      link: null,
      image: "Image/Certificates/Certificate.png",
      description:
        "Reflection: Collaborating on project exhibitions during the college innovation events emphasizes the critical importance of modular class structures, clear interface contracts, and effective technical communication within rapid software teams.",
      featured: true,
      tags: ["Presentation", "Showcase"],
    },
    {
      id: "cert-AtiCao-Award",
      title: "AtiCao Award",
      category: "achievement",
      year: 2,
      term: 3,
      link: null,
      image: "Image/Certificates/AtiCao Award.jpeg",
      description:
        "Validation of object-oriented concepts, Swing GUI frameworks, and robust class hierarchy models.",
      featured: true,
      tags: ["Presentation", "Showcase", "Award"],
    },
  ],
  projects: [
    {
      id: "proj-Easy-E",
      title: "Easy-E (Event Management System)",
      category: "project",
      year: 1,
      term: 3,
      link: "https://github.com/Leafoo-0000/Easy-E/",
      image: null,
      description:
        "A comprehensive event platform designed to streamline room bookings, scheduling matrix constraints, and student-led college activities.",
      featured: true,
      tags: ["Java", "Swing", "SQL"],
    },
    {
      id: "proj-Just-Do-It",
      title: "Just-Do-It Web App",
      category: "project",
      year: 2,
      term: 2,
      link: "https://Just-Do-It.vercel.app/",
      image: null,
      description:
        "A sustainability habit tracker application utilizing milestone counters to reinforce eco-friendly routines and personal tracking metrics.",
      featured: true,
      tags: ["Next.js", "React", "Supabase"],
    },
    {
      id: "proj-AtiCao",
      title: "AtiCao: Davao IoT Cacao Disease Risk Monitor",
      category: "project",
      year: 2,
      term: 3,
      link: "https://github.com/Yami2Danchou/aticao-project",
      manuscript:
        "https://drive.google.com/file/d/1hCN5DtYwdMJ2EJ8eVdE4vx3ZJGm_SOM5/view?usp=sharing",
      image: "Image/Projects/AtiCao.jpg",
      description:
        "An App/IoT monitoring system classifying 8 distinct cacao health categories via custom Roboflow datasets, providing real-time disease diagnostic metrics.",
      featured: true,
      tags: ["Java", "Mobile App", "Machine Learning", "IoT"],
    },
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
      description:
        "An interactive web case study layout designed to analyze interface designs for green tracking and environmental sustainability systems.",
      featured: true,
      tags: ["HTML", "CSS", "UI/UX", "Case Study"],
    },
    {
      id: "asm-mp1-replaceall",
      title: "MP1: ReplaceAll",
      category: "assessment",
      year: 1,
      term: 2,
      link: "https://leafoo-0000.github.io/Hands-on-Activity/MP1/index.html",
      image: null,
      description:
        "A client-side laboratory machine problem implementing live DOM manipulation and programmatic substring text replacement algorithms.",
      featured: false,
      tags: ["JavaScript", "DOM Manipulation", "Strings"],
    },
    {
      id: "asm-mp2-searchword",
      title: "MP2: SearchWord",
      category: "assessment",
      year: 1,
      term: 2,
      link: "https://leafoo-0000.github.io/Hands-on-Activity/MP2/index.html",
      image: null,
      description:
        "A logical programming exercise focused on building string index parsing and text sequence tracking utilities.",
      featured: false,
      tags: ["JavaScript", "Search Algorithms", "Logic"],
    },
    {
      id: "asm-extra-1",
      title: "Extra Assessment 1",
      category: "assessment",
      year: 1,
      term: 3,
      link: null,
      image: null,
      description:
        "A milestone checkpoint tracking diagnostic software engineering proficiency or course baseline metrics.",
      featured: false,
      tags: ["Testing", "Milestone"],
    },
  ],
};
