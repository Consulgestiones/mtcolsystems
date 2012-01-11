Ext.define('Mtc.model.WorkOrderHeader', {
    extend: 'Ext.data.Model',
    fields: [        
        {name: 'idworkorder', type: 'int'},
        {name: 'idmine', type: 'int'},
        {name: 'mine', type: 'string'},        
        {name: 'idsection', type: 'int'},
        {name: 'section', type: 'string'},        
        {name: 'title', type: 'string'},        
        {name: 'requestby', type: 'string'},        
        {name: 'dworkorder', type: 'string'},        
        {name: 'description', type: 'string'}
    ]
});