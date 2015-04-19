Ext.define('MyDesktop.RecommendedArticleManager', {
    extend: 'Ext.ux.desktop.Module',

    id:'recommended-article-manager',
        
    init : function(){
  
        var self = this;
        
        this.launcher = {
            text: 'RecommendedArticle',
            iconCls: 'icon-grid',
            handler : this.createWindow,
            scope : this
        };
        
        this.grid = null;
        this.store = null;
        this.urlImage = null;
  
        Ext.define('RecommendedArticle', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id', type: 'int'},
                'title', 'description', 'meta_keywords',
                'meta_description', 'img_src',
                {name : 'is_active', type : "bool"}
            ],
            idProperty: 'id'
        });

    },

    createWindow : function(){ // открытие списка событий 
        
        var desktop = this.app.getDesktop();
        var id = this.id;
        var win = desktop.getWindow(id);

        var self = this;
       
        if(!win) {
        
            // create the Data Store
            this.store = Ext.create('Ext.data.Store', {
                model : "RecommendedArticle",
                proxy: {
                    type: 'ajax',
                    url: '/admin/recommended-article/getList.json',
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
                    text: "title",
                    dataIndex: 'title',
                    flex : true,
                    sortable: true
                },{
                    text: "url",
                    dataIndex: 'id',
                    flex : true,
                    sortable: true,
                    renderer : function (value) {
                        return "<a href='/recommended-article/view/"+value+"' target='_blank'>view</a>";
                    }
                },{
                    text: 'Активна',
                    dataIndex: 'is_active',
                    trueText: "&radic;",
                    falseText: "",
                    xtype: 'booleancolumn',
                    width: 70,
                    align: 'center',
                    sortable: true
                }]
            });
            
            var grid = this.grid;
        
            win = desktop.createWindow({
                id: id,
                title:'Статьи',
                width: 800,
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
                    text: 'Добавить статью',
                    scope: this,
                    handler: function() {

                        this.createForm("new");
                    }
                }, '-', {
                    iconCls: 'icon-add',
                    text: 'Редактирование статьи',
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
        var winId = 'recommended-article-manager-recommended-article-form-' + id;
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
                    model: 'RecommendedArticle'
                }),

                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Id',
                    name: 'id',
                    disabled: true
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Title *',
                    name: 'title',
                    allowBlank: false
                },{
                    xtype: 'cefileinput',
                    fieldLabel: 'Фото превью *',
                    name: 'img_src',
                    allowBlank: false
                },{
                    xtype: 'tinymcefield',
                    name: 'description',
                    fieldLabel: 'Desciption *',
                    height: 500,
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
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Meta Keywords',
                    name: 'meta_keywords'
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Meta Description',
                    name: 'meta_description'
                },{
                    xtype: 'checkboxfield',
                    fieldLabel: 'Активна',
                    name: 'is_active',
                    inputValue: "1",
                    uncheckedValue: "0",
                    checked: true
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
                            url: '/admin/recommended-article/save.json',
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
            
            var title = 'Редактирование Статьи';
            
            win = desktop.createWindow({
                id: winId,
                title: title,
                width : "70%",
                height : 650,
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
                    url: '/admin/recommended-article/getOne.json',
                    params : {
                        'id' : id
                    }
                });
            }
        }
        win.show();
    }
});

