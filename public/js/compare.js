/*
 * Compare Girls 
 * create - 03.04.2013 
 */
;(function(){
    window.Compare = function(){
        var instance;
 
        // Приватные методы и свойства
        // ...  
 
        // Конструктор
        function Compare() {
                if ( !instance )
                        instance = this;
                else return instance;
 
                // Публичные свойства
        }
      
        var that = this;
        
        this.countCompare = parseInt($("span.count-compare").html()); // count all compare ankets 
        
        this.init = function(){
            that.addEvents();
        }
        
        this.addEvents = function(){
            $("div#wrap").on("click", "a.add-compare", function(){
                var id = $(this).attr("data-id");
                that.addCompare(id, this);
            });
            $("div#wrap").on("click", "a.delete-compare", function(){
                var id = $(this).attr("data-id");
                that.deleteCompare(id, this);
            });
            $("div.add-compare").on("click", "a.cr", function(event){
                event.stopPropagation();
                var count = parseInt($(this).find(".count-compare").html());
                if(count <= 1){
                    alert("Для сравнения нужно минимум две анкеты.");
                    return false;
                }
            });
        }
        
        this.addCompare = function(id, link){
            that.countCompare++;
            that.ajaxAdd(id, link);
        }
        
        this.deleteCompare = function(id, link){
            that.countCompare--;
            that.ajaxDelete(id, link);
        }
        
        this.ajaxAdd = function(id, link){
            $.ajax({
                type: "POST",
                url: "/content/compare-add.json?id="+id,
                success: function(success){
                    var html = "<a data-id='"+id+"' class='delete-compare' href='javascript:void(0)'> \
                                <input type='checkbox'checked /></a> \
                                <a class='cr' href='/content/compare.html'>Сравнить(<span class='count-compare'>"+that.countCompare+"</span>)</a>";
                    $(link).replaceWith(html);
                    that.setCountCompare();
                },
                dataType: "json"
            });
        }
        
        this.ajaxDelete = function(id, link){

            $.ajax({
                type: "POST",
                url: "/content/compare-delete.json?id="+id,
                success: function(success){
                    var html = "<a data-id='"+id+"' class='add-compare' href='javascript:void(0)'> \
                    <input type='checkbox' />Сравнить</a>";
                    $(link).replaceWith(html);
                    
                    $("a[data-id="+id+"]").parent().find(".cr").remove();
                    that.setCountCompare();
                },
                dataType: "json"
            });
        }
        
        this.getCountCompare = function(){
            return (that.countCompare > 0)? that.countCompare : 0;
        }
        
        this.setCountCompare = function () {
            $("span.count-compare").html(that.countCompare);
        }
        
        this.init();
    }()
})();