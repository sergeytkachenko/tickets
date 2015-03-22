jQuery(function($){
    
    $('.dropdown-toggle').dropdown();

    (function(){
        /*
         * fixed width for submenu 
         **/
        $('ul.submenu').each(function(index, that){
            var paddingLeft = $(that).find("a:eq(0)").css('padding-left').replace("px", "");
           
            var paddingRight = $(that).find("a:eq(0)").css('padding-right').replace("px", "");
            
            $(that).css("min-width", $(that).width() - (parseInt(paddingLeft) + parseInt(paddingRight)) );
            
        });
        $('li ul.submenu').not("li.active ul.submenu").hover(
            function(){
                $(this).parents("li").addClass("active");
            },
            function(){
                $(this).parents("li").removeClass("active");
            }
        );
        /*
         * width for long submenu 
         **/

    }());
    
    /* Colapse */
    (function(){
        /*
         * Colapse Right menu
         **/

        $(".info").on("click", ".header", function(){
            //console.log("la");
            $(this).parents(".info").find(".content").toggle("blind", {
                'complete' : function(){
                    changeClass(this);
                }
            });
        });
        
        function changeClass(that){
            
            if( $(that).parents(".info").hasClass("open") ){
                
                $(that).parents(".info").removeClass("open");
                
            } else {
                
                $(that).parents(".info").addClass("open");
                
            }
        }
        
    }());
    
    /* Colapse */
    (function(){
        /*
         * Colapse full servise in right siderbar > form 
         **/
        
        $(".info.filter-gils").on("click", ".content a.servise", function(){
            $(this).parents("form").find(".girls-servise").toggle("blind", {
                'complete' : function(){
                    changeClass(this);
                }
            });
        });
        
        function changeClass(that){
            
            if( $(that).parents("form").hasClass("open") ){
                
                $(that).parents("form").removeClass("open");
                
            } else {
                
                $(that).parents("form").addClass("open");
                
            }
        }
        
    }());
    
    /* Tooltip*/
    $( document ).tooltip();
    
    /* form-filter submit */
    
    new FilterRequest();


    /*
     * FOOTER Tab
     **/
    
    $("footer nav li").on("click", function(){
        var index = $(this).index();
        
        $(".footer-tab-content").addClass("none");
        $(".footer-tab-content").eq(index).removeClass("none");
        
        $("footer nav li").removeClass("active");
        $(this).addClass("active");
    });
});
