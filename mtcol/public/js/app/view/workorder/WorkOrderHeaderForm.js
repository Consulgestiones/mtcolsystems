Ext.define('Mtc.view.workorder.WorkOrderHeaderForm', {
    extend: 'Ext.form.Panel',
    defaults: {
        labelWidth: 100
    },
    defaultType: 'textfield',
    items: [
        {
            fieldLabel: '',
            name: 'title'
        },
        {
            xtype: 'minecombo',
            name: 'idmine'
        },
        {
            xtype: 'sectioncombo',
            name: 'idsection'
        },
        {
            
        }
    ]
});