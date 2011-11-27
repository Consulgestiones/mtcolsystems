Ext.define('Mtc.model.TranspCompany', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idtranspcompany', type: 'int'},
        {name: 'idcountry', type: 'int'},
        {name: 'country', type: 'string'},
        {name: 'idcity', type: 'int'},
        {name: 'city', type: 'string'},
        {name: 'transpcompany', type: 'string'},
        {name: 'phone', type: 'string'},
        {name: 'email', type: 'string'},
        {name: 'address', type: 'string'},
        {name: 'inactive', type: 'int'},
        {name: 'active', type: 'string'}
    ]
});