Ext.define('ImagesProfile', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        'photo_avatar','photo_vip',
        'photo_to_verification','name'
        
    ]
});

Ext.define('PhotoProfile', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'profile_id', type: 'int'},
        'photo',
        
    ]
});

Ext.define('PhotoSalon', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'salon_id', type: 'int'},
        'photo'
        
    ]
});

var urlIMagesStore;

var Avatar =  function (id){ 
    
        urlIMagesStore = Ext.create('Ext.data.Store', {
            model: 'ImagesProfile',
            proxy: {
                type: 'ajax',

                reader: {
                    type: 'json',
                    root: 'data',
                    totalProperty: 'totalCount'
                },
                api: {
                    read: '/admin/profile/get-avatar.json?id=' + id
                }
            },
            listeners : {
                    write: function(store, operation, opts){
                        //console.log(store, operation, opts);
                    },
                    update:function(store, operation, opts){
                        
                        var data = operation.data;
                        
                        Ext.Ajax.request({
                            url: '/admin/profile/image-edit.json',
                            method: 'POST',
                            params : {
                                'id': data.id
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
                    '<div class="thumb"><img src="/timthumb.php?src={photo_avatar}&w=86&h=66" title="{title}"></div>',
                    '<span class="x-editable"><a href="http://img.vip-girls.net{photo_avatar}" target="_blank">view</a></span></div>',
                    '</div>',
                '</tpl>',
                '<div class="x-clear"></div>'
            ],
            multiSelect: true,
            height: 120,
            trackOver: true,
            autoScroll: true,
            overItemCls: 'x-item-over',
            itemSelector: 'div.thumb-wrap',
            emptyText: 'нет изображений...',
            
            prepareData: function(data) {
                Ext.apply(data, {
                    shortName: Ext.util.Format.ellipsis(data.photo_avatar, 15)
                });
                return data;
            },
            
            listeners: {
                selectionchange: function(dv, nodes){
                    var l = nodes.length;
                    this.up('panel').setTitle('Аватар (' + l + ' selected)');
                }
            }
        });
        
        return Ext.create('Ext.Panel', {
            id: id + 'avatar',
            frame: true,
            collapsible: true,
            width: 460,
            margin: '0 0 10px 100px'/*,
            tbar:[ {
                xtype: 'insertimages',
                style: {
                    marginLeft: '10px',
                    marginTop: '5px'
                },
                width: 30,
                manager: function(imageUrl) {
                    urlIMagesStore.insert(0,
                        {"photo_avatar": photo_avatar}
                    );
                    if(id > 0){
                        Ext.Ajax.request({
                            url: '/admin/profile/add-image-avatar.json',
                            method: 'POST',
                            params: {
                                'photo_avatar': photo_avatar,
                                'id' : id
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
                        url: '/admin/profile/remove-avatar.json',
                        params : {
                            'data': imgArray ,
                            'id': id
                        },
                        success: function() {
                            urlIMagesStore.load();
                        }
                    });
                }
            }]*/,
            
            title: 'Аватар',
            items: [dataView]
            
        });    
};

var Vip =  function (id){ 
            
            var vipSrore = Ext.create('Ext.data.Store', {
                model: 'ImagesProfile',
                proxy: {
                    type: 'ajax',

                    reader: {
                        type: 'json',
                        root: 'data',
                        totalProperty: 'totalCount'
                    },
                    api: {
                        read: '/admin/profile/get-vip.json?id=' + id
                    }
                },
                listeners : {
                        write: function(store, operation, opts){
                            //console.log(store, operation, opts);
                        },
                        update:function(store, operation, opts){

                            var data = operation.data;

                            Ext.Ajax.request({
                                url: '/admin/profile/image-edit.json',
                                method: 'POST',
                                params : {
                                    'id': data.id
                                },
                                success: function() {
                                    vipSrore.load();
                                }
                            });

                        }
                    },
                autoSync: false,
                autoLoad: true
            });
            
            var dataView = Ext.create('Ext.view.View', {
            extend: 'Ext.view.AbstractView',
            store: vipSrore   ,
            tpl: [
                '<tpl for=".">',
                    '<div class="thumb-wrap" id="{id}">',
                    '<div class="thumb"><img src="/timthumb.php?src={photo_vip}&w=86&h=66" title=""></div>',
                    '<span class="x-editable"><a href="http://img.vip-girls.net{photo_vip}" target="_blank">view</a></span></div>',
                    '</div>',
                '</tpl>',
                '<div class="x-clear"></div>'
            ],
            multiSelect: true,
            height: 120,
            trackOver: true,
            autoScroll: true,
            overItemCls: 'x-item-over',
            itemSelector: 'div.thumb-wrap',
            emptyText: 'нет изображений...',
            
            prepareData: function(data) {
                Ext.apply(data, {
                    shortName: Ext.util.Format.ellipsis(data.name, 15)
                });
                return data;
            },
            
            listeners: {
                selectionchange: function(dv, nodes){
                    var l = nodes.length;
                    
                    this.up('panel').setTitle('Vip (' + l + ' selected)');
                }
            }
        });
        
        return Ext.create('Ext.Panel', {
            id: id + 'vip',
            frame: true,
            collapsible: true,
            width: 460,
            margin: '0 0 10px 100px'/*,
            tbar:[ {
                xtype: 'insertimages',
                style: {
                    marginLeft: '10px',
                    marginTop: '5px'
                },
                width: 30,
                manager: function(imageUrl) {
                    urlIMagesStore.insert(0,
                        {"photo_avatar": photo_avatar}
                    );
                    if(id > 0){
                        Ext.Ajax.request({
                            url: '/admin/profile/add-image-avatar.json',
                            method: 'POST',
                            params: {
                                'photo_avatar': photo_avatar,
                                'id' : id
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
                        url: '/admin/profile/remove-avatar.json',
                        params : {
                            'data': imgArray ,
                            'id': id
                        },
                        success: function() {
                            urlIMagesStore.load();
                        }
                    });
                }
            }]*/,
            
            title: 'Vip фото',
            items: [dataView]
            
        });    
};

var PhotoAlbom =  function (id){ 
            
            var deletedPhotoArray = [];
            
            var photoSrore = Ext.create('Ext.data.Store', {
                model: 'PhotoProfile',
                proxy: {
                    type: 'ajax',

                    reader: {
                        type: 'json',
                        root: 'data',
                        totalProperty: 'totalCount'
                    },
                    api: {
                        read: '/admin/profile/get-photo.json?id=' + id
                    }
                },
                autoSync: false,
                autoLoad: true
            });
            
            var dataViewPhoto = Ext.create('Ext.view.View', {
            extend: 'Ext.view.AbstractView',
            store: photoSrore,
            tpl: [
                '<tpl for=".">',
                    '<div class="thumb-wrap" id="{id}">',
                    '<div class="thumb"><img src="/timthumb.php?src={photo}&w=86&h=66" title="{photo}"></div>',
                    '<span class="x-editable"><a href="http://img.vip-girls.net{photo}" target="_blank">view</a></span></div>',
                    '</div>',
                '</tpl>',
                '<div class="x-clear"></div>'
            ],
            multiSelect: true,
            height: 230,
            trackOver: false,
            autoScroll: true,
            overItemCls: 'x-item-over',
            itemSelector: 'div.thumb-wrap',
            emptyText: 'no images...',
            plugins: [
                Ext.create('Ext.ux.DataView.DragSelector', {})
            ],
            prepareData: function(data) {
                Ext.apply(data, {
                    shortName: Ext.util.Format.ellipsis(data.photo, 15)
                });
                return data;
            },
            
            listeners: {
                selectionchange: function(dv, nodes){
                    var l = nodes.length;
                    this.up('panel').setTitle('Фотоальбом (' + l + ' selected)');
                }
            }
        });
        
       var panel = Ext.create('Ext.Panel', {
            id: id + 'photo',
            frame: true,
            collapsible: true,
            width: 460,
            margin: '0 0 10px 100px',
            tbar:[ {
                xtype: 'insertimages',
                style: {
                    marginLeft: '10px',
                    marginTop: '5px'
                },
                width: 30,
                manager: function(imageUrl) {

                    photoSrore.insert(0,
                        {photo: imageUrl}
                    );
                    if(id > 0){
                        Ext.Ajax.request({
                            url: '/admin/profile/add-photo.json',
                            method: 'POST',
                            params: {
                                'photo': imageUrl,
                                'id' : id
                            },
                            success: function() {
                                photoSrore.removeAll();
                                photoSrore.load();
                            }
                        });
                    }
                }
            }, '-', {
                iconCls: 'icon-add',
                xtype: "deleteimages",
                //scope: this,
                baseCls: "deleteImg" ,
                handler: function() {
                    idArray = "",
                    $.each(dataViewPhoto.getSelectionModel().selected.items, function(index, value){
                        if(idArray == ""){
                            idArray = value.data.id;
                        } else {
                            idArray += "," + value.data.id;
                        }
                    });
                    
                    Ext.Ajax.request({
                        url: '/admin/profile/remove-photo.json',
                        params : {
                            'idArray': idArray
                        },
                        success: function() {
                            photoSrore.load();
                        }
                    });
                }
            }],
            
            title: 'Фотоальбом анкеты',
            items: [dataViewPhoto]
            
        });    

        return panel;
};

var Photo100 =  function (id){ 
            
            var photo100Srore = Ext.create('Ext.data.Store', {
                model: 'ImagesProfile',
                proxy: {
                    type: 'ajax',

                    reader: {
                        type: 'json',
                        root: 'data',
                        totalProperty: 'totalCount'
                    },
                    api: {
                        read: '/admin/profile/get-photosto.json?id=' + id
                    }
                },
                listeners : {
                        write: function(store, operation, opts){
                            //console.log(store, operation, opts);
                        },
                        update:function(store, operation, opts){

                            var data = operation.data;

                            Ext.Ajax.request({
                                url: '/admin/profile/image-edit.json',
                                method: 'POST',
                                params : {
                                    'id': data.id
                                },
                                success: function() {
                                    photo100Srore.load();
                                }
                            });

                        }
                    },
                autoSync: false,
                autoLoad: true
            });
            
            var dataView = Ext.create('Ext.view.View', {
            extend: 'Ext.view.AbstractView',
            store: photo100Srore   ,
            tpl: [
                '<tpl for=".">',
                    '<div class="thumb-wrap" id="{id}">',
                    '<div class="thumb"><img src="/timthumb.php?src={photo_to_verification}&w=86&h=66" title="{photo_to_verification}"></div>',
                    '<span class="x-editable"><a href="{photo_to_verification}" target="_blank">view</a></span></div>',
                    '</div>',
                '</tpl>',
                '<div class="x-clear"></div>'
            ],
            multiSelect: true,
            height: 120,
            trackOver: true,
            autoScroll: true,
            overItemCls: 'x-item-over',
            itemSelector: 'div.thumb-wrap',
            emptyText: 'нет изображений...',
            
            prepareData: function(data) {
                Ext.apply(data, {
                    shortName: Ext.util.Format.ellipsis(data.name, 15)
                });
                return data;
            }
        });
        
        return Ext.create('Ext.Panel', {
            id: id + 'photo100',
            frame: true,
            collapsible: true,
            width: 460,
            margin: '0 0 10px 100px',
            
            title: "Photo 100% <a href='/index/view-photo.html' target='_blank'>Смотреть все фото</a>",
            items: [dataView]
            
        });    
};

var Photo100 =  function (id){ 
            
            var photo100Srore = Ext.create('Ext.data.Store', {
                model: 'ImagesProfile',
                proxy: {
                    type: 'ajax',

                    reader: {
                        type: 'json',
                        root: 'data',
                        totalProperty: 'totalCount'
                    },
                    api: {
                        read: '/admin/profile/get-photosto.json?id=' + id
                    }
                },
                listeners : {
                        write: function(store, operation, opts){
                            //console.log(store, operation, opts);
                        },
                        update:function(store, operation, opts){

                            var data = operation.data;

                            Ext.Ajax.request({
                                url: '/admin/profile/image-edit.json',
                                method: 'POST',
                                params : {
                                    'id': data.id
                                },
                                success: function() {
                                    photo100Srore.load();
                                }
                            });

                        }
                    },
                autoSync: false,
                autoLoad: true
            });
            
            var dataView = Ext.create('Ext.view.View', {
            extend: 'Ext.view.AbstractView',
            store: photo100Srore   ,
            tpl: [
                '<tpl for=".">',
                    '<div class="thumb-wrap" id="{id}">',
                    '<div class="thumb"><img src="/timthumb.php?src={photo_to_verification}&w=86&h=66" title="{photo_to_verification}"></div>',
                    '<span class="x-editable"><a href="{photo_to_verification}" target="_blank">view</a></span></div>',
                    '</div>',
                '</tpl>',
                '<div class="x-clear"></div>'
            ],
            multiSelect: true,
            height: 120,
            trackOver: true,
            autoScroll: true,
            overItemCls: 'x-item-over',
            itemSelector: 'div.thumb-wrap',
            emptyText: 'нет изображений...',
            
            prepareData: function(data) {
                Ext.apply(data, {
                    shortName: Ext.util.Format.ellipsis(data.name, 15)
                });
                return data;
            }
        });
        
        return Ext.create('Ext.Panel', {
            id: id + 'photo100',
            frame: true,
            collapsible: true,
            width: 440,
            margin: '0 0 10px 100px',
            
            title: "Photo 100% <a href='/index/view-photo.html' target='_blank'>Смотреть все фото</a>",
            items: [dataView]
            
        });    
};


var PhotoAlbomSalon =  function (id){ 
            var deletedPhotoArray = [];
            
            var photoSrore = Ext.create('Ext.data.Store', {
                model: 'PhotoSalon',
                proxy: {
                    type: 'ajax',

                    reader: {
                        type: 'json',
                        root: 'data',
                        totalProperty: 'totalCount'
                    },
                    api: {
                        read: '/admin/salon/get-photo.json?id=' + id
                    }
                },
                autoSync: false,
                autoLoad: true
            });
            
            var dataViewPhoto = Ext.create('Ext.view.View', {
            extend: 'Ext.view.AbstractView',
            store: photoSrore,
            tpl: [
                '<tpl for=".">',
                    '<div class="thumb-wrap" id="{id}">',
                    '<div class="thumb"><img src="/timthumb.php?src={photo}&w=86&h=66" title="{photo}"></div>',
                    '<span class="x-editable"><a href="{photo}" target="_blank">view</a></span></div>',
                    '</div>',
                '</tpl>',
                '<div class="x-clear"></div>'
            ],
            multiSelect: true,
            height: 230,
            trackOver: false,
            autoScroll: true,
            overItemCls: 'x-item-over',
            itemSelector: 'div.thumb-wrap',
            emptyText: 'no images...',
            plugins: [
                Ext.create('Ext.ux.DataView.DragSelector', {})
            ],
            prepareData: function(data) {
                Ext.apply(data, {
                    shortName: Ext.util.Format.ellipsis(data.photo, 15)
                });
                return data;
            },
            
            listeners: {
                selectionchange: function(dv, nodes){
                    var l = nodes.length;
                    this.up('panel').setTitle('Фотоальбом (' + l + ' selected)');
                }
            }
        });
        
        return Ext.create('Ext.Panel', {
            id: id + 'photo-salon',
            frame: true,
            collapsible: true,
            width: 440,
            margin: '0 0 10px 100px',
            tbar:[ {
                xtype: 'insertimages',
                style: {
                    marginLeft: '10px',
                    marginTop: '5px'
                },
                width: 30,
                manager: function(imageUrl) {

                    photoSrore.insert(0,
                        {"photo": imageUrl}
                    );
                    if(id > 0){
                        Ext.Ajax.request({
                            url: '/admin/salon/add-photo.json',
                            method: 'POST',
                            params: {
                                'photo': imageUrl,
                                'id' : id
                            },
                            success: function() {
                                photoSrore.removeAll();
                                photoSrore.load();
                            }
                        });
                    }
                }
            }, '-', {
                iconCls: 'icon-add',
                xtype: "deleteimages",
                //scope: this,
                baseCls: "deleteImg" ,
                handler: function() {

                    idArray = "",
                    $.each(dataViewPhoto.getSelectionModel().selected.items, function(index, value){
                        if(idArray == ""){
                            idArray = value.data.id;
                        } else {
                            idArray += "," + value.data.id;
                        }
                    });
                    
                    Ext.Ajax.request({
                        url: '/admin/salon/remove-photo.json',
                        params : {
                            'idArray': idArray
                        },
                        success: function() {
                            photoSrore.load();
                        }
                    });
                }
            }],
            
            title: 'Фотоальбом салона',
            items: [dataViewPhoto]
            
        });    
        
};

