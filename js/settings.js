document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.sr-nav-item');
  const panels = document.querySelectorAll('.sr-settings-panel');
  const searchInput = document.getElementById('sr-search-input');
  const clearBtn = document.getElementById('sr-clear-btn');
  const profileForm = document.getElementById('profile-form');
  const darkModeToggle = document.getElementById('dark-mode-toggle');

  // Sidebar Tab Switching
  navItems.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');

      navItems.forEach(nav => nav.classList.remove('active'));
      button.classList.add('active');

      panels.forEach(panel => {
        if (panel.id === `panel-${targetTab}`) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });

  // Search Clear Button Logic
  if (searchInput && clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchInput.focus();
    });
  }

  // Dark Mode Toggle Logic
  const isDarkMode = localStorage.getItem('darkMode') !== 'false';
  darkModeToggle.checked = isDarkMode;

  darkModeToggle.addEventListener('change', (e) => {
    const enabled = e.target.checked;
    localStorage.setItem('darkMode', enabled);
  });

  // Profile Form Handling
  profileForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    alert('Settings updated successfully!');
  });
});