Ext.define('Mtc.model.TranspCompany', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idtranspcompany', type: 'int'},
        {name: 'idcountry', type: 'int'},
        {name: 'idcity', type: 'int'},
        {name: 'transpcompany', type: 'string'},
        {name: 'phone', type: 'string'},
        {name: 'email', type: 'string'},
        {name: 'address', type: 'string'}
    ]
});