Ext.define('Mtc.model.InvoiceDetailItem', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'item', type: 'int'},
        {name: 'product', type: 'string'},
        {name: 'unit', type: 'string'},
        {name: 'quantity', type: 'float'},
        {name: 'quantity', type: 'float'},
        {name: 'unitprice', type: 'float'},
        {name: 'tax', type: 'float'},
        {name: 'taxvalue', type: 'float'},
        {name: 'totalprice', type: 'float'}
    ]
});