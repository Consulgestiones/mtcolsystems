Ext.define('Mtc.view.invoice.InvoiceDetailGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.invoicedetailgrid',
    store: Ext.create('Mtc.store.InvoiceDetail'),    
    features: [{
        ftype: 'summary'
    }],
    columns: [
        {
            header: 'Item',
            dataIndex: 'item',
            width: 30
        },
        {
            header: 'Descripción',
            dataIndex: 'product',
            width: 150
        },
        {
            header: 'Unidad',
            dataIndex: 'unit',
            width: 40
        },
        {
            header: 'Cantidad',
            dataIndex: 'quantity',
            width: 50
        },
        {
            header: 'Valor Unitario',
            dataIndex: 'unitprice',
            align: 'right',
            renderer: function(value){        
                var x = currencyFormat(value);
                return x;
            },
            width: 80
        },
        {
            header: 'Precio Total',
            dataIndex: 'itemprice',
            summaryType: 'sum',
            summaryRenderer: function(value, summaryData, dataIndex) {
                return Ext.String.format('Subtotal {0}', currencyFormat(value)); 
            },
            align: 'right',
            renderer: function(value){        
                var x = currencyFormat(value);
                return x;
            },
            width: 150
        },
        {
            header: 'IVA',
            dataIndex: 'taxvalue',
            summaryType: 'sum',
            summaryRenderer: function(value, summaryData, dataIndex){
                return Ext.String.format('IVA {0}', currencyFormat(value));
            },
            align: 'right',
            renderer: function(value){
                var x = currencyFormat(value);
                return x;
            },
            width: 80
        },
        {
            header: 'Total + IVA',
            dataIndex: 'totalprice',
            summaryType: 'sum',
            summaryRenderer: function(value, summaryData, dataIndex){
                return Ext.String.format('TOTAL {0}', currencyFormat(value));
            },
            align: 'right',
            renderer: function(value){
                var x = currencyFormat(value);
                return x;
            },
            width: 150
        }
    ]
});