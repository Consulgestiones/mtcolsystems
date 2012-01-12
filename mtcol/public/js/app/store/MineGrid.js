Ext.define('Mtc.store,MineGrid',{
    extend: 'Ext.data.Store',
    model: 'Ext.model.MineGrid',
    proxy: {
        type: 'ajax',
        method: 'POST',
        url: '/admin/mines/getmines',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
})
