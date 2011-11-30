Ext.define('Mtc.view.remission.FormHeader', {
    extend: 'Ext.form.Panel',
    id: 'FormHeader',
    requires: ['Mtc.view.transpcompany.ComboTranspCompany'],
    defaultType: 'textfield',
    width: 600,
    itemCls: 'left-space',
    defaults: {
        allowBlank: false
    },
    bodyStyle: 'padding: 10px',
    layout: {
        type: 'table',
        columns: 2
    },
    frame: true,
    items: [
        {            
            xtype: 'cbotranspcompany',
            fieldLabel: 'Compañia de Transporte',
            name: 'idtranspcompany',
            id: 'cbotranspcompany'
        },
        {
            xtype: 'datefield',
            name: 'dremission',
            id: 'dremission',
            fieldLabel: 'Fecha'
        },
        {
            fieldLabel: 'Nombre Conductor',
            name: 'drivername',
            id: 'txtdrivername'            
        },
        {
            fieldLabel: 'Placa del Vehiculo',
            name: 'vehicleplate',
            id: 'txtvehicleplate'
        }
    ]
});