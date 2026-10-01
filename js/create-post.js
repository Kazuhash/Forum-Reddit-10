$(document).ready(function() {

$('#cp-title-input').on('input', function() {
    var length = $(this).val().length;
    $('#cp-count').text(length);
});

$('.cp-tab').on('click', function() {
    $('.cp-tab').removeClass('active');
    $('.cp-tab-content').removeClass('active');

    $(this).addClass('active');
    var targetTab = $(this).data('tab');
    $('#cp-tab-' + targetTab).addClass('active');
});

$('#cp-file-input').on('change', function(e) {
    var file = e.target.files[0];
    if (file) {
    var reader = new FileReader();
    reader.onload = function(e) {
        $('#cp-image-preview').html('<img src="' + e.target.result + '" style="max-width:100%; max-height:200px; margin-top:10px; border-radius:6px;" alt="Preview">');
    }
    reader.readAsDataURL(file);
    }
});

$('#cp-main-form').on('submit', function(e) {
    e.preventDefault();

    var community = $('#cp-subreddit').val();
    var title = $('#cp-title-input').val();

    if (!community) {
    alert('Tolong pilih komunitas dulu yachh!');
    return;
    }

    alert('Post berhasil dibuat di ' + community + ':\n"' + title + '"');
    
    window.location.href = 'search-result.html';
});

$('.cp-cancel-btn').on('click', function() {
    window.location.href = 'search-result.html';
});

});