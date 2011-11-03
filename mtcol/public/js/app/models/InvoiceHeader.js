Ext.define('Mtc.model.InvoiceHeader', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idinvoice', type: 'int'},
        {name: 'invoicenumber', type: 'string'},
        {name: 'idcity', type: 'int'},
        {name: 'city', type: 'string'},
        {name: 'idcountry', type: 'int'},
        {name: 'country', type: 'string'},
        {name: 'idprovider', type: 'int'},
        {name: 'provider', type: 'string'},
        {name: 'providernumid', type: 'string'},
        {name: 'idinvoicestatus', type: 'int'},
        {name: 'invoicestatus', type: 'string'},
        {name: 'productservice', type: 'string'},
        {name: 'createdby', type: 'string'},
        {name: 'subtotal', type: 'float'},
        {name: 'tax', type: 'float'},
        {name: 'total', type: 'float'},
        {name: 'date', type: 'date'},
    ]
});