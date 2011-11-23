Ext.define('Mtc.view.test.Master', {
    extend: 'Ext.panel.Panel',
    title: 'master',
    width: 300,
    requires: ['Mtc.view.test.Slave'],
    items: [
        {
            xtype: 'slave'
        }
    ]
})

