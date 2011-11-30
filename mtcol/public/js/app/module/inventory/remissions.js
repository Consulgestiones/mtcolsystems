Mtc.RemissionController = {
    init: function(){
        
        Ext.create('Ext.panel.Panel', {
            title: 'Remisiones',
            id: 'RemissionPanel',
            items: [
                {
                    xtype: 'button',
                    text: 'Probar',
                    handler: function(){
                        var win = Ext.create('Mtc.view.remission.WindowForm');
                        win.show();
                    }
                }
            ],
            renderTo: Ext.get('slot1')
        });
        
        
    }
}
Mtc.RemissionController.init.call(Mtc.RemissionController);