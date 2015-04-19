Ext.define('MyDesktop.ConfigManager', {
    extend: 'Ext.ux.desktop.Module',

    id:'config-manager',

    init : function(){
        this.launcher = {
            text: 'Config',
            iconCls:'icon-grid',
            handler : this.createWindow,
            scope: this
        };
        
        this.grid = null;
        this.store = null;
        
        Ext.define('Config', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id', type: 'int'},
                'name', 'value',
                {name: 'is_visible', type: 'bool'}
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
                model: 'Config',
                proxy: {
                    type: 'ajax',
                    url: '/admin/config/getList.json',
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
                    text: "Key",
                    dataIndex: 'name',
                    width: 150,
                    sortable: true
                },{
                    text: "Value",
                    dataIndex: 'value',
                    width: 300,
                    sortable: true
                }]
            });
            
            var grid = this.grid;
        
            win = desktop.createWindow({
                id: id,
                title: 'config',
                width: 490,
                height: 480,
                iconCls: 'icon-grid',
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
                items: [
                    this.grid
                ],
                tbar:[{
                    iconCls: 'icon-add',
                    text: 'edit',
                    scope: this,
                    handler: function() {
                        var selection = grid.getView().getSelectionModel().getSelection()[0];

                        if (!selection) return;

                        this.createForm(selection.raw.id, selection.raw);
                    }
                }]
            });
            
            store.load();
        }
        win.show();
        
        
        return win;
    },
    
    onDeleteClick: function(){
        var selection = this.grid.getView().getSelectionModel().getSelection()[0];
        //this.createForm(selection.id);
        if (selection) {
        
            // Deleting here
            
            //this.grid.getStore().remove(selection);
        }
    },
    
    createForm : function(id, data){
        var desktop = this.app.getDesktop();
        var winId = 'config-manager-config-form-' + id;
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
                    anchor: '100%'
                },
                
                reader : Ext.create('Ext.data.reader.Json', {
                    model: 'Config'
                }),

                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Key *',
                    name: 'name',
                    allowBlank: false,
                    disabled: true
                },{
                	xtype: 'textfield',
                    fieldLabel: 'Value *',
                    name: 'value',
                    allowBlank: false
                }],

                buttons: [{
                    text: 'Save',
                    formBind: true,
                    handler: function(){
                        this.up('form').getForm().submit({
                            params: {
                                id: id
                            },
                            url: '/admin/config/save.json',
                            submitEmptyText: false,
                            waitMsg: 'Save...',
                            success: function(form, action) {
                                win.close();
                                self.store.load();
                            }
                        });
                    }
                }]
            });
            
            var title = (id == 'new' 
                ? 'New ..' 
                : 'Edit ' + data.name);
            
            win = desktop.createWindow({
                id: winId,
                title: title,
                width:500,
                height:200,
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
                    url: '/admin/config/getOne.json?id=' + data.id
                });
            }
            
        }
        win.show();
    }
});

