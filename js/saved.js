(function () {
  var KEY = 'savedPosts';

  function readSaved() {
    try {
      var data = JSON.parse(localStorage.getItem(KEY));
      return Array.isArray(data) ? data : [];
    } catch (e) {
      return [];
    }
  }

  function writeSaved(list) {
    try {
      localStorage.setItem(KEY, JSON.stringify(list));
    } catch (e) {}
  }

  function findIndex(list, title) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].title === title) return i;
    }
    return -1;
  }

  function cleanText(el) {
    return el ? el.textContent.replace(/\s+/g, ' ').trim() : '';
  }

  function toast(message) {
    var box = document.getElementById('toastContainer');
    if (!box) return;
    var t = document.createElement('div');
    t.className = 'toast';
    t.textContent = message;
    box.appendChild(t);
    setTimeout(function () { t.remove(); }, 2500);
  }

  function initSaveButtons() {
    var cards = document.querySelectorAll('.post-card');

    cards.forEach(function (card) {
      var actions = card.querySelector('.post-actions');
      var title = cleanText(card.querySelector('.post-title'));
      if (!actions || !title || actions.querySelector('.btn-save')) return;

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn-action btn-save';

      var report = actions.querySelector('.btn-report-post');
      if (report) {
        actions.insertBefore(btn, report);
      } else {
        actions.appendChild(btn);
      }

      function paint() {
        var isSaved = findIndex(readSaved(), title) !== -1;
        btn.classList.toggle('active-save', isSaved);
        btn.textContent = isSaved ? '🔖 Tersimpan' : '🔖 Simpan';
      }

      btn.addEventListener('click', function () {
        var list = readSaved();
        var i = findIndex(list, title);

        if (i !== -1) {
          list.splice(i, 1);
          toast('Dihapus dari simpanan.');
        } else {
          list.push({
            title: title,
            author: cleanText(card.querySelector('.post-author')),
            time: cleanText(card.querySelector('.post-time')).replace(/^•\s*/, ''),
            excerpt: cleanText(card.querySelector('.post-excerpt')),
            savedAt: Date.now()
          });
          toast('Post disimpan.');
        }

        writeSaved(list);
        paint();
      });

      window.addEventListener('storage', function (e) {
        if (e.key === KEY) paint();
      });

      paint();
    });
  }

  function buildCard(post, onRemove) {
    var card = document.createElement('article');
    card.className = 'post-card';

    var header = document.createElement('div');
    header.className = 'post-header';

    var author = document.createElement('span');
    author.className = 'post-author';
    author.textContent = post.author || 'Anonim';
    header.appendChild(author);

    if (post.time) {
      var time = document.createElement('span');
      time.className = 'post-time';
      time.textContent = ' • ' + post.time;
      header.appendChild(time);
    }

    var title = document.createElement('h3');
    title.className = 'post-title';
    title.textContent = post.title;

    var excerpt = document.createElement('p');
    excerpt.className = 'post-excerpt';
    excerpt.textContent = post.excerpt || '';

    var actions = document.createElement('div');
    actions.className = 'post-actions saved-actions';

    var remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'btn-action btn-unsave';
    remove.textContent = '🗑 Hapus dari simpanan';
    remove.addEventListener('click', function () { onRemove(post.title); });
    actions.appendChild(remove);

    if (post.savedAt) {
      var when = document.createElement('span');
      when.className = 'saved-date';
      when.textContent = 'Disimpan ' + new Date(post.savedAt).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'short', year: 'numeric'
      });
      actions.appendChild(when);
    }

    card.appendChild(header);
    card.appendChild(title);
    if (post.excerpt) card.appendChild(excerpt);
    card.appendChild(actions);
    return card;
  }

  function buildEmpty() {
    var box = document.createElement('div');
    box.className = 'saved-empty';

    var icon = document.createElement('div');
    icon.className = 'saved-empty-icon';
    icon.textContent = '🔖';

    var h = document.createElement('h3');
    h.textContent = 'Belum ada post tersimpan';

    var p = document.createElement('p');
    p.textContent = 'Tekan tombol "Simpan" di bawah sebuah post untuk menyimpannya di sini.';

    var a = document.createElement('a');
    a.href = '../index.html';
    a.className = 'btn btn-primary';
    a.textContent = 'Jelajahi Beranda';

    box.appendChild(icon);
    box.appendChild(h);
    box.appendChild(p);
    box.appendChild(a);
    return box;
  }

  function initUserCard() {
    if (localStorage.getItem('isLoggedIn') !== 'true') return;
    var name = localStorage.getItem('username');
    if (!name) return;

    var card = document.querySelector('.user-profile-card');
    if (!card) return;

    var nameEl = card.querySelector('.user-name');
    var statusEl = card.querySelector('.user-status');
    var avatarEl = card.querySelector('.avatar');

    if (nameEl) nameEl.textContent = name;
    if (statusEl) statusEl.textContent = localStorage.getItem('userEmail') || 'Sudah login';

    if (avatarEl) {
      var photo = localStorage.getItem('avatarGracia');
      if (photo) {
        avatarEl.textContent = '';
        avatarEl.style.overflow = 'hidden';
        var img = document.createElement('img');
        img.src = photo;
        img.alt = 'Profil';
        img.style.cssText = 'width:100%;height:100%;object-fit:cover;border-radius:50%;display:block;';
        avatarEl.appendChild(img);
      } else {
        avatarEl.textContent = name.charAt(0).toUpperCase();
      }
    }

    card.setAttribute('href', 'profile.html');
  }

  function initSavedPage() {
    var listEl = document.getElementById('savedList');
    if (!listEl) return;

    var counters = document.querySelectorAll('[data-saved-count]');
    var clearBtn = document.getElementById('btnClearSaved');

    function removeOne(title) {
      var list = readSaved();
      var i = findIndex(list, title);
      if (i !== -1) {
        list.splice(i, 1);
        writeSaved(list);
        toast('Dihapus dari simpanan.');
      }
      render();
    }

    function render() {
      var list = readSaved().slice().sort(function (a, b) {
        return (b.savedAt || 0) - (a.savedAt || 0);
      });

      listEl.textContent = '';
      counters.forEach(function (el) { el.textContent = list.length; });
      if (clearBtn) clearBtn.disabled = list.length === 0;

      if (list.length === 0) {
        listEl.appendChild(buildEmpty());
        return;
      }
      list.forEach(function (post) {
        listEl.appendChild(buildCard(post, removeOne));
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        if (readSaved().length === 0) return;
        if (!confirm('Hapus semua post yang tersimpan?')) return;
        writeSaved([]);
        toast('Semua simpanan dihapus.');
        render();
      });
    }

    window.addEventListener('storage', function (e) {
      if (e.key === KEY) render();
    });

    initUserCard();
    render();
  }

  document.addEventListener('DOMContentLoaded', function () {
    initSaveButtons();
    initSavedPage();

    if (document.querySelector('.post-card') || document.querySelector('.feed-title')) {
      var queued = false;
      new MutationObserver(function () {
        if (queued) return;
        queued = true;
        requestAnimationFrame(function () {
          queued = false;
          initSaveButtons();
        });
      }).observe(document.body, { childList: true, subtree: true });
    }
  });
})();
