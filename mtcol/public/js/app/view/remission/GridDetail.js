Ext.define('Mtc.view.remission.GridDetail', {
    extend: 'Ext.grid.Panel',
    store: Ext.create('Mtc.store.RemissionDetail'),
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
            header: 'Cantidad',
            dataIndex: 'quantity'
        },
        {
            header: 'Pedido',
            dataIndex: 'itemprice'
        }
    ]
});