document.addEventListener('DOMContentLoaded', function () {
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatMessages');
  const contactItems = document.querySelectorAll('#chatContactList .chat-contact');

  const chatHistory = {
    'Marchella Yonansyah': [
      { type: 'received', text: 'Hai, gimana progress halamannya?' },
      { type: 'sent', text: 'Lagi aku kerjain, bentar lagi selesai!' }
    ],
    'Jericho Stive Angdev': [],
    'Jhosua Eben Haezer': [],
    'Brendon Wesley': []
  };

  let activeContact = 'Marchella Yonansyah';

  function toggleUserMenu() {
    document.getElementById('userMenuDropdown').classList.toggle('show');
  }

  function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function addMessageToDOM(type, text) {
    const div = document.createElement('div');
    div.className = 'message ' + type;
    div.textContent = text;
    chatMessages.appendChild(div);
  }

  function renderMessages() {
    chatMessages.innerHTML = '';
    (chatHistory[activeContact] || []).forEach(function (msg) {
      addMessageToDOM(msg.type, msg.text);
    });
    scrollToBottom();
  }

  contactItems.forEach(function (item) {
    item.addEventListener('click', function () {
      contactItems.forEach(function (c) { c.classList.remove('active'); });
      item.classList.add('active');
      activeContact = item.textContent.trim();
      if (!chatHistory[activeContact]) chatHistory[activeContact] = [];
      renderMessages();
    });
  });

  chatForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (text === '') return;

    chatHistory[activeContact].push({ type: 'sent', text: text });
    addMessageToDOM('sent', text);
    chatInput.value = '';
    chatInput.focus();
    scrollToBottom();
  });

  renderMessages();
});

if (localStorage.getItem('theme') === 'dark') {
  document.body.setAttribute('data-theme', 'dark');
}

document.addEventListener('DOMContentLoaded', function () {
  const heading = Array.from(document.querySelectorAll('h1, h2, h3, h4, div, span, p')).find(function (el) {
    return el.children.length === 0 && el.textContent.trim() === 'Percakapan';
  });

  if (heading) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = '🔍';
    btn.title = 'Cari user';
    btn.style.cssText = 'border:none;background:##09b5fe;color:#fff;border-radius:50%;width:30px;height:30px;cursor:pointer;';
    btn.addEventListener('click', function () { window.location.href = 'search-user.html'; });
    heading.style.display = 'flex';
    heading.style.justifyContent = 'space-between';
    heading.style.alignItems = 'center';
    heading.appendChild(btn);
  }

  const wanted = new URLSearchParams(window.location.search).get('user');
  const target = JSON.parse(localStorage.getItem('chatTarget') || 'null');
  if (!wanted || !target || target.id !== wanted) return;

  const item = Array.from(document.querySelectorAll('li, div, a, button, span')).find(function (el) {
    return el.children.length === 0 && el.textContent.trim() === target.username;
  });
  if (item) item.click();
});

document.addEventListener('DOMContentLoaded', function () {
  const name = localStorage.getItem('username') || 'Gracia';
  const saved = localStorage.getItem('avatarGracia');

  const el = Array.from(document.querySelectorAll('a, button, div, span')).find(function (x) {
    return x.children.length === 0 && x.textContent.trim() === name;
  });
  if (!el) return;

  const defaultAvatar = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">' +
    '<rect width="200" height="200" fill="#09b5fe"/>' +
    '<circle cx="100" cy="78" r="38" fill="#ffffff"/>' +
    '<path d="M25 200c0-42 33-72 75-72s75 30 75 72z" fill="#ffffff"/>' +
    '</svg>'
  );

  const img = document.createElement('img');
  img.src = saved || defaultAvatar;
  img.alt = name;
  img.style.cssText = 'width:40px;height:40px;border-radius:50%;object-fit:cover;border:2px solid #09b5fe;display:block;';
  img.addEventListener('error', function () { img.src = defaultAvatar; });

  el.textContent = '';
  el.title = name;
  el.style.cssText = 'padding:0;background:transparent;border:none;border-radius:50%;width:44px;height:44px;display:flex;align-items:center;justify-content:center;cursor:pointer;';
  el.appendChild(img);
});

document.addEventListener('DOMContentLoaded', function () {
  const ref = document.referrer;
  const halamanChat = ['chat.html', 'search-user.html'];
  const dariLuarChat = ref
    && ref.indexOf(window.location.origin) === 0
    && !halamanChat.some(function (p) { return ref.indexOf(p) !== -1; });

  if (dariLuarChat) {
    sessionStorage.setItem('chatOrigin', ref);
  }

  const logo = Array.from(document.querySelectorAll('a, h1, h2, div, span')).find(function (x) {
    return x.children.length === 0 && x.textContent.trim() === 'Forumly';
  });
  if (!logo || !logo.parentNode) return;

  const back = document.createElement('button');
  back.type = 'button';
  back.textContent = '<';
  back.title = 'Kembali';
  back.setAttribute('aria-label', 'Kembali');
  back.style.cssText = 'width:36px;height:36px;border:none;border-radius:50%;background:#09b5fe;color:#fff;font-size:1.3rem;font-weight:bold;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;';
  back.addEventListener('click', function () {
    const origin = sessionStorage.getItem('chatOrigin');
    window.location.href = origin || '../index.html';
  });

  const wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;align-items:center;gap:12px;';
  logo.parentNode.insertBefore(wrap, logo);
  wrap.appendChild(back);
  wrap.appendChild(logo);
});

document.addEventListener('DOMContentLoaded', function () {
  var trigger = document.querySelector('.user-menu-trigger');
  if (trigger) {
    var fallback = 'data:image/svg+xml;utf8,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">' +
      '<rect width="200" height="200" fill="#09b5fe"/>' +
      '<circle cx="100" cy="78" r="38" fill="#ffffff"/>' +
      '<path d="M25 200c0-42 33-72 75-72s75 30 75 72z" fill="#ffffff"/>' +
      '</svg>'
    );
    var img = document.createElement('img');
    img.alt = 'Profil';
    img.src = localStorage.getItem('avatarGracia') || fallback;
    trigger.textContent = '';
    trigger.appendChild(img);
  }

  if (localStorage.getItem('freshAccount') !== '1') return;

  var box = document.getElementById('chatMessages');
  if (!box) return;

  var samples = [
    'Hai, gimana progress halamannya?',
    'Lagi aku kerjain, bentar lagi selesai!'
  ];

  function clearSamples() {
    box.querySelectorAll('.message').forEach(function (m) {
      if (samples.indexOf(m.textContent.trim()) !== -1) m.remove();
    });
  }

  clearSamples();
  new MutationObserver(clearSamples).observe(box, { childList: true });
});

document.addEventListener('DOMContentLoaded', function () {
  var windowEl = document.querySelector('.chat-window');
  var list = document.getElementById('chatContactList');
  if (!windowEl || !list) return;

  var header = windowEl.querySelector('.chat-header');
  if (!header) {
    header = document.createElement('div');
    header.className = 'chat-header';
    header.innerHTML = '<span class="chat-header-avatar"></span><span class="chat-header-name"></span>';
    windowEl.insertBefore(header, windowEl.firstChild);
  }

  var avatar = header.querySelector('.chat-header-avatar');
  var nameEl = header.querySelector('.chat-header-name');

  function setName(name) {
    name = (name || '').trim();
    if (!name) return;
    nameEl.textContent = name;
    avatar.textContent = name.charAt(0).toUpperCase();
  }

  function fromActive() {
    var active = list.querySelector('.chat-contact.active, li.active');
    if (active) setName(active.textContent);
  }

  document.addEventListener('click', function (e) {
    var item = e.target.closest('#chatContactList li');
    if (!item) return;

    document.querySelectorAll('#chatContactList li').forEach(function (li) {
      li.classList.remove('active');
    });
    item.classList.add('active');
    setName(item.textContent);
  });

  new MutationObserver(fromActive).observe(list, {
    attributes: true,
    subtree: true,
    attributeFilter: ['class']
  });

  fromActive();
});
document.addEventListener('DOMContentLoaded', function () {
  var list = document.getElementById('chatContactList');
  var box = document.getElementById('chatMessages');
  var form = document.getElementById('chatForm');
  var aside = document.querySelector('.chat-list');
  if (!list || !box || !form || !aside) return;

  var defaults = ['Marchella Yonansyah', 'Jericho Stive Angdev', 'Jhosua Eben Haezer', 'Brendon Wesley'];
  var sampleChat = [
    { type: 'received', text: 'Hai, gimana progress halamannya?' },
    { type: 'sent', text: 'Lagi aku kerjain, bentar lagi selesai!' }
  ];
  var fresh = localStorage.getItem('freshAccount') === '1';

  function read(key, fallback) {
    try {
      var value = JSON.parse(localStorage.getItem(key));
      return value === null || value === undefined ? fallback : value;
    } catch (err) {
      return fallback;
    }
  }

  function activeName() {
    var a = list.querySelector('li.active');
    return a ? a.textContent.trim() : '';
  }

  var previous = activeName();
  var contacts = read('chatContacts', null);

  if (!contacts) {
    contacts = fresh ? [] : defaults.slice();
    localStorage.setItem('chatContacts', JSON.stringify(contacts));
  }

  var empty = document.createElement('p');
  empty.textContent = 'Belum ada percakapan. Klik ikon pencarian untuk mencari user.';
  empty.style.cssText = 'padding:16px;margin:0;color:#777777;font-size:0.9rem;line-height:1.5;';
  list.after(empty);

  function messagesFor(name) {
    var saved = read('chatData', {})[name];
    if (saved) return saved;
    if (!fresh && name === defaults[0]) return sampleChat;
    return [];
  }

  function paint(name) {
    box.innerHTML = '';
    if (!name) return;
    messagesFor(name).forEach(function (m) {
      var div = document.createElement('div');
      div.className = 'message ' + m.type;
      div.textContent = m.text;
      box.appendChild(div);
    });
    box.scrollTop = box.scrollHeight;
  }

  function persistMessages() {
    var name = activeName();
    if (!name) return;
    var current = read('chatData', {});
    current[name] = Array.from(box.querySelectorAll('.message')).map(function (m) {
      return { type: m.classList.contains('sent') ? 'sent' : 'received', text: m.textContent };
    });
    localStorage.setItem('chatData', JSON.stringify(current));
  }

  function select(name) {
    list.querySelectorAll('li').forEach(function (li) {
      li.classList.toggle('active', li.textContent.trim() === name);
    });
    paint(name);
    var headerName = document.querySelector('.chat-header-name');
    var headerAvatar = document.querySelector('.chat-header-avatar');
    if (headerName) headerName.textContent = name;
    if (headerAvatar) headerAvatar.textContent = name ? name.charAt(0).toUpperCase() : '';
  }

  function buildList() {
    list.innerHTML = '';
    contacts.forEach(function (name) {
      var li = document.createElement('li');
      li.className = 'chat-contact';
      li.textContent = name;
      list.appendChild(li);
    });
    var hasContacts = contacts.length > 0;
    empty.style.display = hasContacts ? 'none' : 'block';
    form.style.display = hasContacts ? '' : 'none';
    var header = document.querySelector('.chat-header');
    if (header) header.style.display = hasContacts ? '' : 'none';
  }

  var wanted = new URLSearchParams(window.location.search).get('user');
  var target = read('chatTarget', null);
  var targetName = '';

  if (wanted && target && String(target.id) === wanted && target.username) {
    targetName = target.username;
    if (contacts.indexOf(targetName) === -1) {
      contacts.push(targetName);
      localStorage.setItem('chatContacts', JSON.stringify(contacts));
    }
  }

  buildList();
  select(targetName || (contacts.indexOf(previous) !== -1 ? previous : contacts[0] || ''));

  list.addEventListener('click', function (e) {
    var li = e.target.closest('li');
    if (li) select(li.textContent.trim());
  });

  form.addEventListener('submit', function () {
    setTimeout(persistMessages, 0);
  });
});
document.addEventListener('DOMContentLoaded', function () {
  var btn = document.querySelector('.chat-list h2 button');
  if (!btn) return;

  btn.style.cssText = '';
  btn.className = 'chat-marquee';
  btn.title = 'Cari user';
  btn.setAttribute('aria-label', 'Cari user');
  btn.textContent = '';

  var text = document.createElement('span');
  text.textContent = 'Mulai percakapan mu dengan orang baru';
  btn.appendChild(text);

  var list = document.getElementById('chatContactList');
  var note = list ? list.nextElementSibling : null;
  if (note && note.tagName === 'P') {
    note.textContent = 'Belum ada percakapan. Klik tulisan berjalan di atas untuk mencari user.';
  }
});
document.addEventListener('DOMContentLoaded', function () {
  var title = document.querySelector('.chat-list h2');
  if (!title || title.querySelector('.chat-search-icon')) return;

  var icon = document.createElement('button');
  icon.type = 'button';
  icon.className = 'chat-search-icon';
  icon.textContent = '🔍';
  icon.title = 'Cari user';
  icon.setAttribute('aria-label', 'Cari user');
  icon.addEventListener('click', function () {
    window.location.href = 'search-user.html';
  });

  title.appendChild(icon);
});
document.addEventListener('DOMContentLoaded', function () {
  var aside = document.querySelector('.chat-list');
  var list = document.getElementById('chatContactList');
  if (!aside || !list || aside.querySelector('.chat-search-row')) return;

  var marquee = aside.querySelector('.chat-marquee');
  var icon = aside.querySelector('.chat-search-icon');
  if (!marquee || !icon) return;

  var row = document.createElement('div');
  row.className = 'chat-search-row';
  row.appendChild(icon);
  row.appendChild(marquee);

  var note = list.nextElementSibling;
  if (note && note.tagName === 'P') {
    note.textContent = 'Belum ada percakapan. Klik ikon atau tulisan berjalan di bawah untuk mencari user.';
    note.after(row);
  } else {
    list.after(row);
  }
});
document.addEventListener('DOMContentLoaded', function () {
  var windowEl = document.querySelector('.chat-window');
  var aside = document.querySelector('.chat-list');
  if (!windowEl || !aside || windowEl.querySelector('.chat-empty-note')) return;

  var note = aside.querySelector('p');
  if (!note) return;

  note.className = 'chat-empty-note';
  note.textContent = 'Belum ada percakapan. Klik ikon atau tulisan berjalan di kolom kiri untuk mencari user.';
  windowEl.appendChild(note);
});
document.addEventListener('DOMContentLoaded', function () {
  var list = document.getElementById('chatContactList');

  if (!list) return;

  function tambahUserKePercakapan() {
    var target = null;

    try {
      target = JSON.parse(localStorage.getItem('chatTarget') || 'null');
    } catch (e) {
      target = null;
    }
    if (!target || !target.username) return;
    var namaUser = target.username.trim();
    if (!namaUser) return;
    var sudahAda = Array.from(list.querySelectorAll('.chat-contact'))
      .some(function (item) {
        return item.textContent.trim() === namaUser;
      });

    if (sudahAda) return;

    var itemBaru = document.createElement('li');

    itemBaru.className = 'chat-contact';

    itemBaru.textContent = namaUser;

    list.appendChild(itemBaru);

    itemBaru.addEventListener('click', function () {
      list.querySelectorAll('.chat-contact').forEach(function (item) {
        item.classList.remove('active');
      });

      itemBaru.classList.add('active');

      var headerName = document.querySelector('.chat-header-name');
      var headerAvatar = document.querySelector('.chat-header-avatar');

      if (headerName) {
        headerName.textContent = namaUser;
      }

      if (headerAvatar) {
        headerAvatar.textContent = namaUser.charAt(0).toUpperCase();
      }
    });
  }

  tambahUserKePercakapan();
});
document.addEventListener('DOMContentLoaded', function () {
  var list = document.getElementById('chatContactList');

  if (!list) return;

  var target = null;

  try {
    target = JSON.parse(localStorage.getItem('chatTarget') || 'null');
  } catch (e) {
    target = null;
  }

  if (!target || !target.username) return;

  var namaUser = String(target.username).trim();

  if (!namaUser) return;

  var sudahAda = Array.from(list.querySelectorAll('.chat-contact'))
    .some(function (item) {
      return item.textContent.trim() === namaUser;
    });

  if (!sudahAda) {
    var itemBaru = document.createElement('li');

    itemBaru.className = 'chat-contact';
    itemBaru.textContent = namaUser;

    list.appendChild(itemBaru);

    itemBaru.addEventListener('click', function () {
      list.querySelectorAll('.chat-contact').forEach(function (item) {
        item.classList.remove('active');
      });

      itemBaru.classList.add('active');

      var headerName = document.querySelector('.chat-header-name');
      var headerAvatar = document.querySelector('.chat-header-avatar');

      if (headerName) {
        headerName.textContent = namaUser;
      }

      if (headerAvatar) {
        headerAvatar.textContent = namaUser.charAt(0).toUpperCase();
      }
    });
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
  searchRow.style.border-top ; '1px solid #e0e0e0';

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
document.addEventListener('DOMContentLoaded', function () {
  var list = document.getElementById('chatContactList');

  if (!list) return;

  function readContacts() {
    try {
      return JSON.parse(localStorage.getItem('chatContacts') || '[]');
    } catch (e) {
      return [];
    }
  }

  function saveContacts(contacts) {
    localStorage.setItem('chatContacts', JSON.stringify(contacts));
  }

  function readChatData() {
    try {
      return JSON.parse(localStorage.getItem('chatData') || '{}');
    } catch (e) {
      return {};
    }
  }

  function enhanceContact(li) {
    if (!li || li.dataset.enhanced === '1') return;

    var name = li.textContent.trim();

    if (!name) return;

    li.dataset.enhanced = '1';
    li.dataset.contactName = name;

    li.textContent = '';

    var nameSpan = document.createElement('span');
    nameSpan.className = 'chat-contact-name';
    nameSpan.textContent = name;

    var actions = document.createElement('span');
    actions.className = 'chat-contact-actions';

    var star = document.createElement('button');
    star.type = 'button';
    star.className = 'chat-star-btn';
    star.textContent = '☆';
    star.title = 'Opsi';

    var deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'chat-action-btn chat-action-delete';
    deleteBtn.textContent = '🗑️';
    deleteBtn.title = 'Hapus percakapan';

    var loveBtn = document.createElement('button');
    loveBtn.type = 'button';
    loveBtn.className = 'chat-action-btn chat-action-love';
    loveBtn.textContent = '❤️';
    loveBtn.title = 'Love';

    var moneyBtn = document.createElement('button');
    moneyBtn.type = 'button';
    moneyBtn.className = 'chat-action-btn chat-action-money';
    moneyBtn.textContent = '💲';
    moneyBtn.title = 'Dollar';

    actions.appendChild(star);
    actions.appendChild(deleteBtn);
    actions.appendChild(loveBtn);
    actions.appendChild(moneyBtn);

    li.appendChild(nameSpan);
    li.appendChild(actions);

    star.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      document.querySelectorAll('.chat-contact-actions.open').forEach(function (other) {
        if (other !== actions) other.classList.remove('open');
      });

      actions.classList.toggle('open');
      star.textContent = actions.classList.contains('open') ? '★' : '☆';
    });

    deleteBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      var contactName = li.dataset.contactName;
      var contacts = readContacts();

      contacts = contacts.filter(function (item) {
        return item !== contactName;
      });

      saveContacts(contacts);

      var chatData = readChatData();
      delete chatData[contactName];
      localStorage.setItem('chatData', JSON.stringify(chatData));

      var wasActive = li.classList.contains('active');

      li.remove();

      if (wasActive) {
        var remaining = list.querySelectorAll('.chat-contact');

        if (remaining.length > 0) {
          remaining[0].click();
        } else {
          var headerName = document.querySelector('.chat-header-name');
          var headerAvatar = document.querySelector('.chat-header-avatar');
          var messages = document.getElementById('chatMessages');

          if (headerName) headerName.textContent = '';
          if (headerAvatar) headerAvatar.textContent = '';
          if (messages) messages.innerHTML = '';
        }
      }
    });

    loveBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      loveBtn.textContent = loveBtn.textContent === '❤️' ? '💗' : '❤️';
    });

    moneyBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      moneyBtn.textContent = moneyBtn.textContent === '💲' ? '💰' : '💲';
    });
  }

  function enhanceAll() {
    list.querySelectorAll('li').forEach(function (li) {
      enhanceContact(li);
    });
  }

  enhanceAll();

  new MutationObserver(function () {
    enhanceAll();
  }).observe(list, {
    childList: true
  });

  document.addEventListener('click', function (e) {
    if (e.target.closest('.chat-contact-actions')) return;
    if (e.target.closest('.chat-star-btn')) return;

    document.querySelectorAll('.chat-contact-actions.open').forEach(function (actions) {
      actions.classList.remove('open');

      var star = actions.querySelector('.chat-star-btn');

      if (star) star.textContent = '☆';
    });
  });
});
