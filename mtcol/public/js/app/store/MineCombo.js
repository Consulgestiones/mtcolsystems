Ext.define('Mtc.store.MineCombo', {
    extend: 'Ext.data.Store',
    model: 'Ext.model.MineCombo',
    proxy: {
        type: 'ajax',
        method: 'POST',
        url: '/admin/mines/getmines',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});