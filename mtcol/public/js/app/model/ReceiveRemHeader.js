Ext.define('Mtc.model.ReceiveRemHeader', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idremission', type: 'int'},
        {name: 'iduser', type: 'int'},
        {name: 'user', type: 'string'},
        {name: 'idtranspcompany', type: 'int'},
        {name: 'transpcompany', type: 'string'},
        {name: 'remissionnumber', type: 'int'},
        {name: 'title', type: 'string'},
        {name: 'dremission', type: 'string'},
        {name: 'dcreate', type: 'string'},
        {name: 'codstatus', type: 'string'},
        {name: 'drivername', type: 'string'},
        {name: 'vehicleplate', type: 'string'}
    ]
});