Ext.onReady(function(){
    viewport = Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [
            {
                region: 'north',
                autoHeight: true,
                border: false,
                items: [
                    Ext.get('layout-header'),
                    lmenu
                ],
                frame: false
            },
            {                
                region: 'center',
                autoHeight: true,
                html: 'west'
            }
        ]
    });
});