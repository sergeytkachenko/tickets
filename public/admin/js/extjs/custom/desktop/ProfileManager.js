Ext.define('MyDesktop.ProfileManager', {
    extend: 'Ext.ux.desktop.Module',
    id:'profile-manager',
        
    init : function(){
  
        var self = this;
        
        this.launcher = {
            text: 'Profile',
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
        Ext.define('Profile', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id', type: 'int'},
                {name: 'user_id', type: 'int'},
                'name', 'phone', 'photo_avatar', 
                'photo_to_verification', 'photo_vip',
                'about', 'city_title', 'user_email', 
                'type_anket_title', 'salon_title',
                {name: 'photo100', type: 'bool'},
                {name: 'photo_vip_modereted', type: 'bool'},
                {name: 'type_anket_id', type: 'int'},
                {name: 'last_date_active', type: 'date'},
                {name: 'last_date_up', type: 'date'},
                {name: 'age', type: 'int'},
                {name: 'height', type: 'int'},
                {name: 'weight', type: 'int'},
                {name: 'breast', type: 'int'},
                {name: 'speak_english', type: 'bool'},
                {name: 'city_id', type: 'int'},
                {name: 'salon_id', type: 'int'},
                {name: 'cost_hour', type: 'int'},
                {name: 'cost_two_hour', type: 'int'},
                {name: 'cost_night', type: 'int'},
                {name: 'added', type: 'date'},
                {name: 'active', type: 'bool'},
                'url', {name: 'is_new', type: 'bool'}
            ],
            idProperty: ['id','name']
        });
        new countItem().get(self);

    },
    onDeleteClick: function(id){
        var self = this;
        
        Ext.MessageBox.confirm('Confirm', 'Delete select item?', function(btn) {
            if (btn != 'yes') return;
            Ext.Ajax.request({
                url: '/admin/profile/remove.json?id=' + id,
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
                
                model: 'Profile',
                remoteGroup: true,
                // allow the grid to interact with the paging scroller by buffering
                buffered: true,
                leadingBufferZone: 300,
                pageSize: 100,
                proxy: {
                    // load using script tags for cross domain, if the data in on the same domain as
                    // this page, an Ajax proxy would be better
                    type: 'ajax',
                    url: '/admin/profile/get-item-list.json',
                    reader: {
                        root: 'data',
                        totalProperty: 'totalCount'
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
                    direction: 'ASC'
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
                    }
                }
            });
 
            var store = this.store;
            
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
                    width: 50,
                    sortable: true
                },{
                    text: "Имя",
                    dataIndex: 'name',
                    width: 100,
                    sortable: true
                },{
                    text: "Email",
                    dataIndex: 'user_email',
                    width: 150,
                    sortable: true
                },{
                    text: "Телефон",
                    dataIndex: 'phone',
                    width: 120,
                    sortable: true
                },{
                    text: "Город",
                    dataIndex: 'city_title',
                    width: 100,
                    sortable: true
                },{
                    text: 'Фото 100%',
                    dataIndex: 'photo100',
                    trueText: "&radic;",
                    falseText: "",
                    xtype: 'booleancolumn',
                    width: 80,
                    align: 'center',
                    sortable: true
                },{
                    text: 'Vip проверенно',
                    dataIndex: 'photo_vip_modereted',
                    trueText: "&radic;",
                    falseText: "",
                    xtype: 'booleancolumn',
                    width: 90,
                    align: 'center',
                    sortable: true
                },{
                    text: 'Размещается',
                    dataIndex: 'active',
                    trueText: "&radic;",
                    falseText: "",
                    xtype: 'booleancolumn',
                    width: 80,
                    align: 'center',
                    sortable: true
                },{
                    text: "Добавлен",
                    dataIndex: 'added',
                    width: 120,
                    sortable: true,
                    renderer: Ext.util.Format.dateRenderer('d.m.Y H:i:s')
                },{
                    text: 'Новая',
                    dataIndex: 'is_new',
                    trueText: "&radic;",
                    falseText: "",
                    xtype: 'booleancolumn',
                    width: 80,
                    align: 'center',
                    sortable: true
                },{
                    text: 'Активна',
                    dataIndex: 'is_visible',
                    trueText: "&radic;",
                    falseText: "",
                    xtype: 'booleancolumn',
                    width: 70,
                    align: 'center',
                    sortable: true
                },{
                    text: "Просмотр",
                    dataIndex: 'url',
                    width: 100,
                    renderer: function(value){
                        var myURL = '';
                        if(value !== ''){
                            myURL = '<a href="' + value + '" target="_blank">смотреть анкету</a>';
                        }
                        return myURL;
                    }
                } ],
                emptyText: 'Нет данных...'
            });
            
            var grid = this.grid;
        
            win = desktop.createWindow({
                id: id,
                title:'Анкеты',
                width: 1300,
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
                    text: 'Добавить анкету',
                    scope: this,
                    handler: function() {

                        this.createForm("new");
                    }
                }, '-', {
                    iconCls: 'icon-add',
                    text: 'Редактировать анкету',
                    scope: this,
                    handler: function() {
                        var selection = grid.getView().getSelectionModel().getSelection()[0];

                        if (!selection) return;

                        this.createForm(selection.raw.id, selection.raw);
                    }
                }]
            });
            win.show();
        }
    },
    
    onTextFieldChange : function(e){
        this.store.load({
            params: {
                search : e.value
            }
        });
    },
            
    createForm : function(id, data){
        
        var desktop = this.app.getDesktop();
        var winId = 'profile-manager-profile-form-' + id;
        var win = desktop.getWindow(winId);
               
        var self = this;
        
        if(!win){
            
            var paymentStatus = Ext.create('Ext.data.Store', {
                model: 'Profile',
                proxy: {
                    type: 'ajax',
                    url: '/admin/profile/get-one.json?id=' + id,
                    reader: {
                        type: 'json',
                        root: 'data',
                        totalProperty: 'totalCount'
                    }
                    
                }
            }).load();
           
            
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
                    model: 'Profile'
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
                }/*,{
                    xtype: 'textfield',
                    fieldLabel: 'Тип анкеты',
                    name: 'type_anket_title',
                    disabled : true
                }*/,{
                    xtype: 'combo',
                    store: self.typeAnketStore,
                    displayField: 'title',
                    valueField: 'id',
                    name: 'type_anket_id',
                    fieldLabel: 'Тип анкеты *',
                    autoHeight: true,
                    typeAhead: true,
                    forceSelection: true,
                    triggerAction: 'all',
                    queryMode: 'local'
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Салон/Индивидуалка',
                    name: 'salon_title',
                    disabled : true
                }/*,{
                    xtype: 'textfield',
                    fieldLabel: 'Город',
                    name: 'city_title',
                    disabled : true
                }*/,{
                    xtype: 'combo',
                    store: self.citesStore,
                    displayField: 'city',
                    valueField: 'id',
                    name: 'city_id',
                    fieldLabel: 'Тип анкеты *',
                    autoHeight: true,
                    typeAhead: true,
                    forceSelection: true,
                    triggerAction: 'all',
                    queryMode: 'local'
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Имя',
                    name: 'name',      
                    allowBlank: false,
                    regex :/^[а-яА-Я]{0,}$/
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Телефон',
                    name: 'phone',      
                    allowBlank: false,
                    renderer: function(value){
                        return $.trim(value);
                    }


                },{
                    xtype: 'textfield',
                    fieldLabel: 'Возвраст',
                    name: 'age',      
                    allowBlank: false,
                    regex :/^[0-9]{1,}$/
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Рост',
                    name: 'height',      
                    allowBlank: false,
                    regex :/^[0-9]{1,}$/
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Вес',
                    name: 'weight',      
                    allowBlank: false,
                    regex :/^[0-9]{1,}$/
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Бюст',
                    name: 'breast',      
                    allowBlank: false,
                    regex :/^[0-9]{1,}$/
                },{
                    xtype: 'textfield',
                    fieldLabel: 'За час',
                    name: 'cost_hour',      
                    allowBlank: false,
                    regex :/^[0-9]{1,}$/
                },{
                    xtype: 'textfield',
                    fieldLabel: 'За 2 часа',
                    name: 'cost_two_hour',      
                    allowBlank: false,
                    regex :/^[0-9]{0,}$/
                },{
                    xtype: 'textfield',
                    fieldLabel: 'За ночь',
                    name: 'cost_night',      
                    allowBlank: false,
                    regex :/^[0-9]{0,}$/
                },{
                    xtype: 'textarea',
                    fieldLabel: 'О себе',
                    name: 'about'
                },{
                    xtype: 'datefield',
                    fieldLabel: 'Добавлен',
                    name: 'added',
                    format: 'd.m.Y H:i:s',
                    submitFormat: 'Y-m-d H:i:s',
                    value: Ext.util.Format.date( data.added, 'd.m.Y H:i:s'),
                    disabled : true
                },{
                    xtype: 'datefield',
                    fieldLabel: 'Размещена до',
                    name: 'last_date_active',
                    format: 'd.m.Y H:i:s',
                    submitFormat: 'Y-m-d H:i:s',
                    value: Ext.util.Format.date( data.last_date_active, 'd.m.Y H:i:s')
                },{
                    xtype: 'checkboxfield',
                    fieldLabel: 'Фото 100%',
                    name: 'photo100',
                    inputValue: "1",
                    uncheckedValue: "0",
                    checked: true,
                    disabled: true
                },{
                    xtype: 'checkboxfield',
                    fieldLabel: 'Vip проверенно',
                    name: 'photo_vip_modereted',
                    inputValue: "1",
                    uncheckedValue: "0",
                    checked: true,
                    disabled: true
                },{
                    xtype: 'checkboxfield',
                    fieldLabel: 'Размещается',
                    name: 'active',
                    inputValue: "1",
                    uncheckedValue: "0",
                    checked: true,
                    disabled: true
                },{
                    xtype: 'cefileinput',
                    fieldLabel: 'Аватар',
                    name: 'photo_avatar',
                    allowBlank: false
                },{
                    xtype: 'cefileinput',
                    fieldLabel: 'Vip фото',
                    name: 'photo_vip'
                },{
                    xtype: 'cefileinput',
                    fieldLabel: 'Фото 100%',
                    name: 'photo_to_verification'
                },
                
                new Avatar(id),
                new Vip(id),
                new PhotoAlbom(id),
                new Photo100(id)
                
            ],
            tbar: [
                {
                    text: 'Подтвердить vip',
                    formBind: true,
                    handler: function(){
                        Ext.MessageBox.confirm('Confirm', 'Вы урены, что хотите подтвердить VIP фото?', function(btn) {
                            if (btn != 'yes') return;
                            Ext.Ajax.request({
                                url: '/admin/profile/vip-true.json?id=' + id + "&email="+ data.user_email,
                                success: function() {
                                    Ext.Msg.alert('Status', 'Процесс выполнен');
                                }
                            });
                        });
                    }
                },{
                    text: 'Забраковать vip',
                    formBind: true,
                    handler: function(){
                        Ext.MessageBox.confirm('Confirm', 'Вы урены, что хотите забраковать VIP фото?', function(btn) {
                            if (btn != 'yes') return;
                            Ext.Ajax.request({
                                url: '/admin/profile/vip-false.json?id=' + id + "&email="+ data.user_email,
                                success: function() {
                                    Ext.Msg.alert('Status', 'Процесс выполнен');
                                }
                            });
                        });
                    }
                },{
                    text: 'Забраковать фото 100%',
                    formBind: true,
                    handler: function(){
                        Ext.MessageBox.confirm('Confirm', 'Вы урены, что хотите забраковать Photo 100% ?', function(btn) {
                            if (btn != 'yes') return;
                            Ext.Ajax.request({
                                url: '/admin/profile/photosto-false.json?id=' + id + "&email="+ data.user_email,
                                success: function() {
                                    Ext.Msg.alert('Status', 'Процесс выполнен');
                                }
                            });
                        });
                    }
                },{
                    text: 'Подтвердить фото 100%',
                    formBind: true,
                    handler: function(){
                        Ext.MessageBox.confirm('Confirm', 'Вы урены, что хотите подтвердить Photo 100% ?', function(btn) {
                            if (btn != 'yes') return;
                            Ext.Ajax.request({
                                url: '/admin/profile/photosto-true.json?id=' + id + "&email="+ data.user_email,
                                success: function() {
                                   Ext.Msg.alert('Status', 'Процесс выполнен');
                                }
                            });
                        });
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
                            url: '/admin/profile/save.json?is_new=0',
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
                ? 'Новая анкета' 
                : 'Редактирование ' + data.name);
            
            win = desktop.createWindow({
                id: winId,
                title: title,
                width : 600,
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
                    url: '/admin/profile/get-one.json',
                    params : {
                        'id' : id
                    }
                });
            }
        }
        win.show();
    }
});