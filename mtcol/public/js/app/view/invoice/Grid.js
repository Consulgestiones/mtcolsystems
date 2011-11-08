Ext.define('Mtc.view.invoice.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.invoicegrid',
    store: Ext.create('Mtc.store.Invoice'),
    tbar: [
        {
            text: 'Ingresar Factura',
            iconCls: 'add'
        },
        {
            text: 'Modificar Factura',
            iconCls: 'edit'
        }
    ],
    columns: [
            {
                header: 'Factura No',
                dataIndex: 'invoicenumber'
            },
            {
                header: 'Proveedor',
                dataIndex: 'provider'
            },
            {
                header: 'Fecha',
                dataIndex: 'dinvoice'
            },
            {
                header: 'Pais',
                dataIndex: 'country'
            },
            {
                header: 'Ciudad',
                dataIndex: 'city'
            },
            {
                header: 'Ciudad',
                dataIndex: 'city'
            },
            {
                header: 'Estado',
                dataIndex: 'invoicestatus'
            },
            {
                header: 'Subtotal',
                dataIndex: 'subtotal'
            },
            {
                header: 'Impuesto',
                dataIndex: 'tax'
            },
            {
                header: 'Total',
                dataIndex: 'total'
            }
        ],
        tbar: [
            {
                text: 'Ingresar Factura',
                iconCls: 'add',
                handler: function(){
                    alert(typeof Mtc.model.Invoicexxx);
                }
            },
            {
                text: 'Modificar Factura',
                iconCls: 'edit'
            }
        ]
}); 
