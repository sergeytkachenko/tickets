//Ext.define('ImagesProfile', {
//    extend: 'Ext.data.Model',
//    fields: [
//        {name: 'id', type: 'int'},
//        'photo_avatar','photo_vip',
//        'photo_verification','name'
//        
//    ]
//});
//
//var urlIMagesStore;
//
//var Avatar =  function (id){ 
//    
//        urlIMagesStore = Ext.create('Ext.data.Store', {
//            model: 'ImagesProfile',
//            proxy: {
//                type: 'ajax',
//
//                reader: {
//                    type: 'json',
//                    root: 'data',
//                    totalProperty: 'totalCount'
//                },
//                api: {
//                    read: '/admin/profile/get-avatar.json?id=' + id
//                }
//            },
//            listeners : {
//                    write: function(store, operation, opts){
//                        //console.log(store, operation, opts);
//                    },
//                    update:function(store, operation, opts){
//                        
//                        var data = operation.data;
//                        
//                        Ext.Ajax.request({
//                            url: '/admin/profile/image-edit.json',
//                            method: 'POST',
//                            params : {
//                                'id': data.id
//                            },
//                            success: function() {
//                                urlIMagesStore.load();
//                            }
//                        });
//                        
//                    }
//                },
//            autoSync: false,
//            autoLoad: true
//        });
//        
//        var dataView = Ext.create('Ext.view.View', {
//            extend: 'Ext.view.AbstractView',
//            store: urlIMagesStore,
//            tpl: [
//                '<tpl for=".">',
//                    '<div class="thumb-wrap" id="{id}">',
//                    '<div class="thumb"><img src="/timthumb.php?src=/files/{photo_avatar}&w=86&h=66" title="{title}"></div>',
//                    '<span class="x-editable">{name}</span></div>',
//                    '</div>',
//                '</tpl>',
//                '<div class="x-clear"></div>'
//            ],
//            multiSelect: true,
//            height: 150,
//            trackOver: true,
//            autoScroll: true,
//            overItemCls: 'x-item-over',
//            itemSelector: 'div.thumb-wrap',
//            emptyText: 'нет изображений...',
//            plugins: [
//                Ext.create('Ext.ux.DataView.DragSelector', {}),
//                Ext.create('Ext.ux.DataView.LabelEditor', {dataIndex: 'name'})
//            ],
//            
//            prepareData: function(data) {
//                Ext.apply(data, {
//                    shortName: Ext.util.Format.ellipsis(data.title, 15)
//                });
//                return data;
//            },
//            
//            listeners: {
//                selectionchange: function(dv, nodes){
//                    var l = nodes.length;
//                    this.up('panel').setTitle('Аватар (' + l + ' selected)');
//                }
//            }
//        });
//        
//        return Ext.create('Ext.Panel', {
//            id: id,
//            frame: true,
//            collapsible: true,
//            width: 440,
//            margin: '0 0 10px 100px'/*,
//            tbar:[ {
//                xtype: 'insertimages',
//                style: {
//                    marginLeft: '10px',
//                    marginTop: '5px'
//                },
//                width: 30,
//                manager: function(imageUrl) {
//                    urlIMagesStore.insert(0,
//                        {"photo_avatar": photo_avatar}
//                    );
//                    if(id > 0){
//                        Ext.Ajax.request({
//                            url: '/admin/profile/add-image-avatar.json',
//                            method: 'POST',
//                            params: {
//                                'photo_avatar': photo_avatar,
//                                'id' : id
//                            },
//                            success: function() {
//                                urlIMagesStore.removeAll();
//                                urlIMagesStore.load();
//                            }
//                        });
//                    }
//                }
//            }, '-', {
//                iconCls: 'icon-add',
//                xtype: "deleteimages",
//                scope: this,
//                baseCls: "deleteImg" ,
//                handler: function() {
//                    var l = dataView.getSelectionModel().selected.items.length,
//                        imgArray = [];
//
//                    if(!l) {
//                        return;
//                    }
//                    
//                    for(var i = l-1; i >= 0; i--) {
//                        var item = dataView.getSelectionModel().selected.items[i];
//                        imgArray.push(item.raw.img_src);
//                    }
//                    
//                    imgArray = Ext.JSON.encode( imgArray );
//                    
//                    Ext.Ajax.request({
//                        url: '/admin/profile/remove-avatar.json',
//                        params : {
//                            'data': imgArray ,
//                            'id': id
//                        },
//                        success: function() {
//                            urlIMagesStore.load();
//                        }
//                    });
//                }
//            }]*/,
//            
//            title: 'Аватар (0 selected)',
//            items: [dataView]
//            
//        });    
//};
//
//var Vip =  function (id){ 
//            
//        var dataView = Ext.create('Ext.view.View', {
//            extend: 'Ext.view.AbstractView',
//            store: urlIMagesStore,
//            tpl: [
//                '<tpl for=".">',
//                    '<div class="thumb-wrap" id="{id}">',
//                    '<div class="thumb"><img src="/timthumb.php?src=/files/{photo_vip}&w=86&h=66" title="{name}"></div>',
//                    '<span class="x-editable">{name}</span></div>',
//                    '</div>',
//                '</tpl>',
//                '<div class="x-clear"></div>'
//            ],
//            multiSelect: true,
//            height: 150,
//            trackOver: true,
//            autoScroll: true,
//            overItemCls: 'x-item-over',
//            itemSelector: 'div.thumb-wrap',
//            emptyText: 'нет изображений...',
//            plugins: [
//                Ext.create('Ext.ux.DataView.DragSelector', {}),
//                Ext.create('Ext.ux.DataView.LabelEditor', {dataIndex: 'name'})
//            ],
//            
//            prepareData: function(data) {
//                Ext.apply(data, {
//                    shortName: Ext.util.Format.ellipsis(data.name, 15)
//                });
//                return data;
//            },
//            
//            listeners: {
//                selectionchange: function(dv, nodes){
//                    var l = nodes.length;
//                    this.up('panel').setTitle('Vip (' + l + ' selected)');
//                }
//            }
//        });
//        
//        return Ext.create('Ext.Panel', {
//            id: id,
//            frame: true,
//            collapsible: true,
//            width: 440,
//            margin: '0 0 10px 100px'/*,
//            tbar:[ {
//                xtype: 'insertimages',
//                style: {
//                    marginLeft: '10px',
//                    marginTop: '5px'
//                },
//                width: 30,
//                manager: function(imageUrl) {
//                    urlIMagesStore.insert(0,
//                        {"photo_avatar": photo_avatar}
//                    );
//                    if(id > 0){
//                        Ext.Ajax.request({
//                            url: '/admin/profile/add-image-avatar.json',
//                            method: 'POST',
//                            params: {
//                                'photo_avatar': photo_avatar,
//                                'id' : id
//                            },
//                            success: function() {
//                                urlIMagesStore.removeAll();
//                                urlIMagesStore.load();
//                            }
//                        });
//                    }
//                }
//            }, '-', {
//                iconCls: 'icon-add',
//                xtype: "deleteimages",
//                scope: this,
//                baseCls: "deleteImg" ,
//                handler: function() {
//                    var l = dataView.getSelectionModel().selected.items.length,
//                        imgArray = [];
//
//                    if(!l) {
//                        return;
//                    }
//                    
//                    for(var i = l-1; i >= 0; i--) {
//                        var item = dataView.getSelectionModel().selected.items[i];
//                        imgArray.push(item.raw.img_src);
//                    }
//                    
//                    imgArray = Ext.JSON.encode( imgArray );
//                    
//                    Ext.Ajax.request({
//                        url: '/admin/profile/remove-avatar.json',
//                        params : {
//                            'data': imgArray ,
//                            'id': id
//                        },
//                        success: function() {
//                            urlIMagesStore.load();
//                        }
//                    });
//                }
//            }]*/,
//            
//            title: 'Аватар (0 selected)',
//            items: [dataView]
//            
//        });    
//};