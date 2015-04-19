Ext.define('MyDesktop.BigBannersManager', {
    extend: 'Ext.ux.desktop.Module',

    id:'big-banners-manager',
        
    init : function(){
  
        var self = this;
        
        this.launcher = {
            text: 'Big-Banners',
            iconCls: 'icon-grid',
            handler : this.createWindow,
            scope : this
        };
        
        this.grid = null;
        this.store = null;
        this.urlImage = null;

        Ext.define('Big-Banners', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id', type: 'int'},
                'title','image_src','href',
                {name: 'date_start', type: 'date'},
                {name: 'date_end', type: 'date'},
                {name: 'is_visible', type: 'bool'},
                'contacts'

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
        
            // create the Data Store
            this.store = Ext.create('Ext.data.Store', {
                model: 'Big-Banners',
                proxy: {
                    type: 'ajax',
                    url: '/admin/big-banners/get-list.json',
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
                    text: "Название",
                    dataIndex: 'title',
                    width: 200,
                    sortable: true
                },{
                    text: "Дата начала показов",
                    dataIndex: 'date_start',
                    width: 150,
                    sortable: true,
                    renderer: Ext.util.Format.dateRenderer('d.m.Y')
                },{
                    text: "Дата окончания показов",
                    dataIndex: 'date_end',
                    width: 150,
                    sortable: true,
                    renderer: Ext.util.Format.dateRenderer('d.m.Y')
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
            
            var grid = this.grid;
        
            win = desktop.createWindow({
                id: id,
                title:'Горизонтальный баннер' ,
                width: 700,
                height: 480,
                iconCls: 'icon-grid',
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
                items: [
                    this.grid
                ],
                tbar:[/*{
                    iconCls: 'icon-add',
                    text: 'Добавить',
                    scope: this,
                    handler: function() {
      
                        this.createForm("new");
                    }
                },"-",*/{
                    iconCls: 'icon-add',
                    text: 'Редактировать',
                    scope: this,
                    handler: function() {
                        var selection = grid.getView().getSelectionModel().getSelection()[0];

                        if (!selection) return;

                        this.createForm(selection.raw.id, selection.raw);
                    }
                }/*,"-",{
                    iconCls: 'icon-add',
                    text: 'Удалить',
                    scope: this,
                    handler: function() {
                        var selection = grid.getView().getSelectionModel().getSelection()[0];

                        if (!selection) return;

                        this.onDeleteClick(selection.raw.id);
                    }
                }*/]
            });
            
            store.load();
        }
        win.show();

        return win;
    },
    
    onDeleteClick: function(id){
        var self = this;
        
        Ext.MessageBox.confirm('Confirm', 'Уалить баннер?', function(btn) {
            if (btn != 'yes') return;

            Ext.Ajax.request({
                url: '/admin/big-banners/remove.json?id=' + id,
                success: function() {
                    self.store.load();
                }
            });
        });
    },
    
    createForm : function(id, data){
       
        var ndate = new Date();
        ndate = ndate.getFullYear() + "-" + ndate.getMonth() + "-" + ndate.getDay();
        
        var date_start = (undefined !== data)? data.date_start : ndate,
        date_end = (undefined !== data)? data.date_end : ndate,
        all_page_view = (undefined !== data)? data.all_page_view : false;
       
        var desktop = this.app.getDesktop();
        var winId = 'big-banners-manager-big-banners-form-' + id;
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
                    model: 'Big-Banners'
                }),

                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Id',
                    name: 'id',
                    disabled : true
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Название',
                    name: 'title'
                },{
                    xtype: 'cefileinput',
                    fieldLabel: 'Изображение',
                    name: 'image_src'
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Ссылка (куда ведет)',
                    name: 'href'
                },{
                    xtype: 'datefield',
                    fieldLabel: 'Дата начала показа',
                    name: 'date_start',
                    format: 'd.m.Y',
                    submitFormat: 'Y-m-d',
                    value: Ext.util.Format.date(date_start, 'd.m.Y')
                },{
                    xtype: 'datefield',
                    fieldLabel: 'Дата окончания показа',
                    name : 'date_end',
                    format: 'd.m.Y',
                    submitFormat: 'Y-m-d',
                    value: Ext.util.Format.date(date_end, 'd.m.Y')
                },{
                    xtype: 'checkboxfield',
                    fieldLabel: 'Виден',
                    name: 'is_visible',
                    inputValue: "1",
                    uncheckedValue: "0",
                    checked: true
                },{
                    xtype: 'textarea',
                    fieldLabel: 'Контакты клиента',
                    name: 'contacts'
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
                            url: '/admin/big-banners/save.json',
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
                : 'Редактирование баннера ' + data.title);
            
            win = desktop.createWindow({
                id: winId,
                title: title,
                width : 800,
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
                    url: '/admin/big-banners/get-one.json',
                    params : {
                        'id' : id
                    }
                });
            }
        }
        win.show();
    }
});

