Ext.define('Mtc.store.PaymentMethod', {
    extend: 'Ext.data.Store',
    model: 'Mtc.model.PaymentMethod',
    proxy: {
        type: 'ajax',
        method: 'POST',
        url: '/admin/paymentmethods/getpaymentmethods',
        reader: {
            type: 'json',
            totalProperty: 'total',
            root: 'data'
        }
    }
});