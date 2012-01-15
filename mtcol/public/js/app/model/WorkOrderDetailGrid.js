Ext.define('Mtc.model.WorkOrderDetailGrid', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'item', type: 'int'},
        {name: 'idproduct', type: 'int'},
        {name: 'product', type: 'string'},
        {name: 'idunit', type: 'int'},
        {name: 'unit', type: 'string'},
        {name: 'quantity', type: 'float'},
    ]
});