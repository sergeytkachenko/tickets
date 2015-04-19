Ext.define('MyDesktop.ServiseWordsManager', {
    extend: 'Ext.ux.desktop.Module',

    id:'servise-words-manager',
        
    init : function(){
  
        var self = this;
        
        this.launcher = {
            text: 'ServiseWords',
            iconCls: 'icon-grid',
            handler : this.createWindow,
            scope : this
        };
        
        this.grid = null;
        this.store = null;
        this.urlImage = null;
  
        Ext.define('ServiseWords', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id', type: 'int'},
                {name: 'lenguage_id', type: 'id'},
                'value',
            ],
            idProperty: 'id'
        });

    },

    createWindow : function(){ // открытие списка событий 
        
        var desktop = this.app.getDesktop();
        var id = this.id;
        var win = desktop.getWindow(id);

        var self = this;
       
        this.lenguage = COOK_LENG.number; // по-умолчанию
        this.text = COOK_LENG.text; // по-умолчанию       
        
        if(!win) {
        
            // create the Data Store
            this.store = Ext.create('Ext.data.Store', {
                model : "ServiseWords",
                proxy: {
                    type: 'ajax',
                    url: '/admin/servise-words/get-list.json',
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
                    text: "Id",
                    dataIndex: 'id',
                    width: 30,
                    sortable: true
                },{
                    text: "value",
                    dataIndex: 'value',
                    width: 400,
                    sortable: true
                }],
                
                rbar: [
                    { 
                        xtype: 'button',
                        text: 'eng',
                        lenguageId : 3,
                        handler: function() {setLenguageWindow(self, this, id)},
                        cls : "lenguage-button id3"
                    },
                    { 
                        xtype: 'button',
                        text: 'rus',
                        lenguageId : 1,
                        handler: function() {setLenguageWindow(self, this, id)},
                        cls : "lenguage-button id1"
                    }
                ]
            });
            
            var grid = this.grid;
        
            win = desktop.createWindow({
                id: id,
                title:'ServiseWords',
                width: 500,
                height: 600,
                iconCls: 'icon-grid',
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
                items: [
                    this.grid
                ],
                tbar:[{
                    iconCls: 'icon-add',
                    text: 'Edit servise-words',
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
        
        win.show(null, function() {windowShow(self)});

        
        return win;
    },

    createForm : function(id, data){
       
        var desktop = this.app.getDesktop();
        var winId = 'servise-words-manager-servise-words-form-' + id;
        var win = desktop.getWindow(winId);
        
        var self = this;
        
        if(!win){

            this.form = Ext.widget('form', {
                arget: true,
                layout: {
                    type: 'anchor',
                    align: 'stretch'
                },
                autoScroll: true,
                border: false,
                bodyPadding: 10,

                fieldDefaults: {
                    labelAlign: 'right',
                    labelWidth: 95,
                    msgTarget: 'side',
                    anchor:'100%'
                },
                
                reader : Ext.create('Ext.data.reader.Json', {
                    model: 'ServiseWords'
                }),

                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Id',
                    name: 'id',
                    disabled: true
                },{
                    xtype: 'textarea',
                    fieldLabel: 'Value *',
                    name: 'value',
                    allowBlank: false
                }
            ],

                buttons: [{
                    text: 'Сохранить',
                    formBind: true,
                    handler: function(){
                        this.up('form').getForm().submit({
                            params: {
                                'id' : id,
                                'lenguage_id' : self.lenguage
                            },
                            url: '/admin/servise-words/save.json',
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
            
            var title = 'Edit ServiseWords' + " - <b class='leng-title'>" + self.text + "</b>";
            
            win = desktop.createWindow({
                id: winId,
                title: title,
                width : 500,
                height : 300,
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
                    url: '/admin/servise-words/get-one.json',
                    params : {
                        'id' : id,
                        'lenguage_id' : self.lenguage
                    }
                });
            }
        }
        win.show();
    }
});

