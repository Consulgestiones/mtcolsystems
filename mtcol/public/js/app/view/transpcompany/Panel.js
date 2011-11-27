Ext.define('Mtc.view.transpcompany.Panel', {
    extend: 'Ext.panel.Panel',
    requires: ['Mtc.view.transpcompany.List'],
    layout: 'fit',
    items: [
        Ext.create('Mtc.view.transpcompany.List', {
            id: 'transpCompanyList'
        })
    ]    
});