# Asset Insertion Runbook

To add or modify elements in your portfolio workspace, update `script.js` using your local text editor.

## Execution Sequence

1. Open `script.js` in VS Code.
2. Locate the core `PORTFOLIO_DATA` object.
3. Choose the appropriate category array target (`projects`, `achievements`, or `assessments`).
4. Append a new comma-separated data block matching the core schema properties.
5. Save changes and commit the file changes straight to your remote workspace:
   ```bash
   git add script.js
   git commit -m "feat: hardcode new academic asset milestone data elements"
   git push origin main