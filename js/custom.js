(function($) {
    'use strict';

    /* Smooth scroll to section
    ----------------------------------------------*/
    $('a.scroll[href*=\\#]:not([href=\\#])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    // scrollTop: target.offset().top-70
                    scrollTop: target.offset().top
                }, 2000);
                return false;
            }
        }
    });

    /* Tooltip
    ----------------------------------------------*/
    $('[data-toggle="tooltip"]').tooltip();

    /* Lightbox
    ----------------------------------------------*/
    $('.image-link').magnificPopup({
        type:'image'
    });


})(jQuery);

