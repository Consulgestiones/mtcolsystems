Ext.define('Mtc.view.invoice.InvoiceDetail', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.invoicedetailgrid',
    store: Ext.create('Mtc.store.InvoiceDetail'),
    title: 'Detalle',
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
            header: 'Valor Unitario',
            dataIndex: 'unitprice'
        },
        {
            header: 'Precio Total',
            dataIndex: 'totalprice'
        }
    ]
});