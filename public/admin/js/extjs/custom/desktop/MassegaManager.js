Ext.define('MyDesktop.MassegaManager', {
    extend: 'Ext.ux.desktop.Module',

    id:'massega-manager',

    init : function(){
        this.launcher = {
            text: 'Заказы',
            iconCls:'icon-grid',
            handler : this.createWindow,
            scope: this
        };
        
        this.grid = null;
        this.store = null;
        
        Ext.define('Massega', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id', type: 'int'},
                'author','email','content',
                {name: 'date', type: 'date'},
                {name: 'is_view', type: 'bool'}
            ],
            idProperty: 'id'
        });
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var id = this.id;
        var win = desktop.getWindow(id);
        
        if(!win) {
        
            // create the Data Store
            this.store = Ext.create('Ext.data.Store', {
                model: 'Massega',
                proxy: {
                    type: 'ajax',
                    url: '/admin/massega/get-list.json',
                    reader: {
                        type: 'json',
                        root: 'data',
                        totalProperty: 'totalcount'
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
                    text: "ID сообщения",
                    dataIndex: 'id',
                    width: 90,
                    align: 'center',
                    sortable: true
                },{
                    text: "Email",
                    dataIndex: 'email',
                    width: 150,
                    sortable: true
                },{
                    text: "Имя",
                    dataIndex: 'author',
                    width: 100,
                    sortable: true
                },{
                    text: "Дата",
                    dataIndex: 'date',
                    xtype: 'datecolumn',
                    format:'d.m.Y',
                    width: 100,
                    align: 'left',
                    sortable: true
                },{
                    text: "Обработанное",
                    trueText: "&radic;",
                    falseText: "",
                    xtype: 'booleancolumn',
                    dataIndex: 'is_view',
                    width: 100,
                    align: 'center',
                    sortable: true
                }]
            });
            
            var grid = this.grid;
        
            win = desktop.createWindow({
                id: id,
                title:'Сообщения',
                width:555,
                height:480,
                iconCls: 'icon-grid',
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
                items: [
                    this.grid
                ],
                tbar:[{
                    iconCls: 'icon-view',
                    text: 'Просмотреть запись',
                    scope: this,
                    handler: function() {
                        var selection = grid.getView().getSelectionModel().getSelection()[0];

                        if (!selection) return;

                        this.createForm(selection.raw.id, selection.raw);
                    }
                }, '-', {
                    iconCls: 'icon-delete',
                    text: 'Удалить',
                    scope: this,
                    handler: this.onDeleteClick
                }]
            });
            
            store.load();
        }
        win.show();
        
        
        return win;
    },
    
    onDeleteClick: function(){
        var selection = this.grid.getView().getSelectionModel().getSelection()[0];
        var store = this.store;

        if (!selection) return;

        Ext.MessageBox.confirm('Confirm', 'Удалить выбранную запись?', function(btn) {
            if (btn != 'yes') return;

            Ext.Ajax.request({
                url: '/admin/massega/remove.json?id=' + selection.raw.id,
                success: function() {
                    store.load();
                }
            });
        });
    },
    
    createForm : function(id, data){
        var desktop = this.app.getDesktop();
        var winId = 'massage-manager-article-form-' + id;
        var win = desktop.getWindow(winId);
        
        var self = this;
        if(!win){
            
            var form = Ext.widget('form', {
                store: data,
                waitMsgTarget: true,
                bodyPadding: 5,
                layout: {
                	type: 'anchor',
                    align: 'stretch'
                },
                autoScroll: true,
                border: false,
                bodyPadding: 10,

                fieldDefaults: {
                    labelAlign: 'right',
                    labelWidth: 85,
                    msgTarget: 'side',
                    anchor:'100%'
                },
                
                reader : Ext.create('Ext.data.reader.Json', {
                    model: 'Massega'
                }),

                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'ID Сообщения',
                    name: 'id',
                    disabled: true
                },{
                    fieldLabel: 'Дата',
                    name: 'date',
                    xtype: 'datefield',
                    format: 'd/m/Y',
                    submitFormat: 'Y-m-d',
                    disabled: true
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Имя',
                    name: 'author'
                    
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Email',
                    name: 'email'
                },{
                    xtype: 'textarea',
                    name: 'content',
                    fieldLabel: 'Сообщение',
                    height: 300,
                    tinymceConfig: {}
                },{
                    xtype: 'checkboxfield',
                    fieldLabel: 'Обработаный',
                    name: 'is_view',
                    inputValue: "1",
                    uncheckedValue: "0"
                }],                 
                
                buttons: [{
                    text: 'Сохранить',
                    formBind: true,
                    handler: function(){
                        this.up('form').getForm().submit({
                            params: {
                                id: id
                            },
                            url: '/admin/massega/save.json?id=' + data.id,
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

            var title = 'Просмотр Сообщения №' + data.id;
            
            win = desktop.createWindow({
                id: winId,
                title: title,
                width:740,
                height:480,
                iconCls: 'icon-form',
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
                items: [
                    form
                ]
            });
            
            form.getForm().load({
                url: '/admin/massega/get-one.json?id=' + data.id
            });
                        
        }
        win.show();
    }
});