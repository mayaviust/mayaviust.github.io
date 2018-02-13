//returns numerical value of css element
function getValue(input) {
    //input ends in px
    if (input.substring(input.length - 1, input.length) === "x") {
        return parseInt(input.substring(0, input.length - 2));
    } else { //input ends in %
        return parseInt(input.substring(0, input.length - 1));
    }
}

//sets the width of sidenav based on window width
function setSidenav() {
    var sidenav = document.getElementById("sidenav");
    if (window.innerWidth < 480) {
        var nav_width = "" + window.innerWidth * 0.5 + "px";
        sidenav.style.width = nav_width;
        sidenav.style.left = "-" + nav_width;
        sidenav.style.transition = "left 0s";
    } else {
        sidenav.style.width = "100%";
        sidenav.style.left = "0";
    }
}

//toggles view of sidenav
function toggleSidenav() {
    var sidenav = document.getElementById("sidenav");
    var nav_width = window.innerWidth * 0.5;
    sidenav.style.width = "" + nav_width + "px";
    sidenav.style.transition = "left 0.5s ease";

    var style = window.getComputedStyle(sidenav);

    if (style.getPropertyValue('left') === "0px") { //sidenav displayed
        sidenav.style.left = "-" + sidenav.style.width;
    } else {
        sidenav.style.left = "0px";
    }
}
