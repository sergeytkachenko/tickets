Ext.define('MyDesktop.CircleManager', {
    extend: 'Ext.ux.desktop.Module',

    id:'circle-manager',

    init : function(){
        this.launcher = {
            text: 'Кружки',
            iconCls:'icon-grid',
            handler : this.createWindow,
            scope: this
        };
        
        this.grid = null;
        this.store = null;
        this.urlImage = null;
    
        Ext.define('Circle', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id', type: 'int'},
                'title'
            ],
            idProperty: 'id'
        });
        
        Ext.define('Images', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id', type: 'int'},
                {name: 'scholl_id', type: 'int'},
                'image_url', 'title'
            ],
            idProperty: ['id','image_url'],
            
            validations: [{
                    type: 'length',
                    field: 'image_url',
                    min: 1
                },{
                    type: 'length',
                    field: 'image_url',
                    min: 1
                }
            ]
        });

    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var id = this.id;
        var win = desktop.getWindow(id);
        var self = this;
        
        if(!win) {
                                  
            var circleStore = Ext.create('Ext.data.Store', {
                model: 'Circle',
                remoteSort: true,
                proxy: {
                    type: 'ajax',
                    url: '/admin/circle/get-circle-list.json',
                    reader: {
                        type: 'json',
                        root: 'data',
                        totalProperty: 'totalCount'
                    }
                }
            });
            
            var store = circleStore;
            
            this.grid = Ext.create('Ext.grid.Panel', {
                border: false,
                xtype: 'grid',
                store: store,
                loadMask: true,
                columns:[{
                    text: "Название кружка",
                    dataIndex: 'title',
                    width: 500,
                    sortable: true
                }]
            });
            
            var grid = this.grid;
        
            win = desktop.createWindow({
                id: id,
                title:'Кружки',
                width: 550,
                height: 400,
                iconCls: 'icon-grid',
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
                items: [
                    this.grid
                ],
                tbar:[ {
                        iconCls: 'icon-add',
                        text: 'Добавить кружок',
                        scope: this,
                        handler: function() {
                            this.aditCircle('new', null, circleStore);
                        }
                    }, '-', {
                    iconCls: 'icon-add',
                    text: 'Редактировать',
                    scope: this,
                    handler: function() {
                        var selection = grid.getView().getSelectionModel().getSelection()[0];

                        if (!selection) return;

                        this.aditCircle(selection.raw.id, selection.raw, circleStore);
                    }
                }, '-', {
                    iconCls: 'icon-remove',
                    text: 'Удалить',
                    scope: this,
                    handler: function() {
                        var selection = self.grid.getView().getSelectionModel().getSelection()[0];

                        if (!selection) return;

                        Ext.MessageBox.confirm('Confirm', 'Удалить выбранный кружок?', function(btn) {
                            if (btn != 'yes') return;

                            circleStore.remove(selection);

                            Ext.Ajax.request({
                                url: '/admin/circle/delete-circle.json?id=' + selection.raw.id,
                                params: {
                                    id: selection.raw.id
                                },
                                success: function() {

                                }
                            });
                        });
                    }
                }, '-', {
                    iconCls: 'icon-add',
                    text: 'Статьи',
                    scope: this,
                    handler: function() {
                        var selection = grid.getView().getSelectionModel().getSelection()[0];

                        if (!selection) return;
                        
                        this.ListArticle(selection.raw.id, selection.raw );
                    }
                }, '-', {
                    iconCls: 'icon-add',
                    text: 'Фотоальбом',
                    scope: this,
                    handler: function() {
                        var selection = grid.getView().getSelectionModel().getSelection()[0];

                        if (!selection) return;

                        this.fotoForm(selection.raw.id, selection.raw);
                    }
                }]
            });
            
            store.load();
        }
        win.show();
        
        
        return win;
    },
    
    fotoForm : function(id, data){
        
        var urlIMagesStore = Ext.create('Ext.data.Store', {
            model: 'Images',
            proxy: {
                type: 'ajax',

                reader: {
                    type: 'json',
                    root: 'data',
                    totalProperty: 'totalCount'
                },
                api: {
                    read:    '/admin/circle/get-url-image-list.json?circle_id=' + id
                }
            },
            listeners : {
                write: function(store, operation, opts){
                    //console.log(store, operation, opts);
                },
                update:function(store, operation, opts){

                    var data = operation.data;

                    Ext.Ajax.request({
                        url: '/admin/foto/image-edit.json',
                        method: 'POST',
                        params : {
                            'id': data.id,
                            'title' : data.title
                        },
                        success: function() {
                            urlIMagesStore.load();
                        }
                    });

                }
            },
            autoSync: false,
            autoLoad: true
        });
        var dataView = Ext.create('Ext.view.View', {
            extend: 'Ext.view.AbstractView',
            store: urlIMagesStore,
            tpl: [
                '<tpl for=".">',
                    '<div class="thumb-wrap" id="{id}">',
                    '<div class="thumb"><img src="{image_url}" title="{title}"></div>',
                    '<span class="x-editable">{title}</span></div>',
                    '</div>',
                '</tpl>',
                '<div class="x-clear"></div>'
            ],
            multiSelect: true,
            height: 450,
            trackOver: true,
            autoScroll: true,
            overItemCls: 'x-item-over',
            itemSelector: 'div.thumb-wrap',
            emptyText: 'Нет картинок',
            plugins: [
                Ext.create('Ext.ux.DataView.DragSelector', {}),
                Ext.create('Ext.ux.DataView.LabelEditor', {dataIndex: 'title'})
            ],
            prepareData: function(data) {
                Ext.apply(data, {
                    shortName: Ext.util.Format.ellipsis(data.title, 15)
                });
                return data;
            },
            listeners: {
                selectionchange: function(dv, nodes){
                    var l = nodes.length;
                    this.up('panel').setTitle('Картинки (' + l + ' выделено)');
                }
            }
        });     
        var imageItemas = Ext.create('Ext.Panel', {
            id: id,
            frame: true,
            collapsible: true,
            width: '100%',
            margin: '0',
            tbar:[ {
                xtype: 'insertimages',
                style: {
                    marginLeft: '10px',
                    marginTop: '5px'
                },
                width: 30,
                manager: function(imageUrl) {
                    urlIMagesStore.insert(0,
                        {"image_url": imageUrl}
                    );
                    if(id > 0){
                        Ext.Ajax.request({
                            url: '/admin/circle/add-image.json?school_id=4&circle_id=' + id,
                            method: 'POST',
                            params: {
                                'image_url': imageUrl,
                                'school_id': id 
                            },
                            success: function() {
                                urlIMagesStore.removeAll();
                                urlIMagesStore.load();
                            }
                        });
                    }
                }
            }, '-', {
                iconCls: 'icon-add',
                xtype: "deleteimages",
                scope: this,
                baseCls: "deleteImg" ,
                handler: function() {
                    var l = dataView.getSelectionModel().selected.items.length,
                        imgArray = [];

                    if(!l) {
                        return;
                    }

                    for(var i = l-1; i >= 0; i--) {
                        var item = dataView.getSelectionModel().selected.items[i];
                        imgArray.push(item.raw.image_url);
                    }

                    Ext.Ajax.request({
                        url: '/admin/circle/remove-image.json?school_id=4&circle_id=' + id,
                        method: 'POST',
                        params : {
                            'data':[imgArray],
                            'image_group': data.id
                        },
                        success: function() {
                            urlIMagesStore.load();
                        }
                    });
                }
            }],
            title: 'Картинки (0 выделено)',
            items: [dataView]
        });    
        
        var desktop = this.app.getDesktop();
        var winId = 'circle-manager-circle-form-img' + id;
        var win = desktop.getWindow(winId);
        
        var self = this;
        
        if(!win){
            
            var form = Ext.widget('form', {
                waitMsgTarget: true,
                layout: {
                    type: 'anchor',
                    align: 'stretch'
                },
                border: false,
                bodyPadding: 0,
                autoScroll: true,

                fieldDefaults: {
                    labelAlign: 'right',
                    labelWidth: 85,
                    msgTarget: 'side',
            		anchor:'100%'
                },
                
                reader : Ext.create('Ext.data.reader.Json', {
                    model: 'Circle'
                }),

                items: [
                    imageItemas
                ]
            });
            
            var title = (id == 'new' 
                ? 'Новая запись' 
                : 'Редактирование альбома ' + data.title);
            
            win = desktop.createWindow({
                id: winId,
                title: title,
                width:740,
                height: 555,
                iconCls: 'icon-form',
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
                items: [
                    form
                ]
            });
                        
        }
        win.show();
    },
    
    aditCircle : function(id, data, circleStore){

        var desktop = this.app.getDesktop();
        var winId = 'circle-manager-circle-form-' + id;
        var win = desktop.getWindow(winId);
        
        var self = this;
        
        if(!win){
            
            var form = Ext.widget('form', {
                waitMsgTarget: true,
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
                    model: 'Circle'
                }),

                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Название*',
                    name: 'title',
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
                            url: '/admin/circle/save.json',
                            submitEmptyText: false,
                            waitMsg: 'Сохранение...',
                            success: function(form, action) {
                                win.close();
                                circleStore.load();
                            }
                        });
                    }
                }]
            });
            
            var title = (id == 'new' 
                ? 'Новый кружок' 
                : 'Редактирование ' + data.title);
            
            win = desktop.createWindow({
                id: winId,
                title: title,
                width: 400,
                height: 200,
                iconCls: 'icon-form',
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
                items: [
                    form
                ]
            });
            
            if (id != 'new') {
                form.getForm().load({
                    url: '/admin/circle/get-one.json?id=' + data.id
                });
            }
            
        }
        win.show();
    }, 
    
   ArcticleForm : function(id, data, articleStore, circle_id){
        
        var desktop = this.app.getDesktop();
        var winId = 'article-manager-article-form-' + id;
        var win = desktop.getWindow(winId);
        
        var self = this;
        
        if(!win){

            var form = Ext.widget('form', {
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
                    model: 'Article'
                }),

                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Заголовок*',
                    name: 'title',
                    allowBlank: false
                },{
                    xtype: 'textfield',
                    fieldLabel: 'URL*',
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
                    },
                    allowBlank: false
                },{
                    xtype: 'textfield',
                    fieldLabel: 'meta_keywords',
                    name: 'meta_keywords'
                },{
                    xtype: 'textfield',
                    fieldLabel: 'meta_description',
                    name: 'meta_description'
                },{
                    xtype: 'checkboxfield',
                    fieldLabel: 'Видна',
                    name: 'is_visible',
                    inputValue: "1",
                    uncheckedValue: "0",
                    checked: true
                }],

                buttons: [{
                    text: 'Сохранить',
                    formBind: true,
                    handler: function(){
                        this.up('form').getForm().submit({
                            params: {
                                id: id
                            },
                            url: '/admin/article/save.json?school_id=4&metka=circle&circle_id=' + circle_id,
                            submitEmptyText: false,
                            waitMsg: 'Сохранение...',
                            success: function(form, action) {
                                win.close();
                                articleStore.load();
                                
                            }
                        });
                    }
                }]
            });
            
            var title = (id == 'new' 
                ? 'Новая запись' 
                : 'Редактирование ' + data.title);
            
            win = desktop.createWindow({
                id: winId,
                title: title,
                width : 730,
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
                form.getForm().load({
                    url: '/admin/article/get-one.json?id=' + id
                });
            }
        }
        win.show();
    },
    
    ListArticle : function(id, data){
        var desktop = this.app.getDesktop();
        var winid = "list-arcticle-list";
        var win = desktop.getWindow(winid);
        var self = this;
        var school_id = id;
        
        if(!win) {
                                  
            var articleStore = Ext.create('Ext.data.Store', {
                model: 'Article',
                proxy: {
                    type: 'ajax',
                    url: '/admin/circle/get-article-list.json?circle=' + id,
                    reader: {
                        type: 'json',
                        root: 'data',
                        totalProperty: 'totalCount'
                    }
                }
            });
            
            var store = articleStore;
            
            this.articleStore = store;
            
            this.grid = Ext.create('Ext.grid.Panel', {
                border: false,
                xtype: 'grid',
                store: store,
                loadMask: true,
                columns:[{
                    text: "Залоловок",
                    dataIndex: 'title',
                    width: 200,
                    sortable: true
                },{
                    text: "url",
                    dataIndex: 'url',
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
                }]
            });
            
            var grid = this.grid;
        
            win = desktop.createWindow({
                id: id,
                title : 'Статьи',
                width : 500,
                height : 400,
                iconCls : 'icon-grid',
                animCollapse : false,
                constrainHeader : true,
                layout: 'fit',
                items : [
                    this.grid
                ],
                tbar:[ {
                        iconCls: 'icon-add',
                        text: 'Новая статья',
                        scope: this,
                        handler: function() {
                            this.ArcticleForm('new', null, articleStore, id);
                        }
                    }, '-',{
                        iconCls : 'icon-add',
                        text : 'Редактировать статью',
                        scope : this,
                        handler: function() {
                            var selection = grid.getView().getSelectionModel().getSelection()[0];
                           
                            if (!selection) return;

                            this.ArcticleForm(selection.raw.id, selection.raw, articleStore, id);
                        }
                }]
            });
            
            articleStore.load();
        }
        win.show();
        
        
        return win;
    }
});

