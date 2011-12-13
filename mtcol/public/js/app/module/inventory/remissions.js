Mtc.RemissionController = {
    init: function(){
        
        Ext.create('Ext.panel.Panel', {
            title: 'Remisiones',
            id: 'RemissionPanel',
            layout: 'column',
            items: [
                Ext.create('Mtc.view.remission.GridHeaders', {
                    id: 'grdRemissionHeader',
                    columnWidth: 1
                })
            ],
            renderTo: Ext.get('slot1')
        });
//        Ext.getCmp('grdRemissionHeader').getSelectionModel().on('selectionchange', function(sm, selection){                        
//            var rem = selection[0];
//            if(typeof Mtc.remView == 'undefined'){
//                Ext.require('Mtc.view.remission.RemissionView', function(){
//                    var remView = Ext.create('Mtc.view.remission.RemissionView', {
//                        columnWidth: .5,
//                        height: Ext.getCmp('grdRemissionHeader').getHeight()
//                    });
//                    this.selRemission(remView, rem);
//                }, this);                
//            }            
//            
//        }, this);
    }, 
    selRemission: function(remView, rem){
        var header = remView.getHeaderForm();
        var detail = remView.getDetailGrid();
        header.loadRecord(rem);        
        Ext.getCmp('RemDetailDelButton').hide();
        Ext.getCmp('RemissionPanel').removeAll();
        Ext.getCmp('grdRemissionHeader').apply(this, {
            flex: 0.5
        });
        Ext.getCmp('RemissionPanel').add(remView);
    }
}
Mtc.RemissionController.init.call(Mtc.RemissionController);
