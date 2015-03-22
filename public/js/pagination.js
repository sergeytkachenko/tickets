
jQuery(function($){
    
    $("#content").on("click", ".pagination li:not(.right-list)", function(){
        var content = parseInt( $(this).find("a").html() );
        
        if( typeof content === 'number' ) {
            var url = location.href;

            if( url.search(new RegExp("page\=([0-9]{0,})",'g')) !== -1) {
                
                url = url.replace(new RegExp("page\=[0-9]{0,}",'g'), "page=" + content);
                
            } else {
                
                if( url.search(/\?/) !== -1 ) {

                    url = url + "page=" + content;
               
                } else {
                    
                     if( url.search(/#/g) !== -1) {
                         url = url.replace(/#/g, "?page=" + content + "#");
                     } else {
                         url = url + "?page=" + content;
                     }
                }
                
            }
            
            window.location.href = url;
        }
        
    });
    
});

