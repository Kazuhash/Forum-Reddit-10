$(document).ready(function () {

function updateBadge() {
    var count = $('.ib-card.unread').length;
    $('#ib-badge').text(count).toggle(count > 0);
}

function applyTab() {
    var filter = $('.ib-tab.active').data('tab');
    var visible = 0;

    $('.ib-card').each(function () {
    var show = filter === 'all'
        || (filter === 'unread' && $(this).hasClass('unread'))
        || (filter === 'messages' && $(this).data('type') === 'messages');

    $(this).toggle(show);
    if (show) {
        visible++;
    }
});

    $('#ib-empty').toggleClass('show', visible === 0);
}

function refresh() {
    updateBadge();
    applyTab();
}

$('#ib-bell-btn').on('click', function (e) {
    e.stopPropagation();
    $('#ib-dropdown-menu').slideToggle(200);
});

$(document).on('click', function () {
    $('#ib-dropdown-menu').slideUp(200);
});

$('#ib-dropdown-menu').on('click', function (e) {
    e.stopPropagation();
});

$('.ib-read-btn').on('click', function () {
    var id = $(this).closest('.ib-card').data('id');
    $('.ib-card[data-id="' + id + '"], .ib-preview-item[data-id="' + id + '"]').removeClass('unread');
    refresh();
});

$('#ib-mark-all').on('click', function (e) {
    e.preventDefault();
    $('.ib-card, .ib-preview-item').removeClass('unread');
    refresh();
});

$('.ib-tab').on('click', function () {
    $('.ib-tab').removeClass('active');
    $(this).addClass('active');
    applyTab();
});

refresh();

});