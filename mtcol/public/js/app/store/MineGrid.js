Ext.define('Mtc.store,MineGrid',{
    extend: 'Ext.data.Store',
    requires: ['Mtc.model.MineGrid'],
    model: 'Ext.model.MineGrid',
    proxy: {
        type: 'ajax',
        method: 'POST',
        url: '/admin/mines/getMines',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});
