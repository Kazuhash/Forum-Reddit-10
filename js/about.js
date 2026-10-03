function toggleUserMenu() {
  document.getElementById('userMenuDropdown').classList.toggle('show');
}

(function () {
  function terapkanTema() {
    if (document.body && localStorage.getItem('theme') === 'dark') {
      document.body.setAttribute('data-theme', 'dark');
    }
  }
  terapkanTema();
  document.addEventListener('DOMContentLoaded', terapkanTema);
})();
document.addEventListener('DOMContentLoaded', function () {
  const trigger = document.querySelector('.user-menu-trigger');
  if (trigger) {
    const defaultAvatar = 'data:image/svg+xml;utf8,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">' +
      '<rect width="200" height="200" fill="#09b5fe"/>' +
      '<circle cx="100" cy="78" r="38" fill="#ffffff"/>' +
      '<path d="M25 200c0-42 33-72 75-72s75 30 75 72z" fill="#ffffff"/>' +
      '</svg>'
    );
    const img = document.createElement('img');
    img.alt = 'Profil';
    img.src = localStorage.getItem('avatarGracia') || defaultAvatar;
    trigger.textContent = '';
    trigger.appendChild(img);
  }
  const header = document.querySelector('.site-header');
  if (header && !document.querySelector('.about-back-btn')) {
    const back = document.createElement('a');
    back.href = '../index.html';
    back.className = 'about-back-btn';
    back.title = 'Kembali';
    back.textContent = '<';
    back.addEventListener('click', function (e) {
      if (window.history.length > 1) {
        e.preventDefault();
        window.history.back();
      }
    });
    header.insertBefore(back, header.firstChild);
  }
});
document.addEventListener('DOMContentLoaded', function () {
  var aside = document.querySelector('.chat-list');
  var list = document.getElementById('chatContactList');

  if (!aside || !list) return;

  var searchRow = aside.querySelector('.chat-search-row');

  if (!searchRow) return;

  list.style.maxHeight = 'calc(100% - 100px)';
  list.style.overflowY = 'auto';

  searchRow.style.position = 'absolute';
  searchRow.style.left = '0';
  searchRow.style.right = '0';
  searchRow.style.bottom = '0';
  searchRow.style.backgroundColor = '#fafafa';
  searchRow.style.zIndex = '20';
  searchRow.style.borderTop = '1px solid #e0e0e0';

  aside.style.position = 'relative';

  var marquee = searchRow.querySelector('.chat-marquee');

  if (marquee) {
    marquee.style.flex = '1';
    marquee.style.minWidth = '0';
  }

  var observer = new MutationObserver(function () {
    list.style.maxHeight = 'calc(100% - 100px)';
    list.style.overflowY = 'auto';

    searchRow.style.position = 'absolute';
    searchRow.style.left = '0';
    searchRow.style.right = '0';
    searchRow.style.bottom = '0';
    searchRow.style.zIndex = '20';
  });

  observer.observe(list, {
    childList: true
  });
});

document.addEventListener('DOMContentLoaded', function () {
  var aside = document.querySelector('.chat-list');
  var list = document.getElementById('chatContactList');

  if (!aside || !list) return;

  aside.style.position = 'relative';
  aside.style.height = '100%';
  aside.style.overflow = 'hidden';

  list.style.height = 'calc(100% - 70px)';
  list.style.maxHeight = 'calc(100% - 70px)';
  list.style.overflowY = 'auto';
  list.style.overflowX = 'hidden';
  list.style.paddingBottom = '60px';
  list.style.boxSizing = 'border-box';
});
document.addEventListener('click', function (e) {
  var tombol = e.target.closest('.back-btn');

  if (!tombol) return;

  e.preventDefault();
  e.stopImmediatePropagation();

  window.location.href = '../index.html';
}, true);
document.addEventListener('click', function (e) {
  var tombolAbout = e.target.closest('.about-back-btn');

  if (!tombolAbout) return;

  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();

  window.location.href = '../index.html';
}, true);
document.addEventListener('DOMContentLoaded', function () {
  var tombol = document.querySelector('.about-back-btn');

  if (!tombol) return;

  var tombolBaru = tombol.cloneNode(true);

  tombolBaru.removeAttribute('onclick');
  tombolBaru.href = '../index.html';

  tombol.parentNode.replaceChild(tombolBaru, tombol);

  tombolBaru.addEventListener('click', function (e) {
    e.preventDefault();
    window.location.href = '../index.html';
  });
});

(function () {
  const ref = document.referrer;
  const putaran = ['about.html', 'chat.html', 'search-user.html', 'login.html', 'signin.html'];
  const dalam = !!ref && ref.indexOf(window.location.origin) === 0;
  const dariPutaran = dalam && putaran.some(function (p) { return ref.indexOf(p) !== -1; });
  const beranda = window.location.pathname.indexOf('/pages/') !== -1 ? '../index.html' : 'index.html';

  document.addEventListener('click', function (e) {
    const el = e.target.closest('a, button');
    if (!el) return;
    const tombolKembali = el.matches('.back-btn, .about-back-btn, [title="Kembali"], [aria-label="Kembali"]') ||
      el.textContent.trim() === '<';
    if (!tombolKembali) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    window.location.href = dalam && !dariPutaran ? ref : beranda;
  }, true);
})();
(function () {
  function applyAboutTheme() {
    var dark = localStorage.getItem('theme') === 'dark';

    if (!dark) {
      document.body.removeAttribute('data-theme');
      return;
    }

    document.body.setAttribute('data-theme', 'dark');

    var style = document.getElementById('aboutDarkModeForce');

    if (!style) {
      style = document.createElement('style');
      style.id = 'aboutDarkModeForce';
      document.head.appendChild(style);
    }

    style.textContent = `
      body[data-theme="dark"] {
        background: #000 !important;
        color: #09b5fe !important;
      }

      body[data-theme="dark"] .site-header {
        background: #000 !important;
        color: #09b5fe !important;
      }

      body[data-theme="dark"] main {
        background: transparent !important;
        color: #09b5fe !important;
      }

      body[data-theme="dark"] main * {
        color: #09b5fe !important;
      }

      body[data-theme="dark"] main > div,
      body[data-theme="dark"] main > section,
      body[data-theme="dark"] main article,
      body[data-theme="dark"] main .card,
      body[data-theme="dark"] main .about-card {
        background: #000 !important;
        border-color: rgba(9, 181, 254, 0.35) !important;
        box-shadow: 0 0 15px rgba(9, 181, 254, 0.12) !important;
      }

      body[data-theme="dark"] .about-back-btn {
        background: #09b5fe !important;
        color: #fff !important;
      }

      body[data-theme="dark"] .user-menu-trigger {
        background: #000 !important;
      }
    `;
  }

  applyAboutTheme();

  window.addEventListener('storage', function (e) {
    if (e.key === 'theme') {
      applyAboutTheme();
    }
  });
})();