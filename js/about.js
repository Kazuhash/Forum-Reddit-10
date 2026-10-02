function toggleUserMenu() {
  document.getElementById('userMenuDropdown').classList.toggle('show');
}

if (localStorage.getItem('theme') === 'dark') {
  document.body.setAttribute('data-theme', 'dark');
}