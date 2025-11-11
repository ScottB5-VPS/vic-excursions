# Static File Generator (vanilla HTML/JS/CSS)

This small project provides a framework-agnostic static web page that shows a simple web form. After the user fills it, the page offers generated files to download (README, config.json, sample HTML, notes). It works on GitHub Pages and in VS Code Live Server — no Node or Python required.

Files added
- `index.html` — main form page (static)
- `styles.css` — styling
- `app.js` — client-side logic that generates files as Blobs and triggers downloads

How to use locally

1. Open the workspace in VS Code.
2. Use the Live Server extension (recommended) to open `index.html`, or simply open `index.html` in your browser.
3. Fill the form, pick files to generate, and click "Generate files". Click the Download buttons to save each file.

How to use on GitHub Pages

1. Commit and push these files to a branch (usually `main` or `gh-pages`).
2. In your repository settings, enable GitHub Pages from the branch root. The `index.html` will be served as the default page.

Notes and compatibility
- The downloads are generated using Blobs and should work in modern browsers (Chrome, Edge, Firefox, Safari).
- No external libraries are used — pure HTML, CSS and vanilla JavaScript.
- If you want a single ZIP download, it's possible to add a small JS zip library (e.g., JSZip); that would increase file size and is optional.

Next steps (optional)
- Add more file templates (LICENSE, .gitignore, CI config).
- Provide filename customization and validation.
- Add a small automated test (headless browser) to verify that the page creates expected files.
