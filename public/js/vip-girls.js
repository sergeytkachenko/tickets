jQuery(function($){
    // загрузка фотографий
    $(window).scroll(function(){
      var scroll_top = $(document).scrollTop();//высота прокрученной области
      var page_height = $(document).height();//высота всей страницы
      var wind_height = $(window).height();//высота окна браузера
      if(scroll_top+wind_height+300 > page_height){
          $('div#load-more').trigger("click");
      }
    });
    // The slider being synced must be initialized first
    if($('#carousel') && $('#slider')){
      $('#carousel').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: true,
        slideshow: false,
        itemWidth: 40,
        itemMargin: 5,
        asNavFor: '#slider'
      });

      $('#slider').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: true,
        slideshow: true,
        sync: "#carousel",
        slideshowSpeed: 4000
      });
    }
    /*
        * Raiting init 
        **/
    ratingInit();
       
    if($('.flexslider-gallery').size() > 0){
        $('.flexslider-gallery').
            imagesLoaded(function(){
                $('.flexslider-gallery').
                    flexslider(
                        {
                            animation:"fade",
                            controlNav:false,
                            slideshow:true,
                            smoothHeight:true,
                            slideDirection:"horizontal",
                            prevText:"",
                            nextText:""
                        }
                    );});
    }

    $("form.ajax").on("submit", function(event){
        event.preventDefault();
        
        var url = $(this).attr("action");
        var params = $(this).serialize();
	$.ajax({
            url: url,
            type: 'post',
            dataType: 'html',
            data: params,
            success: function(data) {
                $('.message-display *').remove();
                if (data) {
                    $('.message-display').html(data);
                    $('.message-display *').fadeIn('slow');
                    $("img.ver_photo").each(function (i, value) {
                        var par = $(value).parent();
                        $(value).remove();
                        $(par).html("<img class='ver_photo' src='/js/ajax-contact-extend/classes/image.php' alt='Проверочное фото' />");
                    });
                }	
            },
            error: function(e, b, c){
                console.log(e, b, c);
            }
	});
        
    });
    $("form.wpcf7-form").on("submit", function(event){
           event.preventDefault();
           addFeedback(this);
    });
    
    $("li.additional-search").on("click", function(){
        $(this).parent().find("li").removeClass("current-menu-item");
        $(this).addClass("current-menu-item");
        $(".search-div.hidden").fadeIn(function(){
            $(this).removeClass("hidden");
        });
        $(".search-div").not(".hidden").fadeOut(function(){
            $(this).addClass("hidden");
        });
    });
    
    $("li.additional-search").on("click", function(e){
        e.stopPropagation();
        if(!isIndexPage()){
            location.href="/?as=true";
        }
    });
});

function ratingInit(){
    if( $(".star").size() > 0 ) {
        $(".star").not(".salons").each(function(index, value){
            var onlyRead = ( $(value).attr("data-read-only") )? true : false;

            $(value).raty({
                score: function() {
                    return $(this).attr('data-rating');
                },
                click: function(score, evt) {

                    var anketId = $(this).parents(".pear").find("input[name='anket-id']").val();

                    voteRaiting(score, anketId);
                },
                readOnly : onlyRead
            });
        });
        // for salons 
        $(".star.salons").each(function(index, value){
            var onlyRead = ( $(value).attr("data-read-only") )? true : false;

            $(value).raty({
                score: function() {
                    return $(this).attr('data-rating');
                },
                click: function(score, evt) {

                    var idSalon = $(this).parents(".pear").find("input[name='salon-id']").val();

                    voteSalonsRaiting(score, idSalon);
                },
                readOnly : onlyRead
            });
        });
        
        $(".star[data-read-only=1]").on("click", function(){
            alert("Вы уже проголосовали за данную анкету.");
        });
        
    }
}

function addFeedback(that){
    var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Отправка..."});
    myMask.show();
    var url = $(that).attr("action"),
        email = $(that).find("input[name='email']").val(),
        //capcha = $(that).find("input[name='capcha']").val(),
        message = $(that).find("textarea[name='message']").val();

    Ext.Ajax.request({
        url: url,
        params: {
            "email":email, 
            //"capcha": capcha, 
            "message" : message
        },
        success: function(response){
            Ext.Msg.alert('Ответ от сервера', response.responseText);
            $(that).find("a.updateCapcha").trigger("click");
        },
        callback: function(){
            myMask.hide();
        }
    });
}

function isIndexPage(){
    var url = location.pathname+location.search;
    
    return (url.match(/^\/(\?.*){0,}$/i)!==null)? true: false;
}
