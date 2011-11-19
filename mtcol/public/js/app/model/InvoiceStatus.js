Ext.define('Mtc.model.InvoiceStatus', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idinvoicestatus', type: 'int'},
        {name: 'invoicestatus', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'inactive', type: 'int'}
    ]
});