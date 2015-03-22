/* 
 * 
 *  Данный класс работает в паре с php классом - Filter.php 
 *  Filter.js обрабатывает название аттрибута "name" в форме с классом "filter",
 *  для того, что-бы данные правильным образом попали в класс Filter.php
 *  
 *  Работает с формами у которых класс "filter" => [form.filter]
 *  что-бы елемент не учавствовал в фильтре достаточно дать ему класс "no-filter"
 *  
 */

(function(){

    $.fn.filterNepro100 = function (name){
        
        var setAttrName = function(attrName){
            
            return ("filter[" + name + "]" + "[" + attrName + "]").replace(/\[\s*\]\s*\]/gi, "][]");
            
        }
        
        $(this).find("select, input").not(".no-filter").each(function(index, that){
            
            var attrName = $(that).attr("name");
            
            var newAttrName = setAttrName(attrName);
            
            $(that).attr("name", newAttrName);
        });
        
    }
    
    $.fn.filterNepro100.filterApply = function(){
        
        $("form.filter.girls-list").filterNepro100("girls-list");
        
    }
    
    $(function($){
        
        $.fn.filterNepro100.filterApply();
        
    });
    
})()



