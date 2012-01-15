Ext.define('Mtc.view.workorder.WorkOrdersGrid', {
    extend: 'Ext.grid.Panel',
    tbar: [
        {
            text: 'Crear Orden de Trabajo',
            iconCls: 'add',
            handler:  this.showAddForm
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

this.showAddForm = function(){
    var header = Ext.create('Mtc.view.workorder.WorkOrderHeaderForm', {
        id: 'WorkOrderHeaderForm'
    });
    var detail = Ext.create('Mtc.view.workorder.WorkOrderDetailGrid', {
        id: 'WorkOrderDetailGrid',
        store: Ext.create('Mtc.store.WorkOrderDetailGrid', {
            storeId: 'WorkOrderDetailGridDS',
            autoLoad: false
        })
    });
    var w = Ext.create('Ext.window.Window', {
        id: 'WorkOrderAddWindow',
        items: [
            header,
            detail
        ],
        buttons: [
            {
                text: 'Cancelar',
                iconCls: 'btn-calcel',                
                handler: function(){
                    this.up('window').close();
                }
            },
            {
                text: 'Crear',
                iconCls: 'btn-save',
                handler: function(){
                    
                }
            }
        ]
    });
}