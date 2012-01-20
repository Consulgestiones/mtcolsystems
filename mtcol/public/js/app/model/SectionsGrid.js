Ext.define('Mtc.model.SectionsGrid',{
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idsection', type: 'string'},
        {name: 'idmine', type: 'string' , id:'idmine'},
        {name: 'section', type: 'string'},
        {name: 'description', type: 'string'}
    ]
});