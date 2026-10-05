$(document).ready(function () {

    if (localStorage.getItem('theme') === 'dark') {
        $('body').attr('data-theme', 'dark');
    }

    var selectedFile = null;
    var MAX_IMAGE = 10 * 1024 * 1024;   
    var MAX_VIDEO = 50 * 1024 * 1024;   

    function mediaPut(id, blob) {
        return new Promise(function (resolve, reject) {
            var open = indexedDB.open('forumlyMedia', 1);
            open.onupgradeneeded = function () { open.result.createObjectStore('files'); };
            open.onerror = function () { reject(open.error); };
            open.onsuccess = function () {
                var tx = open.result.transaction('files', 'readwrite');
                tx.objectStore('files').put(blob, id);
                tx.oncomplete = function () { resolve(); };
                tx.onerror = function () { reject(tx.error); };
            };
        });
    }

    $('#cp-title-input').on('input', function () {
        $('#cp-count').text($(this).val().length);
    });

    $('.cp-tab-btn').on('click', function () {
        $('.cp-tab-btn').removeClass('active');
        $('.cp-tab-content').removeClass('active');

        $(this).addClass('active');
        $('#cp-tab-' + $(this).data('tab')).addClass('active');
    });

    $('#cp-file-input').on('change', function (e) {
        var file = e.target.files[0];
        var preview = $('#cp-image-preview').empty();
        selectedFile = null;

        if (!file) {
            return;
        }
        var isImage = file.type.indexOf('image/') === 0;
        var isVideo = file.type.indexOf('video/') === 0;

        if (!isImage && !isVideo) {
            alert('Hanya file gambar atau video yang bisa diunggah.');
            $(this).val('');
            return;
        }
        if (file.size > (isImage ? MAX_IMAGE : MAX_VIDEO)) {
            alert('Ukuran file terlalu besar. Maksimal ' + (isImage ? '10 MB untuk gambar.' : '50 MB untuk video.'));
            $(this).val('');
            return;
        }

        selectedFile = file;
        var url = URL.createObjectURL(file);
        if (isImage) {
            preview.append($('<img alt="Preview">').attr('src', url));
        } else {
            preview.append($('<video muted preload="metadata">').attr('src', url + '#t=0.1'));
        }
    });

    $('#cp-main-form').on('submit', function (e) {
        e.preventDefault();

        var community = $('#cp-subreddit').val();
        var title = $.trim($('#cp-title-input').val());
        var tab = $('.cp-tab-btn.active').data('tab');
        var content = '';

        if (!community) {
            alert('Tolong pilih komunitas terlebih dahulu!');
            return;
        }

        if (tab === 'text') {
            content = $.trim($('#cp-body-input').val());
        } else if (tab === 'link') {
            content = $.trim($('#cp-link-input').val());
            if (!/^https?:\/\/\S+$/i.test(content)) {
                alert('Masukkan URL yang valid (diawali http:// atau https://).');
                return;
            }
        } else {
            if (!selectedFile) {
                alert('Pilih gambar atau video terlebih dahulu.');
                return;
            }
            content = (selectedFile.type.indexOf('video/') === 0 ? '[Video: ' : '[Gambar: ') + selectedFile.name + ']';
        }

        var post = {
            title: title,
            content: content,
            community: community,
            type: tab,
            author: localStorage.getItem('username') || 'Gracia',
            time: Date.now()
        };

        function finish() {
            var posts = [];
            try {
                posts = JSON.parse(localStorage.getItem('userPosts')) || [];
            } catch (err) {
                posts = [];
            }
            posts.push(post);
            localStorage.setItem('userPosts', JSON.stringify(posts));

            alert('Post berhasil dibuat di ' + community + '!');
            if (window.top !== window) {
                window.top.location.href = '../index.html';
            } else {
                window.location.href = 'profile.html';
            }
        }

        if (tab === 'media') {
            var submitBtn = $('.cp-submit-btn').prop('disabled', true);
            post.mediaId = 'm' + Date.now() + Math.random().toString(36).slice(2, 8);
            post.mediaType = selectedFile.type.indexOf('video/') === 0 ? 'video' : 'image';
            post.mediaName = selectedFile.name;
            mediaPut(post.mediaId, selectedFile).then(finish).catch(function () {
                submitBtn.prop('disabled', false);
                alert('Gagal menyimpan file. Coba file yang lebih kecil.');
            });
        } else {
            finish();
        }
    });

    $('.cp-cancel-btn').on('click', function () {
        if (window.top !== window) {
            window.top.location.href = '../index.html';
        } else if (document.referrer && window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = '../index.html';
        }
    });

});