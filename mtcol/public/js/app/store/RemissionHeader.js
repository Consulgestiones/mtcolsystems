Ext.define('Mtc.store.RemissionHeader', {
    extend: 'Ext.data.Store',
    requires: ['Mtc.model.Remission'],
    model: 'Mtc.model.Remission',
    storeId: 'RemissionHeader',
    proxy: {
        type: 'ajax',
        method: 'POST',
        url: '/inventory/remissions/getheaders',
        reader: {
            type: 'json',
            totalProperty: 'total',
            root: 'data'
        }
    },
    autoLoad: true
});