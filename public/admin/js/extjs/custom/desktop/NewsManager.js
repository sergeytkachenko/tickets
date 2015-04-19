Ext.define('MyDesktop.NewsManager', {
    extend: 'Ext.ux.desktop.Module',

    id:'news-manager',

    init : function(){
        this.launcher = {
            text: 'Новости',
            iconCls:'icon-grid',
            handler : this.createWindow,
            scope: this
        };
        
        this.grid = null;
        this.store = null;
        
        Ext.define('News', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id', type: 'int'},
                'title','description', 'url', 
                'meta_keywords', 'meta_description',
                'school_title','short_description',
                'url','image_url',
                {name: 'school_id', type: 'int'},
                {name: 'date', type: 'date'},
                {name: 'is_visible', type: 'bool'}
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
                        
            // create the Data Store
            this.store = Ext.create('Ext.data.Store', {
                model: 'News',
                proxy: {
                    type: 'ajax',
                    url: '/admin/news/get-list.json',
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
                    text: "Школа",
                    dataIndex: 'school_title',
                    width: 200,
                    sortable: true
                },{
                    text: "Видна",
                    trueText: "&radic;",
                    falseText: "",
                    xtype: 'booleancolumn',
                    dataIndex: 'is_visible',
                    width: 50,
                    align: 'right',
                    sortable: true
                },{
                    text: "Дата",
                    dataIndex: 'date',
                    xtype: 'datecolumn',
                    format:'d-m-Y',
                    width: 100,
                    align: 'right',
                    sortable: true
                }]
            });
            
            var grid = this.grid;
        
            win = desktop.createWindow({
                id: id,
                title:'Новости',
                width:580,
                height:480,
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
                    iconCls: 'icon-delete',
                    text: 'Удалить',
                    scope: this,
                    handler: function(){
                        var selection = this.grid.getView().getSelectionModel().getSelection()[0];

                        if (selection) {

                            Ext.MessageBox.confirm('Confirm', 'Удалить выбранную запись?', function(btn) {
                                if (btn != 'yes') return;

                                store.remove(selection);

                                Ext.Ajax.request({
                                    url: '/admin/news/delete.json?id=' + selection.raw.id,
                                    params: {
                                        id: selection.raw.id
                                    },
                                    success: function() {

                                    }
                                });
                            });
                        }   
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
        var winId = 'news-manager-news-form-' + id;
        var win = desktop.getWindow(winId);
        
        var self = this;
        
        if(!win){
            
            var schoolStore = Ext.create('Ext.data.Store', {
                fields: [{name: 'id', type: 'int'}, 'name'],
                proxy: {
                    type: 'ajax',
                    url: '/admin/expert/schools-list.json',
                    reader: {
                        type: 'json',
                        root: 'data',
                        totalProperty: 'totalCount'
                    }
                }
            }).load();
            
            var form = Ext.widget('form', {
                arget: true,
                
                layout: {
                    type: 'anchor',
                    align: 'stretch'
                },
                
                border: false,
                bodyPadding: 10,
                autoScroll: true,

                fieldDefaults: {
                    labelAlign: 'right',
                    labelWidth: 85,
                    msgTarget: 'side',
                    anchor:'100%'
                },
                
                reader : Ext.create('Ext.data.reader.Json', {
                    model: 'News'
                }),

                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Заголовок *',
                    name: 'title',
                    allowBlank: false
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Url *',
                    name: 'url',
                    allowBlank: false
                },{
                    xtype: 'tinymcefield',
                    name: 'description',
                    fieldLabel: 'Текст',
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
                    }
                },{
                    xtype: 'textarea',
                    fieldLabel: 'Краткое описание',
                    name: 'short_description',
                    allowBlank: false,
                    maxLength: 200
                },{
                    xtype: 'textfield',
                    fieldLabel: 'META Keywords',
                    name: 'meta_keywords'
                },{
                    xtype: 'textfield',
                    fieldLabel: 'META Description',
                    name: 'meta_description'
                },{
                    xtype: 'datefield',
                    fieldLabel: 'Дата',
                    name: 'date',
                    format: 'd/m/Y',
                    submitFormat: 'Y-m-d',
                    value: new Date(),
                    allowBlank: false
                },{
                    xtype: 'cefileinput',
                    fieldLabel: 'Фото',
                    name: 'image_url'
                },{
                    xtype: 'combo',
                    store: schoolStore,
                    displayField: 'name',
                    valueField: 'id',
                    name: 'school_id',
                    fieldLabel: 'Школа *',
                    autoHeight: true,
                    typeAhead: true,
                    forceSelection: true,
                    triggerAction: 'all',
                    queryMode: 'local',      
                    allowBlank: false
                },{
                    xtype: 'checkboxfield',
                    fieldLabel: 'Видна',
                    name: 'is_visible',
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
                            url: '/admin/news/save.json',
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
                ? 'New item' 
                : 'Edit ' + data.title);
            
            win = desktop.createWindow({
                id: winId,
                title: title,
                width:740,
                height:600,
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
                    url: '/admin/news/get-one.json?id=' + data.id
                });
            }
            
        }
        win.show();
    }
});

