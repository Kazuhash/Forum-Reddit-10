$(document).ready(function () {

    // Gabungkan filter search + tab dalam satu fungsi
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

    applyFilters();

});