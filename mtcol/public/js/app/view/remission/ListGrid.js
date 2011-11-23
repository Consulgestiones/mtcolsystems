Ext.define('Mtc.view.remission.ListGrid', {
    extend: 'Ext.grid.Panel',
    requires: ['Mtc.store.RemissionList'],
    columns: [
        {
            header: 'uno',
            dataIndex: 'idinvoice'
        },
        {
            header: 'dos',
            dataIndex: 'invoicenumber'
        }
    ],
    store: Ext.create('Mtc.store.RemissionList')
})