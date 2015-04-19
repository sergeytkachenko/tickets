Ext.override(Ext.data.Store, {
    setExtraParams: function (params){
        this.proxy.extraParams = this.proxy.extraParams || {};
        for(var x in params) {
            this.proxy.extraParams[x] = params[x];
        }
        this.proxy.applyEncoding(this.proxy.extraParams);
    },
    setExtraParam: function (name, value){
        this.proxy.extraParams = this.proxy.extraParams || {};
        this.proxy.extraParams[name] = value;
        this.proxy.applyEncoding(this.proxy.extraParams);
    }
});

Ext.define('Ext.ux.GridSearch', {
	extend: 'Ext.form.field.Trigger',
	alias: 'widget.gridSearch',
    
	triggerTip: 'Нажмите для очистки поля',
	store: 'none',
	useExtraParam: 'none',
	triggerBaseCls: 'x-form-trigger',
	qtip: 'Поиск по таблице ... ',
	triggerCls: 'x-form-clear-trigger',
    
	onRender: function(ct, position){
		Ext.ux.GridSearch.superclass.onRender.call(this, ct, position);
		this.triggerEl.on('mouseover', function(t){
            this.showSpTip(this.triggerTip, this.triggerEl);
        }, this);
		this.inputEl.on('mouseover', function(t){
            this.showSpTip(this.qtip, this.inputEl);
        }, this);
	},
    
	onTriggerClick : function() {
	  this.reset();
		if(this.store !== 'none' && this.useExtraParam !== 'none'){
		    this.store.setExtraParam(this.useExtraParam, '');
			this.store.load();
		}
	},
    
	delayUtil: new Ext.util.DelayedTask(),
    
	delaytask: function(){
		this.store.setExtraParam(this.useExtraParam, this.getValue());
		this.store.load();	
	},
    
	onKeyUp: function(){
		if(this.store !== 'none' && this.useExtraParam !== 'none'){
				this.delayUtil.delay(500, this.delaytask, this);			
		}
	},
    
	enableKeyEvents: true,
    
	showSpTip : function(tip,target) {
		Ext.QuickTips.register({
            text: tip,
            target: target,
            dismissDelay: 6000
		});
	}
});