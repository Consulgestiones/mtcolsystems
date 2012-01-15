Ext.define('Mtc.view.workorder.WorkOrderDetailGrid', {
    extend: 'Ext.grid.Panel',
    columns: [
        {
            header: 'Item',
            dataIndex: 'item'
        },
        {
            header: 'Descripción',
            dataIndex: 'product'
        },
        {
            header: 'Unidad',
            dataIndex: 'unit'            
        },
        {
            header: 'Cantidad',
            dataIndex: 'quantity'
        }
    ]
});