# Archive Page Structure (Optimized)

The archive page functions as a central, comprehensive repository organizing your entire academic and personal timeline into clean, scannable blocks[cite: 1, 3].

## Layout Hierarchy
The layout renders a total of 12 distinct chronological buckets grouped by Academic Year and Term[cite: 3]:
- **1st Year** (Term 1, Term 2, Term 3)[cite: 3]
- **2nd Year** (Term 1, Term 2, Term 3)[cite: 3]
- **3rd Year** (Term 1, Term 2, Term 3)[cite: 3]
- **4th Year** (Term 1, Term 2, Term 3)[cite: 3]

## UX & Feature Enhancements (New Additions)
- **Global Search & Live Filter Bar**: A sticky top menu featuring a text search field and category filter pills (`All`, `Projects`, `Achievements`, `Assessments`)[cite: 4]. Typing or clicking a pill dynamically hides/shows items inside their respective buckets instantly.
- **Empty Bucket State Handling**: If a specific term bucket contains 0 matching items, instead of breaking the layout, it elegantly displays a subtle placeholder (e.g., *"No items logged for this term"*).
- **Data Backup & Restore Utilities**: Since data persists via `localStorage`[cite: 1, 4], a small utility section at the bottom provides "Export Data (JSON)" and "Import Data" capabilities to prevent accidental data loss when clearing browser caches.

## Management Behavior
- **Isolated Form**: The "Add Item" form lives exclusively on this page, hidden inside an administrative drop-down accordion or modal to keep the client view uncluttered[cite: 1, 3].
- **Direct Placement**: The entry form maps fields precisely to the unified data model, passing chosen terms and years directly into their respective buckets upon submission[cite: 3, 4].