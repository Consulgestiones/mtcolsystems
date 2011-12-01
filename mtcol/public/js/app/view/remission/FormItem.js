Ext.define('Mtc.view.remission.FormItem', {
    extend: 'Ext.form.Panel',
    defaultType: 'textfield',
    bodyStyle: 'padding: 10px;',
    frame: true,
    layout: {
        type: 'table',
        columns: 3
    },
    itemCls: 'left-space',
    items: [
        {
            xtype: 'combo',
            name: 'idproduct',
            fieldLabel: 'Producto',
            displayField: 'product',
            valueField: 'idproduct',
            queryMode: 'remote',
            minChars: 3,
            forceSelection: true,
            typeAhead: true,
            valueNotFoundText: 'Seleccione el producto...',
            emptyText: 'Producto',
            store: Ext.create('Mtc.store.ProductAll', {
                autoLoad: false
            })
        },
        {
            fieldLabel: 'Cantidad',
            name: 'quantity'
        },
        {
            xtype: 'button',
            text: 'Item',
            iconCls: 'add'
        }
    ]
});