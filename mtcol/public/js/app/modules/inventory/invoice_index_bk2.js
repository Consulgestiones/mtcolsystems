Ext.require('Mtc.models.InvoiceHeader');
Ext.require('Mtc.views.invoice.Grid');
Ext.onReady(function(){
    var mainPanel = Ext.create('Ext.panel.Panel', {
        title: 'Panel de facturas',
        renderTo: Ext.get('slot1')   
    });
    var grid = Ext.create('Mtc.views.invoice.Grid', {});
    mainPanel.add(grid);
});

