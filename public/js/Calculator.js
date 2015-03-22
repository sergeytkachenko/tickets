/**
*
* Калькулятор стоимости размещения анкет
*
*/
Ext.onReady(function () {
    $(".form-controll input[name='profile-id']").each(function (i, value) {
        var place = $(value).attr("data-place");
        setCalculation($(value).val(), place);
    });
});

function setCalculation(anketID, place) {
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
            url: '/user/get-distinct-place.json?anketID='+anketID,
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
                url: '/user/place.json?anketID='+anketID,
                success: function(respons) {
                    var data = Ext.JSON.decode(respons.responseText);
                    console.log(data);
                    self.form.getChildByElement("position-"+anketID).setValue(data.position);
                }
            });
        },
        initForm : function () {
            var self = this;
            var titleBtn = (place==="1")? "Поднять" : "Разместить и поднять";
            this.form = Ext.create('Ext.form.Panel', {
                cls : "up-anket",
                title : "Поднятие",
                width: 300,
                bodyPadding: 5,
                border: 0,
                renderTo : "place-anket-"+anketID,
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
                    id : "strok-"+anketID,
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
                    id : "position-"+anketID
                }/*,{
                    xtype: 'combo',
                    store: distinctPlace,
                    displayField: 'index',
                    valueField: 'index',
                    name: 'numberfield',
                    fieldLabel: 'Желаемая позиция',
                    autoHeight: true,
                    typeAhead: true,
                    forceSelection: true,
                    triggerAction: 'all',
                    queryMode: 'local',
                    allowBlank: false,
                    listeners : {
                        beforerender: function (me) {
                            me.select(1);
                        },
                        change : function () {
                            self.formChange();
                        }
                    }
                }*/],
                buttons: [{
                    text: titleBtn,
                    margin: "0 10 0 0",
                    formBind: true,
                    handler: function(){
                        this.up('form').getForm().submit({
                            url: '/user/up-anket.json?anketID='+anketID,
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

    Ext.define("VipCalculator",{

        formChange : function () {
            var self = this;
            Ext.Ajax.request({
                params : self.form.getForm().getFieldValues(),
                url: '/user/place-vip.json?anketID='+anketID,
                success: function(respons) {
                    var data = Ext.JSON.decode(respons.responseText);
                    self.form.getChildByElement("countZv-vip-"+anketID).setValue(data.countCap);
                }
            });
        },
        initForm : function () {
            var self = this;

            this.form = Ext.create('Ext.form.Panel', {
                cls : "up-anket",
                title : "Разместить в ВИП",
                width: 300,
                bodyPadding: 5,
                border: 0,
                renderTo : "place-anket-vip-"+anketID,
                fieldDefaults: {
                    labelAlign: 'left',
                    labelWidth: 120,
                    anchor: '100%'
                },
                items: [ {
                    xtype: 'textfield',
                    name: 'place_type_id',
                    value: 2,
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
                    id : "strok-vip-"+anketID,

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
                    xtype: 'textfield',
                    name: 'countCap',
                    fieldLabel: 'Количество звезд',
                    value: '0',
                    id : "countZv-vip-"+anketID,
                    listeners : {
                        change : function () {
                            self.formChange();
                        }
                    },
                    disabled: true,
                    style: {
                        opacity : 1
                    }
                }],
                buttons: [{
                    text: 'Разместить в ВИП',
                    margin: "0 10 0 0",
                    formBind: true,
                    handler: function(){
                        this.up('form').getForm().submit({
                            url: '/user/placing-anket.json?anketID='+anketID,
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
            this.formChange();
        },
        constructor: function () {
            this.init();
            return this;
        }
    });

    Ext.define("VipCalculatorExtend",{

        formChange : function () {
            var self = this;
            Ext.Ajax.request({
                params : self.form.getForm().getFieldValues(),
                url: '/user/place-vip.json?anketID='+anketID,
                success: function(respons) {
                    var data = Ext.JSON.decode(respons.responseText);
                    self.form.getChildByElement("countZv-vip-"+anketID).setValue(data.countCap);
                }
            });
        },
        initForm : function () {
            var self = this;

            this.form = Ext.create('Ext.form.Panel', {
                cls : "up-anket",
                title : "Продлить ВИП",
                width: 300,
                bodyPadding: 5,
                border: 0,
                renderTo : "extend-vip-"+anketID,
                fieldDefaults: {
                    labelAlign: 'left',
                    labelWidth: 120,
                    anchor: '100%'
                },
                items: [ {
                    xtype: 'textfield',
                    name: 'place_type_id',
                    value: 2,
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
                    id : "strok-vip-"+anketID,

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
                    xtype: 'textfield',
                    name: 'countCap',
                    fieldLabel: 'Количество звезд',
                    value: '0',
                    id : "countZv-vip-"+anketID,
                    listeners : {
                        change : function () {
                            self.formChange();
                        }
                    },
                    disabled: true,
                    style: {
                        opacity : 1
                    }
                }],
                buttons: [{
                    text: 'Продлить ВИП',
                    margin: "0 10 0 0",
                    formBind: true,
                    handler: function(){
                        this.up('form').getForm().submit({
                            url: '/user/extend-placing-vip.json?anketID='+anketID,
                            submitEmptyText: false,
                            waitMsg: 'Подождите...',
                            success: function(form, action) {
                                var response = action.response.responseText;
                                response = Ext.JSON.decode(response);
                                if(null!==response && response.success===true) {
                                    Ext.Msg.alert("Ответ от сервера", response.message, function () {
                                        location.reload();
                                    });

                                } else {
                                    Ext.Msg.alert("Ошибка", "При продлении анкеты произошла непредвиденная ошибка.");
                                }
                            }
                        });
                    }
                }]
            });
        },
        init : function () {
            this.initForm();
            this.formChange();
        },
        constructor: function () {
            this.init();
            return this;
        }
    });
    if(Ext.get("place-anket-"+anketID)) {
        calculation = new Calculator;
    }
    if(Ext.get("place-anket-vip-"+anketID)) {
        vipCalculator = new VipCalculator;
    }
    if(Ext.get("extend-vip-"+anketID)) {
        vipCalculatorExtend = new VipCalculatorExtend;
        console.log(vipCalculatorExtend);
    }
}