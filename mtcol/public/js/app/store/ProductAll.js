Ext.define('Mtc.store.ProductAll', {
    extend: 'Ext.data.Store',
    requires: ['Mtc.model.Product'],
    model: 'Mtc.model.Product',
    proxy: {
        type: 'ajax',
        method: 'POST',
        url: '/admin/products/getproducts',
        reader: {
            type: 'json',
            totalProperty: 'total',
            root: 'data'
        }
    }
});