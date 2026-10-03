function toggleUserMenu() {
  document.getElementById('userMenuDropdown').classList.toggle('show');
}
document.addEventListener('DOMContentLoaded', function () {
  const postsSection = document.querySelector('.profile-posts');
  const avatar = document.querySelector('.profile-avatar');
  const posts = [
    {
      title: 'Judul Post Contoh',
      content: 'Ini contoh preview isi post...'
    },
    {
      title: 'Belajar HTML, CSS, dan JavaScript',
      content: 'Lagi ngerjain project forum bareng teman-teman kelompok.'
    },
    {
      title: 'Tips Ngoding di VS Code',
      content: 'Pakai ekstensi Live Server biar nggak perlu refresh manual.'
    }
  ];
  if (avatar) {
    avatar.addEventListener('error', function () {
      avatar.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">' +
        '<rect width="100" height="100" fill="#ccc"/>' +
        '<text x="50" y="62" font-size="40" text-anchor="middle" fill="#fff">G</text>' +
        '</svg>'
      );
    });
  }
  function renderPosts() {
    postsSection.querySelectorAll('.post-card').forEach(function (card) {
      card.remove();
    });
    posts.forEach(function (post) {
      const card = document.createElement('div');
      card.className = 'post-card';
      const title = document.createElement('h3');
      title.textContent = post.title;
      const content = document.createElement('p');
      content.textContent = post.content;
      card.appendChild(title);
      card.appendChild(content);
      postsSection.appendChild(card);
    });
  }
  renderPosts();
});
document.addEventListener('DOMContentLoaded', function () {
  const avatar = document.querySelector('.profile-avatar');
  const uploadBtn = document.getElementById('uploadBtn');
  const cameraBtn = document.getElementById('cameraBtn');
  const fileInput = document.getElementById('avatarInput');
  const modal = document.getElementById('cameraModal');
  const video = document.getElementById('cameraVideo');
  const snapBtn = document.getElementById('snapBtn');
  const closeBtn = document.getElementById('closeCameraBtn');
  let stream = null;
  const saved = localStorage.getItem('avatarGracia');
  if (saved) avatar.src = saved;
  function toSquareDataURL(source, w, h) {
    const size = Math.min(w, h);
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    canvas.getContext('2d').drawImage(
      source, (w - size) / 2, (h - size) / 2, size, size, 0, 0, 300, 300
    );
    return canvas.toDataURL('image/jpeg', 0.85);
  }
  function setAvatar(dataUrl) {
    avatar.src = dataUrl;
    localStorage.setItem('avatarGracia', dataUrl);
  }
  uploadBtn.addEventListener('click', function () { fileInput.click(); });
  fileInput.addEventListener('change', function () {
    const file = fileInput.files[0];
    if (!file) return;
    const img = new Image();
    img.onload = function () {
      setAvatar(toSquareDataURL(img, img.width, img.height));
    };
    img.src = URL.createObjectURL(file);
  });
  function closeCamera() {
    modal.classList.remove('show');
    if (stream) {
      stream.getTracks().forEach(function (t) { t.stop(); });
      stream = null;
    }
  }
  cameraBtn.addEventListener('click', async function () {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      video.srcObject = stream;
      modal.classList.add('show');
    } catch (err) {
      alert('Kamera tidak bisa dibuka. Pastikan izin kamera sudah diizinkan.');
    }
  });
  snapBtn.addEventListener('click', function () {
    setAvatar(toSquareDataURL(video, video.videoWidth, video.videoHeight));
    closeCamera();
  });
  closeBtn.addEventListener('click', closeCamera);
});
if (localStorage.getItem('theme') === 'dark') {
  document.body.setAttribute('data-theme', 'dark');
}
document.addEventListener('DOMContentLoaded', function () {
  const name = localStorage.getItem('username');
  const heading = document.querySelector('.profile-info h1');
  if (name && heading) heading.textContent = name;
});
document.addEventListener('DOMContentLoaded', function () {
  const avatar = document.querySelector('.profile-avatar');
  if (!avatar) return;
  const defaultAvatar = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">' +
    '<rect width="200" height="200" fill="#09b5fe"/>' +
    '<circle cx="100" cy="78" r="38" fill="#ffffff"/>' +
    '<path d="M25 200c0-42 33-72 75-72s75 30 75 72z" fill="#ffffff"/>' +
    '</svg>'
  );
  if (!localStorage.getItem('avatarGracia')) {
    if (avatar.complete && avatar.naturalWidth === 0) avatar.src = defaultAvatar;
    avatar.addEventListener('error', function () { avatar.src = defaultAvatar; });
  }
});
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.profile-posts .post-card').forEach(function (card) {
    if (card.querySelector('.post-actions')) return;
    let likes = 0;
    let dislikes = 0;
    let comments = 0;
    let state = null; 
    const actions = document.createElement('div');
    actions.className = 'post-actions';
    function makeBtn(cls) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'btn-action ' + cls;
      actions.appendChild(b);
      return b;
    }
    const likeBtn = makeBtn('btn-like');
    const dislikeBtn = makeBtn('btn-dislike');
    const commentBtn = makeBtn('btn-comment');
    const reportBtn = makeBtn('btn-report');
    reportBtn.textContent = 'Laporkan';
    function update() {
      likeBtn.textContent = '♥ Suka (' + likes + ')';
      dislikeBtn.textContent = 'Tidak Suka (' + dislikes + ')';
      commentBtn.textContent = 'Komentar (' + comments + ')';
      likeBtn.classList.toggle('active', state === 'like');
      dislikeBtn.classList.toggle('active', state === 'dislike');
    }
    likeBtn.addEventListener('click', function () {
      if (state === 'like') {
        likes--;
        state = null;
      } else {
        if (state === 'dislike') dislikes--;
        likes++;
        state = 'like';
      }
      update();
    });
    dislikeBtn.addEventListener('click', function () {
      if (state === 'dislike') {
        dislikes--;
        state = null;
      } else {
        if (state === 'like') likes--;
        dislikes++;
        state = 'dislike';
      }
      update();
    });
    commentBtn.addEventListener('click', function () {
      alert('Buka komentar');
    });
    reportBtn.addEventListener('click', function () {
      if (confirm('Laporkan postingan ini?')) alert('Postingan dilaporkan');
    });
    update();
    card.appendChild(actions);
  });
});
document.addEventListener('DOMContentLoaded', function () {
  const section = document.querySelector('.profile-posts');
  const saved = JSON.parse(localStorage.getItem('userPosts') || '[]');
  saved.forEach(function (p) {
    const card = document.createElement('div');
    card.className = 'post-card';
    const h3 = document.createElement('h3');
    h3.textContent = p.title;
    const para = document.createElement('p');
    para.textContent = p.content;
    const actions = document.createElement('div');
    actions.className = 'post-actions';
    let likes = 0, dislikes = 0, state = null;
    function btn(cls, text) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'btn-action ' + cls;
      b.textContent = text || '';
      actions.appendChild(b);
      return b;
    }
    const likeBtn = btn('btn-like');
    const dislikeBtn = btn('btn-dislike');
    const commentBtn = btn('btn-comment');
    const reportBtn = btn('btn-report', 'Laporkan');
    function update() {
      likeBtn.textContent = '♥ Suka (' + likes + ')';
      dislikeBtn.textContent = 'Tidak Suka (' + dislikes + ')';
      commentBtn.textContent = 'Komentar (0)';
      likeBtn.classList.toggle('active', state === 'like');
      dislikeBtn.classList.toggle('active', state === 'dislike');
    }
    likeBtn.addEventListener('click', function () {
      if (state === 'like') { likes--; state = null; }
      else { if (state === 'dislike') dislikes--; likes++; state = 'like'; }
      update();
    });
    dislikeBtn.addEventListener('click', function () {
      if (state === 'dislike') { dislikes--; state = null; }
      else { if (state === 'like') likes--; dislikes++; state = 'dislike'; }
      update();
    });
    commentBtn.addEventListener('click', function () { alert('Buka komentar'); });
    reportBtn.addEventListener('click', function () {
      if (confirm('Laporkan postingan ini?')) alert('Postingan dilaporkan');
    });
    update();
    card.appendChild(h3);
    card.appendChild(para);
    card.appendChild(actions);
    section.appendChild(card);
  });
  const postStat = document.querySelector('.profile-stats span strong');
  if (postStat) postStat.textContent = section.querySelectorAll('.post-card').length;
});
document.addEventListener('DOMContentLoaded', function () {
  const joined = JSON.parse(localStorage.getItem('userCommunities') || '[]');
  const stats = document.querySelectorAll('.profile-stats span strong');
  if (stats[1]) stats[1].textContent = joined.length;
});
document.addEventListener('DOMContentLoaded', function () {
  const me = localStorage.getItem('username') || 'Gracia';
  const data = JSON.parse(localStorage.getItem('postReactions') || '{}');
  document.querySelectorAll('.profile-posts .post-card').forEach(function (card) {
    const title = card.querySelector('h3').textContent;
    const r = data[title];
    if (!r) return;
    if (r.like && r.like.indexOf(me) !== -1) {
      card.querySelector('.btn-like').click();
    } else if (r.dislike && r.dislike.indexOf(me) !== -1) {
      card.querySelector('.btn-dislike').click();
    }
  });
});
document.addEventListener('DOMContentLoaded', function () {
  const me = localStorage.getItem('username') || 'Gracia';
  document.querySelectorAll('.profile-posts .post-card').forEach(function (card) {
    const likeBtn = card.querySelector('.btn-like');
    const h3 = card.querySelector('h3');
    if (!likeBtn || !h3) return;
    const title = h3.textContent;
    let last = 0;
    let before = false;
    card.addEventListener('click', function (e) {
      if (e.target !== likeBtn) return;
      const now = Date.now();
      if (now - last < 500) {
        e.stopPropagation();
        last = 0;
        const data = JSON.parse(localStorage.getItem('postReactions') || '{}');
        data[title] = data[title] || { like: [], dislike: [], report: [] };
        const list = data[title].like;
        const i = list.indexOf(me);
        if (before && i === -1) list.push(me);
        if (!before && i !== -1) list.splice(i, 1);
        localStorage.setItem('postReactions', JSON.stringify(data));
        console.log('buka likes.html', title, list);
        window.location.href = 'likes.html?post=' + encodeURIComponent(title);
      } else {
        last = now;
        before = likeBtn.classList.contains('active');
      }
    }, true);
  });
});
document.addEventListener('DOMContentLoaded', function () {
  const KEY = 'postReactions';
  const me = localStorage.getItem('username') || 'Gracia';
  function setList(title, type, on) {
    const data = JSON.parse(localStorage.getItem(KEY) || '{}');
    data[title] = data[title] || { like: [], dislike: [], report: [] };
    const list = data[title][type];
    const i = list.indexOf(me);
    if (on && i === -1) list.push(me);
    if (!on && i !== -1) list.splice(i, 1);
    localStorage.setItem(KEY, JSON.stringify(data));
  }
  document.querySelectorAll('.profile-posts .post-card').forEach(function (card) {
    const h3 = card.querySelector('h3');
    const likeBtn = card.querySelector('.btn-like');
    const dislikeBtn = card.querySelector('.btn-dislike');
    if (!h3 || !likeBtn || !dislikeBtn) return;
    const title = h3.textContent;
    let beforeLike = false;
    let beforeDislike = false;
    function sync() {
      setList(title, 'like', likeBtn.classList.contains('active'));
      setList(title, 'dislike', dislikeBtn.classList.contains('active'));
    }
    likeBtn.addEventListener('click', sync);
    dislikeBtn.addEventListener('click', sync);
    card.addEventListener('click', function (e) {
      if (e.target !== dislikeBtn) return;
      if (e.detail < 2) {
        beforeLike = likeBtn.classList.contains('active');
        beforeDislike = dislikeBtn.classList.contains('active');
        return;
      }
      e.stopPropagation();
      setList(title, 'like', beforeLike);
      setList(title, 'dislike', beforeDislike);
      window.location.href = 'tidaksuka.html?post=' + encodeURIComponent(title);
    }, true);
  });

  console.log('tidak suka siap');
});

document.addEventListener('DOMContentLoaded', function () {
  const KEY = 'postReactions';
  const me = localStorage.getItem('username') || 'Gracia';

  function load() {
    return JSON.parse(localStorage.getItem(KEY) || '{}');
  }

  function setList(title, type, on) {
    const data = load();
    data[title] = data[title] || { like: [], dislike: [], report: [] };
    const list = data[title][type];
    const i = list.indexOf(me);
    if (on && i === -1) list.push(me);
    if (!on && i !== -1) list.splice(i, 1);
    localStorage.setItem(KEY, JSON.stringify(data));
  }

  document.querySelectorAll('.profile-posts .post-card').forEach(function (card) {
    const h3 = card.querySelector('h3');
    const oldReport = card.querySelector('.btn-report');
    if (!h3 || !oldReport) return;
    const title = h3.textContent;

    const reportBtn = oldReport.cloneNode(true);
    oldReport.parentNode.replaceChild(reportBtn, oldReport);

    function reportedNow() {
      const d = load()[title];
      return !!(d && d.report && d.report.indexOf(me) !== -1);
    }
    function countNow() {
      const d = load()[title];
      return d && d.report ? d.report.length : 0;
    }
    function render() {
      reportBtn.textContent = 'Laporkan (' + countNow() + ')';
      reportBtn.classList.toggle('active', reportedNow());
    }

    reportBtn.addEventListener('click', function () {
      setList(title, 'report', !reportedNow());
      render();
    });
    let beforeReport = false;
    card.addEventListener('click', function (e) {
      if (e.target !== reportBtn) return;
      if (e.detail < 2) {
        beforeReport = reportedNow();
        return;
      }
      e.stopPropagation();
      setList(title, 'report', beforeReport);
      window.location.href = 'laporan.html?post=' + encodeURIComponent(title);
    }, true);

    render();
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const back = document.querySelector('.back-btn');
  if (!back) return;

  const ref = document.referrer;
  const halamanProfil = ['profile.html', 'likes.html', 'tidaksuka.html', 'laporan.html'];
  const dariLuarProfil = ref
    && ref.indexOf(window.location.origin) === 0
    && !halamanProfil.some(function (p) { return ref.indexOf(p) !== -1; });

  if (dariLuarProfil) {
    sessionStorage.setItem('profileOrigin', ref);
  }
  back.addEventListener('click', function (e) {
    const origin = sessionStorage.getItem('profileOrigin');
    if (origin) {
      e.preventDefault();
      window.location.href = origin;
    }
  });
});

// ===== TAMBAHAN: tampilkan data user yang login, bukan data tetap =====
document.addEventListener('DOMContentLoaded', function () {
  function readUserObject() {
    var keys = ['currentUser', 'loggedInUser', 'user', 'userAccount', 'account'];
    for (var i = 0; i < keys.length; i++) {
      var raw = localStorage.getItem(keys[i]);
      if (!raw) continue;
      try {
        var obj = JSON.parse(raw);
        if (obj && typeof obj === 'object') return obj;
      } catch (err) {}
    }
    return null;
  }

  var obj = readUserObject();
  var name = (obj && (obj.username || obj.name || obj.firstname || obj.firstName)) ||
    localStorage.getItem('username') ||
    localStorage.getItem('name') ||
    localStorage.getItem('firstname');
  var email = (obj && obj.email) ||
    localStorage.getItem('userEmail') ||
    localStorage.getItem('email');

  var heading = document.querySelector('.profile-info h1');
  var bio = document.querySelector('.profile-bio');

  if (heading) heading.textContent = name || 'Guest';
  if (bio) bio.textContent = name ? (email || 'Anggota Forum-Reddit-10') : 'Belum login.';
});