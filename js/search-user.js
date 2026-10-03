(function () {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
  }

  const users = [
    { id: 'u1', username: 'Marchella Yonansyah', bio: 'Teknik Informatika UNTAR', avatar: '' },
    { id: 'u2', username: 'Jericho Stive Angdev', bio: 'Teknik Informatika UNTAR', avatar: '' },
    { id: 'u3', username: 'Jhosua Eben Haezer', bio: 'Teknik Informatika UNTAR', avatar: '' },
    { id: 'u4', username: 'Brendon Wesley', bio: 'Teknik Informatika UNTAR', avatar: '' },
    { id: 'u5', username: 'Brendon Wesley', bio: 'Sistem Informasi UNTAR', avatar: '' }
  ];

  const colors = ['#09b5fe', '#0aa5f0', '#2e9e5b', '#8e44ad', '#e67e22', '#c0392b'];

  function avatarFor(user) {
    if (user.avatar) return user.avatar;
    let h = 0;
    for (let i = 0; i < user.id.length; i++) h += user.id.charCodeAt(i);
    const initials = user.username.split(/\s+/).slice(0, 2).map(function (w) { return w[0]; }).join('').toUpperCase();
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">' +
      '<rect width="100" height="100" fill="' + colors[h % colors.length] + '"/>' +
      '<text x="50" y="64" font-size="40" text-anchor="middle" fill="#ffffff" font-family="Arial">' + initials + '</text>' +
      '</svg>'
    );
  }

  const input = document.getElementById('searchInput');
  const box = document.getElementById('searchResults');

  function message(text) {
    box.textContent = '';
    const p = document.createElement('p');
    p.className = 'search-hint';
    p.textContent = text;
    box.appendChild(p);
  }

  function openChat(user) {
    localStorage.setItem('chatTarget', JSON.stringify({ id: user.id, username: user.username }));
    window.location.href = 'chat.html?user=' + encodeURIComponent(user.id);
  }

  function render() {
    const q = input.value.trim().toLowerCase();
    if (!q) {
      message('Ketik username untuk mencari.');
      return;
    }
    const found = users.filter(function (u) {
      return u.username.toLowerCase().indexOf(q) !== -1;
    });
    if (found.length === 0) {
      message('User tidak ditemukan.');
      return;
    }
    box.textContent = '';
    found.forEach(function (u) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'result';

      const img = document.createElement('img');
      img.src = avatarFor(u);
      img.alt = u.username;

      const info = document.createElement('div');
      const name = document.createElement('div');
      name.className = 'name';
      name.textContent = u.username;
      const bio = document.createElement('div');
      bio.className = 'bio';
      bio.textContent = u.bio;
      info.appendChild(name);
      info.appendChild(bio);

      btn.appendChild(img);
      btn.appendChild(info);
      btn.addEventListener('click', function () { openChat(u); });
      box.appendChild(btn);
    });
  }

  input.addEventListener('input', render);
  render();
})();