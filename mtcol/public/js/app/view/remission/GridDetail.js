Ext.define('Mtc.view.remission.GridDetail', {
    extend: 'Ext.grid.Panel',
    store: Ext.create('Mtc.store.RemissionDetail'),
    height: 250,
    alias: 'widget.remdetailgrid',
    features: [{
        ftype: 'summary'
    }],
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
        },
        {
            header: 'Pedido',
            dataIndex: 'itemvalue',
            align: 'right',
            renderer: function(value){        
                var x = currencyFormat(value);
                return x;
            }
        }
    ]
});