Ext.define('MyDesktop.FeedbackManager', {
    extend: 'Ext.ux.desktop.Module',

    id:'feedback-manager',
        
    init : function(){
        var self = this;
        
        this.launcher = {
            text: 'Feedback',
            iconCls: 'icon-grid',
            handler : this.createWindow,
            scope : this
        };
        
        this.grid = null;
        this.store = null;
        this.urlImage = null;

        Ext.define('Feedback', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id', type: 'int'},
                'email','message','ip',
                {name: 'date', type: 'date'},
                {name: 'is_new', type: 'bool'},
                {name: 'answer', type: 'int'}
            ],
            idProperty: 'id'
        });

        new countItem().get(self);
    },

    createWindow : function(){ 
        
        var desktop = this.app.getDesktop();
        var id = this.id;
        var win = desktop.getWindow(id);
        var self = this;   
        
        if(!win) {
        
            // create the Data Store
            this.store = Ext.create('Ext.data.Store', {
                model: 'Feedback',
                proxy: {
                    type: 'ajax',
                    url: '/admin/feedback/get-list.json',
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
                    text: "Email",
                    dataIndex: 'email',
                    width: 150,
                    sortable: true
                },{
                    text: "Дата",
                    dataIndex: 'date',
                    width: 150,
                    sortable: true,
                    renderer: Ext.util.Format.dateRenderer('d.m.Y')
                },{
                    text: "IP",
                    dataIndex: 'ip',
                    width: 150,
                    sortable: true
                },{
                    text: 'Новый',
                    dataIndex: 'is_new',
                    trueText: "&radic;",
                    falseText: "",
                    xtype: 'booleancolumn',
                    width: 120,
                    align: 'center',
                    sortable: true
                },{
                    text: 'Отвечено',
                    dataIndex: 'answer',
                    trueText: "&radic;",
                    falseText: "",
                    xtype: 'booleancolumn',
                    width: 100,
                    align: 'center',
                    sortable: true
                }]
            });
            
            var grid = this.grid;
        
            win = desktop.createWindow({
                id: id,
                title:'Обратная связь' ,
                width: 750,
                height: 480,
                iconCls: 'icon-grid',
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
                items: [
                    this.grid
                ],
                tbar:[{
                    iconCls: 'icon-add',
                    text: 'Редактировать',
                    scope: this,
                    handler: function() {
                        var selection = grid.getView().getSelectionModel().getSelection()[0];

                        if (!selection) return;

                        this.createForm(selection.raw.id, selection.raw);
                    }
                },"-",{
                    iconCls: 'icon-add',
                    text: 'Удалить',
                    scope: this,
                    handler: function() {
                        var selection = grid.getView().getSelectionModel().getSelection()[0];

                        if (!selection) return;

                        this.onDeleteClick(selection.raw.id);
                    }
                }, "-", {
                    iconCls: 'icon-add',
                    text: 'Ответить',
                    scope: this,
                    handler: function() {
                        var selection = grid.getView().getSelectionModel().getSelection()[0];

                        if (!selection) return;

                        this.answerMessageForm(selection.raw.id, selection.raw);
                    }
                }, "-", {
                    iconCls: 'icon-add',
                    text: 'Написать сообщение',
                    scope: this,
                    handler: function() {
                        this.createMessage();
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
        
        Ext.MessageBox.confirm('Confirm', 'Удалить?', function(btn) {
            if (btn != 'yes') return;

            Ext.Ajax.request({
                url: '/admin/feedback/remove.json?id=' + id,
                success: function() {
                    self.store.load();
                }
            });
        });
    },
    
    createForm : function(id, data){
        var desktop = this.app.getDesktop();
        var winId = 'feedbacks-manager-feedbacks-form-' + id;
        var win = desktop.getWindow(winId);
               
        var self = this;
        
        if(!win){
            
            Ext.define('MessageStatus', {
                extend: 'Ext.data.Model',
                fields: [
                    {name: 'id', type: 'int'},
                    {name: 'title',  type: 'string'},
                ]
            });
            var messageStatus = Ext.create('Ext.data.Store', {
                model: 'MessageStatus',
                data : [
                    {id: 0, title: 'Не отвечено'},
                    {id: 1, title: 'Отвечено'}
                ]

            });
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
                    model: 'Feedback'
                }),

                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Id',
                    name: 'id',
                    disabled : true
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Email',
                    name: 'email'
                },{
                    xtype: 'textarea',
                    fieldLabel: 'Сообщение',
                    name: 'message'
                },{
                    xtype: 'datefield',
                    fieldLabel: 'Дата',
                    name: 'date',
                    format: 'd.m.Y H:i:s',
                    submitFormat: 'Y-m-d H:i:s',
                    value: Ext.util.Format.date(data.date, 'd.m.Y H:i:s')
                },{
                    xtype: 'textfield',
                    fieldLabel: 'IP',
                    name: 'ip'
                },{
                    xtype: 'combo',
                    store: messageStatus,
                    displayField: 'title',
                    valueField: 'id',
                    name: 'answer',
                    fieldLabel: 'Статус',
                    autoHeight: true,
                    typeAhead: true,
                    forceSelection: true,
                    triggerAction: 'all',
                    queryMode: 'local',      
                    allowBlank: false
                },{
                    xtype: 'checkboxfield',
                    fieldLabel: 'Новый',
                    name: 'is_new',
                    inputValue: "1",
                    uncheckedValue: "0",
                    checked: true,
                    disabled: true
                }
            ],

                buttons: [{
                    text: 'Сохранить',
                    formBind: true,
                    handler: function(){
                        this.up('form').getForm().submit({
                            params: {
                                'id' : id
                            },
                            url: '/admin/feedback/save.json',
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
                ? 'Новый баннер' 
                : 'Редактирование сообщения');
            
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
                    form
                ]
            });
            
            if (id != 'new') {
                var f = form.getForm().load({
                    url: '/admin/feedback/get-one.json',
                    params : {
                        'id' : id
                    }
                });
            }
        }
        win.show();
    },
    
    answerMessageForm : function(id, data){
        var desktop = this.app.getDesktop();
        var winId = 'answerMessage-manager-answerMessage-form-' + id;
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
                    model: 'Feedback'
                }),

                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Email',
                    name: 'email',      
                    allowBlank: false
                },{
                    xtype: 'textarea',
                    fieldLabel: 'Прислал',
                    name: 'message',
                    height: 150,
                    disabled: true
                },{
                    xtype: 'tinymcefield',
                    fieldLabel: 'Сообщение',
                    name: 'messageSend',
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
                    text: 'Ответить',
                    formBind: true,
                    handler: function(){
                        this.up('form').getForm().submit({
                            url: '/admin/feedback/save-message.json?id='+id+"&answer=1",
                            submitEmptyText: false,
                            waitMsg: 'Отправление...',
                            success: function(form, action) {
                                Ext.Msg.alert('Сообщение', 'Сообщение отправлено!');
                                win.close();
                                self.store.load();
                            }
                        });
                    }
                }]
            });
            
            var form = this.form;
            
            var title = "Отправка сообщения";
            
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
                    form
                ]
            });
            
            form.getForm().load({
                url: '/admin/feedback/get-one.json',
                params : {
                    'id' : id
                }
            });

        }
        win.show();
    },
    
    createMessage : function(){
        var desktop = this.app.getDesktop();
        var winId = 'Message-manager-Message-form-';
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
                    model: 'Feedback'
                }),

                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Email',
                    name: 'email',      
                    allowBlank: false
                },{
                    xtype: 'tinymcefield',
                    fieldLabel: 'Сообщение',
                    name: 'messageSend',
                    height: 400,
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
                            url: '/admin/feedback/save-message.json',
                            submitEmptyText: false,
                            waitMsg: 'Сохранение...',
                            success: function(form, action) {
                                Ext.Msg.alert('Сообщение', 'Сообщение отправлено!');
                            }
                        });
                    }
                }]
            });
            
            var form = this.form;
            
            var title = "Отправка сообщения";
            
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
                    form
                ]
            });

        }
        win.show();
    }
});

