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

## Run in VS Code (Live Server)

Follow these steps to run the project in Visual Studio Code using the Live Server extension on Windows (PowerShell). This is the recommended way to preview the app with automatic reloads.

### Prerequisites
- Visual Studio Code installed
- Live Server extension by Ritwick Dey (install from VS Code Extensions marketplace)

### Steps

1. **Install Live Server Extension** (if not already installed):
   - In VS Code, open the Extensions view (`Ctrl+Shift+X`)
   - Search for "Live Server" by Ritwick Dey
   - Click Install

2. **Open the project in VS Code**:
   - Open PowerShell and navigate to the project folder:
   
   ```powershell
   cd "c:\Users\10916675\dev\vic-excursions"
   code .
   ```
   
   Or use File → Open Folder... in VS Code to select the project directory.

3. **Open index.html**:
   - In the Explorer panel, click `index.html` to make it the active tab

4. **Start Live Server**:
   - **Method A**: Click the "Go Live" button in the bottom-right status bar
   - **Method B**: Right-click `index.html` in the editor and select "Open with Live Server"
   - **Method C**: Open Command Palette (`Ctrl+Shift+P`) → type "Live Server: Open with Live Server"

5. **Use the app**:
   - Live Server will automatically open your default browser to `http://127.0.0.1:5500/index.html`
   - Fill out the excursion form and test the functionality
   - Any changes to `index.html`, `styles.css`, or `app.js` will automatically refresh the browser

6. **Stop Live Server**:
   - Click the "Port: 5500" button in the status bar, or
   - Command Palette (`Ctrl+Shift+P`) → "Live Server: Stop Live Server"

### Troubleshooting

- **Live Server opens wrong file**: Make sure `index.html` is the active tab before clicking "Go Live"
- **CSS/JS not loading**: Check browser DevTools Console (`F12`) for 404 errors. Ensure file paths are correct
- **Page loads but broken functionality**: Open DevTools Console to see JavaScript errors
- **Windows Firewall prompt**: Allow access when prompted to let the browser connect to the local server
- **Port 5500 in use**: Live Server will automatically choose another port (check status bar or browser URL)
- **Configure Live Server**: Go to Settings (`Ctrl+,`) → search "Live Server" to change port, browser, or other options

### Alternative: Python HTTP Server

If you prefer not to use Live Server, you can run a simple HTTP server using Python:

```powershell
# Navigate to project directory
cd "c:\Users\10916675\dev\vic-excursions"

# Start Python HTTP server (requires Python 3 installed)
python -m http.server 5500

# Open browser to: http://localhost:5500/index.html
```

**Note**: Python server doesn't provide hot-reload like Live Server.
