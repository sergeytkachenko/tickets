Ext.define('MyDesktop.ContactManager', {
    extend: 'Ext.ux.desktop.Module',

    id:'contact-manager',
        
    init : function(){
  
        var self = this;
        
        this.launcher = {
            text: 'Contact',
            iconCls: 'icon-grid',
            handler : this.createWindow,
            scope : this
        };
        
        this.grid = null;
        this.store = null;
        this.urlImage = null;
  
        Ext.define('Contact', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id', type: 'int'},
                {name: 'lenguage_id', type: 'id'},
                'left_block','map'
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
                fields: [
                    {name: 'id', type: 'int'},
                    {name: 'title',  type: 'string'}               
                ],
                data: [
                    {id: 1, title: 'Contact Page'},
                ]
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
                    width: 50,
                    sortable: true
                },{
                    text: "title",
                    dataIndex: 'title',
                    width: 200,
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
                title:'Contact',
                width: 400,
                height: 300,
                iconCls: 'icon-grid',
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
                items: [
                    this.grid
                ],
                tbar:[{
                    iconCls: 'icon-add',
                    text: 'Edit contact',
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
        this.win = win;
        
        return win;
    },

    createForm : function(id, data){
       
        var desktop = this.app.getDesktop();
        var winId = 'contact-manager-contact-form-' + id;
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
                bodyPadding: 15,

                fieldDefaults: {
                    labelAlign: 'right',
                    labelWidth: 95,
                    msgTarget: 'side',
                    anchor:'100%'
                },
                
                reader : Ext.create('Ext.data.reader.Json', {
                    model: 'Contact'
                }),

                items: [{
                    xtype: 'textarea',
                    fieldLabel: 'Map *',
                    name: 'map',
                    allowBlank: false
                },{
                    xtype: 'tinymcefield',
                    name: 'left_block',
                    fieldLabel: 'Left Block *',
                    height: 300,
                    tinymceConfig: {
                        theme_advanced_buttons1 : "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,styleselect,formatselect,fontselect,fontsizeselect",
                        theme_advanced_buttons2 : "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,preview,|,forecolor,backcolor",
                        theme_advanced_buttons3 : "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,media,advhr,|,print,|,insertfile,insertimage",
                        theme_advanced_buttons4: '',
                        skin: 'o2k7',
                        file_browser_callback : 'myFileBrowser',
                        remove_script_host : false,
                        convert_urls : false,
                        init_instance_callback : "showEditor"
                    },
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
                            url: '/admin/contact/save.json',
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
            
            var title = 'Edit Contact';
            
            win = desktop.createWindow({
                id: winId,
                title: title,
                width : 740,
                height : 500,
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
                    url: '/admin/contact/get-one.json',
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

