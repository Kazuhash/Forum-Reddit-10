// chat.js - khusus halaman chat.html
document.addEventListener('DOMContentLoaded', function () {
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatMessages');
  const contactItems = document.querySelectorAll('#chatContactList .chat-contact');

  const chatHistory = {
    'Marchella Yonansya': [
      { type: 'received', text: 'Hai, gimana progress halamannya?' },
      { type: 'sent', text: 'Lagi aku kerjain, bentar lagi selesai!' }
    ],
    'Jericho Stive Angdev': [],
    'Jhosua Ebenezer': [],
    'Brendon Wesley': []
  };

  let activeContact = 'Marchella Yonansya';

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
    return x.children.length === 0 && x.textContent.trim() === 'Forum-Reddit-10';
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