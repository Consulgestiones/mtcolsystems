Ext.define('Mtc.store.RemissionList', {
    extend: 'Ext.data.Store',
    requires: ['Mtc.model.Remission'],
    model: 'Mtc.model.Remission',
    proxy: {
        type: 'ajax',
        method: 'POST',
        url: '/inventory/invoices/getinvoices',
        reader: {
            type: 'json',
            totalProperty: 'total',
            root: 'data'
        }
    }
});

