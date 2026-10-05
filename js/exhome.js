$(document).ready(function () {

    var me = localStorage.getItem('username') || 'Gracia';

    function load(key, fallback) {
        try {
            return JSON.parse(localStorage.getItem(key)) || fallback;
        } catch (err) {
            return fallback;
        }
    }

    function timeAgo(ts) {
        var minutes = ts ? Math.floor((Date.now() - ts) / 60000) : 0;
        if (minutes < 1) {
            return 'baru saja';
        }
        if (minutes < 60) {
            return minutes + ' menit lalu';
        }
        var hours = Math.floor(minutes / 60);
        if (hours < 24) {
            return hours + ' jam lalu';
        }
        return Math.floor(hours / 24) + ' hari lalu';
    }

    function toast(message) {
        var item = $('<div class="toast">').text(message);
        ($('#toastContainer').length ? $('#toastContainer') : $('body')).append(item);
        setTimeout(function () {
            item.remove();
        }, 2500);
    }

    function mediaGet(id) {
        return new Promise(function (resolve, reject) {
            var open = indexedDB.open('forumlyMedia', 1);
            open.onupgradeneeded = function () { open.result.createObjectStore('files'); };
            open.onerror = function () { reject(open.error); };
            open.onsuccess = function () {
                var q = open.result.transaction('files').objectStore('files').get(id);
                q.onsuccess = function () { resolve(q.result); };
                q.onerror = function () { reject(q.error); };
            };
        });
    }

    function fillBody(box, p) {
        var content = p.content || '';
        box.empty();
        if (p.mediaId) {
            mediaGet(p.mediaId).then(function (blob) {
                if (!blob) {
                    box.text(content);
                    return;
                }
                var url = URL.createObjectURL(blob);
                var el = p.mediaType === 'video'
                    ? $('<video controls preload="metadata">')
                    : $('<img>').attr('alt', p.mediaName || p.title);
                box.append(el.attr('src', url));
            }).catch(function () { box.text(content); });
        } else if (p.type === 'link' && /^https?:\/\/\S+$/i.test(content)) {
            box.append($('<a target="_blank" rel="noopener noreferrer">').attr('href', content).text(content));
        } else {
            box.text(content);
        }
        return box;
    }

    function buildCard(p, id) {
        var author = p.author || me;
        var content = p.content || '';

        return $('<article class="post-card">').attr('data-post-id', id).append(
            $('<div class="post-header">').append(
                $('<span class="post-author">').text(author),
                $('<span class="post-time">').append(
                    ' • ' + timeAgo(p.time) + ' dalam ',
                    $('<a href="#">').text(p.community || 'r/post')
                )
            ),
            $('<h3 class="post-title">').text(p.title),
            fillBody($('<p class="post-excerpt">'), p),
            $('<div class="post-actions">').append(
                $('<button type="button" class="btn-action btn-like" data-count="0">')
                    .append('♥ Suka (', '<span class="count-label">0</span>', ')'),
                $('<button type="button" class="btn-action btn-dislike" data-count="0">')
                    .append('Tidak Suka (', '<span class="count-label">0</span>', ')'),
                $('<button type="button" class="btn-action btn-open-thread">')
                    .attr({
                        'data-id': id,
                        'data-author': author,
                        'data-title': p.title,
                        'data-content': content
                    })
                    .append('Komentar (', '<span class="comment-count-label">0</span>', ')'),
                $('<button type="button" class="btn-action btn-report-post">')
                    .attr('data-target', 'Post ' + author)
                    .text(' Laporkan')
            )
        );
    }

    var feedTitle = $('.feed-title');

    load('userPosts', []).forEach(function (p, i) {
        feedTitle.after(buildCard(p, 'u' + (p.time || i)));
    });

    feedTitle.after(
        $('<div class="home-composer">').append(
            $('<button type="button" class="home-composer-btn" id="btnOpenPostModal">')
                .text('Tulis postingan baru, ' + me + '...')
        )
    );

    $('body').append(
        '<div class="modal-overlay" id="postModal">' +
            '<div class="modal-card">' +
                '<div class="modal-header">' +
                    '<h3>Buat Postingan</h3>' +
                    '<button type="button" class="btn-close" id="btnClosePostModal">&times;</button>' +
                '</div>' +
                '<div class="form-group">' +
                    '<label class="form-label">Komunitas</label>' +
                    '<select class="input-field select-field" id="inputPostCommunity">' +
                        '<option value="" disabled selected>Pilih komunitas</option>' +
                        '<option value="r/luckyme">r/luckyme</option>' +
                        '<option value="r/meme">r/meme</option>' +
                        '<option value="r/larpin">r/larpin</option>' +
                    '</select>' +
                '</div>' +
                '<div class="form-group">' +
                    '<label class="form-label">Judul</label>' +
                    '<input type="text" id="inputPostTitle" class="input-field" maxlength="300" placeholder="Judul postingan">' +
                '</div>' +
                '<div class="form-group">' +
                    '<label class="form-label">Isi</label>' +
                    '<textarea id="inputPostBody" class="input-field textarea-field" placeholder="Tulis isi postingan..."></textarea>' +
                '</div>' +
                '<button type="button" class="btn btn-primary btn-full" id="btnSubmitPost">Posting</button>' +
                '<p class="home-modal-note">Butuh gambar atau link? <a href="./pages/create-post.html">Buka halaman lengkap</a></p>' +
            '</div>' +
        '</div>'
    );

    function openPostModal() {
        $('#postModal').css('display', 'flex');
        $('#inputPostTitle').focus();
    }

    function closePostModal() {
        $('#postModal').hide();
    }

    $('#btnOpenPostModal').on('click', openPostModal);
    $('#btnClosePostModal').on('click', closePostModal);
    $('#postModal').on('click', function (e) {
        if (e.target === this) {
            closePostModal();
        }
    });

    $('#btnSubmitPost').on('click', function () {
        var community = $('#inputPostCommunity').val();
        var title = $.trim($('#inputPostTitle').val());

        if (!community) {
            toast('Pilih komunitas terlebih dahulu.');
            return;
        }
        if (!title) {
            toast('Judul tidak boleh kosong.');
            return;
        }

        var posts = load('userPosts', []);
        posts.push({
            title: title,
            content: $.trim($('#inputPostBody').val()),
            community: community,
            type: 'text',
            author: me,
            time: Date.now()
        });
        localStorage.setItem('userPosts', JSON.stringify(posts));

        sessionStorage.setItem('homeToast', 'Post berhasil dibuat di ' + community + '.');
        window.location.reload();
    });

    if (sessionStorage.getItem('homeToast')) {
        toast(sessionStorage.getItem('homeToast'));
        sessionStorage.removeItem('homeToast');
    }

    var inboxItems = [
        { id: 1, text: 'u/kang_kung replied to your post', time: '5m ago', unread: true },
        { id: 2, text: 'u/AutoModerator welcome to r/webdev!', time: '1h ago', unread: true },
        { id: 3, text: 'u/kang_kung sent you a direct message', time: '1 day ago', unread: true }    ];

    $('body').append(
        '<div class="home-inbox">' +
            '<div class="home-inbox-panel" id="homeInboxPanel">' +
                '<div class="home-inbox-header">' +
                    '<span>Inbox</span>' +
                    '<a href="#" id="homeInboxMarkAll">Tandai dibaca</a>' +
                '</div>' +
                '<ul class="home-inbox-list" id="homeInboxList"></ul>' +
                '<a href="pages/inbox.html" class="home-inbox-more">Buka Inbox</a>' +
            '</div>' +
            '<button type="button" class="home-inbox-btn" id="homeInboxBtn">Inbox ' +
                '<span class="home-inbox-badge" id="homeInboxBadge">0</span>' +
            '</button>' +
        '</div>'
    );

    function isUnread(item) {
        return item.unread && load('inboxRead', []).indexOf(item.id) === -1;
    }

    function renderInbox() {
        var list = $('#homeInboxList').empty();
        var count = 0;

        inboxItems.forEach(function (item) {
            var unread = isUnread(item);
            if (unread) {
                count++;
            }
            list.append(
                $('<li>').attr('data-id', item.id).toggleClass('unread', unread).append(
                    $('<span>').text(item.text),
                    $('<small>').text(item.time)
                )
            );
        });

        $('#homeInboxBadge').text(count).toggle(count > 0);
    }

    function markRead(ids) {
        var read = load('inboxRead', []);
        ids.forEach(function (id) {
            if (read.indexOf(id) === -1) {
                read.push(id);
            }
        });
        localStorage.setItem('inboxRead', JSON.stringify(read));
        renderInbox();
    }

    $('#homeInboxBtn').on('click', function (e) {
        e.stopPropagation();
        $('#homeInboxPanel').toggleClass('open');
    });

    $('#homeInboxPanel').on('click', function (e) {
        e.stopPropagation();
    });

    $(document).on('click', function () {
        $('#homeInboxPanel').removeClass('open');
    });

    $('#homeInboxList').on('click', 'li', function () {
        markRead([$(this).data('id')]);
    });

    $('#homeInboxMarkAll').on('click', function (e) {
        e.preventDefault();
        markRead(inboxItems.map(function (item) {
            return item.id;
        }));
    });

    renderInbox();

});

$(function () {
  var $feed = $('.feed-section');
  var $frame = $('<iframe class="embed-frame" title="Panel">').hide().on('load', function () {
    $(this).css('visibility', 'visible');
  });
  $('.main-content').append($frame);

  function panelOf(href) {
    if (href.indexOf('explore/explore.html') > -1) return 'explore/explore.html';
    if (href.indexOf('community/community.html') > -1) return 'community/community.html';
    if (href.indexOf('contact-us.html') > -1) return 'pages/contact-us.html';
    if (href.indexOf('create-post.html') > -1) return 'pages/create-post.html';
    if (href.indexOf('inbox.html') > -1) return 'pages/inbox.html';
    if (href.indexOf('search-bar-result.html') > -1) return 'pages/search-bar-result.html';
    return null;
  }

  function openPanel(page, q) {
    $('#postModal, #threadModal').hide();
    $('#homeInboxPanel').removeClass('open');
    $feed.hide();
    $frame.css('visibility', 'hidden')
      .attr('src', page + '?embed=1' + (q ? '&q=' + encodeURIComponent(q) : ''))
      .show();
    $('.nav-item').removeClass('active');
    $('.nav-item').filter(function () {
      return panelOf($(this).attr('href') || '') === page;
    }).first().addClass('active');
  }

  function goHome() {
    $frame.hide().attr('src', 'about:blank');
    $feed.show();
    $('.nav-item').removeClass('active');
    $('.nav-item[href="index.html"]').addClass('active');
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var href = a.getAttribute('href');
    var page = panelOf(href);
    if (page) {
      e.preventDefault();
      e.stopPropagation();
      openPanel(page);
    } else if ($(a).is('.nav-item[href="index.html"], .logo')) {
      e.preventDefault();
      goHome();
    }
  }, true);

  $('.search-form').on('submit', function (e) {
    e.preventDefault();
    openPanel('pages/search-bar-result.html', $.trim($(this).find('input[name="q"]').val()));
  });
});