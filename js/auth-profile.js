document.addEventListener('DOMContentLoaded', function () {
  var form = document.querySelector('form');
  if (!form) return;

  var email = form.querySelector('input[type="email"]');
  var password = form.querySelector('input[type="password"]');
  var firstname = form.querySelector('input[name="firstname"]'); // hanya ada di halaman Sign In
  var errorBox = document.getElementById('error-message');
  var isSignup = !!firstname;

  form.addEventListener('submit', function (e) {
    if (errorBox && errorBox.textContent.trim() !== '') return;

    var mail = email ? email.value.trim() : '';
    if (mail === '' || (password && password.value === '')) return;

    e.preventDefault();

    var name;
    if (isSignup) {
      name = firstname.value.trim() || mail.split('@')[0];
      localStorage.setItem('userAccount', JSON.stringify({ firstname: name, email: mail }));
    } else {
      var account = null;
      try {
        account = JSON.parse(localStorage.getItem('userAccount'));
      } catch (err) {
        account = null;
      }
      if (account && account.email && account.email.toLowerCase() === mail.toLowerCase()) {
        name = account.firstname;
      } else {
        name = mail.split('@')[0];
      }
    }

    localStorage.setItem('username', name);
    localStorage.setItem('userEmail', mail);
    localStorage.setItem('isLoggedIn', 'true');

    window.location.href = 'profile.html';
  });
});