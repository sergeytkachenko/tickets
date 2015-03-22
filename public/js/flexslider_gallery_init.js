jQuery(function($){
    $(document).ready(function(){
        $('.flexslider-gallery').imagesLoaded( function() {
            $('.flexslider-gallery').flexslider({
                animation: "fade",
                controlNav: false,
                slideshow: true,
                smoothHeight: true,
                slideDirection: "horizontal",
                prevText: "",
                nextText: "",
                pauseOnHover: true
            });
        });
    });
});