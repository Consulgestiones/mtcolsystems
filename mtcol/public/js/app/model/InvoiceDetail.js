Ext.define('Mtc.model.InvoiceDetail', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idinvoicedetail', type: 'int'},
        {name: 'idinvoice', type: 'int'},
        {name: 'item', type: 'int'},
        {name: 'idproduct', type: 'int'},
        {name: 'product', type: 'string'},
        {name: 'quantity', type: 'double'},
        {name: 'unitprice', type: 'float'},
        {name: 'tax', type: 'double'},
        {name: 'unit', type: 'string'},
        {name: 'totalprice', type: 'float'},        
        {name: 'producttax', type: 'float'},        
        {name: 'total_tax', type: 'float'}
    ]
});