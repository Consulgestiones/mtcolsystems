Ext.define('Mtc.view.invoice.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.invoicegrid',
    title: 'InvoiceGrid',    
    initComponent: function(){
        this.store = Ext.create('Mtc.store.Invoice');
        this.columns = [
            {
                header: 'Col 1',
                dataIndex: 'col1'
            },
            {
                header: 'Col 2',
                dataIndex: 'col2'
            }
        ]
    }/*,
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
    ]*/
}); 