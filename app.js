document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('generator-form');
  const downloads = document.getElementById('downloads');
  const fileList = document.getElementById('fileList');
  const backBtn = document.getElementById('backBtn');

  function makeBlobAndDownload(filename, content, mime) {
    const blob = new Blob([content], { type: mime || 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    // revoke after a short delay to ensure download starts in older browsers
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const formData = new FormData(form);
    const name = (formData.get('projectName') || 'untitled').trim();
    const author = (formData.get('author') || '').trim();
    const description = (formData.get('description') || '').trim();
    const license = (formData.get('license') || '').trim();
    const files = formData.getAll('files');

    if (files.length === 0) {
      alert('Please select at least one file to generate.');
      return;
    }

    fileList.innerHTML = '';

    const created = [];

    if (files.includes('readme')) {
      const md = `# ${name}\n\n${description}\n\n---\n\nAuthor: ${author}\n\nLicense: ${license}\n`;
      created.push({ filename: 'README.md', content: md, mime: 'text/markdown' });
    }

    if (files.includes('config')) {
      const cfg = { name, author, description, license, generatedAt: new Date().toISOString() };
      created.push({ filename: 'config.json', content: JSON.stringify(cfg, null, 2), mime: 'application/json' });
    }

    if (files.includes('index')) {
      const sample = `<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n  <title>${name} — Sample</title>\n</head>\n<body>\n  <h1>${name}</h1>\n  <p>${description}</p>\n  <p>Author: ${author} — License: ${license}</p>\n</body>\n</html>`;
      created.push({ filename: 'sample.html', content: sample, mime: 'text/html' });
    }

    if (files.includes('notes')) {
      const notes = `Notes for ${name}\n\n- Generated: ${new Date().toLocaleString()}\n- Author: ${author}\n\n${description}\n`;
      created.push({ filename: 'notes.txt', content: notes, mime: 'text/plain' });
    }

    // Populate download list
    created.forEach((f) => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = 'Download';
      btn.addEventListener('click', () => makeBlobAndDownload(f.filename, f.content, f.mime));
      const nameSpan = document.createElement('span');
      nameSpan.textContent = ` ${f.filename}`;
      li.appendChild(btn);
      li.appendChild(nameSpan);
      fileList.appendChild(li);
    });

    // swap views
    form.classList.add('hidden');
    downloads.classList.remove('hidden');
  });

  backBtn.addEventListener('click', () => {
    downloads.classList.add('hidden');
    form.classList.remove('hidden');
  });
});
