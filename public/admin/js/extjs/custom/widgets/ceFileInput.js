  function myFileBrowser (field_name, url, type, win) {
      var i = new Ext.ux.ceFileInput;
      i.valueChecker = function(data, callback) {
          var input = $("iframe").contents().find("#src"); // добавление катинки в не ссылку
          $(input).attr('value', data);
          
          var input2 = $("iframe").contents().find("#href"); // для добавления картинки в ссылку
          $(input2).attr('value', data);
          
          $(input, input2).trigger("change");
          
      };
      i.onTriggerClick();
  }
  function showEditor() {}

Ext.define('Ext.ux.ceFileInput', {
    extend: 'Ext.form.field.Trigger',
    alias: 'widget.cefileinput',

    initComponent: function() {
        this.callParent();
        
        this.id = Ext.id();
        this.iframeId = 'mceFileManager';
        this.win = null;
        
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
                html: '<iframe id="' + this.iframeId + '" style="width: 100%; height: 100%; border: none;" frameborder="0"></iframe>'
            });
            
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
            obj.disable();
            
            obj.valueChecker.call(obj, data, function(res) {
            	if (res) {
                    
                    obj.setValue(data);
                    
            	}
            	obj.enable();
            });
            
        };
    },
    
    valueChecker: function(data, callback) { // когда выбираю фотографию
        callback(true);
    },
    
    valueCloser: function(win) { // когда открываю менеджер
        var obj = this;
        return function(data) {

        };
    }
});
