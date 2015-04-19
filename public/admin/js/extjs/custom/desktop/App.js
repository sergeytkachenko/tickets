/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.define("DataAppModules",{
    init: function() {

    },
    getData : function (){
        return [
//        { name: 'Услуги', iconCls: 'grid-shortcut', module: 'servise-manager' },
        { name: 'Статьи', iconCls: 'grid-shortcut', module: 'article-manager' },
        { name: 'Бонусы и акции', iconCls: 'grid-shortcut', module: 'bonus-manager' },
//        { name: 'Taxi', iconCls: 'grid-shortcut', module: 'taxi-manager' },
//        { name: 'Сауны', iconCls: 'grid-shortcut', module: 'sauns-manager' },
//        { name: 'Отели', iconCls: 'grid-shortcut', module: 'hotels-manager' },
//        { name: 'Баннеры', iconCls: 'grid-shortcut', module: 'banners-manager' },
//        { name: 'Горизонтальный баннер', iconCls: 'grid-shortcut', module: 'big-banners-manager' },
        { name: 'Пополнения счетов', iconCls: 'grid-shortcut', module: 'payment-manager' },
        { name: 'Пользователи', iconCls: 'grid-shortcut', module: 'users-manager' },
        { name: 'Анкеты', iconCls: 'grid-shortcut', module: 'profile-manager' },
        { name: 'Комментарии анкет', iconCls: 'grid-shortcut', module: 'comments-manager' },
        { name: 'Комментарии салонов', iconCls: 'grid-shortcut', module: 'comments-salon-manager' },
        { name: 'Сообщения', iconCls: 'grid-shortcut', module: 'feedback-manager' },
        { name: 'Перелинковка', iconCls: 'grid-shortcut', module: 'redirect-manager' },
        { name: 'Files', iconCls: 'grid-shortcut', module: 'file-manager' },
        { name: 'Config', iconCls: 'grid-shortcut', module: 'config-manager' }
    ];
    } 
});

Ext.define('MyDesktop.App', {
    extend: 'Ext.ux.desktop.App',

    init: function() {
        // custom logic before getXYZ methods get called...

        this.callParent();

        // now ready...
    },

    getModules : function(){
        return [

//            new MyDesktop.ServiseManager(),
            new MyDesktop.ArticleManager(),
            new MyDesktop.BonusManager(),
//            new MyDesktop.TaxiManager(),
//            new MyDesktop.HotelsManager(),
//            new MyDesktop.SaunsManager(),
            new MyDesktop.PaymentManager(),
            new MyDesktop.UsersManager(),
            new MyDesktop.ProfileManager(),
            new MyDesktop.RedirectManager(),
//            new MyDesktop.BannersManager(),
            new MyDesktop.CommentsManager(),
            new MyDesktop.CommentsSalonManager(),
            new MyDesktop.FeedbackManager(),
//            new MyDesktop.BigBannersManager(),
            new MyDesktop.ConfigManager(),
            new MyDesktop.FileManager()
        ];
    },

    getDesktopConfig: function () {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            contextMenuItems: [
                { text: 'Change Settings', handler: me.onSettings, scope: me }
            ],
            shortcuts: Ext.create('Ext.data.Store', {
                model: 'Ext.ux.desktop.ShortcutModel',
                data: new DataAppModules().getData()
            }),

            //wallpaper: 'wallpapers/Blue-Sencha.jpg',
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