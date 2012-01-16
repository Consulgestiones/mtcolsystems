Ext.define('Mtc.store.SectionCombo', {
    extend: 'Ext.data.Store',
    model: 'Ext.model.SectionCombo',
    proxy: {
        type: 'ajax',
        method: 'POST',
        url: '/default/mine/getsections',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});