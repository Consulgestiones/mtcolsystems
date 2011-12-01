Ext.define('Mtc.model.RemissionDetail', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'item', type: 'int'},
        {name: 'idremission', type: 'int'},
        {name: 'idproduct', type: 'int'},
        {name: 'product', type: 'string'},
        {name: 'quantity', type: 'float'},
        {name: 'itemvalue', type: 'float'},
    ]
});