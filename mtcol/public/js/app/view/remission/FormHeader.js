Ext.define('Mtc.view.remission.FormHeader', {
    extend: 'Ext.form.Panel',
    alias: 'widget.remformheader',
    id: 'FormHeader',
    requires: ['Mtc.view.transpcompany.ComboTranspCompany'],
    defaultType: 'textfield',
    width: 800,
    itemCls: 'left-space',
    defaults: {
//        allowBlank: false,
        labelWidth: 150
    },
    bodyStyle: 'padding: 10px',
    layout: {
        type: 'table',
        columns: 2
    },
    frame: true,
    items: [
        {
            fieldLabel: 'Titulo',
            name: 'title',
            colspan: 2,
            width: 600
        },
        {            
            xtype: 'cbotranspcompany',
            fieldLabel: 'Compañia de Transporte',
            name: 'idtranspcompany',
            id: 'cbotranspcompany',
            allowBlank: false
        },
        {
            xtype: 'datefield',
            name: 'dremission',
            id: 'dremission',
            format: 'd/m/Y',
            fieldLabel: 'Fecha',
            allowBlank: false
        },
        {
            fieldLabel: 'Nombre Conductor',
            name: 'drivername',
            id: 'txtdrivername',
            allowBlank: false           
        },
        {
            fieldLabel: 'Cedula Conductor',
            name: 'drivernumid',
            allowBlank: false
        },
        {
            fieldLabel: 'Placa del Vehiculo',
            name: 'vehicleplate',
            id: 'txtvehicleplate',
            allowBlank: false
        }
    ]
});