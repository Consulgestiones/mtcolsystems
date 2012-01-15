Ext.define('Mtc.store.MineGrid',{
    extend: 'Ext.data.Store',
    requires: ['Mtc.model.MineGrid'],
    model: 'Mtc.model.MineGrid',
    pageSize: 1,
    proxy: {
        type: 'ajax',
        method: 'POST',
        url: '/mine/getmine',
        reader: {
            type: 'json',
            totalProperty: 'total',
            root: 'data'
        }
    }
});



