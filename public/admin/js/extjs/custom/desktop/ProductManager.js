Ext.define('MyDesktop.ProductManager', {
    extend: 'Ext.ux.desktop.Module',

    id:'product-manager',

    init : function(){
        this.launcher = {
            text: 'Группы',
            iconCls:'icon-grid',
            handler : this.createWindow,
            scope: this
        };
        
        this.grid = null;
        this.store = null;
        
        Ext.define('ProductGroup', {
            extend: 'Ext.data.Model',
            fields: [
	             'id', 'title', 'name', 'url', 'brand_id', 'category_id', 
                 'content', 'meta_keywords', 'meta_description', 
	             {name: 'active', type: 'bool'}, 'img_url'
            ],
            idProperty: 'id'
        });
        
        Ext.define('Product', {
            extend: 'Ext.data.Model',
            fields: [
				{name: 'id', type: 'int'},
				'group_id', 'title', 'image_url', 'price', 'size',
				'country', 'tissue', 'color', 'age', {name: 'is_visible', type: 'bool'},
                {name: 'availability', type: 'bool'}, {name: 'popular', type: 'bool'}
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
                model: 'ProductGroup',
                remoteSort: true,
                proxy: {
                    type: 'ajax',
                    url: '/admin/product/get-group-list.json',
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
                    text: "ID",
                    dataIndex: 'id',
                    width: 40,
                    sortable: false
                },{
                    text: "Название",
                    dataIndex: 'name',
                    width: 120,
                    sortable: true
                },{
                    text: "URL",
                    dataIndex: 'url',
                    width: 100,
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
                }]
            });
            
            var grid = this.grid;
            
            win = desktop.createWindow({
                id: id,
                title:'Группы товаров',
                width: 400,
                height:480,
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
                }, '-', {
                    iconCls: 'icon-add',
                    text: 'Редактировать',
                    scope: this,
                    handler: function() {
                        var selection = self.grid.getView().getSelectionModel().getSelection()[0];

                        if (!selection) return;

                        self.createGroupForm(selection.raw.id, selection.raw);
                    }
                }, '-', {
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
                                url: '/admin/category/delete-group.json?id=' + selection.raw.id,
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
                    text: 'Список',
                    scope: this,
                    handler: function() {
                        var selection = self.grid.getView().getSelectionModel().getSelection()[0];

                        if (!selection) return;

                        self.createListWindow(selection.raw);
                    }
                }, '-', {
                    xtype: 'gridSearch',
                    emptyText: 'Поиск ...',
                    width: 120,
                    qtip: 'Поиск по таблице ...',
                    style: 'text-align: left',
                    store: store,
                    useExtraParam: 'find'
                }]
            });
            
            store.load();
        }
        win.show();
        
        return win;
    },
    
    createListWindow: function(group) {
        var self = this;
        
        var desktop = this.app.getDesktop();
        var id = 'product-manager-group-' + group.id;
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
                    text: 'Название',
                    dataIndex: 'title',
                    width: 170,
                    sortable: true
                },{
                    text: 'Размер',
                    dataIndex: 'size',
                    sortable: true
                },{
                    text: 'Страна',
                    dataIndex: 'country',
                    sortable: true
                },{
                    text: 'Цвет',
                    dataIndex: 'color',
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
                    width: 50,
                    align: 'right',
                    sortable: true
                },{
                    text: 'Виден',
                    dataIndex: 'is_visible',
                    trueText: "&radic;",
                    falseText: "",
                    xtype: 'booleancolumn',
                    width: 50,
                    align: 'right',
                    sortable: true
                },{
                    text: 'В наличии',
                    dataIndex: 'availability',
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
                title: 'Товары группы ' + group.name,
                width:740,
                height:400,
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
        var winId = 'product-manager-product-form-' + id;
        var win = desktop.getWindow(winId);
        var self = this;
        
        if(!win) {
            var form = Ext.widget('form', {
                waitMsgTarget: true,
                bodyPadding: 5,
                layout: {
                    type: 'anchor',
                    align: 'stretch'
                },
                border: false,
                bodyPadding: 10,
                autoScroll: true,

                fieldDefaults: {
                    labelAlign: 'right',
                    labelWidth: 110,
                    msgTarget: 'side',
                    anchor:'100%'
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
                    fieldLabel: 'Размер',
                    name: 'size'
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Цвет',
                    name: 'color'
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Ткань',
                    name: 'tissue'
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Возраст',
                    name: 'age'
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Страна',
                    name: 'country'
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Цена',
                    name: 'price',
                    allowBlank: false
                }/*,{
                    xtype: 'textfield',
                    fieldLabel: 'Старая цена',
                    name: 'old_price',
                    allowBlank: false
                }*/,{
                    xtype: 'cefileinput',
                    fieldLabel: 'Картинка',
                    name: 'image_url'
                },{
                    xtype: 'checkboxfield',
                    fieldLabel: 'Популярный',
                    name: 'popular',
                    inputValue: "1",
                    uncheckedValue: "0",
                    checked: true
                },{
                    xtype: 'checkboxfield',
                    fieldLabel: 'Виден',
                    name: 'is_visible',
                    inputValue: "1",
                    uncheckedValue: "0",
                    checked: true
                },{
                    xtype: 'checkboxfield',
                    fieldLabel: 'В наличии',
                    name: 'availability',
                    inputValue: "1",
                    uncheckedValue: "0",
                    checked: true
                }],

                buttons: [{
                    text: 'Submit',
                    formBind: true,
                    handler: function(){
                        this.up('form').getForm().submit({
                            params: {
                                id: id,
                                group_id: groupId
                            },
                            url: '/admin/product/save-product.json',
                            submitEmptyText: false,
                            waitMsg: 'Сохранение...',
                            success: function(form, action) {
                                win.close();
                                store.load();
                                self.store.load();
                            }
                        });
                    }
                }]
            });
            
            var title = (id == 'new' 
                ? 'Новый товар' 
                : 'Редактирование записи ' + data.title);
            
            win = desktop.createWindow({
                id: winId,
                title: title,
                width:400,
                height:400,
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
            } else {
                form.getForm().setValues({
                    'group_id': groupId
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
                fields: ['id','title'],
                proxy: {
                    type: 'ajax',
                    url: '/admin/brand/get-category.json',
                    reader: {
                        type: 'json'
                    }
                }
            }).load();

            var brandStore = Ext.create('Ext.data.Store', {
                fields: ['id', 'title'],
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
                bodyPadding: 5,
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
                    model: 'ProductGroup'
                }),

                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Название *',
                    name: 'name',
                    allowBlank: false
                },{
                	xtype: 'textfield',
                    fieldLabel: 'Тайтл',
                    name: 'title'
                },{
                	xtype: 'textfield',
                    fieldLabel: 'Url',
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
                    fieldLabel: 'META Keywords',
                    name: 'meta_keywords'
                },{
                    xtype: 'textfield',
                    fieldLabel: 'META Description',
                    name: 'meta_description'
                },{
                    xtype: 'tinymcefield',
                    name: 'content',
                    fieldLabel: 'Текст',
                    height: 300,
                    tinymceConfig: {
                        theme_advanced_buttons1 : "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,styleselect,formatselect,fontselect,fontsizeselect",
                        theme_advanced_buttons2 : "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,preview,|,forecolor,backcolor",
                        theme_advanced_buttons3 : "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,media,advhr,|,print,|,insertfile,insertimage",
                        theme_advanced_buttons4: '',
                        skin: 'o2k7'
                    }
                },{
                    xtype: 'cefileinput',
                    fieldLabel: 'Изображение',
                    name: 'img_url'
                },{
                    xtype: 'checkboxfield',
                    fieldLabel: 'Видна',
                    name: 'active',
                    inputValue: "1",
                    uncheckedValue: "0",
                    checked: true
                },],

                buttons: [{
                    text: 'Submit',
                    formBind: true,
                    handler: function(){
                        this.up('form').getForm().submit({
                            params: {
                                id: id
                            },
                            url: '/admin/product/save-group.json',
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
                ? 'Новая Группа' 
                : 'Редактирование группы ' + data.name);
            
            win = desktop.createWindow({
                id: winId,
                title: title,
                width:750,
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
                    parent_id: data.id
                });
            }
            
        }
        win.show();
    }
});