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