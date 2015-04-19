Ext.define('MyDesktop.FileManager', {
    extend: 'Ext.ux.desktop.Module',
    
    id:'file-manager',
    
    init : function(){
        this.launcher = {
            text: 'Файловый менеджер',
            iconCls:'icon-grid',
            handler : this.createWindow,
            scope: this
        }
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow(this.id);
        
        var initMce = false;
        
        if(!win){
            initMce = true;
            win = desktop.createWindow({
                id: this.id,
                title: 'Файловый менеджер',
                width:900,
                height:600,
				minWidth: 800,
				minHeight: 500,
                iconCls: 'icon-grid',
                shim:false,
                animCollapse:false,
                constrainHeader:true,

                layout: 'fit',
				html: '<iframe id="mce_filemanager_iframe" style="width: 100%; height: 100%; border: none;" frameborder="0"></iframe>'
            });
			
        }
        win.show();
        if (initMce) {
            mcFileManager.openInIframe('mce_filemanager_iframe');
        }
    }
});