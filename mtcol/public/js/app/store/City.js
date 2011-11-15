Ext.define('Mtc.store.City', {
    extend: 'Ext.data.Store',    
    model: 'Mtc.model.City',
    proxy: {
        type: 'ajax',
        url: '/default/cities/read',
        reader: {
            type: 'json',
            totalProperty: 'total',
            root: 'data'
        }
    },
    autoLoad: false
})