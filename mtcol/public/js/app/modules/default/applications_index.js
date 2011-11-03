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
            html: (apps[i].disabled == 0)?'<center><a href="/' + apps[i].module + '/' + apps[i].controller + '/' + apps[i].action + '" ><img src="' + apps[i].img + '" /></a><br /><span class="item-label-inner">' + apps[i].application + '</span></center>':'<center><img src="' + apps[i].imgdisabled + '" /><br /><span class="item-label-inner">' + apps[i].application + '</span></center>',
            autoHeight: true,
            width: AppConfig.appsWidthItem
        });
    }
    
    var h = Math.ceil((items.length/AppConfig.appsColumns)) * 190;
    
    Ext.create('Ext.panel.Panel', {
        title: 'Módulos',
        //height: h,
        width: '100%',
        items: items,
        autoHeight: true,
        layout: {
            type: 'table',
            columns: AppConfig.appsColumns,
            itemCls: 'split-item'
        },
        renderTo: Ext.get('slot1')
    });

}