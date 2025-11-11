# Victoria Excursion Planning Tool

This web application helps Victorian teachers and principals identify the required documentation and tasks needed for school excursions. Based on the excursion details entered, it generates appropriate planning documents and checklists to ensure compliance with Victoria Department of Education requirements.

## Features

- **Interactive Form**: Matches Victoria Department of Education excursion planning interface
- **Smart Document Generation**: Creates relevant documents based on selected activities, duration, and risks
- **Compliance-Ready**: Generates templates that align with Victorian education department standards
- **No Installation Required**: Works on GitHub Pages and VS Code Live Server with no dependencies

## Files Structure

- `index.html` — Victoria-themed excursion planning form
- `styles.css` — Victoria government styling with proper button groups and layout
- `app.js` — Logic that generates excursion-specific documents based on form selections

## Generated Documents

Based on your excursion selections, the tool generates:

- **Risk Assessment Form** (always required)
- **Student Permission Forms** 
- **Excursion Planning Checklist**
- **Water Safety Management Plan** (for water activities)
- **Camping Safety Plan** (for overnight excursions)
- **External Provider Verification** (when using external providers)
- **Transport Management Plan** (for bus/vehicle transport)

## How to Use Locally

1. Open the workspace in VS Code
2. Use the Live Server extension to serve `index.html`, or open directly in your browser
3. Fill out the excursion details form
4. Click "Next" to generate the required documents
5. Download each document template and complete as needed

## How to Deploy on GitHub Pages

1. Commit and push these files to your repository
2. In repository Settings → Pages, enable GitHub Pages from the main branch
3. The tool will be available at your GitHub Pages URL
4. Share with other teachers and principals in your school/district

## Browser Compatibility

- Works in all modern browsers (Chrome, Edge, Firefox, Safari)
- Uses vanilla HTML, CSS and JavaScript - no external dependencies
- File downloads generated using browser Blob API

## Customization Options

- Add additional document templates by modifying `app.js`
- Customize styling to match school branding in `styles.css`
- Add validation rules or additional form fields as needed
- Integrate with school management systems (requires backend development)

## Victoria Department of Education Compliance

This tool provides template documents that align with Victorian excursion planning requirements. Always verify current guidelines and adapt templates to your specific school policies and procedures.
