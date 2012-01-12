Ext.define('Mtc.store.SectionCombo', {
    extend: 'Ext.data.Store',
    model: 'Ext.model.SectionCombo',
    proxy: {
        type: 'ajax',
        method: 'POST',
        url: '/admin/mines/getsections',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});