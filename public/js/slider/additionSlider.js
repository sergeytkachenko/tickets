(function(){
    // 
    // Addition for wowSlider 
    // Listing additional description for vip girl anket
    
    var blocks = ".slider-content .girls-slider-description";
    
    jQuery.fn.wowSlider.SliderAdditional = function (){
        
        var that = this;
        
        this.sppedAnimation = 200;
        this.intervalAnimation = 2420;
        
        this.blocks = '.slider-content .girls-slider-description';
        
        this.init = function(){
            this.firstDisplay();
        }
        
        this.firstDisplay = function(){
            $(that.blocks).eq(0).css({'display':'block', 'opacity': 1}); //Делаем видимым первый блок
        }
        
        this.hide = function (index){
            
            $(that.blocks + ":visible").fadeOut(that.sppedAnimation); // hide visible foto 
            
        }
        
        this.show = function(index){
            $(that.blocks).eq(index).fadeIn(that.sppedAnimation); 
        }
        
        this.setNext = function(index){
            // index cur view element
            that.hide(index);
            that.show(index);
            
        }
        
        this.init();
    }
    
    
    jQuery.fn.wowSlider.SliderAdditional.getInstance = function() {
        
        if( typeof jQuery.fn.wowSlider.SliderAdditional.instanse !== "object" ) {
            
           jQuery.fn.wowSlider.SliderAdditional.instanse = new jQuery.fn.wowSlider.SliderAdditional();
           
        }
        
        return jQuery.fn.wowSlider.SliderAdditional.instanse;
    }
    
    new jQuery.fn.wowSlider.SliderAdditional();
    
}());


jQuery(function($){
    $(".ws_images ul li").on("click", function(){
        var id = $(this).attr('data-href');
        location.href = "/girl/view/"+id+"-url.html";
    });
})