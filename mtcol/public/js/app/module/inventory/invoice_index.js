//loadModels(['InvoiceHeader', 'TypeId'], 'invoice_index');
Application({
    models: ['Invoice', 'InvoiceDetail'],
    views: ['invoice.Grid', 'invoice.InvoiceDetail', 'invoice.InvoiceDetailGrid'],
    stores: ['Invoice', 'InvoiceDetail']
}, function(){  
    var mainPanel = Ext.create('Mtc.view.invoice.MainPanel', {
        items: [            
            {
                xtype: 'invoicegrid',
                columnWidth: .6,
                height: AppConfig.gridHeight
            },
            {
                xtype: 'invoicedetail',
                columnWidth: .4
            }
        ],
        renderTo: Ext.get('slot1')
    });
    
});