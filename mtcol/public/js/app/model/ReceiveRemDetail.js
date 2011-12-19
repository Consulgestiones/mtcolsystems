Ext.define('Mtc.model.ReceiveRemDetail', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'item', type: 'int'},
        {name: 'idremission', type: 'int'},
        {name: 'idproduct', type: 'int'},
        {name: 'product', type: 'string'},
        {name: 'unit', type: 'string'},
        {name: 'quantity', type: 'float'},
        {name: 'itemvalue', type: 'float'},
        {name: 'unitvalue', type: 'float'},
        {name: 'idstock', type: 'int'},
        {name: 'complete', type: 'string'},
        {name: 'quantityreceive', type: 'float'}
    ]
});