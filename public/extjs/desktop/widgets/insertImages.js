Ext.define('Ext.ux.insertimages', {
    extend: 'Ext.form.field.Trigger',
    alias: 'widget.insertimages',
    //triggerBaseCls: Ext.baseCSSPrefix + 'form-trigger inserImageclass',
    cls: "inserImageclass",
        fieldSubTpl: [
        '<input id="{id}" type="hidden" ',
            '<tpl if="name">name="{name}" </tpl>',
            '<tpl if="size">size="{size}" </tpl>',
            '<tpl if="tabIdx">tabIndex="{tabIdx}" </tpl>',
            'class="{fieldCls} {typeCls}" autocomplete="off" />',
        '<div id="{cmpId}-triggerWrap" class="{triggerWrapCls}" role="presentation">',
            '{triggerEl}',
            '<div class="{clearCls}" role="presentation"></div>',
        '</div>',
        {
            compiled: true,
            disableFormats: true
        }
    ],
    
    defaultAutoCreate : {tag: "button", type: "hidden", size: "10", autocomplete: "off"},
    manager: function(){},
    initComponent: function() {
       
       this.callParent();
        
        this.id = Ext.id();
        this.iframeId = 'mceFileManager';
        this.win = null;
        this.manager = this.initialConfig.manager;
    },
    
    onTriggerClick: function() {
        var desktop = myDesktopApp.getDesktop();
        
        this.win = desktop.getWindow(this.id + '-win');
        
        if (this.win == null) {
            this.win = desktop.createWindow({
                id: this.id + '-win',
                title: this.winCaption,
                layout : 'fit',
                modal: true,
                width: 800,
                height: 480,
                minWidth: 800,
                minHeight: 480,
                closeAction: 'close',
                closeObserver: this.valueCloser(),
                //plain: true,
                html: '<iframe id="' + this.iframeId + '" style="width: 100%; height: 100%; border: none;" frameborder="0"></iframe>'
            });
            //CE.mceFileManager_count = 1;
            
        }
        
        this.win.show();
        this.openManager();

    },
    
    openManager: function() {
        mcImageManager.openInIframe(this.iframeId, '', '', '', this.valueSetter(),
            {remove_script_host: true}
        );
    },
    
    valueSetter: function(win) {
        var obj = this;
        return function(data) {
            obj.win.close();
            obj.win = null;
            //CE.mceFileManager_count = 0;
            //obj.disable();
            
            obj.valueChecker.call(obj, data, function(res) {
            	if (res) {
            		obj.setValue(data);
                    obj.manager(data);
            	}
            	obj.enable();
            });
        };
    },
    
    valueChecker: function(data, callback) {
        callback(true);
        //console.log(MyDesktop.NewsManager);
    },
    
    valueCloser: function(win) {
        var obj = this;
        return function(data) {
            //obj.win = null;
            //CE.mceFileManager_count = 0;
        };
    }
});