Ext.define('MyDesktop.BannerManager', {
    extend: 'Ext.ux.desktop.Module',
    id:'banner-manager',
        
    init : function(){
  
        var self = this;
        
        this.launcher = {
            text: 'Banner',
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
        Ext.define('Banner', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id', type: 'int'},
                {name: 'user_id', type: 'int'},
                'city_title', 'user_email', 
                'banner_url','flash','img_src',
                {name: 'last_date_up', type: 'date'},
               
                {name: 'city_id', type: 'int'},
                
                {name: 'added', type: 'date'},
                {name: 'active', type: 'bool'},
                {name: 'is_visible', type: 'bool'},
                {name: 'is_active', type: 'bool'},
                'url', {name: 'is_new', type: 'bool'}
            ],
            idProperty: ['id']
        });
        //new countItem().get(self);

    },
    onDeleteClick: function(id){
        var self = this;
        
        Ext.MessageBox.confirm('Confirm', 'Delete select item?', function(btn) {
            if (btn != 'yes') return;
            Ext.Ajax.request({
                url: '/admin/banner/remove.json?id=' + id,
                success: function() {
                    self.store.load();
                }
            });
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
                
                model: 'Banner',
                remoteGroup: true,
                // allow the grid to interact with the paging scroller by buffering
                buffered: true,
                leadingBufferZone: 300,
                pageSize: 100,
                proxy: {
                    // load using script tags for cross domain, if the data in on the same domain as
                    // this page, an Ajax proxy would be better
                    type: 'ajax',
                    url: '/admin/banner/get-item-list.json',
                    reader: {
                        root: 'data',
                        totalProperty: 'totalCount'
                    },
                    extraParams : {
                        search : ""
                    },
                    // sends single sort as multi parameter
                    simpleSortMode: true,
                    // sends single group as multi parameter
                    simpleGroupMode: true,

                    // This particular service cannot sort on more than one field, so grouping === sorting.
                    groupParam: 'sort',
                    groupDirectionParam: 'id'
                },
                sorters: [{
                    property: 'id',
                    direction: 'DESC'
                }],
                autoLoad: true,
                autoSync: true,
                listeners: {
                    // This particular service cannot sort on more than one field, so if grouped, disable sorting
                    groupchange: function(store, groupers) {
                        var sortable = !store.isGrouped(),
                            headers = grid.headerCt.getVisibleGridColumns(),
                            i, len = headers.length;

                        for (i = 0; i < len; i++) {
                            headers[i].sortable = (headers[i].sortable !== undefined) ? headers[i].sortable : sortable;
                        }
                    },

                    // This particular service cannot sort on more than one field, so if grouped, disable sorting
                    beforeprefetch: function(store, operation) {
                        if (operation.groupers && operation.groupers.length) {
                            delete operation.sorters;
                        }
                    },
                    
                    beforeload : function( store, operation, eOpts ){
                        var value = win.getChildByElement("mysearchBanner").getChildByElement('mysearchBanner').getValue();
                        if(value !== "") {
                             store.proxy.extraParams.search = value;
                        } else if(store.proxy.extraParams.search !== undefined) {
                            delete(store.proxy.extraParams.search);
                        }
                    }
                }
            });
 
           var store = this.store;
            
           this.typeAnketStore = Ext.create('Ext.data.Store', {
                fields: [{name: 'id', type: 'int'}, 'title'],
                proxy: {
                    type: 'ajax',
                    url: '/admin/banner/type-anket-list.json',
                    reader: {
                        type: 'json',
                        root: 'data',
                        totalProperty: 'totalCount'
                    }
                }
            }).load();
            
            this.citesStore = Ext.create('Ext.data.Store', {
                fields: [{name: 'id', type: 'int'}, 'city'],
                proxy: {
                    type: 'ajax',
                    url: '/admin/banner/city-list.json',
                    reader: {
                        type: 'json',
                        root: 'data',
                        totalProperty: 'totalCount'
                    }
                }
            }).load();
            
            this.grid = Ext.create('Ext.grid.Panel', {
                border: false,
                xtype: 'grid',
                store: store,
                loadMask: true,
                selModel: {
                    pruneRemoved: false
                },
                viewConfig: {
                    trackOver: false
                },
                features:[{
                    ftype: 'grouping',
                    hideGroupedHeader: false
                }],
                columns:[{
                    text: "ID",
                    dataIndex: 'id',
                    width: 60,
                    sortable: true
                },{
                    text: "Url",
                    dataIndex: 'banner_url',
                    width: 200,
                    sortable: true
                },{
                    text: "Email",
                    dataIndex: 'user_email',
                    width: 180,
                    sortable: true
                },{
                    text: "Город",
                    dataIndex: 'city_title',
                    width: 90,
                    sortable: true
                },{
                    text: 'Размещ.',
                    dataIndex: 'active',
                    trueText: "&radic;",
                    falseText: "",
                    xtype: 'booleancolumn',
                    width: 100,
                    align: 'center',
                    sortable: true
                },{
                    text: "Добавлен",
                    dataIndex: 'added',
                    width: 150,
                    sortable: true,
                    renderer: Ext.util.Format.dateRenderer('d.m.Y H:i:s')
                },{
                    text: 'Новый',
                    dataIndex: 'is_new',
                    trueText: "&radic;",
                    falseText: "",
                    xtype: 'booleancolumn',
                    width: 70,
                    align: 'center',
                    sortable: true
                },{
                    text: 'Активен',
                    dataIndex: 'is_visible',
                    trueText: "&radic;",
                    falseText: "",
                    xtype: 'booleancolumn',
                    width: 70,
                    align: 'center',
                    sortable: true
                } ],
                emptyText: 'Нет данных...'
            });
            
            var grid = this.grid;
        
            win = desktop.createWindow({
                id: id,
                title:'Баннеры',
                width: 1250,
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
                    text: 'Редактировать баннер',
                    scope: this,
                    handler: function() {
                        var selection = grid.getView().getSelectionModel().getSelection()[0];

                        if (!selection) return;

                        this.createForm(selection.raw.id, selection.raw);
                    }
                }, 'Найти',{
                    xtype: 'textfield',
                    name: 'searchField',
                    id : 'mysearchBanner',
                    hideLabel: true,
                    labelAlign: "right",
                    width: 200,
                    listeners: {
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                self.store.load();
                            }
                        },
                        
                        change : function(e,value,oldVal) {

                            if(value==="" && oldVal!=="") {
                                self.store.load();
                            }
                        }
                    }

                }, { 
                    xtype : "button",
                    text : "Поиск",
                    style : "width : 100px;",
                    listeners: {
                        click: function(){
                            var value = this.up().getChildByElement('mysearchBanner').getValue();
                            self.onTextFieldChange(value);
                        }
                    }
                } ]
            });
            win.show();
        }
    },
    
    onTextFieldChange : function(value){
        this.store.load({
            params: {
                search : value
            }
        });
    },
            
    createForm : function(id, data){
        
        var desktop = this.app.getDesktop();
        var winId = 'banner-manager-banner-form-' + id;
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
                    model: 'Banner'
                }),
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Id',
                    name: 'id',
                    disabled : true
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Пользователь',
                    name: 'user_email',
                    disabled : true
                },{
                    xtype: 'combo',
                    store: self.citesStore,
                    displayField: 'city',
                    valueField: 'id',
                    name: 'city_id',
                    fieldLabel: 'Город размещения *',
                    autoHeight: true,
                    typeAhead: true,
                    forceSelection: true,
                    triggerAction: 'all',
                    queryMode: 'local'
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Ссылка',
                    name: 'banner_url'   
                },{
                    xtype: 'datefield',
                    fieldLabel: 'Добавлен',
                    name: 'added',
                    format: 'd.m.Y H:i:s',
                    submitFormat: 'Y-m-d H:i:s',
                    value: Ext.util.Format.date( data.added, 'd.m.Y H:i:s'),
                    disabled : true
                },{
                    xtype: 'checkboxfield',
                    fieldLabel: 'Размещается',
                    name: 'is_visible',
                    inputValue: "1",
                    uncheckedValue: "0",
                    checked: true
                },{
                    xtype: 'checkboxfield',
                    fieldLabel: 'Активна',
                    name: 'is_active',
                    inputValue: "1",
                    uncheckedValue: "0",
                    checked: true
                },{
                    xtype: 'cefileinput',
                    fieldLabel: 'Картинка',
                    name: 'img_src'
                },{
                    xtype: 'tinymcefield',
                    name: 'description',
                    fieldLabel: 'Flash *',
                    height: 250,
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
                            url: '/admin/banner/save.json?is_new=0',
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
                : 'Редактирование баннера');
            
            win = desktop.createWindow({
                id: winId,
                title: title,
                width : 760,
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
                    url: '/admin/banner/get-one.json',
                    params : {
                        'id' : id
                    }
                });
            }
        }
        win.show();
    }
});