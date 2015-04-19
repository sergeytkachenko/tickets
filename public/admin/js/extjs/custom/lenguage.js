var COOK_LENG = {
    number : jQuery.cookie("COOK_LENG") // Язык по-умолчанию
    
};


function setLenguageWindow(self, button, id) { // Установка языка, перезагрузка окон, с учетом нового языка 
    // self - ссылка на открытое окно
    
    var win = Ext.query("#"+id) ;
        
    $(win).find(".x-btn.active").removeClass("active"); // удаляем класс активной кнопки 
    button.addCls("active"); // На нажатую кнопку добавляем класс активной кнопки
    
    var curLenguage = button.lenguageId; // id текущего языка
    
    self.text = button.text;

    self.lenguage = parseInt(curLenguage);
    
}

function windowShow(self){
    // self- ссылка на название метода в окне 
    var lengId = self.lenguage; // индекс текущего языка 
    
    var button = $(".id" + lengId ).addClass("active"); // при открытие окна делаем кнопку активной 
    var text = button.find('span.x-btn-inner').html();
    self.text = text;
    
}


