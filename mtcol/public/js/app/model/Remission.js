Ext.define('Mtc.model.Remission', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idremission', type: 'int'},
        {name: 'remissionnumber', type: 'string'},
        {name: 'iduser', type: 'int'},
        {name: 'user', type: 'string'},
        {name: 'idtranspcompany', type: 'int'},
        {name: 'transpcompany', type: 'string'},
        {name: 'title', type: 'string'},
        {name: 'dremission', type: 'string'},
        {name: 'dcreate', type: 'string'},
        {name: 'status', type: 'string'},
        {name: 'drivername', type: 'string'},
        {name: 'drivernumid', type: 'string'},
        {name: 'vehicleplate', type: 'string'}
    ]
});