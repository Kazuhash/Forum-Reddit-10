if (localStorage.getItem('isLoggedIn') === 'true') {
  window.location.replace('profile.html');
}

function restoreUserData(mail) {
  var raw = localStorage.getItem('backup:' + mail.toLowerCase());
  if (!raw) return false;
  try {
    var data = JSON.parse(raw);
    Object.keys(data).forEach(function (k) { localStorage.setItem(k, data[k]); });
    return true;
  } catch (err) {
    return false;
  }
}

function readAccounts() {
  try {
    return JSON.parse(localStorage.getItem('accounts')) || {};
  } catch (err) {
    return {};
  }
}

document.addEventListener('DOMContentLoaded', function () {
  var form = document.querySelector('form');
  if (!form) return;

  var email = form.querySelector('input[type="email"]');
  var password = form.querySelector('input[type="password"]');
  var firstname = form.querySelector('input[name="firstname"]');
  var errorBox = document.getElementById('error-message');
  var isSignup = !!firstname;

  form.setAttribute('autocomplete', 'off');
  form.querySelectorAll('input').forEach(function (inp) {
    inp.setAttribute('autocomplete', inp.type === 'password' ? 'new-password' : 'off');
  });

  if (!localStorage.getItem('userAccount')) {
    var typed = false;
    form.addEventListener('keydown', function () { typed = true; });
    form.addEventListener('paste', function () { typed = true; });

    var clearAutofill = function () {
      if (typed) return;
      form.querySelectorAll('input').forEach(function (inp) {
        if (inp.type !== 'submit' && inp.type !== 'button') inp.value = '';
      });
    };

    clearAutofill();
    setTimeout(clearAutofill, 150);
    setTimeout(clearAutofill, 600);
  }

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

    if (isSignup) {
      var accounts = readAccounts();
      accounts[mail.toLowerCase()] = name;
      localStorage.setItem('accounts', JSON.stringify(accounts));
    }
    var known = readAccounts()[mail.toLowerCase()];
    if (!isSignup && known) name = known;
    if (!restoreUserData(mail)) localStorage.setItem('freshAccount', '1');

    localStorage.setItem('username', name);
    localStorage.setItem('userEmail', mail);
    localStorage.setItem('isLoggedIn', 'true');

    window.location.replace('profile.html');
  });
});