Ext.define('MyDesktop.GroupManager', {
    extend: 'Ext.ux.desktop.Module',

    id:'group-manager',

    init : function(){
        this.launcher = {
            text: 'Подкатегории',
            iconCls:'icon-grid',
            handler : this.createWindow,
            scope: this
        };
        
        this.grid = null;
        this.store = null;

        Ext.define('groupCategory', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id', type: 'int'},
                'name', 'url', 
                'content','meta_keywords','meta_description',
                {name: 'category_id', type: 'int'},
                {name: 'active', type: 'bool'},
                'category',
            ],
            idProperty: 'id'
        });

        Ext.define('Product', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id', type: 'int'},
                 'title', 'url', 'description', 'image_url', 'price',
                 'brand',
                {name: 'is_visible', type: 'bool'},
                {name: 'group_id', type: 'int'},
                {name: 'brand_id', type: 'int'},
                {name: 'popular', type: 'bool'},
                {name: 'special_offer', type: 'bool'}
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
        
            this.store = Ext.create('Ext.data.Store', {
                model: 'groupCategory',
                proxy: {
                    type: 'ajax',
                    url: '/admin/group/get-group-list.json',
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
                columns:[
                    {
                        text: "Название",
                        dataIndex: 'name',
                        width: 200,
                        sortable: true
                    },{
                        text: "Категория",
                        dataIndex: 'category',
                        width: 200,
                        sortable: true
                    },{
                        text: 'Видна',
                        dataIndex: 'active',
                        trueText: "&radic;",
                        falseText: "",
                        xtype: 'booleancolumn',
                        width: 50,
                        align: 'right',
                        sortable: true
                    }
                ]
            });
            
            var grid = this.grid;
        
            win = desktop.createWindow({
                id: id,
                title:'Подкатегории',
                width: 530,
                height:500,
                iconCls: 'icon-grid',
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
                items: [
                    grid
                ],
                tbar:[{
                    iconCls: 'icon-add',
                    text: 'Новая',
                    scope: this,
                    handler: function(){
                        self.createGroupForm('new');
                    }
                }, '-',{
                    iconCls: 'icon-add',
                    text: 'Редактировать',
                    scope: this,
                    handler: function() {
                        var selection = self.grid.getView().getSelectionModel().getSelection()[0];

                        if (!selection) return;

                        self.createGroupForm(selection.raw.id, selection.raw, console.log(selection.raw));
                    }
                }, '-',{
                    iconCls: 'icon-remove',
                    text: 'Удалить',
                    scope: this,
                    handler: function() {
                        var selection = self.grid.getView().getSelectionModel().getSelection()[0];

                        if (!selection) return;

                        Ext.MessageBox.confirm('Confirm', 'Удалить выбранную запись?', function(btn) {
                            if (btn != 'yes') return;

                            self.store.remove(selection);

                            Ext.Ajax.request({
                                url: '/admin/group/delete-group.json?id=' + selection.raw.id,
                                params: {
                                    id: selection.raw.id
                                },
                                success: function() {

                                }
                            });
                        });
                    }
                }, '-', {
                    iconCls: 'icon-list',
                    text: 'Список',
                    scope: this,
                    handler: function(){
                        var selection = self.grid.getView().getSelectionModel().getSelection()[0];

                        if (!selection) return;

                        self.createProductWindow(selection.raw);
                    }
                } /*, '-', {
                    text: 'Поиск',
                    scope: this,
                    handler: function() {
                        Ext.Msg.prompt('Поиск', 'Введите что искать', function(btn, text){
                            if (btn == 'ok'){
                                self.searchForm(text);
                            }
                        });
                    }
                }*/]
            });
            
            store.load();
            //store.sort('position_index_page', 'ASC');
        }
        win.show();
        
        
        return win;
    },
    
    createProductWindow: function(group) {
        var self = this;
        
        var desktop = this.app.getDesktop();
        var id = 'groupCategory-manager-group-' + group.id;
        var win = desktop.getWindow(id);
        
        if(!win) {
        
            // create the Data Store
            var productStore = Ext.create('Ext.data.Store', {
                model: 'Product',
                proxy: {
                    type: 'ajax',
                    url: '/admin/product/get-product-list.json?id=' + group.id,
                    reader: {
                        type: 'json',
                        root: 'data',
                        totalProperty: 'totalCount'
                    }
                }
            });
            
            var productGrid = Ext.create('Ext.grid.Panel', {
                border: false,
                xtype: 'grid',
                store: productStore,
                loadMask: true,
                columns:[{
                    text: 'Название товара',
                    dataIndex: 'title',
                    width: 170,
                    sortable: true
                },{
                    text: 'Брэнд',
                    dataIndex: 'brand',
                    width: 170,
                    sortable: true
                },{
                    text: 'Цена',
                    dataIndex: 'price',
                    width: 70,
                    sortable: true
                },{
                    text: 'Популярный',
                    dataIndex: 'popular',
                    trueText: "&radic;",
                    falseText: "",
                    xtype: 'booleancolumn',
                    width: 80,
                    align: 'right',
                    sortable: true
                },{
                    text: 'Спец. предложение',
                    dataIndex: 'special_offer',
                    trueText: "&radic;",
                    falseText: "",
                    xtype: 'booleancolumn',
                    width: 120,
                    align: 'right',
                    sortable: true
                },{
                    text: 'Виден',
                    dataIndex: 'is_visible',
                    trueText: "&radic;",
                    falseText: "",
                    xtype: 'booleancolumn',
                    width: 80,
                    align: 'right',
                    sortable: true
                }]
            });
        
            win = desktop.createWindow({
                id: id,
                title: "Подкатегория: " + group.name,
                width: 730,
                height: 400,
                iconCls: 'icon-grid',
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
                items: [
                    productGrid
                ],
                tbar:[{
                    iconCls: 'icon-add',
                    text: 'Новая запись',
                    scope: this,
                    handler: function() {
                        self.createProductForm('new', group.id, {}, productStore);
                    }
                }, '-', {
                    iconCls: 'icon-add',
                    text: 'Редактировать запись',
                    scope: this,
                    handler: function() {
                        var selection = productGrid.getView().getSelectionModel().getSelection()[0];

                        if (!selection) return;

                        self.createProductForm(selection.raw.id, group.id, selection.raw, productStore);
                    }
                }, '-', {
                    iconCls: 'icon-remove',
                    text: 'Удалить запись',
                    scope: this,
                    handler: function() {
                        var selection = productGrid.getView().getSelectionModel().getSelection()[0];

                        if (!selection) return;
                        
                        Ext.MessageBox.confirm('Confirm', 'Удалить выбранную запись?', function(btn) {
                            if (btn != 'yes') return;
                            
                            productStore.remove(selection);
                            
                            Ext.Ajax.request({
                                url: '/admin/product/delete-product.json?id=' + selection.raw.id,
                                params: {
                                    id: selection.raw.id
                                },
                                success: function() {
                                    productStore.load();
                                }
                            });
                        });
                    }
                }]
            });
            
            productStore.load();
        }
        win.show();
        
       
        return win;
        
    },
    
    createProductForm : function(id, groupId, data, store){
        var desktop = this.app.getDesktop();
        var winId = 'activity-manager-activity-form-' + id;
        var win = desktop.getWindow(winId);
        
        if(!win){
            
            var brandStore = Ext.create('Ext.data.Store', {
                fields: [{name: 'id', type: 'int'}, 'title'],
                proxy: {
                    type: 'ajax',
                    url: '/admin/product/get-brand-list.json',
                    reader: {
                        type: 'json',
                        root: 'data',
                        totalProperty: 'totalCount'
                    }
                }
            }).load();
            
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
                    anchor: '100%'
                },
                
                reader : Ext.create('Ext.data.reader.Json', {
                    model: 'Product'
                }),

                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Название *',
                    name: 'title',
                    allowBlank: false
                    
                },{
                    xtype: 'textfield',
                    fieldLabel: 'url *',
                    name: 'url',
                    allowBlank: false,
                    regex: /^[A-Za-z1-9-_]{0,}$/
                    
                },{
                    xtype: 'tinymcefield',
                    name: 'description',
                    fieldLabel: 'Описание',
                    height: 300,
                    tinymceConfig: {}
                },{
                    xtype: 'cefileinput',
                    fieldLabel: 'Изображение',
                    name: 'image_url'
                },{
                    xtype: 'combo',
                    store: brandStore,
                    displayField: 'title',
                    valueField: 'id',
                    name: 'brand_id',
                    fieldLabel: 'Бренд *',
                    autoHeight: true,
                    typeAhead: true,
                    forceSelection: true,
                    triggerAction: 'all',
                    queryMode: 'local',      
                    allowBlank: false
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Цена *',
                    name: 'price',
                    allowBlank: false
                    
                },{
                    xtype: 'checkboxfield',
                    fieldLabel: 'Популярный',
                    name: 'popular',
                    inputValue: "1",
                    uncheckedValue: "0",
                    checked: false
                },{
                    xtype: 'checkboxfield',
                    fieldLabel: 'Спец. предложение',
                    name: 'special_offer',
                    inputValue: "1",
                    uncheckedValue: "0",
                    checked: false
                },{
                    xtype: 'checkboxfield',
                    fieldLabel: 'Виден',
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
                                id: id,
                                group_id : groupId
                            },
                            url: '/admin/product/save-product.json',
                            submitEmptyText: false,
                            waitMsg: 'Сохранение...',
                            success: function(form, action) {
                                win.close();
                                store.load();
                            }
                        });
                    }
                }]
            });
            
            var title = (id == 'new' 
                ? 'Новый продукт' 
                : 'Редактирование продукта ' + data.title);
            
            win = desktop.createWindow({
                id: winId,
                title: title,
                width: 800,
                height:480,
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
                    url: '/admin/product/get-product.json?id=' + data.id
                });
            }
            
        }
        win.show();
    },
    
    createGroupForm: function(id, data){
        var self = this;
        
        var desktop = this.app.getDesktop();
        var winId = 'product-manager-group-form-' + id;
        var win = desktop.getWindow(winId);
        
        if(!win){
            var categoryStore = Ext.create('Ext.data.Store', {
                fields: [{name: 'id', type: 'int'},'title'],
                proxy: {
                    type: 'ajax',
                    url: '/admin/group/get-category-list.json',
                    reader: {
                        type: 'json'
                    }
                }
            }).load();
            
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
                    model: 'groupCategory'
                }),

                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Название *',
                    name: 'name',
                    allowBlank: false
                },{
                    xtype: 'textfield',
                    fieldLabel: 'url *',
                    name: 'url',
                    allowBlank: false
                },{
                    xtype: 'combo',
                    store: categoryStore,
                    displayField: 'title',
                    valueField: 'id',
                    name: 'category_id',
                    fieldLabel: 'Категория *',
                    autoHeight: true,
                    typeAhead: true,
                    forceSelection: true,
                    triggerAction: 'all',
                    queryMode: 'local',      
                    allowBlank: false
                    
                },{
                    xtype: 'tinymcefield',
                    name: 'content',
                    fieldLabel: 'Описание',
                    height: 300,
                    tinymceConfig: {}
                },{
                    xtype: 'textfield',
                    fieldLabel: 'META Keywords',
                    name: 'meta_keywords'
                },{
                    xtype: 'textfield',
                    fieldLabel: 'META Description',
                    name: 'meta_description'
                },{
                    xtype: 'checkboxfield',
                    fieldLabel: 'Видна',
                    name: 'active',
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
                            url: '/admin/group/save-group.json',
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
                ? 'Новая Подкатегория' 
                : 'Редактирование подкатегории - ' + data.name);
            
            win = desktop.createWindow({
                id: winId,
                title: title,
                width: 800,
                height:480,
                iconCls: 'icon-form',
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
                autoScroll: true,
                items: [
                    form
                ]
            });
            
            if (id != 'new') {
                form.getForm().load({
                    url: '/admin/product/get-group.json?id=' + data.id
                });
            } else {
                form.getForm().setValues({
                });
            }
            
        }
        win.show();
    }
});

