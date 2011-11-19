Ext.define('Mtc.store.InvoiceStatus', {
    extend: 'Ext.data.Store',
    model: 'Mtc.model.InvoiceStatus',
    proxy: {
        type: 'ajax',
        url: '/inventory/invoices/getstatus',
        method: 'POST',        
        reader: {
            type: 'json',
            totalProperty: 'total',
            root: 'data'
        }
    }    
});