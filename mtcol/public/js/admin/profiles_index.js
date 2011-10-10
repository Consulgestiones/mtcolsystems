/**
 * Grilla de perfiles
 */
Ext.define('Profile', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idprofile', type: 'int'},
        {name: 'profile', type: 'string'},
        {name: 'description', type: 'string'}
    ]
});

var profilesDataStore = new Ext.data.Store({
    id: 'profilesDS',
    model: 'Profile',
    proxy: {
        type: 'ajax',
        method: 'POST',
        url: '/admin/profiles/getprofiles',
        api: {
            read: '/admin/profiles/getprofiles',
            create: '/admin/profiles/create',
            update: '/admin/profiles/update',
            destroy: '/admin/profiles/destroy'
        },
        reader: {
            type: 'json',
            totalProperty: 'total',
            root: 'data'
        }
    },
    pageSize: config.gridPageSize,
    autoLoad: true
});

var profilesPagingBar = new Ext.PagingToolbar({  
    pageSize: config.gridPageSize,  
    store: profilesDataStore,  
    displayInfo: true  
});

var profilesTopBar = [
    { 
        text: 'Nuevo',
        iconCls: 'add'                 
    },
    {
        text: 'Editar',
        iconCls: 'edit'
    },
    {
        text: 'Eliminar',
        iconCls: 'delete'
    }
];

var profilesGrid = new Ext.grid.GridPanel({
    id: 'profiles-grid',
    title: 'Perfiles',
    iconCls: 'user-profile',
    store: profilesDataStore,
    bbar: profilesPagingBar,
    tbar: profilesTopBar,
    viewConfig: {
        forceFit: true
    },
    columns: [
        Ext.create('Ext.grid.RowNumberer'),
        {
            header: 'ID',
            dataIndex: 'idprofile',
            hidden: true            
        },
        {
            header: 'Perfil',
            dataIndex: 'profile'
        },
        {
            header: 'Descripción',
            dataIndex: 'description'
        }
    ],
    enableColLock: false,
    height: config.gridHeight,
    renderTo: Ext.get('slot1')
});