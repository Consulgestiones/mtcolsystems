Ext.define('Mtc.view.invoice.InvoiceDetail', {
    extend: 'Ext.panel.Panel',
    title: 'Detalle',
    defaultType: 'fieldset',
    alias: 'widget.invoicedetail',
    frame: true,
    items: [
        {
            xtype: 'form',
            defaultType: 'textfield',
            layout: {
                type: 'table',
                columns: 2
            },
            defaults: {
                readOnly: true
            },
            itemCls: 'left-space',
            width: '100%',
            frame: true,
            items: [
                {
                    fieldLabel: 'Tiltulo',
                    name: 'title',
                    colspan: 2,
                    width: 525
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Fecha',
                    name: 'dinvoice',
                    format: 'd/m/Y'
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
                    name: 'delivery'
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
        },
        {
            xtype: 'invoicedetailgrid',
            id: 'detailGrid'
        }
    ],
    getDetailGrid: function(){
        return this.items.items[1];
    }
});