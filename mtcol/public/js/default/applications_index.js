var usr = getGlobal('user');
if(usr != null){    
    
    var items = new Array();
    var apps = usr.applications;
    
    var w = (100/apps.length)/100;
    
    
    for(var i = 0; i < apps.length; i++){        
        items.push({
            id: 'app_' + apps[i].idapplication,
            xtype: 'panel',
            tag: 'div',
            html: '<center><a href="/' + apps[i].module + '/' + apps[i].controller + '/' + apps[i].action + '" ><img src="' + apps[i].img + '" /></a><br /><span class="item-label-inner">' + apps[i].application + '</span></center>',
            autoHeight: true,
            width: config.appsWidthItem
        });
    }
    
    var h = Math.ceil((items.length/config.appsColumns)) * 190;
    
    Ext.create('Ext.panel.Panel', {
        title: 'Módulos',
        draggable: false,
        height: h,
        width: '100%',
        items: items,
        layout: {
            type: 'table',
            columns: config.appsColumns,
            itemCls: 'split-item'
        },
        renderTo: Ext.get('slot1')
    });

}