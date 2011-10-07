var usr = getGlobal('user');
if(usr != null){    
    
    var items = new Array();
    var apps = usr.applications;
    
    
    for(var i = 0; i < apps.length; i++){        
        items.push({
            id: 'app_' + apps[i].idapplication,
            xtype: 'panel',
            title: apps[i].application,
            tag: 'div',
            html: '<img src="' + apps[i].img + '" />',
            autoHeigth: true,
            width: 105
        });
    }
    
    Ext.create('Ext.window.Window', {
        title: 'Módulos',
        draggable: false,
        floating: false,
        autoShow: true,
        closable: false,
        layout: {
            type: 'table',
            columns: 3
        },
        bodyPadding: 30,
        items: items,
        renderTo: Ext.get('slot2')
    });
}