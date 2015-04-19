Ext.define('MyDesktop.GalleryManager', {
    extend: 'Ext.ux.desktop.Module',

    id:'gallery-manager',
        
    init : function(){
  
        var self = this;
        
        this.launcher = {
            text: 'Gallery',
            iconCls: 'icon-grid',
            handler : this.createWindow,
            scope : this
        };
        
        this.grid = null;
        this.store = null;
        this.urlImage = null;
  
        var imageModels = Ext.define('Images', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id', type: 'int'},
                {name: 'hotel_id', type: 'int'},
                'img_src'
            ],
            idProperty: ['id','img_src']
        });
        this.imageModels = imageModels;

        Ext.define('FotoGallery', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id', type: 'int'},
                {name: 'lenguage_id', type: 'int'},
                'title'
            ],
            idProperty: ['id','title']
        });


    },

    createWindow : function(){
        
        var desktop = this.app.getDesktop();
        var id = this.id;
        var win = desktop.getWindow(id);
        var self = this;
        
        if(!win) {
                                  
            this.store = Ext.create('Ext.data.Store', {
                model: 'Restaurant',
                proxy: {
                    type: 'ajax',
                    url: '/admin/restaurant/restaurant-list.json',
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
                    text: "Title",
                    dataIndex: 'title',
                    width: 200,
                    sortable: true
                }]
            });
            
            var grid = this.grid;
        
            win = desktop.createWindow({
                id: id,
                title:'Gallery',
                width: 350,
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
                    text: 'open gallery',
                    scope: this,
                    handler: function() {
                        var selection = grid.getView().getSelectionModel().getSelection()[0];

                        if (!selection) return;

                        //this.createForm(selection.raw.id, selection.raw);
                        this.openGallery(selection.raw.id, selection.raw);
                    }
                }]
            });
            
            store.load();
        }
        
        win.show();
        
        return win;
    },

    openGallery : function(id, data){
        
        var desktop = this.app.getDesktop();
        var windId = this.id + "gallery";
        var win = desktop.getWindow(windId);
        var self = this;
        
        this.lenguage = COOK_LENG.number; // по-умолчанию
        this.text = COOK_LENG.text; // по-умолчанию       
        
        if(!win) {
                                  
            this.store = Ext.create('Ext.data.Store', {
                model: 'FotoGallery',
                proxy: {
                    type: 'ajax',
                    url: '/admin/foto/gallery-list.json?id='+ id,
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
                    text: "Title",
                    dataIndex: 'title',
                    width: 200,
                    sortable: true
                }]
            });
            
            var grid = this.grid;
        
            win = desktop.createWindow({
                id: windId,
                title:'FotoGallery',
                width: 400,
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
                    text: 'add album',
                    scope: this,
                    handler: function() {
 
                        this.galleryForm('new', null, id);
                    }
                }, '-',{
                    iconCls: 'icon-add',
                    text: 'edit album',
                    scope: this,
                    handler: function() {
                        var selection = grid.getView().getSelectionModel().getSelection()[0];

                        if (!selection) return;

                        //this.createForm(selection.raw.id, selection.raw);
                        this.galleryForm(selection.raw.id, selection.raw, id);
                    }
                }, '-',{
                    iconCls: 'icon-add',
                    text: 'remove album',
                    scope: this,
                    handler: function() {
                        var selection = grid.getView().getSelectionModel().getSelection()[0];

                        if (!selection) return;

                        //this.createForm(selection.raw.id, selection.raw);
                        this.onDeleteClick(selection.raw.id);
                    }
                }, '-', {
                    iconCls: 'icon-add',
                    text: 'open gallery',
                    scope: this,
                    handler: function() {
                        var selection = grid.getView().getSelectionModel().getSelection()[0];

                        if (!selection) return;

                        //this.createForm(selection.raw.id, selection.raw);
                        this.createForm(selection.raw.id, selection.raw, id);
                    }
                }],
                
                rbar: [
                    { 
                        xtype: 'button',
                        text: 'eng',
                        lenguageId : 3,
                        handler: function() {setLenguageWindow(self, this, windId)},
                        cls : "lenguage-button id3"
                    },
                    { 
                        xtype: 'button',
                        text: 'rus',
                        lenguageId : 1,
                        handler: function() {setLenguageWindow(self, this, windId)},
                        cls : "lenguage-button id1"
                    }
                ]
            });
            
            store.load();
        }
        
        win.show(null, function() {windowShow(self)});
        
        return win;
    },

    createForm : function(id, data, hotel_id){
        
        var desktop = this.app.getDesktop();
        var winId = 'gallery-manager-foto-form-' + id;
        var win = desktop.getWindow(winId);
        
        var self = this;
        
        var galleryId = id;
        var id = hotel_id;
        
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
                    read: '/admin/foto/get-url-image-list.json?id=' + id + "&gallery_id=" + galleryId
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
                    '<div class="thumb"><img src="/timthumb.php?src={img_src}&w=86&h=66" title="{title}"></div>',
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
            emptyText: 'no images...',
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
                    this.up('panel').setTitle('Images (' + l + ' selected)');
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
                                'img_src': imageUrl,
                                'gallery_id' : galleryId
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
                        imgArray.push(item.raw.img_src);
                    }
                    
                    imgArray = Ext.JSON.encode( imgArray );
                    
                    Ext.Ajax.request({
                        url: '/admin/foto/remove-image.json',
                        params : {
                            'data': imgArray ,
                            'hotel_id': id, 
                            'gallery_id' : galleryId
                        },
                        success: function() {
                            urlIMagesStore.load();
                        }
                    });
                }
            }],
            
            title: 'Images (0 selected)',
            items: [dataView]
        });    
        
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
                ? 'New gallery' 
                : 'Edit gallery - ' + data.title);
            
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
    
    onDeleteClick: function(id){
        var self = this;
        
        Ext.MessageBox.confirm('Confirm', 'Delete this item?', function(btn) {
            if (btn != 'yes') return;

            Ext.Ajax.request({
                url: '/admin/foto/gallery-delete.json?id=' + id,
                success: function() {
                    self.store.load();
                }
            });
        });
    },
    
    galleryForm : function(id, data, hotel_id){
        
        var desktop = this.app.getDesktop();
        var winId = 'gallery-form-foto-form-form' + id;
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
                    model: 'FotoGallery'
                }),

                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Title *',
                        name: 'title',
                        allowBlank: false
                    }
                ],

                buttons: [{
                    text: 'Save',
                    formBind: true,
                    handler: function(){
                        this.up('form').getForm().submit({
                            params: {
                                'id' : id,
                                'lenguage_id' : self.lenguage,
                                'hotel_id' : hotel_id
                            },
                            url: '/admin/foto/gallery-save.json',
                            submitEmptyText: false,
                            waitMsg: 'Saved...',
                            success: function(form, action) {
                                win.close();
                                self.store.load();
                            }
                        });
                    }
                }]
            });
            
            var title = (id == 'new' 
                ? 'New gallery' 
                : 'Edit gallery - ' + data.title);
            
            win = desktop.createWindow({
                id: winId,
                title: title,
                width: 400,
                height: 300,
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
                    url: '/admin/foto/gallery-one.json?id='+ id + '&lenguage_id=' + self.lenguage
                });
            }
            
        }
        win.show();

    }
});

