Ext.define("DataAppModules",{
    init: function() {

    },
    getData : function (){
        return [
        { name: 'Пользователи', iconCls: 'grid-shortcut', module: 'users-manager' },
        { name: 'Статьи', iconCls: 'grid-shortcut', module: 'article-manager' },
        { name: 'Новости', iconCls: 'grid-shortcut', module: 'news-manager' },
        { name: 'Меню', iconCls: 'grid-shortcut', module: 'menu-manager' },
        //{ name: 'Бонусы и акции', iconCls: 'grid-shortcut', module: 'bonus-manager' },

        { name: 'Пополнения счетов', iconCls: 'grid-shortcut', module: 'payment-manager' },
        { name: 'Обьявления', iconCls: 'grid-shortcut', module: 'service-item-manager' },
        { name: 'Баннеры', iconCls: 'grid-shortcut', module: 'banner-manager' },
        { name: 'Комментарии', iconCls: 'grid-shortcut', module: 'comments-manager' },
        { name: 'Сообщения', iconCls: 'grid-shortcut', module: 'feedback-manager' },
        { name: 'Перелинковка', iconCls: 'grid-shortcut', module: 'redirect-manager' },
        { name: 'Files', iconCls: 'grid-shortcut', module: 'file-manager' },
        { name: 'Config', iconCls: 'grid-shortcut', module: 'config-manager' },
        { name: 'Кто Онлайн', iconCls: 'grid-shortcut', module: 'acc-win' }
    ];
    } 
});

Ext.define('MyDesktop.App', {
    extend: 'Ext.ux.desktop.App',

    requires: [
        'Ext.window.MessageBox',

        'Ext.ux.desktop.ShortcutModel',

        'MyDesktop.SystemStatus',
        'MyDesktop.VideoWindow',
        'MyDesktop.GridWindow',
        'MyDesktop.TabWindow',
        'MyDesktop.AccordionWindow',
        'MyDesktop.Notepad',
        'MyDesktop.BogusMenuModule',
        'MyDesktop.BogusModule',

//        'MyDesktop.Blockalanche',
        'MyDesktop.Settings'
    ],

    init: function() {
        // custom logic before getXYZ methods get called...

        this.callParent();

        // now ready...
    },

    getModules : function(){
        return [
            new MyDesktop.ArticleManager(),
            new MyDesktop.NewsManager(),
            new MyDesktop.MenuManager(),
            new MyDesktop.BonusManager(),
            new MyDesktop.UsersManager(),
            new MyDesktop.ServiceItemManager(),
            new MyDesktop.BannerManager(),
            new MyDesktop.RedirectManager(),
            new MyDesktop.CommentsManager(),
            new MyDesktop.FeedbackManager(),
            new MyDesktop.ConfigManager(),
            new MyDesktop.FileManager(),
            new MyDesktop.PaymentManager(),
            new MyDesktop.UsersOnlineManager()
        ];
    },

    getDesktopConfig: function () {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            //cls: 'ux-desktop-black',

            contextMenuItems: [
                { text: 'Change Settings', handler: me.onSettings, scope: me }
            ],

            shortcuts: Ext.create('Ext.data.Store', {
                model: 'Ext.ux.desktop.ShortcutModel',
                data: new DataAppModules().getData()
            }),

            wallpaper: '/extjs/desktop/wallpapers/Blue-Sencha.jpg',
            wallpaperStretch: false
        });
    },

    // config for the start menu
    getStartConfig : function() {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            title: 'Don Griffin',
            iconCls: 'user',
            height: 300,
            toolConfig: {
                width: 100,
                items: [
                    {
                        text:'Settings',
                        iconCls:'settings',
                        handler: me.onSettings,
                        scope: me
                    },
                    '-',
                    {
                        text:'Logout',
                        iconCls:'logout',
                        handler: me.onLogout,
                        scope: me
                    }
                ]
            }
        });
    },

    getTaskbarConfig: function () {
        var ret = this.callParent();

        return Ext.apply(ret, {
            quickStart: [
                { name: 'Accordion Window', iconCls: 'accordion', module: 'acc-win' },
                { name: 'Grid Window', iconCls: 'icon-grid', module: 'grid-win' }
            ],
            trayItems: [
                { xtype: 'trayclock', flex: 1 }
            ]
        });
    },

    onLogout: function () {
        Ext.Msg.confirm('Logout', 'Are you sure you want to logout?');
    },

    onSettings: function () {
        var dlg = new MyDesktop.Settings({
            desktop: this.desktop
        });
        dlg.show();
    }
});
