Ext.define('Mtc.store.MineCombo', {
    extend: 'Ext.data.Store',
    requires: ['Mtc.model.MineCombo'],
    model: 'Mtc.model.MineCombo',
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