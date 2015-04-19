Ext.define('MyDesktop.SliderManager', {
    extend: 'Ext.ux.desktop.Module',

    id:'slider-manager',

    init : function(){
        this.launcher = {
            text: 'Slider',
            iconCls:'icon-grid',
            handler : this.createWindow,
            scope: this
        };
        
        this.grid = null;
        this.store = null;
        
        Ext.define('Slider', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id', type: 'int'},
                {name: 'hotel_id', type: 'id'},
                'img_src',
                {name: 'is_visible', type: 'bool'}
            ],
            idProperty: 'id'
        });
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var id = this.id;
        var win = desktop.getWindow(id);
        
        if(!win) {
        
            // create the Data Store
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
                title:'Slider',
                width:300,
                height:400,
                iconCls: 'icon-grid',
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
                items: [
                    this.grid
                ],
                tbar:[ {
                    iconCls: 'icon-add',
                    text: 'Open slider',
                    scope: this,
                    handler: function() {
                        var selection = grid.getView().getSelectionModel().getSelection()[0];

                        if (!selection) return;

                        this.sliderList(selection.raw.id, selection.raw);
                    }
                }]
            });
            
            store.load();
        }
        win.show();
        
        
        return win;
    },
    
    sliderList : function(hotel_id, data){
        var desktop = this.app.getDesktop();
        var id = this.id + "sliders";
        var win = desktop.getWindow(id);
        
        if(!win) {
        
            // create the Data Store
            this.store = Ext.create('Ext.data.Store', {
                model: 'Slider',
                proxy: {
                    type: 'ajax',
                    url: '/admin/slider/get-list.json?hotel_id=' + hotel_id,
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
                    width: 50,
                    sortable: true
                },{
                    text: "image",
                    dataIndex: 'img_src',
                    width: 200,
                    sortable: true
                },{
                    text: 'Is visible',
                    dataIndex: 'is_visible',
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
                title:'Slider - ' + data.title,
                width:400,
                height:480,
                iconCls: 'icon-grid',
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
                items: [
                    this.grid
                ],
                tbar:[ {
                    iconCls: 'icon-add',
                    text: 'Add foto',
                    scope: this,
                    handler: function() {

                        this.sliderForm('new', null, hotel_id);
                    }
                },{
                    iconCls: 'icon-add',
                    text: 'Edit foto',
                    scope: this,
                    handler: function() {
                        var selection = grid.getView().getSelectionModel().getSelection()[0];

                        if (!selection) return;

                        this.sliderForm(selection.raw.id, selection.raw, hotel_id);
                    }
                },{
                    iconCls: 'icon-add',
                    text: 'Remove foto',
                    scope: this,
                    handler: function() {
                        var selection = grid.getView().getSelectionModel().getSelection()[0];

                        if (!selection) return;

                        this.onDeleteClick(selection.raw.id);
                    }
                }]
            });
            
            store.load();
        }
        win.show();
        
        
        return win;
    },
    
    onDeleteClick: function(id){
        var self = this;
        Ext.MessageBox.confirm('Confirm', 'Удалить выбранную запись?', function(btn) {
            if (btn != 'yes') return;

            Ext.Ajax.request({
                url: '/admin/slider/remove.json?id=' + id,
                success: function() {
                    self.store.load();
                }
            });
        });
    },
    
    sliderForm : function(id, data, hotel_id){
        var desktop = this.app.getDesktop();
        var winId = 'index-slider-manager-slider-form-' + id;
        var win = desktop.getWindow(winId);
        
        var self = this;
        self.hotel_id = hotel_id;
        if(!win){
        
            var form = Ext.widget('form', {
                /*waitMsgTarget: true, Сохранение ...*/
                arget: true, /* красивая анимация */
                layout: {
                    type: 'anchor',
                    align: 'stretch'
                },
                autoScroll: true,
                border: false,
                bodyPadding: 15,

                fieldDefaults: {
                    labelAlign: 'right',
                    labelWidth: 85,
                    msgTarget: 'side',
                    anchor:'100%'
                },
                
                reader : Ext.create('Ext.data.reader.Json', {
                    model: 'Slider'
                }),

                items: [{
                    xtype: 'cefileinput',
                    fieldLabel: 'url foto *',
                    name: 'img_src',
                    allowBlank: false
                },{
                    xtype: 'checkboxfield',
                    fieldLabel: 'is visible',
                    name: 'is_visible',
                    inputValue: "1",
                    uncheckedValue: "0",
                    checked : true
                }],

                buttons: [{
                    text: 'Сохранить',
                    formBind: true,
                    handler: function(){
                        this.up('form').getForm().submit({
                            params: {
                                id: id,
                                hotel_id : hotel_id
                            },
                            url: '/admin/slider/save.json',
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
                ? 'New foto' 
                : 'Edit' + data.img_src);
            
            win = desktop.createWindow({
                id: winId,
                title: title,
                width: 600,
                height: 300,
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
                    url: '/admin/slider/get-one.json?id=' + data.id +"&hotel_id=" + self.hotel_id
                });
            }
            
        }
        win.show();
    }
});

