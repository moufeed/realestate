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
        size: 5
    });
    window.resetpicker = function(){
        $(".select").val('default');
        $(".select").selectpicker("refresh");
    }
    
    window.resetslider = function(){
        var prAry = toArray(price_slider) || [0, 1000];
        var areAry = toArray(area_slider) || [0, 1000];
        $('#min-price').text(prAry[0]);
        $('#max-price').text(prAry[1]);
        $('#min-size').text(areAry[0]);
        $('#max-size').text(areAry[1]);
        price_slider.slider("option", "values", prAry);
        area_slider.slider("option", "values", areAry);
    }

    window.toArray = function(item){
        if (typeof item.data('values') === "undefined") return false;
        return JSON.parse("[" + item.data('values') + "]");
    }
    var price_slider = $('#price_slider'),
        area_slider = $('#area_slider'); 

    if (price_slider.length > 0) {

        price_slider.slider({
            range: true,
            min: parseInt(price_slider.data('min')) || 0,
            max: parseInt(price_slider.data('max')) || 1000,
            values: toArray(price_slider) || [0, 1000],
            step: parseInt(price_slider.data('step')) || 1,
            slide: function (event, ui) { 
                $('#min-price').text(ui.values[0]);
                $('#max-price').text(ui.values[1]);
            }
        })
    }
    if ($(area_slider).length > 0) {
        area_slider.slider({
            range: true,
            min: parseInt(area_slider.data('min')) || 0,
            max: parseInt(area_slider.data('max')) || 1000,
            values: toArray(area_slider) || [0, 1000],
            step: parseInt(price_slider.data('step')) || 1,
            slide: function (event, ui) {
                $('#min-size').text(ui.values[0]);
                $('#max-size').text(ui.values[1]);
            }
        })
    }

    
    if ($('.featured-slider').length > 0) {
        $('.featured-slider').owlCarousel({
            loop:true,
            margin:10,
            navText:['&#xf104;','&#xf105;'],
            nav:true,
            items:1
        })
    }
});