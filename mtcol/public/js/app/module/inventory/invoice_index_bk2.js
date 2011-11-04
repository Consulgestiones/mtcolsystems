Ext.require('Mtc.model.InvoiceHeader');
Ext.require('Mtc.view.invoice.Grid');
Ext.onReady(function(){
    var mainPanel = Ext.create('Ext.panel.Panel', {
        title: 'Panel de facturas',
        renderTo: Ext.get('slot1')   
    });
    var grid = Ext.create('Mtc.view.invoice.Grid', {});
    mainPanel.add(grid);
});

