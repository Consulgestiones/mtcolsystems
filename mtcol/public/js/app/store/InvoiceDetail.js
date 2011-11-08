Ext.define('Mtc.store.InvoiceDetail', {
    extend: 'Ext.data.Store',
    model: 'Mtc.model.InvoiceDetail',
    proxy: {
        type: 'ajax',
        method: 'POST',
        url: '/inventory/invoices/getinvoicedetail',
        reader: {
            type: 'json',
            totalProperty: 'total',
            root: 'data'
        }
    }
});