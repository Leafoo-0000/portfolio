# Extended Data Model

The data layer remains flat, stored in unified arrays inside `script.js` and synced with `localStorage` for seamless browser persistence[cite: 1, 4].

## Core Arrays
- `projects`[cite: 4]
- `achievements`[cite: 4]
- `assessments`[cite: 4]

## Unified Item Schema
Every object inserted into any of the arrays above must conform to this uniform structural schema:

| Property | Type | Description |
| :--- | :--- | :--- |
| `id` | String | A unique timestamp-based or UUID string (e.g., `Date.now().toString()`). |
| `title` | String | The name of the project, asset, or award[cite: 4]. |
| `category` | String | Strict Enum: `'project'`, `'achievement'`, or `'assessment'`[cite: 4]. |
| `year` | Number | Integer value: `1`, `2`, `3`, or `4`[cite: 3, 4]. |
| `term` | Number | Integer value: `1`, `2`, or `3`[cite: 3, 4]. |
| `description` | String | A brief summary detailing the entry[cite: 4]. |
| `tags` | Array | Strings indicating tech stack or tools used (e.g., `["Java", "Swing"]`). |
| `link` | String | URL to GitHub repository, live deployment, or document credential[cite: 4]. |
| `imagePath` | String | Local path or remote URL for preview thumbnails[cite: 4]. |
| `featured` | Boolean | Optional. If `true`, it populates the homepage highlight reels[cite: 2, 4]. |
| `timestamp` | Number | Unix epoch timestamp representing when the item was created. |

## Filtering & Rendering Mechanics
- **For Homepage**: 
```javascript
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);
  ```[cite: 4]
- **For Archive Buckets**: 
```javascript
  const bucketItems = [...projects, ...achievements, ...assessments].filter(
    item => item.year === currentYear && item.term === currentTerm
  );
  ```[cite: 3, 4]