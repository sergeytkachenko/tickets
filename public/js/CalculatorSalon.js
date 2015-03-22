/**
*
* Калькулятор стоимости размещения салонов
*
*/
Ext.onReady(function () {
    $(".form-controll input[name='salon-id']").each(function (i, value) {
        var place = $(value).attr("data-place");
        setCalculation($(value).val(), place);
    });
});

function setCalculation(salonID, place) {
    var DistinctPlace,
        calculation;
    Ext.define('DistinctPlace', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'index', type: 'int'},
            {name: 'countCap', type: 'int'}
        ],
        idProperty: ['index']
    });

    var distinctPlace = Ext.create('Ext.data.Store', {
        model: 'DistinctPlace',
        proxy: {
            type: 'ajax',
            url: '/user/get-distinct-place-salon.json?salonID='+salonID,
            reader: {
                type: 'json',
                root: 'data',
                totalProperty: 'totalCount'
            }
        }
    }).load();

    Ext.define("Calculator",{

        formChange : function () {
            var self = this;
            Ext.Ajax.request({
                params : self.form.getForm().getFieldValues(),
                url: '/user/place-salon.json?salonID='+salonID,
                success: function(respons) {
                    var data = Ext.JSON.decode(respons.responseText);
                    self.form.getChildByElement("position-salon-"+salonID).setValue(data.position);
                }
            });
        },
        initForm : function () {
            var self = this;
            var titleBtn = (place==="1")? "Поднять" : "Разместить и поднять";
            this.form = Ext.create('Ext.form.Panel', {
                cls : "up-anket",
                title : "Поднятие салона",
                width: 300,
                bodyPadding: 5,
                border: 0,
                renderTo : "place-salon-"+salonID,
                fieldDefaults: {
                    labelAlign: 'left',
                    labelWidth: 120,
                    anchor: '100%'
                },
                items: [ {
                    xtype: 'textfield',
                    name: 'place_type_id',
                    value: 1,
                    hidden: true
                },{
                    xtype: 'numberfield',
                    width: 275,
                    padding: 0,
                    name: 'daysPlace',
                    fieldLabel: 'Строк размещения',
                    value: 5,
                    maxValue: 300,
                    minValue: 1,
                    id : "strok-"+salonID,
                    hidden : true,
                    cls : "myCls",
                    style : {
                        "height" : 400
                    },
                    listeners : {
                        change : function () {
                            self.formChange();
                        }
                    }
                }, {
                    xtype: 'numberfield',
                    name: 'countCap',
                    fieldLabel: 'Количество звезд',
                    value: '0',

                    listeners : {
                        change : function () {
                            self.formChange();
                        }
                    },
                    style: {
                        opacity : 1
                    },
                    value: 0,
                    maxValue: 3000,
                    minValue: 0
                },{
                    xtype: 'textfield',
                    name: 'numberfield',
                    fieldLabel: 'Желаемая позиция',
                    allowBlank: false,  // requires a non-empty value
                    value: 0,
                    disabled: true,
                    id : "position-salon-"+salonID
                }],
                buttons: [{
                    text: titleBtn,
                    margin: "0 10 0 0",
                    formBind: true,
                    handler: function(){
                        this.up('form').getForm().submit({
                            url: '/user/up-salon.json?salonID='+salonID,
                            submitEmptyText: false,
                            waitMsg: 'Подождите...',
                            success: function(form, action) {
                                var response = action.response.responseText;
                                response = Ext.JSON.decode(response);
                                if(null!==response && response.success===true) {
                                    location.reload();
                                } else {
                                    Ext.Msg.alert("Ошибка", "При сохранение произошла непредвиденная ошибка.");
                                }
                            }
                        });
                    }
                }]
            });
        },
        init : function () {
            this.initForm();
            //this.formChange();
        },
        constructor: function () {
            this.init();
            return this;
        }
    });

    if(Ext.get("place-salon-"+salonID)) {
        calculation = new Calculator;
    }
}