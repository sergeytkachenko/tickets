Ext.define('MyDesktop.UsersOnlineManager', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.data.TreeStore',
        'Ext.layout.container.Accordion',
        'Ext.toolbar.Spacer',
        'Ext.tree.Panel'
    ],

    id:'acc-win',

    init : function(){
        this.launcher = {
            text: 'Accordion Window',
            iconCls:'accordion'
        };

    },

    createUsersTree : function(){
        var store = Ext.create('Ext.data.TreeStore', {
            proxy: {
                type: 'ajax',
                url: '/admin/users/get-online-users-list.json'
            },
            listenters: {
                beforeload: function( store, operation, eOpts ){
                    console.log( store, operation, eOpts );
                    return false;
                }
            }
        }).load();
        
        var tree = Ext.create('Ext.tree.Panel', {
            id:'users-tree',
            title: 'Пользователи онлайн',
            rootVisible:false,
            lines:false,
            autoScroll:true,
            tools:[{
                type: 'refresh',
                handler: function(c, t) {

                }
            }],
            store:store 
        });

        return tree;
    },

    createAdminTree : function(){
        var store = Ext.create('Ext.data.TreeStore', {
            proxy: {
                type: 'ajax',
                url: '/admin/users/get-online-admin-list.json'
            },
            listenters: {
                beforeload: function( store, operation, eOpts ){
                    console.log( store, operation, eOpts );
                    return false;
                }
            }
            
        }).load();
        
        var tree = Ext.create('Ext.tree.Panel', {
            id:'admin-tree',
            title: 'Администраторы онлайн',
            rootVisible:false,
            lines:false,
            autoScroll:true,
            tools:[{
                type: 'refresh',
                handler: function(c, t) {

                }
            }],
            store:store 
        });

        return tree;
    },
    
    createWindow : function(){
        
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('acc-win');

        if (!win) {
            win = desktop.createWindow({
                id: 'acc-win',
                title: 'Пользователи онлайн',
                width: 400,
                height: 400,
                iconCls: 'accordion',
                animCollapse: false,
                constrainHeader: true,
                bodyBorder: Ext.themeName !== 'neptune',
                layout: 'accordion',
                border: false,

                items: [
                    this.createAdminTree(),
                    this.createUsersTree()
                ]
            });
        }

        return win;
    }
});
