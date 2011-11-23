Ext.define('Mtc.view.remission.ListPanel', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Mtc.view.remission.ListGrid'
    ],
    width: 600,
    items: [
        Ext.create('Mtc.view.remission.ListGrid')
    ]
})