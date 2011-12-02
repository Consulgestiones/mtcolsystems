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
        Ext.getCmp('grdRemissionHeader').getSelectionModel().on('selectionchange', function(sm, selection){                        
            var rem = selection[0];
            if(typeof Mtc.remView == 'undefined'){
                Ext.require('Mtc.view.remission.RemissionView', function(){
                    var remView = Ext.create('Mtc.view.remission.RemissionView');
                    this.selRemission(remView, rem);
                }, this);                
            }            
            
        }, this);
    }, 
    selRemission: function(remView, rem){
        var header = remView.getHeaderForm();
        var detail = remView.getDetailGrid();
        header.loadRecord(rem);
        Ext.getCmp('RemissionPanel').add(remView);
    }
}
Mtc.RemissionController.init.call(Mtc.RemissionController);