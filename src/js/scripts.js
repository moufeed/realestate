var wow = new WOW({
    boxClass: 'animate',
    animateClass: 'animated',
    offset: 10,
    mobile: true,
    live: true, 

});
wow.init();

$(document).ready(function () {
    
        $("body").niceScroll({
            cursorcolor: '#ccac2c',
            cursorwidth: "12px", 
            background: "#303030",
            cursorborder: "0",
            cursorborderradius: 0,
            zindex: 999999
        });
        $('select').selectpicker({
            mobile: false,
            size:5
          });
          
});