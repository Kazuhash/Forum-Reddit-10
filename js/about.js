function toggleUserMenu() {
  document.getElementById('userMenuDropdown').classList.toggle('show');
}

if (localStorage.getItem('theme') === 'dark') {
  document.body.setAttribute('data-theme', 'dark');
}
document.addEventListener('DOMContentLoaded', function () {
  // --- Tombol "Gracia" diganti foto profil (foto yang diambil/dipilih di halaman Profile) ---
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
    back.href = '../index.html'; // cadangan kalau tidak ada halaman sebelumnya
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