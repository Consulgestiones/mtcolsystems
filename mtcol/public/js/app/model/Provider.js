Ext.define('Mtc.model.Provider', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idprovider', type: 'int'},
        {name: 'idtypeid', type: 'int'},
        {name: 'providertypeid', type: 'string'},
        {name: 'idcity', type: 'int'},
        {name: 'city', type: 'string'},
        {name: 'idcountry', type: 'int'},
        {name: 'country', type: 'string'},
        {name: 'provider', type: 'string'},
        {name: 'typeid', type: 'string'},
        {name: 'providernumid', type: 'string'},
        {name: 'providerphone', type: 'string'},
        {name: 'provideremail', type: 'string'},
        {name: 'provideraddress', type: 'string'},
        {name: 'contact', type: 'string'},
        {name: 'contacttitle', type: 'string'},
        {name: 'contactphonehome', type: 'string'},
        {name: 'contactphonework', type: 'string'},
        {name: 'contactphonemobile', type: 'string'},
        {name: 'contactphoneworkext', type: 'string'},
    ]
});