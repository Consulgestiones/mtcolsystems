Ext.define('Mtc.store.SectionsGrid',{
    extend: 'Ext.data.Store',
    requires: ['Mtc.model.SectionsGrid'],
    model: 'Mtc.model.SectionsGrid',
    proxy: {
        type: 'ajax',
        method: 'POST',
        url: '',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
    
});