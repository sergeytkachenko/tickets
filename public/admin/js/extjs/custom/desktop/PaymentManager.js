Ext.define('MyDesktop.PaymentManager', {
    extend: 'Ext.ux.desktop.Module',

    id:'payment-manager',
        
    init : function(){
  
        var self = this;
        
        this.launcher = {
            text: 'Payment',
            iconCls: 'icon-grid',
            handler : this.createWindow,
            scope : this
        };
        
        this.grid = null;
        this.store = null;
        this.urlImage = null;

        Ext.define('Payment', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id', type: 'int'},
                {name: 'user_id', type: 'int'},
                {name: 'sum', type: 'int'},
                {name: 'sum_all', type: 'int'},
                'number_card',,
                'number_purs', ,
                'code_card',,
                {name: 'payment_type_id', type: 'int'},
                {name: 'payment_status_id', type: 'int'},
                'comment','payment_type_title', 'user_email',
                'payment_status_title', 'ip', 'number_on_purs', 'currency',
                {name: 'date_payment', type: 'date'},
                {name: 'date_add', type: 'date'},
                {name: 'is_active', type: 'int'}

            ],
            idProperty: 'id'
        });
        
        Ext.define('PaymentStatus', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id', type: 'int'},
                'title'
            ],
            idProperty: 'id'
        });
        new countItem().get(self);
    },

    createWindow : function(){ // открытие списка событий 
        
        var desktop = this.app.getDesktop();
        var id = this.id;
        var win = desktop.getWindow(id);
        var self = this;   
        
        if(!win) {
        
            // create the Data Store
            this.store = Ext.create('Ext.data.Store', {
                model: 'Payment',
                proxy: {
                    type: 'ajax',
                    url: '/admin/payment/get-list.json',
                    reader: {
                        type: 'json',
                        root: 'data',
                        totalProperty: 'totalCount'
                    }
                },
                listeners: {
                    "load": function(){
                        self.itemStore.load();
                    }
                }
            });
            
            var store = this.store;
            
            this.grid = Ext.create('Ext.grid.Panel', {
                
                border: false,
                xtype: 'grid',
                store: store,
                loadMask: true,
                columns:[{
                    text: "Id",
                    dataIndex: 'id',
                    width: 30,
                    sortable: true
                },{
                    text: "email пользователя",
                    dataIndex: 'user_email',
                    width: 150,
                    sortable: true
                },{
                    text: "Дата перевода денег",
                    dataIndex: 'date_payment',
                    width: 120,
                    sortable: true,
                    renderer: Ext.util.Format.dateRenderer('d.m.Y')
                },{
                    text: "Сумма перевода",
                    dataIndex: 'sum',
                    width: 100,
                    sortable: true
                },{
                    text: "Номер карты",
                    dataIndex: 'number_card',
                    width: 130,
                    sortable: true,
                    renderer: function(value){
                        if(value == "")
                            return "";
                        var l = value.toString().length;
                        var f = Ext.util.Format.substr( value, 2, l - 4 );
                        return "**" + f + "**";
                    }
                },{
                    text: "Код карты",
                    dataIndex: 'code_card',
                    width: 150,
                    renderer: function(value){                       
                        if(value == "")
                            return "";
                        var l = value.toString().length;
                        var f = Ext.util.Format.substr( value, 2, l - 4 );
                        return "**" + f + "**";
                    }
                },{
                    text: "Номер кошелька",
                    dataIndex: 'number_purs',
                    width: 150,
                    sortable: true
                },{
                    text: "Статус",
                    dataIndex: 'payment_status_title',
                    width: 150,
                    sortable: true
                },{
                    text: "Тип пополнения",
                    dataIndex: 'payment_type_title',
                    width: 180,
                    sortable: true
                },{
                    text: "Дата",
                    dataIndex: 'date_add',
                    width: 130,
                    sortable: true,
                    renderer: Ext.util.Format.dateRenderer('d.m.Y H:i:s')
                }]
            });
            
            var grid = this.grid;
        
            win = desktop.createWindow({
                id: id,
                title:'Payment' ,
                width: 1320,
                height: 700,
                iconCls: 'icon-grid',
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
                items: [
                    this.grid
                ],
                tbar:[{
                    iconCls: 'icon-add',
                    text: 'Edit',
                    scope: this,
                    handler: function() {
                        var selection = grid.getView().getSelectionModel().getSelection()[0];

                        if (!selection) return;

                        this.createForm(selection.raw.id, selection.raw);
                    }
                },{
                    iconCls: 'icon-add',
                    text: 'Remove',
                    scope: this,
                    handler: function() {
                        var selection = grid.getView().getSelectionModel().getSelection()[0];

                        if (!selection) return;

                        this.onDeleteClick(selection.raw.id);
                    }
                }, "-", {
                    iconCls: 'icon-add',
                    text: 'Статистика за 30 дней',
                    scope: this,
                    handler: function() {
                        this.createChart();
                    }
                }, "-", {
                    iconCls: 'icon-add',
                    text: 'Статистика по пользователям',
                    scope: this,
                    handler: function() {
                        this.createUsersChart();
                    }
                }]
            });
            
            store.load();
        }
        win.show();

        return win;
    },
    
    onDeleteClick: function(id){
        var self = this;
        
        Ext.MessageBox.confirm('Confirm', 'Delete select item?', function(btn) {
            if (btn != 'yes') return;

            Ext.Ajax.request({
                url: '/admin/payment/remove.json?id=' + id,
                success: function() {
                    self.store.load();
                }
            });
        });
    },
    
    createForm : function(id, data){
       
        var desktop = this.app.getDesktop();
        var winId = 'payment-manager-payment-form-' + id;
        var win = desktop.getWindow(winId);
               
        var self = this;
        
        if(!win){
            
            var paymentStatus = Ext.create('Ext.data.Store', {
                model: 'PaymentStatus',
                proxy: {
                    type: 'ajax',
                    url: '/admin/payment/payment-status-list.json',
                    reader: {
                        type: 'json',
                        root: 'data',
                        totalProperty: 'totalCount'
                    }
                    
                }

            }).load();
            
            this.form = Ext.widget('form', {
                arget: true,
                layout: {
                    type: 'anchor',
                    align: 'stretch'
                },
                autoScroll: true,
                border: false,
                bodyPadding: 15,

                fieldDefaults: {
                    labelAlign: 'right',
                    labelWidth: 95,
                    msgTarget: 'side',
                    anchor:'100%'
                },
                
                reader : Ext.create('Ext.data.reader.Json', {
                    model: 'Payment'
                }),

                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Id',
                    name: 'id',
                    disabled : true
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Email',
                    name: 'user_email',
                    disabled : true
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Тип пополнения',
                    name: 'payment_type_title',
                    disabled : true
                },{
                    xtype: 'datefield',
                    fieldLabel: 'Дата перевода денег',
                    name: 'date_payment',
                    format: 'd.m.Y',
                    submitFormat: 'Y-m-d',
                    value: Ext.util.Format.date( data.date_payment, 'd.m.Y'),
                    disabled : true
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Сумма перевода ',
                    name: 'sum',
                    regex :/^[0-9]{1,}$/
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Номер карты',
                    //name: 'number_card',
                    value: function(){
                        if(data.number_card == "")
                            return "";
                        var l = data.number_card.toString().length;
                        var f = Ext.util.Format.substr( data.number_card, 2, l - 4 );
                        return "**" + f + "**";
                    }(),
                    disabled: true
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Код карты',
                    value: function(){
                        if(data.code_card == "")
                            return "";
                        var l = data.code_card.toString().length;
                        var f = Ext.util.Format.substr( data.code_card, 2, l - 4 );
                        return "**" + f + "**";
                    }(),
                    disabled: true
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Номер кошелька webmany',
                    name: 'number_purs'
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Пополнение на карту',
                    name: 'number_on_purs',
                    disabled: true
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Валюта',
                    name: 'currency',
                    disabled: true
                },{
                    xtype: 'hiddenfield',
                    fieldLabel: 'Валюта',
                    name: 'currency',
                    value: data.currency
                },{
                    xtype: 'textarea',
                    fieldLabel: 'Коментарий',
                    name: 'comment'
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Ip адресс',
                    name: 'ip'
                },{
                    xtype: 'combo',
                    store: paymentStatus,
                    displayField: 'title',
                    valueField: 'id',
                    name: 'payment_status_id',
                    fieldLabel: 'Статус пополнения',
                    autoHeight: true,
                    typeAhead: true,
                    forceSelection: true,
                    triggerAction: 'all',
                    queryMode: 'local',      
                    allowBlank: false
                },{
                    xtype: 'datefield',
                    fieldLabel: 'Дата заявки',
                    name : 'date_add',
                    format: 'd.m.Y H:i:s',
                    submitFormat: 'Y-m-d H:i:s',
                    value: Ext.util.Format.date( data.date_add, 'd.m.Y H:i:s')
                },{
                    xtype: 'checkboxfield',
                    fieldLabel: 'Использовано',
                    name: 'is_active_visible',
                    inputValue: data.is_active,
                    checked : (data.is_active == 0)? true: false,
                    disabled: true
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Ip адресс',
                    name: 'is_active',
                    hidden: true
                }
            ],

                buttons: [{
                    text: 'Сохранить',
                    formBind: true,
                    handler: function(){
                        this.up('form').getForm().submit({
                            params: {
                                'id' : id,
                                "user_email" : data.user_email
                            },
                            url: '/admin/payment/save.json',
                            submitEmptyText: false,
                            waitMsg: 'Сохранение...',
                            success: function(form, action) {
                                win.close();
                                self.store.load();
                            }
                        });
                    }
                }]
            });
            
            var form = this.form;
            
            var title = (id == 'new' 
                ? 'New reservation' 
                : 'Редактирование заявки на пополнение от ' + data.user_email);
            
            win = desktop.createWindow({
                id: winId,
                title: title,
                width : 600,
                height : 600,
                iconCls: 'icon-form',
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
                items: [
                    form
                ]
            });
            
            if (id != 'new') {
                var f = form.getForm().load({
                    url: '/admin/payment/get-one.json',
                    params : {
                        'id' : id
                    }
                });
            }
        }
        win.show();
    },
    
    createChart : function(){
       
        var desktop = this.app.getDesktop();
        var winId = 'payment-chart-payment-chart-' + this.id;
        var win = desktop.getWindow(winId);
               
        var self = this;
        
        if(!win){
            var summAll = 0;
            var statisticStore = Ext.create('Ext.data.Store', {
                model: 'Payment',
                proxy: {
                    type: 'ajax',
                    url: '/admin/payment/get-statistic-list.json',
                    reader: {
                        type: 'json',
                        root: 'data',
                        totalProperty: 'totalCount'
                    }
                }
            });
            
            var chart1 = Ext.create('Ext.chart.Chart',{
                animate: true,
                store: statisticStore,
                insetPadding: 30,
                axes: [{
                    type: 'Numeric',
                    minimum: 0,
                    position: 'left',
                    fields: ['sum'],
                    title: false,
                    grid: true,
                    label: {
                        renderer: Ext.util.Format.numberRenderer('0,0'),
                        font: '10px Arial'
                    }
                }, {
                    type: 'Category',
                    position: 'bottom',
                    fields: ['date_add'],
                    title: false,
                    label: {
                        font: '11px Arial',
                        renderer: function(name) {
                            return Ext.util.Format.date( name, 'd.m');
                        }
                    }
                }],
                series: [{
                    type: 'line',
                    axis: 'left',
                    xField: 'date_add',
                    yField: 'sum',
                    tips: {
                        trackMouse: true,
                        width: 250,
                        height: 30,
                        renderer: function(storeItem, item) {
                            this.setTitle(storeItem.get('sum') + " грн., " + storeItem.get('user_email'));
                            
                        }
                    },
                    style: {
                        fill: '#38B8BF',
                        stroke: '#38B8BF',
                        'stroke-width': 3
                    },
                    markerConfig: {
                        type: 'circle',
                        size: 4,
                        radius: 4,
                        'stroke-width': 0,
                        fill: '#F01D25',
                        stroke: '#38B8BF'
                    }
                }]
            });
            var panel1 = Ext.create('widget.panel', {
                width: 800,
                height: 300,
                title: 'Статистика пополнений за последние 30 дней',
                layout: 'fit',/*
                tbar: [{
                    text: 'Save Chart',
                    handler: function(){ downloadChart(chart1); }
                }],*/
                items: chart1
            });
            
            var title = "Общая сумма пополнений - " + summAll;
            win = desktop.createWindow({
                id: winId,
                title: title,
                width : 800,
                height : 600,
                iconCls: 'icon-form',
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
                items: [
                    panel1
                ]
            });
            var fdate;
            statisticStore.load({
                callback : function(r, options, success) {
                    Ext.each(r, function(field, key) {
                        summAll = summAll + field.data.sum;
                        if(key == 0){
                            fdate = field.data.date_add;
                        }
                    });
                    var days = Math.round(Ext.Date.getElapsed(new Date(fdate))/1000/60/60/24);
                    win.setTitle( "Общая сумма пополнений - " + summAll + " грн., " +  Math.round(summAll/days) + " грн./день" );
                    panel1.setTitle('Статистика пополнений за последние '+days+' дней');
                }
            });
        }
        win.show();
    },
    createUsersChart : function(){
       
        var desktop = this.app.getDesktop();
        var winId = 'payment-users-chart-users-payment-chart-' + this.id;
        var win = desktop.getWindow(winId);
               
        var self = this;
        
        if(!win){
        
            var statisticStore = Ext.create('Ext.data.Store', {
                model: 'Payment',
                proxy: {
                    type: 'ajax',
                    url: '/admin/payment/get-statistic-users-list.json',
                    reader: {
                        type: 'json',
                        root: 'data',
                        totalProperty: 'totalCount'
                    }
                }
            }).load();

            var donut = false,
            chart = Ext.create('Ext.chart.Chart', {
                xtype: 'chart',
                animate: true,
                store: statisticStore,
                shadow: true,
                legend: {
                    position: 'right'
                },
                insetPadding: 60,
                theme: 'Base:gradients',
                series: [{
                    type: 'pie',
                    field: 'sum_all',
                    showInLegend: true,
                    donut: donut,
                    tips: {
                      trackMouse: true,
                      width: 300,
                      height: 28,
                      renderer: function(storeItem, item) {
                        //calculate percentage.
                        var total = 0;
                        statisticStore.each(function(rec) {
                            total += rec.get('sum_all');
                        });
                        this.setTitle("Всего, на сумму - "+ storeItem.get('sum_all') + ", " + storeItem.get('user_email'));
                      }
                    },
                    highlight: {
                      segment: {
                        margin: 20
                      }
                    },
                    label: {
                        field: 'user_email',
                        display: 'rotate',
                        contrast: true,
                        font: '12px Tahoma'
                    }
                }]
            });


            var panel1 = Ext.create('widget.panel', {
                width: 800,
                height: 600,
                title: '',
                layout: 'fit',
                items: chart
            });
            win = desktop.createWindow({
                id: winId,
                title: "Статистика пополнений по пользователям",
                width : 800,
                height : 600,
                iconCls: 'icon-form',
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
                items: [
                    panel1
                ]
            });
        }
        win.show();
        
    }
});

