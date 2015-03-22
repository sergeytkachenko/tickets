/*
 * FilterRequest - класс, который отвечает за логику отправки фильтра девочек на 
 * сервер. Также, навешивает события на select и input, если те были динамически 
 * вставленны на страницу
 * 
 * Пример реализации цепочки обьекных событий на странице
 * 
 * date 18.01.2012
 * 
 **/
jQuery(function($){
    
});
var FilterRequest = function (){
    
    var that = this;
    
    this.mask = new Ext.LoadMask(Ext.getBody(), {msg:"Загрузка..."});
    
    this.addEvent = function(){
        
        
        $("form[name='filter'] input[type='checkbox'], form[name='filter'] select")
            .on("change", function(){
                
                var name = $(this).attr("name");
                var value = $(this).val();
                var search = location.search.replace("?", "&");
                //
 
                that.requestGirlsList(name, value, search);
                
            });
        $("form[name='filter'] button.filter-cansel").on("click", function (){
            
            var formName = $(this).attr("name");
            
            var name = "filter[" + formName + "]";
            var value = "reset";
            var search = location.search.replace("?", "&");
            

            that.requestGirlsList(name, value, search);
        });
        
        /*
         * Raiting init 
         **/
        if( $(".star").size() > 0 ) {

            $(".star").each(function(index, that){
                var onlyRead = ( $(that).attr("data-read-only") )? true : false;

                $(that).raty({
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

            $(".star[data-read-only=1]").on("click", function(){
                alert("Вы уже проголосовали за данную анкету.");
            });
        }
    }

    this.requestGirlsList = function(name, value, search){
        
        location.href="/?" + name + "=" + value;
    }

    this.init = function(){
        
        that.addEvent();
        
    }()
    
    
}
new FilterRequest();


function getDocumentHeight() {
    return (document.body.scrollHeight > document.body.offsetHeight) ? document.body.scrollHeight : document.body.offsetHeight;
}
