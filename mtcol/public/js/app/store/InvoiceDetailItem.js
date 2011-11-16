Ext.define('Mtc.store.InvoiceDetailItem', {
    extend: 'Ext.data.Store',
    model: 'Mtc.model.InvoiceDetailItem',
//    proxy: {
//        type: 'ajax',
//        url: '/inventory/invoices/item',
//        method: 'POST',
//        reader: {
//            type: 'json',
//            totalProperty: 'total',
//            root: 'data'
//        }
//    }
    data: [
        {item: 1, product: 'product 1', unit: 'UN', quantity: 3, unitprice: '100', tax: 16, taxvalue: 48, totalprice: 148}
    ]
});
