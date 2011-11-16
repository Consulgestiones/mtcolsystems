Ext.define('Mtc.store.Product', {
    extend: 'Ext.data.Store',
    model: 'Mtc.model.Product',
    proxy: {
        type: 'ajax',
        url: '/admin/products/getprodsfromprovider',
        method: 'POST',
        reader: {
            type: 'json',
            totalProperty: 'total',
            root: 'data'
        }
    },
    autoLoad: false
});