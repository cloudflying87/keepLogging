$(window).scroll(function () {
    const distanceFromTop = $(document).scrollTop();

    if (distanceFromTop >= $('.table-header').height() *10) {
        $('#sticky').show();
    } else {
        $('#sticky').hide();
    };
});