Ext.define('Mtc.model.PaymentMethod', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idpaymentmethod', type: 'int'},
        {name: 'paymentmethod', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'inactive', type: 'int'},
        {name: 'active', type: 'string'}
    ]
});