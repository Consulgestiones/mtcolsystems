Ext.define('Mtc.store.TranspCompany', {
    extend: 'Ext.data.Store',
    requires: ['Mtc.model.TranspCompany'],
    model: 'Mtc.model.TranspCompany',
    proxy: {
        type: 'ajax',
        method: 'POST',
        url: '/admin/transpcompanies/getcompanies',
        reader: {
            type: 'json',
            totalProperty: 'total',
            root: 'data'
        }
    }
});