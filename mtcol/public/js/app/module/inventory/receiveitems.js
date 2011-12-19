Mtc.receiveitems = {
    init: function(){
        this.remissions = Ext.create('Mtc.view.remission.ReceiveGridHeader', {
            id: 'ReceiveGridHeader',
            store: Ext.create('Mtc.store.ReceiveRemHeader', {
                autoLoad: true
            })
        });
        this.mainPanel = Ext.create('Ext.panel.Panel', {
            title: 'Recibir remisiones',
            items: [
                this.remissions
            ],
            renderTo: Ext.get('slot1')
        });
    },
    receive: function(){
        
        var header = Ext.create('Mtc.view.remission.FormHeader');
        var detail = Ext.create('Mtc.view.remission.ReceiveGridDetail');
        
        var win = Ext.create('Ext.window.Window', {
            title: 'Recibir remisión',
            modal: true,
            items: [
                header,
                detail
            ]
        });           
        win.show();
        
    }
}
Mtc.receiveitems.init.call(Mtc.receiveitems);