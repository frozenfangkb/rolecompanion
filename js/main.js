$(document).ready(function () {
    $('ul li').on('click', function() {
        $('li').removeClass('active');
        $(this).addClass('active');
    });
});