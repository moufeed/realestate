 jQuery(document).ready(function () {
     jQuery('#main_slider').show().revolution({
         sliderType: 'standard',
         sliderLayout: 'fullwidth',
         delay: 9000,
         gridwidth: 1170,
         gridheight: 600,
         navigation: {
             arrows: {
                 enable: true,
                 style: "hesperiden",
                 hide_onleave: false
             },
             bullets: {
                 enable: false,
             }
         }
     });
 });