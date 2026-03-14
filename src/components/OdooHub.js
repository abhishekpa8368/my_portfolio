// OdooHub — IDE-style sidebar + content switcher
import { odooContent } from '../data/odoo-content.js';

export function initOdooHub() {
  const sidebar = document.getElementById('odoo-sidebar');
  const content = document.getElementById('odoo-content');

  if (!sidebar || !content) return;

  let activeArticle = null;

  // Build sidebar
  odooContent.sections.forEach(section => {
    const label = document.createElement('span');
    label.className = 'sidebar-section-label';
    label.textContent = section.label;
    sidebar.appendChild(label);

    section.articles.forEach(article => {
      const btn = document.createElement('button');
      btn.className = 'sidebar-item';
      btn.textContent = article.title;
      btn.dataset.id = article.id;

      btn.addEventListener('click', () => {
        showArticle(article);
        sidebar.querySelectorAll('.sidebar-item').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        // Refresh cursor hover
        document.dispatchEvent(new CustomEvent('cursor-refresh'));
      });

      sidebar.appendChild(btn);
    });
  });

  function showArticle(article) {
    content.innerHTML = `
      <div class="odoo-doc">
        <div class="doc-header">
          <span class="doc-category">${article.category}</span>
          <h2 class="doc-title">${article.title}</h2>
          <p class="doc-meta">Odoo 17 · Estimated: ${article.readTime}</p>
        </div>
        ${article.content}
      </div>
    `;
    content.scrollTop = 0;
  }

  // Load first article by default
  const firstSection = odooContent.sections[0];
  if (firstSection && firstSection.articles.length > 0) {
    const firstArticle = firstSection.articles[0];
    showArticle(firstArticle);
    const firstBtn = sidebar.querySelector('.sidebar-item');
    if (firstBtn) firstBtn.classList.add('active');
    activeArticle = firstArticle;
  }
}
