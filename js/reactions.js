(function () {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
  }

  const type = document.body.dataset.type;
  const post = new URLSearchParams(window.location.search).get('post') || '';
  const data = JSON.parse(localStorage.getItem('postReactions') || '{}');
  const users = (data[post] && data[post][type]) || [];

  const me = localStorage.getItem('username') || 'Gracia';
  const myAvatar = localStorage.getItem('avatarGracia');
  const defaultAvatar = '../assets/images/avatars/default.png';

  document.getElementById('postTitle').textContent = post;

  const list = document.getElementById('userList');
  if (users.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'user-empty';
    empty.textContent = 'Belum ada user.';
    list.appendChild(empty);
    return;
  }

  users.forEach(function (name) {
    const item = document.createElement('div');
    item.className = 'user-item';

    const img = document.createElement('img');
    img.className = 'user-avatar';
    img.alt = name;
    img.src = (name === me && myAvatar) ? myAvatar : defaultAvatar;

    const span = document.createElement('span');
    span.textContent = (name === me) ? 'anda' : name;

    item.appendChild(img);
    item.appendChild(span);
    list.appendChild(item);
  });
})();

document.addEventListener('error', function (e) {
  const img = e.target;
  if (!img.classList || !img.classList.contains('user-avatar')) return;
  img.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">' +
    '<rect width="200" height="200" fill="#09b5fe"/>' +
    '<circle cx="100" cy="78" r="38" fill="#ffffff"/>' +
    '<path d="M25 200c0-42 33-72 75-72s75 30 75 72z" fill="#ffffff"/>' +
    '</svg>'
  );
}, true);

document.addEventListener('error', function (e) {
  const img = e.target;
  if (!img.classList || !img.classList.contains('user-avatar')) return;
  img.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">' +
    '<rect width="200" height="200" fill="#09b5fe"/>' +
    '<circle cx="100" cy="78" r="38" fill="#ffffff"/>' +
    '<path d="M25 200c0-42 33-72 75-72s75 30 75 72z" fill="#ffffff"/>' +
    '</svg>'
  );
}, true);