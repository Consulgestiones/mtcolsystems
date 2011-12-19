Ext.define('Mtc.store.ReceiveRemHeader', {
    extend: 'Ext.data.Store',
    requires: ['Mtc.model.ReceiveRemHeader'],
    model: 'Mtc.model.ReceiveRemHeader',
    proxy: {
        type: 'ajax',
        method: 'POST',
        url: '/inventory/remissions/getreceiveremheaders',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});