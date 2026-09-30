// profile.js - khusus halaman profile.html
document.addEventListener('DOMContentLoaded', function () {
  const postsSection = document.querySelector('.profile-posts');
  const avatar = document.querySelector('.profile-avatar');

  // Data post sementara (nanti bisa diganti dari backend)
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

  // Kalau gambar avatar tidak ketemu, pakai placeholder
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
    // hapus card contoh dari HTML, lalu tampilkan dari array
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