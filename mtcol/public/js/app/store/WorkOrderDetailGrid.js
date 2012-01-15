Ext.define('Mtc.store.WorkOrderDetailGrid', {
    extend: 'Ext.data.Store',
    requires: ['Mtc.model.WorkOrderDetailGrid'],
    model: 'Mtc.model.WorkOrderDetailGrid',
    proxy: {
        type: 'ajax',
        method: 'POST',
        url: '/inventory/workorders/getworkorders',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});