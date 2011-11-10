Ext.define('Mtc.store.User', {
    model: 'Mtc.model.User',
    proxy: {
        type: 'ajax',
        url: '/admin/users/getusers',
        method: 'POST',
        api: {
            read: '/admin/users/getusers',
            create: '/admin/users/create',
            update: '/admin/users/update',
            destroy: '/admin/users/remove'
        },
        reader: {
            type: 'json',
            totalProperty: 'total',
            root: 'data'
        },
        writer: {
            type: 'json'
        }
    },
    //pageSize: AppConfig.gridPageSize,
    autoLoad: true
});