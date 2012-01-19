Ext.define('Mtc.store.SectionsGrid',{
    extend: 'Ext.data.Store',
    requires: ['Mtc.model.SectionsGrid'],
    model: 'Mtc.model.SectionsGrid',
    pageSize: 1,
    proxy: {
        type: 'ajax',
        method: 'POST',
       // url: '/mine/getsections',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
    
});