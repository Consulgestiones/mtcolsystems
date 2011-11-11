//loadModels(['InvoiceHeader', 'TypeId'], 'invoice_index');
Application({
    models: ['Invoice', 'InvoiceDetail'],
    views: ['invoice.Grid', 'invoice.InvoiceDetail', 'invoice.InvoiceDetailGrid', 'util.Notification'],
    stores: ['Invoice', 'InvoiceDetail']
}, function(){  
    var mainPanel = Ext.create('Mtc.view.invoice.MainPanel', {
        items: [            
            {
                xtype: 'invoicegrid',
                id: 'invoiceGrid',
                //columnWidth: 1,
                width: '100%',
                height: AppConfig.gridHeight
            },
            {
                xtype: 'panel',
                id: 'detailPanel',
                items: [
                    Ext.create('Mtc.view.invoice.InvoiceDetail', {
                        
                    })
                ],
                height: 300,
                autoScroll: true,
                //columnWidth: .4,
                hidden: true
            }
        ],
        renderTo: Ext.get('slot1')
    });
    var invoiceGrid = Ext.getCmp('invoiceGrid');
    var detailPanel = Ext.getCmp('detailPanel');
    Ext.getCmp('invoiceGrid').getSelectionModel().on('selectionchange', function(grid, row){
        invoiceGrid.setSize('60%', undefined);
        detailPanel.setSize('40%', undefined);
        detailPanel.show();
        var form = detailPanel.down('form');
        var rows = invoiceGrid.getSelectionModel().getSelection();
        var record = rows[0];
        form.getForm().loadRecord(record);
    });
});