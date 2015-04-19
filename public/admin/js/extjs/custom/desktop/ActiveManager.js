Ext.define('MyDesktop.ActiveManager', {
    extend: 'Ext.ux.desktop.Module',

    id:'active-manager',

    init : function(){
        this.launcher = {
            text: 'Статьи',
            iconCls:'icon-grid',
            handler : this.createWindow,
            scope: this
        };
        
        this.grid = null;
        this.store = null;
        
        Ext.define('Active', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id', type: 'int'},
                'title', 'url'
            ],
            idProperty: 'id'
        });
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var id = this.id;
        var win = desktop.getWindow(id);
        var self = this;
        if(!win) {

            this.store = Ext.create('Ext.data.Store', {
                model: 'Active',
                proxy: {
                    type: 'ajax',
                    url: '/admin/active/get-list.json',
                    reader: {
                        type: 'json',
                        root: 'data',
                        totalProperty: 'totalCount'
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
                    text: "Заголовок",
                    dataIndex: 'title',
                    width: 200,
                    sortable: true
                },{
                    text: "URL",
                    dataIndex: 'url',
                    width: 100,
                    sortable: true
                }]
            });
            
            var grid = this.grid;
        
            win = desktop.createWindow({
                id: id,
                title:'Наличие',
                width: 420,
                height: 400,
                iconCls: 'icon-grid',
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
                items: [
                    this.grid
                ],
                tbar:[{
                    iconCls: 'icon-add',
                    text: 'Новая запись',
                    scope: this,
                    handler: function() {
                        this.createForm('new');
                    }
                }, '-', {
                    iconCls: 'icon-add',
                    text: 'Редактировать запись',
                    scope: this,
                    handler: function() {
                        var selection = grid.getView().getSelectionModel().getSelection()[0];

                        if (!selection) return;

                        this.createForm(selection.raw.id, selection.raw);
                    }
                }, '-', {
                    iconCls: 'icon-remove',
                    text: 'Удалить',
                    scope: this,
                    handler: function() {
                        var selection = self.grid.getView().getSelectionModel().getSelection()[0];

                        if (!selection) return;

                        Ext.MessageBox.confirm('Confirm', 'Удалить выбранную запись?', function(btn) {
                            if (btn != 'yes') return;

                            self.store.remove(selection);

                            Ext.Ajax.request({
                                url: '/admin/active/delete-active.json?id=' + selection.raw.id,
                                params: {
                                    id: selection.raw.id
                                },
                                success: function() {

                                }
                            });
                        });
                    }
                }]
            });
            
            store.load();
        }
        win.show();
        
        
        return win;
    },
    
    createForm : function(id, data){
        var desktop = this.app.getDesktop();
        var winId = 'active-manager-active-form-' + id;
        var win = desktop.getWindow(winId);
        
        var self = this;
        
        if(!win){
        
            var form = Ext.widget('form', {
                waitMsgTarget: true,
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
                    model: 'Active'
                }),

                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Заголовок *',
                    name: 'title',
                    allowBlank: false
                },{
                    xtype: 'textfield',
                    fieldLabel: 'URL *',
                    name: 'url',
                    allowBlank: false
                }],

                buttons: [{
                    text: 'Сохранить',
                    formBind: true,
                    handler: function(){
                        this.up('form').getForm().submit({
                            params: {
                                id: id
                            },
                            url: '/admin/active/save.json',
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
            
            var title = (id == 'new' 
                ? 'Новая запись' 
                : 'Редактирование записи ' + data.name);
            
            win = desktop.createWindow({
                id: winId,
                title: title,
                width: 400,
                height: 400,
                iconCls: 'icon-form',
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
                items: [
                    form
                ]
            });
            
            if (id != 'new') {
                form.getForm().load({
                    url: '/admin/active/get-one.json?id=' + data.id
                });
            }
            
        }
        win.show();
    }
});