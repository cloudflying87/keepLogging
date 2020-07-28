$(window).scroll(function () {
    const distanceFromTop = $(document).scrollTop();

    if (distanceFromTop >= $('.table-header').height() * 2) {
        $('#sticky').show();
    } else {
        $('#sticky').hide();
    };
});