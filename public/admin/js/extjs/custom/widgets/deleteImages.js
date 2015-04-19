Ext.define('Ext.ux.deleteimages', {
    extend: 'Ext.form.field.Trigger',
    alias: 'widget.deleteimages',
    triggerBaseCls: Ext.baseCSSPrefix + 'form-trigger deleteImageclass',
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
    handler: function(){},
    initComponent: function() {
       
       this.callParent();
        
        this.id = Ext.id();
        this.iframeId = 'mceFileManager';
        this.win = null;
        this.handler = this.initialConfig.handler;
    },
    onTriggerClick: function(){
        this.handler();
    }
});