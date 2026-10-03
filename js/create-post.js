$(document).ready(function () {

    if (localStorage.getItem('theme') === 'dark') {
        $('body').attr('data-theme', 'dark');
    }

    $('#cp-title-input').on('input', function () {
        $('#cp-count').text($(this).val().length);
    });

    $('.cp-tab-btn').on('click', function () {
        $('.cp-tab-btn').removeClass('active');
        $('.cp-tab-content').removeClass('active');

        $(this).addClass('active');
        var targetTab = $(this).data('tab');
        $('#cp-tab-' + targetTab).addClass('active');
    });

    $('#cp-file-input').on('change', function (e) {
        var file = e.target.files[0];
        if (file) {
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
        var title = $('#cp-title-input').val();

        if (!community) {
            alert('Tolong pilih komunitas terlebih dahulu yachh!');
            return;
        }

        alert('Post berhasil dibuat di ' + community + ':\n"' + title + '"');
        window.location.href = '../index.html';
    });

    // Cancel
    $('.cp-cancel-btn').on('click', function () {
        window.location.href = '../index.html';
    });

});