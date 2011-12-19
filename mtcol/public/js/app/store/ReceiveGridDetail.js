Ext.define('Mtc.store.ReceiveGridDetail', {
    extend: 'Ext.data.Store',
    requires: ['Mtc.model.ReceiveRemDetail'],
    model: 'Mtc.model.ReceiveRemDetail',
    proxy: {
        type: 'ajax',
        url: '/inventory/remissions/getreceivedetail',
        method: 'POST',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});