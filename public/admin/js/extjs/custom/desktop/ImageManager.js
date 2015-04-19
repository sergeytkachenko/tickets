Ext.define('MyDesktop.ImageManager', {
    extend: 'Ext.ux.desktop.Module',

    id:'image-manager',

    init : function(){
        this.launcher = {
            text: 'Фотогалерея',
            iconCls:'icon-grid',
            handler : this.createWindow,
            scope: this
        };
        
        this.grid = null;
        this.store = null;
        this.urlImage = null;
        
        var imageModels = Ext.define('Images', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id', type: 'int'},
                {name: 'scholl_id', type: 'int'},
                'image_url', 'title'
            ],
            idProperty: ['id','image_url']
        });
        this.imageModels = imageModels;
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var id = this.id;
        var win = desktop.getWindow(id);
        var self = this;
        
        if(!win) {
                                  
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
            });
            
            var store = schoolStore;
            
            this.grid = Ext.create('Ext.grid.Panel', {
                border: false,
                xtype: 'grid',
                store: store,
                loadMask: true,
                columns:[{
                    text: "Школа",
                    dataIndex: 'name',
                    width: 200,
                    sortable: true
                }]
            });
            
            var grid = this.grid;
        
            win = desktop.createWindow({
                id: id,
                title:'Фотогалерея',
                width: 250,
                height: 200,
                iconCls: 'icon-grid',
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
                items: [
                    this.grid
                ],
                tbar:[ {
                    iconCls: 'icon-add',
                    text: 'Редактировать фотогалерею',
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
    
    createForm : function(id, data){
        
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
                    read: '/admin/foto/get-url-image-list.json?id=' + id
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
                            url: '/admin/foto/add-image.json',
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
                        url: '/admin/foto/remove-image.json?school_id=' + id,
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
        var winId = 'foto-manager-foto-form-' + id;
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
                    model: 'Images'
                }),

                items: [
                    imageItemas
                ]
            });
            
            var title = (id == 'new' 
                ? 'Новая запись' 
                : 'Редактирование альбома ' + data.name);
            
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
            
            if (id != 'new') {
                form.getForm().load({
                    url: '/admin/foto/get-one.json?id=' + data.id
                });
            }
            
        }
        win.show();
    }
});

