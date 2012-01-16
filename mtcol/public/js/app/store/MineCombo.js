Ext.define('Mtc.store.MineCombo', {
    extend: 'Ext.data.Store',
    model: 'Ext.model.MineCombo',
    proxy: {
        type: 'ajax',
        method: 'POST',
//        url: '/admin/mines/getmines',
        url: '/default/mine/getmine',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});