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
            dataIndex: 'item'
        },
        {
            header: 'Producto',
            dataIndex: 'product'
        },
        {
            header: 'Unidad',
            dataIndex: 'unit'
        },
        {
            header: 'Cantidad',
            dataIndex: 'quantity'
        },
        {
            header: 'Valor Unitario',
            dataIndex: 'unitprice',
            align: 'right',
            renderer: function(value){        
                var x = currencyFormat(value);
                return x;
            }
        },
        {
            header: 'Precio Total',
            dataIndex: 'totalprice',
            summaryType: 'sum',
            summaryRenderer: function(value, summaryData, dataIndex) {
                return Ext.String.format('TOTAL {0}', currencyFormat(value)); 
            },
            align: 'right',
            renderer: function(value){        
                var x = currencyFormat(value);
                return x;
            }
        }
    ]
});