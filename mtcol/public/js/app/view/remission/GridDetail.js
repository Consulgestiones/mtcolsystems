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
    ],
    bbar: [
        {
            text: 'Eliminar Item',
            iconCls: 'delete',     
            id: 'RemDetailDelButton',
            handler: function(){                
                var grid = Ext.getCmp('GridDetail');
                var rows = grid.getSelectionModel().getSelection();
                if(rows.length > 0){
                    var record = rows[0];
                    grid.getStore().remove(record);
                }                
            }
        }
    ]
});