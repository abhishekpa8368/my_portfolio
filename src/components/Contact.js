// Contact Section — social cards + terminal form

const contacts = [
  { label: "Email",    value: "abhishekdhangardr@gmail.com",     icon: "✉️",  href: "mailto:abhishekdhangardr@gmail.com" },
  { label: "Phone",    value: "+91 8368447992",                   icon: "📞",  href: "tel:+918368447992" },
  { label: "LinkedIn", value: "linkedin.com/in/abhishek-pal",     icon: "💼",  href: "https://www.linkedin.com/in/abhishek-pal-ba78622b0/" },
  { label: "GitHub",   value: "github.com/abhishekpa8368",        icon: "🐙",  href: "https://github.com/abhishekpa8368" },
  { label: "Location", value: "Ghaziabad, Uttar Pradesh, India",  icon: "📍",  href: null },
];

export function initContact() {
  const cardsEl = document.getElementById('contact-cards');
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('form-status');

  if (cardsEl) {
    contacts.forEach(c => {
      const el = c.href
        ? document.createElement('a')
        : document.createElement('div');

      el.className = 'contact-card glass-card';
      if (c.href) {
        el.href = c.href;
        if (c.href.startsWith('http')) {
          el.target = '_blank';
          el.rel = 'noopener noreferrer';
        }
      }
      el.innerHTML = `
        <span class="contact-icon">${c.icon}</span>
        <div class="contact-info">
          <p class="contact-label">${c.label}</p>
          <p class="contact-value">${c.value}</p>
        </div>
        ${c.href ? '<span style="color:var(--neon-blue); margin-left:auto;">→</span>' : ''}
      `;
      cardsEl.appendChild(el);
    });
  }

  // Form submit
  if (form && statusEl) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = document.getElementById('submit-btn');
      if (btn) {
        btn.innerHTML = '<span>SENDING...</span>';
        btn.disabled = true;
      }

      try {
        const data = new FormData(form);
        const res = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          statusEl.textContent = '✓ Message sent successfully!';
          statusEl.style.color = 'var(--aurora-green)';
          form.reset();
        } else {
          throw new Error('Server error');
        }
      } catch (err) {
        statusEl.textContent = '✗ Failed to send. Please email directly.';
        statusEl.style.color = '#FF6B35';
      } finally {
        if (btn) {
          btn.innerHTML = '<span>SEND MESSAGE →</span>';
          btn.disabled = false;
        }
      }
    });
  }
}
