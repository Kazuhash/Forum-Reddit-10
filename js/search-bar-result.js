$(document).ready(function() {

$('#sr-search-input').on('keyup', function() {
    var keyword = $(this).val().toLowerCase();
    
        $('.sr-card').each(function() {
        var cardText = $(this).text().toLowerCase();
        
        if (cardText.indexOf(keyword) > -1) {
            $(this).show();
        } else {
            $(this).hide();
        }
        });
    });

    $('#sr-clear-btn').on('click', function() {
        $('#sr-search-input').val('').trigger('keyup').focus();
    });

    $('.sr-tab').on('click', function() {
        $('.sr-tab').removeClass('active');
        $(this).addClass('active');

        var selectedTab = $(this).data('tab');

        if (selectedTab === 'all') {
        $('.sr-card').show();
        } else {
        $('.sr-card').hide();
        $('.sr-card[data-category="' + selectedTab + '"]').show();
        }
    });

});