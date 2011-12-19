Ext.define('Mtc.view.remission.ReceiveFormHeader', {
    extend: 'Ext.form.Panel',
    defaultType: 'textfield',
    frame: true,
    defaults: {
        readOnly: true,
        labelWidth: 150
    },
    itemCls: 'left-space',
    layout: {
        type: 'table',
        columns: 2
    },
    items: [
        {
            fieldLabel: 'Titulo',
            name: 'title',
            colspan: 2,
            width: 500
        },
        {
            fieldLabel: 'Remisión No',
            name: 'remissionnumber'
        },
        {
            fieldLabel: 'Fecha',
            name: 'dremission'
        },
        {
            fieldLabel: 'Compañia de transporte',
            name: 'transpcompany'
        },
        {
            fieldLabel: 'C.C. Conductor',
            name: 'drivernumid'
        },
        {
            fieldLabel: 'Conductor',
            name: 'drivername'
        },
        {
            fieldLabel: 'Placa vehiculo',
            name: 'vehicleplate'
        },
        {
            fieldLabel: 'Creador por',
            name: 'user'
        }        
    ]
});