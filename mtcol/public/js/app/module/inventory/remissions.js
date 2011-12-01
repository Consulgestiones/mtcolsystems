Mtc.RemissionController = {
    init: function(){
        
        Ext.create('Ext.panel.Panel', {
            title: 'Remisiones',
            id: 'RemissionPanel',
            items: [
                Ext.create('Mtc.view.remission.GridHeaders', {
                    id: 'grdRemissionHeader'
                })
            ],
            renderTo: Ext.get('slot1')
        });
        
        
    }
}
Mtc.RemissionController.init.call(Mtc.RemissionController);