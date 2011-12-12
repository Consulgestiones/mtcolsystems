Ext.define('Mtc.model.StockDistribution', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'codstatus', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'total', type: 'float'},
        {name: 'percent', type: 'float'},
        {name: 'label', type: 'string'}
    ]
});