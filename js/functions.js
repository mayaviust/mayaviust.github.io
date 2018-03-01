function getValue(input) {
    //input ends in px
    if (input.substring(input.length - 1, input.length) === "x") {
        return parseInt(input.substring(0, input.length - 2));
    } else { //input ends in %
        return parseInt(input.substring(0, input.length - 1));
    }
}

$(document).ready(() => {
    //set sidenav offscreen
    $('#sidenav').css({
        width: ($(window).width() * 0.5) + 'px',
        left: '-' + ($(window).width() * 0.5) + 'px'
    });

    $(window).on('resize', () => {
        //set $sidenav
        $('#sidenav').css({
            width: ($(window).width() * 0.5) + 'px',
            left: '-' + ($(window).width() * 0.5) + 'px',
            transition: 'left 0s'
        });
    });

    $('.navbox').click(() => {
        //if shown, hide
        if ($('#sidenav').css('left') === "0px") {
            $('#sidenav').css({
                left: '-' + $('#sidenav').width() + 'px',
                transition: 'left 0.3s ease'
            });
        } else { //else show it
            $('#sidenav').css({
                left: '0px',
                transition: 'left 0.5s ease'
            });
        }
    });

}); //document ready
