Ext.define('Mtc.view.remission.RemissionView', {
    extend: 'Ext.panel.Panel',
    requires: ['Mtc.view.remission.FormHeader', 'Mtc.view.remission.GridDetail'],
    items: [
        {
            xtype: 'remformheader'
        },
        {
            xtype: 'remdetailgrid'
        }
    ],
    getHeaderForm: function(){
        return this.items.items[0];
    },
    getDetailGrid: function(){
        return this.items.items[1];
    }
});