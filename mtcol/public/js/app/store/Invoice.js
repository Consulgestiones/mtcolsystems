Ext.define('Mtc.store.Invoice', {
    extend: 'Ext.data.Store',
    model: 'Mtc.model.Invoice',
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

