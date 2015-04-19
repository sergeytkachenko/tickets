Ext.define('MyDesktop.CommentsManager', {
    extend: 'Ext.ux.desktop.Module',

    id:'comments-manager',
        
    init : function(){
  
        var self = this;
        
        this.launcher = {
            text: 'Comments',
            iconCls: 'icon-grid',
            handler : this.createWindow,
            scope : this
        };
        
        this.grid = null;
        this.store = null;
        this.urlImage = null;

        Ext.define('Comments', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id', type: 'int'},
                {name: 'id_anket', type: 'int'},
                'name','comment',
                {name: 'date', type: 'date'},
                {name: 'moderated', type: 'bool'},
                {name: 'is_new', type: 'bool'}

            ],
            idProperty: 'id'
        });
        new countItem().get(self);
    },

    createWindow : function(){ 
        
        var desktop = this.app.getDesktop();
        var id = this.id;
        var win = desktop.getWindow(id);
        var self = this;   
        
        if(!win) {
        
            // create the Data Store
            this.store = Ext.create('Ext.data.Store', {
                model: 'Comments',
                proxy: {
                    type: 'ajax',
                    url: '/admin/comments/get-list.json',
                    reader: {
                        type: 'json',
                        root: 'data',
                        totalProperty: 'totalCount'
                    }
                },
                listeners: {
                    "load": function(){
                        self.itemStore.load();
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
                    text: "Имя",
                    dataIndex: 'name',
                    width: 150,
                    sortable: true
                },{
                    text: "Дата",
                    dataIndex: 'date',
                    width: 150,
                    sortable: true,
                    renderer: Ext.util.Format.dateRenderer('d.m.Y')
                },{
                    text: 'Показываеться',
                    dataIndex: 'moderated',
                    trueText: "&radic;",
                    falseText: "",
                    xtype: 'booleancolumn',
                    width: 120,
                    align: 'center',
                    sortable: true
                },{
                    text: 'Новый',
                    dataIndex: 'is_new',
                    trueText: "&radic;",
                    falseText: "",
                    xtype: 'booleancolumn',
                    width: 120,
                    align: 'center',
                    sortable: true
                },{
                    text: "Просмотр анкеты",
                    dataIndex: 'id_anket',
                    width: 120,
                    renderer: function(value){
                        var myURL = '';
                        if(value !== ''){
                            myURL = '<a href="/girl/view/' + value + '-url.html" target="_blank">view anket('+value+')</a>';
                        }
                        return myURL;
                    }
                }]
            });
            
            var grid = this.grid;
        
            win = desktop.createWindow({
                id: id,
                title:'Комментарии анкет' ,
                width: 900,
                height: 480,
                iconCls: 'icon-grid',
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
                items: [
                    this.grid
                ],
                tbar:[{
                    iconCls: 'icon-add',
                    text: 'Редактировать',
                    scope: this,
                    handler: function() {
                        var selection = grid.getView().getSelectionModel().getSelection()[0];

                        if (!selection) return;

                        this.createForm(selection.raw.id, selection.raw);
                    }
                },"-",{
                    iconCls: 'icon-add',
                    text: 'Удалить',
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
        
        Ext.MessageBox.confirm('Confirm', 'Удалить?', function(btn) {
            if (btn != 'yes') return;

            Ext.Ajax.request({
                url: '/admin/comments/remove.json?id=' + id,
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
        var winId = 'comments-manager-comments-form-' + id;
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
                    model: 'Comments'
                }),

                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Id',
                    name: 'id',
                    disabled : true
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Имя',
                    name: 'name'
                },{
                    xtype: 'textarea',
                    fieldLabel: 'Комментарий',
                    name: 'comment'
                },{
                    xtype: 'datefield',
                    fieldLabel: 'Дата',
                    name: 'date',
                    format: 'd.m.Y H:i:s',
                    submitFormat: 'Y-m-d H:i:s',
                    value: Ext.util.Format.date(data.date, 'd.m.Y H:i:s')
                },{
                    xtype: 'checkboxfield',
                    fieldLabel: 'Виден',
                    name: 'moderated',
                    inputValue: "1",
                    uncheckedValue: "0",
                    checked: true
                },{
                    xtype: 'checkboxfield',
                    fieldLabel: 'Новый',
                    name: 'is_new',
                    inputValue: "1",
                    uncheckedValue: "0",
                    checked: true,
                    disabled: true
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
                            url: '/admin/comments/save.json',
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
                : 'Редактирование коментария');
            
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
                    url: '/admin/comments/get-one.json',
                    params : {
                        'id' : id
                    }
                });
            }
        }
        win.show();
    }
});

