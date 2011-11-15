//loadModels(['InvoiceHeader', 'TypeId'], 'invoice_index');
Application({
    models: ['Invoice', 'InvoiceDetail', 'Provider', 'Country', 'City', 'PaymentMethod'],
    views: ['invoice.Grid', 'invoice.InvoiceDetail', 'invoice.InvoiceDetailGrid', 'util.Notification', 'application.CountryCombo', 'application.CityCombo', 'invoice.InvoiceFormWindow'],
    stores: ['Invoice', 'InvoiceDetail', 'Provider', 'Country', 'City', 'PaymentMethod']
}, function(){  
    var mainPanel = Ext.create('Mtc.view.invoice.MainPanel', {
        items: [            
            {
                xtype: 'invoicegrid',
                id: 'invoiceGrid',
                width: '100%',
                height: AppConfig.gridHeight
            },
            {
                xtype: 'panel',
                id: 'detailPanel',
                items: [
                    Ext.create('Mtc.view.invoice.InvoiceDetail', {
                        id: 'invoiceDetail'
                    })
                ],
                height: 300,
                autoScroll: true,
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
        var ivd = Ext.getCmp('invoiceDetail');
        var grd = ivd.getDetailGrid();
        var store = grd.getStore();
        store.load({
            params: {
                idinvoice: record.get('idinvoice')
            }
        })
    });
});