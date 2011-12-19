Ext.define('Mtc.view.remission.ReceiveGridDetail', {
    extend: 'Ext.grid.Panel',
    selType: 'cellmodel',    
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
            header: 'Cantidad Enviada',
            dataIndex: 'quantity'
        },
        {
            header: 'Completo',
            dataIndex: 'complete'/*,
            editor: {
                xtype: 'checkbox',
                id: 'chkcomplete',
                checked: true
            }*/
        },
        {
            header: 'Cantidad Recibida',
            dataIndex: 'quantityreceive'/*,
            editor: {
                xtype: 'textfield',
                allowBlank: false,
                size: 10
            }*/
        }
    ],
    stripeRows: true
});