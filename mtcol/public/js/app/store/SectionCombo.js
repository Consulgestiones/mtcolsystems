Ext.define('Mtc.store.SectionCombo', {
    extend: 'Ext.data.Store',
    requires: ['Mtc.model.SectionCombo'],
    model: 'Mtc.model.SectionCombo',
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