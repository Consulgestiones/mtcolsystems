Ext.define('Mtc.view.invoice.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.invoicegrid',       
    store: Ext.create('Mtc.store.Invoice'),
    columns: [
            {
                header: 'Col 1',
                dataIndex: 'col1'
            },
            {
                header: 'Col 2',
                dataIndex: 'col2'
            }
        ]
}); 