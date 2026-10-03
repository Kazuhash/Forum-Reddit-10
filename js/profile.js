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
    '<rect width="200" height="200" fill="#ff4500"/>' +
    '<circle cx="100" cy="78" r="38" fill="#ffffff"/>' +
    '<path d="M25 200c0-42 33-72 75-72s75 30 75 72z" fill="#ffffff"/>' +
    '</svg>'
  );
  if (!localStorage.getItem('avatarGracia')) {
    if (avatar.complete && avatar.naturalWidth === 0) avatar.src = defaultAvatar;
    avatar.addEventListener('error', function () { avatar.src = defaultAvatar; });
  }
});