Ext.define('Mtc.view.workorder.WorkOrderHeaderForm', {
    extend: 'Ext.form.Panel',
    requires: ['Mtc.view.mine.MineCombo', 'Mtc.view.section.SectionCombo'],          
    defaults: {
        labelWidth: 100,
        anchor: '100%'
    },    
    frame: true,
    defaultType: 'textfield',
    layout: {
        type: 'table',
        columns: 2
    },
    url: '/inventory/workorders/createworkorder',
    itemCls: 'left-space',
    bodyStyle: 'padding: 10px;', 
    items: [
        {
            fieldLabel: 'Titulo',
            name: 'title',
            colspan: 2,
            width: 500
        },
        {
            xtype: 'minecombo',
            fieldLabel: 'Clavada',
            name: 'idmine'
        },
        {
            xtype: 'sectioncombo',
            fieldLabel: 'Sección',
            name: 'idsection'
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