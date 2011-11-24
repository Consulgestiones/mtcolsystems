Ext.define('Mtc.view.transpcompany.FormWindow', {
    extend: 'Ext.window.Window',
    iconCls: 'car',
    closeAction: 'hide',
    items: [
        Ext.create('Mtc.view.transpcompany.FormPanel')
    ],
    modal: true
});