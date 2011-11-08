Ext.define('Mtc.view.invoice.InvoiceDetail', {
    extend: 'Ext.panel.Panel',
    title: 'Detalle',
    defaultType: 'fieldset',
    alias: 'widget.invoicedetail',
    frame: true,
    items: [
        {
            title: 'Factura',
            defaultType: 'textfield',
            layout: {
                type: 'table',
                columns: 2
            },
            itemCls: 'left-space',
            items: [
                {
                    fieldLabel: 'Fecha',
                    name: 'dinvoice'
                },
                {
                    fieldLabel: 'Ciudad',
                    name: 'city'
                },
                {
                    fieldLabel: 'Proveedor',
                    name: 'provider'
                },
                {
                    fieldLabel: 'NIT',
                    name: 'providernumid'
                },
                {
                    fieldLabel: 'Entrega',
                    name: 'productservice'
                },
                {
                    fieldLabel: 'Teléfono',
                    name: 'providerphone'
                },
                {
                    fieldLabel: 'Forma de pago',
                    name: 'paymentmethod'
                },
                {
                    fieldLabel: 'E-mail',
                    name: 'provideremail'
                }
            ]
        }/*,
        {
            xtype: 'invoicedetailgrid',
            id: 'detailGrid'
        }*/
    ]
});