Ext.define('Mtc.view.workorder.WorkOrdersGrid', {
    extend: 'Ext.grid.Panel',
    tbar: [
        {
            text: 'Crear Orden de Trabajo',
            iconCls: 'add'
        }
    ],
    columns: [
        {
            header: 'Item',
            dataIndex: 'item'
        },
        {
            header: 'Producto',
            dataIndex: 'idproduct'
        },
        {
            header: 'Unidad',
            dataIndex: 'unit'
        },
        {
            header: 'Cantidad',
            dataIndex: 'quantity'
        },
        {
            header: 'Valor',
            dataIndex: 'unitpricetax'
        },
        {
            header: 'Uso',
            dataIndex: 'usage'
        }
    ],
    stripeRows: true,
    height: AppConfig.gridHeight
});