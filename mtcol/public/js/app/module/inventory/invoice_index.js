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
                height: 500,
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
            }/*,
            callback: function(records, operation, success){                
                var total = 0;
                var tax = 0;
                for(var i = 0; i < records.length; i++){
                    total += records[i].get('totalprice');
                }
                tax = total * 0.16;
                store.add({
                    item: '',
                    product: '',
                    unit: '',
                    quantity: '',
                    unitprice: 'IVA',
                    totalprice: tax
                });
                store.add({
                    item: '',
                    product: '',
                    unit: '',
                    quantity: '',
                    unitprice: 'TOTAL',
                    totalprice: total
                });
            }*/
        })
    });
});