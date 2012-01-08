Ext.define('Mtc.store.RegimenProvider', {
    extend: 'Ext.data.Store',
    model: 'Mtc.model.RegimenProvider',
    proxy: {
        type: 'ajax',
        url: '/admin/providers/getregimens',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});