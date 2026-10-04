$(document).ready(function () {

    if (localStorage.getItem('theme') === 'dark') {
        $('body').attr('data-theme', 'dark');
    }

    var imageName = '';

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
        if (file) {
            imageName = file.name;
            var reader = new FileReader();
            reader.onload = function (event) {
                $('#cp-image-preview').html('<img src="' + event.target.result + '" alt="Preview">');
            };
            reader.readAsDataURL(file);
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
            if (!imageName) {
                alert('Pilih gambar terlebih dahulu.');
                return;
            }
            content = '[Gambar: ' + imageName + ']';
        }

        var posts = [];
        try {
            posts = JSON.parse(localStorage.getItem('userPosts')) || [];
        } catch (err) {
            posts = [];
        }

        posts.push({
            title: title,
            content: content,
            community: community,
            type: tab,
            author: localStorage.getItem('username') || 'Gracia',
            time: Date.now()
        });
        localStorage.setItem('userPosts', JSON.stringify(posts));

        alert('Post berhasil dibuat di ' + community + '!');
        window.location.href = 'profile.html';
    });

    $('.cp-cancel-btn').on('click', function () {
        if (document.referrer && window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = '../index.html';
        }
    });

});