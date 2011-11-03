Ext.define('Mtc.store.InvoiceGrid', {
    extend: 'Ext.data.Store',
    model: 'InvoiceHeader',
    proxy: {
        type: 'ajax',
        method: 'POST',
        url: '/inventory/invoices/getinvoices',
        reader: {
            type: 'json',
            totalProperty: 'total',
            root: 'data'
        }
    },
    autoLoad: false
});

