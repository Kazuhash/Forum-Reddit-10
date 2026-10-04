document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.sr-nav-item');
  const panels = document.querySelectorAll('.sr-settings-panel');

  // Tab Switching Logic
  navItems.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = button.getAttribute('data-tab');

      // Update active state on tab buttons
      navItems.forEach(nav => nav.classList.remove('active'));
      button.classList.add('active');

      // Show the selected panel and hide others
      panels.forEach(panel => {
        if (panel.id === `panel-${targetTab}`) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });

  // Profile Form Handler
  const profileForm = document.getElementById('profile-form');
  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Profil berhasil disimpan!');
    });
  }

  // Account Form Handler
  const accountForm = document.getElementById('account-form');
  if (accountForm) {
    accountForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Pengaturan akun berhasil diperbarui!');
    });
  }

  // Appearance & Privacy Form Handler
  const appearanceForm = document.getElementById('appearance-form');
  if (appearanceForm) {
    appearanceForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Pengaturan privasi & tampilan disimpan!');
    });
  }
});