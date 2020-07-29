$(window).scroll(function () {
    const distanceFromTop = $(document).scrollTop();

    if (distanceFromTop >= $('.table-header').height()) {
        $('#sticky').show();
    } else {
        $('#sticky').hide();
    };
});