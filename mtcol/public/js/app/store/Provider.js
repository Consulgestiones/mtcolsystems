Ext.define('Mtc.store.Provider', {
    extend: 'Ext.data.Store',
    model: 'Mtc.model.Provider',
    proxy: {
        type: 'ajax',
        method: 'POST',
        url: '/admin/providers/read',
        reader: {
            type: 'json',
            totalProperty: 'total',
            root: 'data'
        }
    },
    autoLoad: false
})
