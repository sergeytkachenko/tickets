
//function addComment(that){
//    var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Отправка..."});
//    myMask.show();
//    var url = $(that).attr("action");
//    Ext.Ajax.request({
//        url: url+"?"+$(that).serialize(),
//        success: function(response){
//            Ext.Msg.alert('Ответ от сервера', response.responseText);
//            $(that).find("a.updateCapcha").trigger("click");
//        },
//        callback: function(){
//            myMask.hide();
//        }
//    });
//}

function addFeedback(that){
    var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Отправка..."});
    myMask.show();
    var url = $(that).attr("action"),
        email = $(that).find("input[name='email']").val(),
        capcha = $(that).find("input[name='capcha']").val(),
        message = $(that).find("textarea[name='message']").val();

    Ext.Ajax.request({
        url: url,
        params: {
            "email":email, 
            "capcha": capcha, 
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
$(document).ready(function(){
    $(".extended-profile,.extended-salon").on("click", function(){
     
    var metype = $(this).attr("class").split("-")[1],
        profileId = $(this).parents(".form-controll").find("input[name="+metype+"-id]").val();
        
    var states = Ext.create('Ext.data.Store', {
        fields: ['id'],
            data : [
                {"id":"2"},
                {"id":"5"},
                {"id":"10"},
                {"id":"15"},
                {"id":"20"},
                {"id":"25"},
                {"id":"30"},
                {"id":"35"},
                {"id":"40"},
                {"id":"50"},
                {"id":"60"},
                {"id":"80"},
                {"id":"110"},
                {"id":"150"},
                {"id":"200"},
                {"id":"280"},
                {"id":"365"}
            ]
        });

        var combo = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Количество дней',
            store: states,
            queryMode: 'local',
            displayField: 'id',
            valueField: 'id',
            allowBlank: false,
            name: "days"
        });
        var form = Ext.widget('form', {
            arget: true,
            layout: {
                type: 'anchor',
                align: 'stretch'
            },
            autoScroll: true,
            border: false,
            bodyPadding: 25,

            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 100,
                msgTarget: 'side',
                anchor:'100%'
            },

            items: [combo],

            buttons: [{
                text: 'Продление размещения',
                formBind: true,
                handler: function(){   
                    var that = this;
                    Ext.Msg.confirm('Предупреждение', 'С вашегего счета будут списаны средства, продолжить?', function(button){
                        if(button == "yes"){
                            that.up('form').getForm().submit({
                                url: '/user/'+metype+'-recovery.json',
                                params: {
                                    "profileId" : profileId
                                },
                                submitEmptyText: false,
                                waitMsg: 'Сохранение...',

                                failure: function(form, action, saccess) {
                                    win.close();
                                    Ext.Msg.alert("Ответ от сервера", action.result, function(){
                                        location.href = location.href;
                                    });
                                }
                            });
                        }
                    });
                }
            }]
        }); 
        var win = Ext.create('Ext.window.Window', {
            title: 'Продление размещения',
            height: 150,
            width: 400,
            layout: 'fit',
            items: [form]
        }).show();

    });
});

  
$("form[name='password-recovery']").on("submit", function(event){
    event.preventDefault();
    
    var url = $(this).attr("action"),
        params = $(this).serialize(),
        password = $(this).find("input[name='password']").val(),
        confirm = $(this).find("input[name='confirm']").val();
    
    if(password == ""){
        Ext.Msg.alert("Ошибка", "Пожалуйста, введите пароль");
        return;
    }
    
    if(password !== confirm){
        Ext.Msg.alert("Ошибка", "Пароли не совпадают, пожалуйста повторите попытку");
        return;
    }
    var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Отправка..."});
    myMask.show();
    
    Ext.Ajax.request({
        url: url+"?"+params,
        success: function(response){
            var data = Ext.JSON.decode(response.responseText);
            Ext.Msg.alert('Ответ от сервера', data.result);
            
        },
        callback: function(){
            myMask.hide();
        }
    });
});

$("form[name='password-reset'] button").on("click", function(){
    var that = $(this).parents("form"),
        url = $(that).attr("action"),
        params = $(that).serialize(),
        email = $(that).find("input[name='email']").val(),
        capcha = $(that).find("input[name='capcha']").val();
    
    if(email == ""){
        Ext.Msg.alert("Ошибка", "Пожалуйста, введите email");
        return;
    }
    if(capcha == ""){
        Ext.Msg.alert("Ошибка", "Пожалуйста, введите проверочный код");
        return;
    }
    var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Отправка..."});
    myMask.show();
    
    Ext.Ajax.request({
        url: url+"?"+params,
        success: function(response){
            var data = Ext.JSON.decode(response.responseText);
            Ext.Msg.alert('Ответ от сервера', data.result);
            
        },
        callback: function(){
            $(that).find("a.updateCapcha").trigger("click");
            myMask.hide();
            
        }
    });
});

Ext.onReady (function(){
    
    var typePlace = Ext.create('Ext.data.Store', {
        fields: [{'name': 'id', type: 'int'}, 'title'],
        proxy: {
            type: 'ajax',
            url: '/user/get-type-anket-list.json',
            reader: {
                type: 'json',
                root: 'data',
                totalProperty: 'totalCount'
            }
        }
    }).load();
    
    $(".post-kabinet").each(function(i,value){
        var anketId = $(this).find("input[name='profile-id']").val(),
            typeId = $(this).find("input[name='type_anket_id']").val();
        if($("#type-anket-"+anketId).length > 0){
            setTypeAnket(typeId,anketId, typePlace);
        }
        
    });
});

function setTypeAnket(typeId, anketId, typePlace){
    typeId = parseInt(typeId);
    $("p#type-anket-"+anketId+" img").remove();
    
    var cb = Ext.create('Ext.form.ComboBox', {
        fieldLabel: 'Тип',
        store: typePlace,
        queryMode: 'local',
        displayField: 'title',
        valueField: 'id',
        renderTo: "type-anket-"+anketId,
        labelWidth: 30,
        width: 120
    });
    
    typePlace.on("datachanged", function(a,b){
        var valueField = cb.valueField;
        var recordNumber = typePlace.findExact(valueField, typeId);
        cb.setValue(cb.getStore().getAt(recordNumber));
        cb.on("change", function(cb, newValue, oldValue, options){
            
            if(oldValue !== newValue && newValue !== typeId){
                Ext.Msg.confirm("Сообщение", "Вы действительно хотите изменить \
                    статус анкеты на: '"+cb.getRawValue( )+"' ?",function(button){
                    if (button === 'yes') {
                        Ext.Msg.confirm("Сообщение", "Если вы переходите на \
                            более дорогой тариф, то с Вашего счета будут списана \
                            соответствующая сумма, с учетом текущего размещения \
                            анкеты.<br/>Если на более дешовый, то на ваш счет будет \
                            возвращена разница. Согласны?",function(button){
                            if (button === 'yes') {
                                var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Отправка..."});
                                myMask.show();

                                Ext.Ajax.request({
                                    url: "/user/set-type-profile.json",
                                    params:{
                                        profileId : anketId,
                                        typeAnketId : newValue
                                    },
                                    success: function(response){
                                        var data = Ext.JSON.decode(response.responseText);
                                        console.log(data);
                                        Ext.Msg.alert('Ответ от сервера', data.result, function(btn){
                                            location.href = location.href;
                                        });
                                    },
                                    callback: function(){
                                        myMask.hide();
   
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    });
}