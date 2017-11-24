var wow = new WOW({
    boxClass: 'animate',
    animateClass: 'animated',
    offset: 10,
    mobile: true,
    live: true,

});
wow.init();

function shareModal(){
    
}

$(document).ready(function () {

    // --------  share buttons
    $('.showShareModal').click(function(e){
        e.preventDefault();
        $('#shareModal').modal('toggle')
    })
    
    $('.sharebtn').click(function(event){
        event.preventDefault();
        var width      = 650,
            height     = 450,
            windowSRC  = $(this).attr('href'),
            windowTitle =$(this).parents('ul').data('window-title');
        window.open(
           windowSRC,windowTitle,
          'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width='+width+',height='+height+',top='+(screen.height/2-height/2)+',left='+(screen.width/2-width/2)
        );
    });

    //--- open search
    $('#g-searchbtn').click(function (e) {
        e.preventDefault();
        $('.search-view').fadeIn(500).addClass('opend');
    })
    $('#g-closebtn').click(function () {
        $('.search-view').fadeOut(500,function(){
                $(this).removeClass('opend').removeAttr('style')
        })
    })
//-----------------------------------------------------
    $("body").niceScroll({
        cursorcolor: '#ccac2c',
        cursorwidth: "12px",
        background: "#303030",
        cursorborder: "0",
        cursorborderradius: 0,
        zindex: 999999
    });
    //-----------------------------------------------------
    $('select').selectpicker({
        mobile: false,
        size: 5
    });
    window.resetpicker = function () {
        $(".select").val('default');
        $(".select").selectpicker("refresh");
    }

    window.resetslider = function () {
        var prAry = toArray(price_slider) || [0, 1000];
        var areAry = toArray(area_slider) || [0, 1000];
        $('#min-price').text(prAry[0]);
        $('#max-price').text(prAry[1]);
        $('#min-size').text(areAry[0]);
        $('#max-size').text(areAry[1]);
        price_slider.slider("option", "values", prAry);
        area_slider.slider("option", "values", areAry);
    }

    window.toArray = function (item) {
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
            loop: true,
            margin: 10,
            navText: ['&#xf104;', '&#xf105;'],
            nav: true,
            items: 1
        })
    }


    var offset = 250;
    var duration = 300;
    
    $(window).scroll(function () {
          if( window.pageYOffset > 350){
              $('.main_header').addClass('fixed-top');
            $('body').css('padding-top',$('.main_header').height()+'px');
        }else{
            $('body').css('padding-top','0');
            $('.main_header').removeClass('fixed-top');
        } 
        if ($(this).scrollTop() > offset) {
            $(".back-to-top").fadeIn(duration);
        } else {

            $(".back-to-top").fadeOut(duration);
        }
    });
    $(".back-to-top").click(function (event) {
        event.preventDefault();
        $("html, body").animate({ 
            scrollTop: 0
        }, duration);
        return false;
    })


    var navText = [];
    navText[0] = $('#testimonialsSlider').data('navleft') || 'left';
    navText[1] = $('#testimonialsSlider').data('navright') || 'right';
    $('#testimonialsSlider').owlCarousel({
        items: 1,
        margin: 15,
        loop: true,
        nav: false,
        dots: true, 
        autoplay: true,
        animateIn: true,
        rtl: $('#testimonialsSlider').data('rtl'),
        navText: navText
    });

});