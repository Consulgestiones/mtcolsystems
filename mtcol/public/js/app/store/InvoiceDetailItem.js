Ext.define('Mtc.store.InvoiceDetailItem', {
    extend: 'Ext.data.Store',
    model: 'Mtc.model.InvoiceDetailItem',
    proxy: {
        type: 'ajax',
        url: '/inventory/invoices/item',
        method: 'POST',
        reader: {
            type: 'json',
            totalProperty: 'total',
            root: 'data'
        }
    }    
});
