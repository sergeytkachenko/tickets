function htmlspecialchars(text)
{
   var chars = Array("&", "<", ">", '"', "'");
   var replacements = Array("&amp;", "&lt;", "&gt;", "&quot;", "'");
   for (var i=0; i<chars.length; i++)
   {
       var re = new RegExp(chars[i], "gi");
       if(re.test(text))
       {
           text = text.replace(re, replacements[i]);
       }
   }
   return text;
}

Ext.define("countItem", {
    
    get: function(self){
        return;
        Ext.define('Count', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'count', type: 'int'}
            ],
            idProperty: 'id'
        });
        var controller = self.id.split("-")[0];
        self.itemStore = Ext.create('Ext.data.Store', {
            model: 'Count',
            proxy: {
                type: 'ajax',
                url: '/admin/'+controller+'/get-new-list.json',
                reader: {
                    type: 'json',
                    root: 'data',
                    totalProperty: 'totalCount'
                }
            },
            	listeners: {
		'load': function(that, records, successful, eOpts){
                    
                    var id = self.id;
                    var name;
                    Ext.each(new DataAppModules().getData(), function(field, key) {
                        if(field.module == id){
                            name = field.name;
                        }
                    });

                    var count = records[0].data.count;
                    if(count == 0){
                        Ext.select('#'+name+'-shortcut .count').remove();
                        return;
                    }
                     
                    var el = new Ext.Element(document.createElement('b')); 
                    el.update(count); 
                    el.addCls("count");
                    Ext.fly(name+'-shortcut').appendChild( el );
                }
            }
        });

        Ext.TaskMgr.start({
            run: function(){
                self.itemStore.load();
            },
            interval: 30000
        });
    }
});