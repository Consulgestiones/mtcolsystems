Ext.define('Mtc.view.workorder.WorkOrderHeaderForm', {
    extend: 'Ext.form.Panel',
    defaults: {
        labelWidth: 100
    },
    defaultType: 'textfield',
    items: [
        {
            fieldLabel: 'Titulo',
            name: 'title'
        },
        {
            xtype: 'minecombo',
            fieldLabel: 'Clavada',
            name: 'idmine'
        },
        {
            xtype: 'sectioncombo',
            fieldLabel: 'Sección',
            name: 'idsection',
            disabled: true
        },
        {
            xtype: 'datefield',
            fieldLabel: 'Fecha',
            name: 'dworkorder'
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Descripción',
            name: 'description'
        }
    ]
});