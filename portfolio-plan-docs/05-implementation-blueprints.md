# Technical Implementation Blueprints

This document contains optimized JavaScript structural logic and CSS paradigms to accelerate building the single-source-of-truth portfolio.

## 1. Efficient Archive Rendering (Single Loop)
Instead of manually hardcoding 12 grid blocks in HTML, use standard loops to generate the container nodes dynamically.

```javascript
function renderArchive() {
  const container = document.getElementById('archive-container');
  container.innerHTML = ''; // Clear previous state

  const allItems = [...projects, ...achievements, ...assessments];

  for (let y = 1; y <= 4; y++) {
    const yearSection = document.createElement('div');
    yearSection.className = `year-group year-${y}`;
    yearSection.innerHTML = `<h2>${y}nd Year</h2>`;

    for (let t = 1; t <= 3; t++) {
      const termBucket = document.createElement('div');
      termBucket.className = 'term-bucket';
      termBucket.innerHTML = `<h3>Term ${t}</h3>`;

      const filtered = allItems.filter(item => item.year === y && item.term === t);

      if (filtered.length === 0) {
        termBucket.innerHTML += `<p class="empty-text">No items logged.</p>`;
      } else {
        const itemGrid = document.createElement('div');
        itemGrid.className = 'item-grid';
        
        filtered.forEach(item => {
          itemGrid.innerHTML += `
            <div class="card card-${item.category}">
              <h4>${item.title}</h4>
              <p>${item.description}</p>
              <div class="tags">${item.tags.map(t => `<span>${t}</span>`).join('')}</div>
            </div>`;
        });
        termBucket.appendChild(itemGrid);
      }
      yearSection.appendChild(termBucket);
    }
    container.appendChild(yearSection);
  }
}
```