var loading = false;
jQuery(function($) {
    $(window).load(function() {

        /* cache container */
        var $container = $('#wpex-grid-wrap');

        /* initialize isotope */
        $container.imagesLoaded(function() {
            $container.isotope({
                itemSelector: '.loop-entry',
                transformsEnabled: false,
                animationOptions: {
                    duration: 400,
                    easing: 'swing',
                    queue: false
                }
            });
        });

        $(window).resize(function() {

            /* cache container */
            var $container = $('#wpex-grid-wrap');
            /* initialize isotope */
            $container.isotope({});

        }); /* END resize */


        /* ajax scroll */
        var ajaxurl = wpexvars.ajaxurl;

        $('div#load-more').click(function() {
            if(loading){
                return;
            }
            $(this).children('a').html(wpexvars.loading);
            var self = this;
            var $this = $(this),
                    anchor = $this.children('a'),
                    input = $this.children("input"),
                    nonce = anchor.val(),
                    pagenum = anchor.data('pagenum'),
                    maxpage = anchor.data('maxpage'),
                    data = {
                action: 'aq_ajax_scroll',
                pagenum: pagenum,
                archive_type: anchor.data('archive_type'),
                archive_id: anchor.data('archive_id'),
                post_format: anchor.data('post_format'),
                author: anchor.data('author'),
                s: anchor.data('s'),
                security: nonce
            };
            loading = true;
            $.post(ajaxurl+"?offset="+parseInt(input.val())+"&city_id="+getCityId(), data, function(response) {
                content = $(response);

                $(content).imagesLoaded(function() {

                    $('div#load-more a').html(wpexvars.loadmore);

                    $('#wpex-grid-wrap').append(content).isotope('appended', content, function() {

                        $('#wpex-grid-wrap').isotope('reLayout');
                        $(".fitvids").fitVids(); /* re-fire fitvids */
                        $(".prettyphoto-link").prettyPhoto({
                            theme: lightboxLocalize.theme,
                            show_title: false,
                            social_tools: false,
                            slideshow: false,
                            autoplay_slideshow: false,
                            wmode: 'opaque'
                        });
                        
                        $(self).children('a').html('Показать еще');
                        
                    });
                    ratingInit(); // init rating 

                });
                input.val(parseInt(input.val())+24);    
                
                if (undefined === $(response).html()) {
                    $this.fadeOut();
                }
                loading = false;
            });

            return false;

        });

    }); /* END window ready */
}); /* END function */

function getCityId(){
    var search = location.search;
    var city = "";
    var rep = function(str){
        city = str;
    }
    search = search.replace(/city_id=[0-9]/i, rep);
    search = city.replace(/city_id=/i, "");
    
    return (search.match(/^[0-9]$/i) !== null)? search : 1;
}
