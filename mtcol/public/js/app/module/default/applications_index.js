Application({
    views: ['application.MainPanel', 'application.ModPanel']
}, function(){
    
    var mainPanel = Ext.create('Mtc.view.application.MainPanel', {
        renderTo: Ext.get('slot1')
    });
    
    var user = getGlobal('user');
    var apps = user.applications;    
    
    for(var i = 0; i < apps.length; i++){
        var a = apps[i];                

        var app = Ext.create('Mtc.view.application.ModPanel', {
            appimage: a.img,
            appdisabled: a.disabled,
            apphref: '/' + a.module + '/' + a.controller + '/' + a.action,
            appname: a.application,
            width: AppConfig.appsWidthItem
        });        
        
        mainPanel.add(app);

    }
    
});