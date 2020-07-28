$(window).scroll(function () {
    const distanceFromTop = $(document).scrollTop();

    if (distanceFromTop >= $('.table-header').height() * 2) {
        $('#sticky').fadeIn(375)
    } else {
        $('#sticky').hide();
    };
});