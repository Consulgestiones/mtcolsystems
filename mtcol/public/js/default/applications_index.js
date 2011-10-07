var usr = getGlobal('user');
if(usr != null){    
    
    var items = new Array();
    var apps = usr.applications;
    for(var i = 0; i < apps.length; i++){
        items.push({
            src: apps[i].img,
            caption: apps[i].application
        });
    }
    
    Ext.define('Apps', {
        extend: 'Ext.data.Model',
        fields:[
            {name: 'src', type: 'string'},
            {name: 'caption', type: 'string'}
        ]  
    })
    
    var appsDataStore = Ext.create('Ext.data.Store', {
        id: 'appsStore',
        model: 'Apps',
        data: apps
    });
    
    var appsTpl = new Ext.XTemplate(
        '&lt;tpl for="."&gt;',
            '&lt;div style="thumb-wrap"&gt;',
              '&lt;img src="{src}" /&gt;',
              '&lt;br/&gt;&lt;span&gt;{caption}&lt;/span&gt;',
            '&lt;/div&gt;',
        '&lt;/tpl&gt;'
    );
            
    var dataView = Ext.create('Ext.DataView', {
        store: appsDataStore,
        tpl: appsTpl,
        itemSelector: 'div.thumb-wrap',
        emptyText: 'No Application'
    });
    
    Ext.create('Ext.window.Window', {
        title: 'Módulos',
        draggable: false,
        floating: false,
        autoShow: true,
        layou: {
            type: 'table',
            columns: 3
        },
        items: dataView,
        renderTo: Ext.get('slot2')
    });
}