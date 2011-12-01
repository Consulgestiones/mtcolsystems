Ext.define('Mtc.store.RemissionDetail', {
    extend: 'Ext.data.Store',
    requires: ['Mtc.model.RemissionDetail'],
    model: 'Mtc.model.RemissionDetail',
    proxy: {
        type: 'ajax',
        method: 'POST',
        url: '/inventory/remissions/getdetail',
        reader: {
            type: 'json',
            totalProperty: 'total',
            root: 'data'
        }
    }
});