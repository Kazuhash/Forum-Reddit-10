$(document).ready(function () {

    if (localStorage.getItem('theme') === 'dark') {
        $('body').attr('data-theme', 'dark');
    }

    var me = localStorage.getItem('username') || 'Gracia';
    var KEY_REACT = 'postReactions';   
    var KEY_COMMENT = 'postComments';  
    var KEY_JOIN = 'userCommunities';  
    var activeCard = null;

    function load(key, fallback) {
        try {
            return JSON.parse(localStorage.getItem(key)) || fallback;
        } catch (err) {
            return fallback;
        }
    }

    function save(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    function titleOf(card) {
        return card.find('.sr-title').text();
    }

    function reactions(title) {
        var d = load(KEY_REACT, {})[title] || {};
        return { like: d.like || [], dislike: d.dislike || [], report: d.report || [] };
    }

    function comments(title) {
        return load(KEY_COMMENT, {})[title] || [];
    }

    load('userPosts', []).slice().reverse().forEach(function (p) {
        var card = $('<div class="sr-card" data-category="posts">');
        card.append(
            $('<div class="sr-card-header">').append(
                $('<span class="sr-subreddit">').text(p.community || 'r/post'),
                $('<span class="sr-author">').text(' • Posted by ' + (p.author || me))
            ),
            $('<h3 class="sr-title">').text(p.title),
            $('<p class="sr-snippet">').text(p.content || ''),
            $('<div class="sr-card-footer">')
        );
        $('.sr-results').prepend(card);
    });

    $('.sr-card[data-category="posts"]').each(function () {
        var card = $(this);
        var base = parseInt(card.find('.sr-card-footer span').first().text().replace(/\D/g, ''), 10) || 0;

        card.data('base', base);
        card.find('.sr-card-footer').empty().append(
            '<button type="button" class="btn-action btn-like"></button>',
            '<button type="button" class="btn-action btn-dislike"></button>',
            '<button type="button" class="btn-action btn-comment"></button>',
            '<button type="button" class="btn-action btn-report"></button>'
        );
        render(card);
    });

    function render(card) {
        var title = titleOf(card);
        var d = reactions(title);

        card.find('.btn-like')
            .text('♥ Suka (' + ((card.data('base') || 0) + d.like.length) + ')')
            .toggleClass('active', d.like.indexOf(me) > -1);
        card.find('.btn-dislike')
            .text('Tidak Suka (' + d.dislike.length + ')')
            .toggleClass('active', d.dislike.indexOf(me) > -1);
        card.find('.btn-comment').text('Komentar (' + comments(title).length + ')');
        card.find('.btn-report')
            .text('Laporkan (' + d.report.length + ')')
            .toggleClass('active', d.report.indexOf(me) > -1);
    }

    function toggleReaction(title, type, opposite) {
        var all = load(KEY_REACT, {});
        var d = all[title] = all[title] || { like: [], dislike: [], report: [] };
        var list = d[type] = d[type] || [];
        var i = list.indexOf(me);

        if (i > -1) {
            list.splice(i, 1);
        } else {
            list.push(me);
            if (opposite) {
                var other = d[opposite] = d[opposite] || [];
                var j = other.indexOf(me);
                if (j > -1) {
                    other.splice(j, 1);
                }
            }
        }
        save(KEY_REACT, all);
    }

    $('.sr-results').on('click', '.btn-like, .btn-dislike, .btn-report', function () {
        var btn = $(this);
        var card = btn.closest('.sr-card');
        var type = btn.hasClass('btn-like') ? 'like' : (btn.hasClass('btn-dislike') ? 'dislike' : 'report');
        var opposite = type === 'like' ? 'dislike' : (type === 'dislike' ? 'like' : null);

        toggleReaction(titleOf(card), type, opposite);
        render(card);
    });

    function renderComments() {
        var list = comments(titleOf(activeCard));
        var box = $('#sr-comment-list').empty();

        if (!list.length) {
            box.append('<p class="sr-empty-comment">Belum ada komentar.</p>');
        }
        list.forEach(function (c, i) {
            var item = $('<div class="sr-comment">').append(
                $('<strong>').text(c.author),
                $('<p>').text(c.text)
            );
            if (c.author === me) {
                item.append($('<button type="button" class="sr-comment-del">').attr('data-index', i).text('Hapus'));
            }
            box.append(item);
        });
        render(activeCard);
    }

    function closeModal() {
        $('#sr-thread-modal').removeClass('show');
    }

    $('.sr-results').on('click', '.btn-comment', function () {
        activeCard = $(this).closest('.sr-card');
        $('#sr-modal-title').text(titleOf(activeCard));
        renderComments();
        $('#sr-thread-modal').addClass('show');
    });

    $('#sr-comment-send').on('click', function () {
        var text = $.trim($('#sr-comment-input').val());
        if (!text) {
            return;
        }
        var all = load(KEY_COMMENT, {});
        var title = titleOf(activeCard);

        all[title] = all[title] || [];
        all[title].push({ author: me, text: text });
        save(KEY_COMMENT, all);

        $('#sr-comment-input').val('');
        renderComments();
    });

    $('#sr-comment-list').on('click', '.sr-comment-del', function () {
        var all = load(KEY_COMMENT, {});
        all[titleOf(activeCard)].splice($(this).data('index'), 1);
        save(KEY_COMMENT, all);
        renderComments();
    });

    $('#sr-modal-close').on('click', closeModal);
    $('#sr-thread-modal').on('click', function (e) {
        if (e.target === this) {
            closeModal();
        }
    });

    function renderJoin() {
        var joined = load(KEY_JOIN, []);
        $('.sr-join-btn').each(function () {
            var name = $(this).closest('.sr-card').find('.sr-subreddit').text();
            $(this).text(joined.indexOf(name) > -1 ? 'Joined' : 'Join');
        });
    }

    $('.sr-join-btn').on('click', function () {
        var name = $(this).closest('.sr-card').find('.sr-subreddit').text();
        var joined = load(KEY_JOIN, []);
        var i = joined.indexOf(name);

        if (i > -1) {
            joined.splice(i, 1);
        } else {
            joined.push(name);
        }
        save(KEY_JOIN, joined);
        renderJoin();
    });

    function applyFilters() {
        var keyword = $('#sr-search-input').val().toLowerCase();
        var selectedTab = $('.sr-tab.active').data('tab');
        var visibleCount = 0;

        $('.sr-card').each(function () {
            var matchText = $(this).text().toLowerCase().indexOf(keyword) > -1;
            var matchTab = $(this).data('category') === selectedTab;
            var show = matchText && matchTab;

            $(this).toggle(show);
            if (show) {
                visibleCount++;
            }
        });

        $('#sr-no-results').toggleClass('show', visibleCount === 0);
    }

    $('#sr-search-input').on('input', applyFilters);

    $('#sr-clear-btn').on('click', function () {
        $('#sr-search-input').val('').focus();
        applyFilters();
    });

    $('.sr-tab').on('click', function () {
        $('.sr-tab').removeClass('active');
        $(this).addClass('active');
        applyFilters();
    });

    var query = new URLSearchParams(window.location.search).get('q');
    if (query) {
        $('#sr-search-input').val(query);
    }

    renderJoin();
    applyFilters();

});