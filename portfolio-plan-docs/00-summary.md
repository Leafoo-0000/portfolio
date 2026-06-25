# Portfolio Redesign Summary

Refactor the portfolio into a cleaner, more maintainable single-source content model. Keep the current lightweight stack, but replace the mixed hardcoded/JS-driven flow with a consistent data layer, a proper showcase homepage, and a separate archive page grouped by year and term with the add form moved off the homepage.

## Goals
- Make the homepage feel like a proper portfolio landing page.
- Move organization and content entry to a separate archive page.
- Group all items by year and term so the portfolio stays organized as it grows.
- Keep a single data source in `script.js`.
- Preserve browser persistence with `localStorage`.
