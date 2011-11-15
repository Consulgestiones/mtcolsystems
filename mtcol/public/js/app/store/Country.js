Ext.define('Mtc.store.Country', {
    extend: 'Ext.data.Store',
    model: 'Mtc.model.Country',
    proxy: {
        type: 'ajax',
        url: '/default/countries/read',
        method: 'POST',
        reader: {
            type: 'json',
            totalProperty: 'total',
            root: 'data'
        }
    },
    autoLoad: false
});