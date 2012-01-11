Ext.define('Mtc.store.WorkOrderHeader', {
    extend: 'Ext.data.Store',
    requires: ['Mtc.model.WorkOrderHeader'],
    model: 'Mtc.model.WorkOrderHeader',
    proxy: {
        type: 'ajax',
        url: '/inventory/workorders/getworkorderheaders',
        method: 'POST',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});