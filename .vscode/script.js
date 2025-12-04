const openModalBtn = document.getElementById('openModalBtn');
const projectModal = document.getElementById('projectModal');
const closeModalBtn = document.getElementById('closeModal');
const modalCancel = document.getElementById('modalCancel');
const projectForm = document.getElementById('projectForm');
const projectGrid = document.getElementById('projectGrid');

openModalBtn.addEventListener('click', () => {
  projectModal.style.display = 'flex';
  projectModal.setAttribute('aria-hidden', 'false');
});

function closeModal() {
  projectModal.style.display = 'none';
  projectModal.setAttribute('aria-hidden', 'true');
}

closeModalBtn.addEventListener('click', closeModal);
modalCancel.addEventListener('click', closeModal);

window.addEventListener('click', (e) => {
  if (e.target === projectModal) closeModal();
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

function fileToURL(file) {
  if (!file) return '';
  return URL.createObjectURL(file);
}

projectForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const profileFile = document.getElementById('profilePic').files[0];
  const thumbFile = document.getElementById('thumbPic').files[0];
  const name = document.getElementById('projectName').value.trim();
  const desc = document.getElementById('projectDesc').value.trim();
  const tagsRaw = document.getElementById('projectTags').value.trim();
  const github = document.getElementById('githubLink').value.trim();
  const demo = document.getElementById('demoLink').value.trim();

  if (!name || !desc) {
    alert('Nome e descrição são obrigatórios.');
    return;
  }

  const profileURL = profileFile ? fileToURL(profileFile) : 'https://i.pravatar.cc/80';
  const thumbURL = thumbFile ? fileToURL(thumbFile) : 'https://via.placeholder.com/800x450?text=Sem+Thumb';

  const card = document.createElement('div');
  card.className = 'card';

  card.innerHTML = `
    <img class="thumb" src="${thumbURL}" alt="thumb">
    <div class="content">
      <div class="user">
        <img class="avatar" src="${profileURL}" alt="avatar">
        <span class="username">@você</span>
      </div>
      <div class="titleRow">
        <span class="title">${escapeHtml(name)}</span>
        <span class="heart">❤️ 0</span>
      </div>
      <p class="desc">${escapeHtml(desc)}</p>
      <div class="tags">
        ${
          tagsRaw
            ? tagsRaw
                .split(',')
                .map(t => `<span class="tag">${escapeHtml(t.trim())}</span>`)
                .join('')
            : ''
        }
      </div>
      <div class="buttons">
        ${
          github
            ? `<a class="btn" href="${escapeAttr(github)}" target="_blank" rel="noopener">GitHub</a>`
            : `<span class="btn" style="opacity:.5;cursor:default">GitHub</span>`
        }
        ${
          demo
            ? `<a class="btn demo" href="${escapeAttr(demo)}" target="_blank" rel="noopener">Demo</a>`
            : `<span class="btn demo" style="opacity:.5;cursor:default">Demo</span>`
        }
      </div>
    </div>
  `;

  projectGrid.appendChild(card);
  projectForm.reset();
  closeModal();
});

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (s) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[s]);
}

function escapeAttr(url) {
  try {
    return encodeURI(url);
  } catch {
    return '#';
  }
}
