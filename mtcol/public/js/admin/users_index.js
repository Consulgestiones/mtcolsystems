/**
 * Definicion del modelo
 */
Ext.define('User', {
    extend: 'Ext.data.Model',
    fields: [
       {name: 'iduser', type: 'int'}, 
       {name: 'idprofile', type: 'int'}, 
       {name: 'firstname', type: 'string'}, 
       {name: 'lastname', type: 'string'}, 
       {name: 'username', type: 'string'},
       {name: 'useremail', type: 'string'},
       {name: 'userphonehome', type: 'string'},
       {name: 'userphonework', type: 'string'},
       {name: 'userphonemobile', type: 'string'},
       {name: 'userphoneworkext', type: 'string'},
       {name: 'useraddress', type: 'string'},
       {name: 'creationdate', type: 'date', dateFormat: 'Y-m-d'},
       {name: 'active', type: 'int'}
    ]
});


/**
 * Se crea el data store
 */
var usersDataStore = new Ext.data.Store({
    id: 'usersDS',
    model: 'User',
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
        }
    },
    pageSize: 15,
    autoLoad: true
});

var categoriesPagingBar = new Ext.PagingToolbar({  
    pageSize: 10,  
    store: usersDataStore,  
    displayInfo: true  
});

var buttonsBar = [
    {
        text: 'Nuevo',
        iconCls: 'add',
        handler: showNewUserPanel
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

var usersGrid = new Ext.grid.GridPanel({
    id: 'usersGrid',
    store: usersDataStore,
    bbar: categoriesPagingBar,
    tbar: buttonsBar,
    columns: [
        Ext.create('Ext.grid.RowNumberer'),
    {
        header: '#',
        dataIndex: 'iduser',
        width: 30,
        hidden: true
    },
    {
        header: 'Nombre',
        dataIndex: 'firstname',
        width: 100
    },
    {
        header: 'Apellido',
        dataIndex: 'lastname',
        width: 100
    },
    {
        header: 'Usuario',
        dataIndex: 'username',
        width: 70
    },
    {
        header: 'E-mail',
        dataIndex: 'useremail',
        width: 150
    },
    {
        header: 'Tel Hogar',
        dataIndex: 'userphonehome',
        width: 60
    },
    {
        header: 'Tel Trabajo',
        dataIndex: 'userphonework',
        width: 60
    },
    {
        header: 'Ext',
        dataIndex: 'userphoneworkext',
        width: 50
    },
    {
        header: 'Tel Movil',
        dataIndex: 'userphonemobile',
        width: 50
    },
    {
        header: 'Dirección',
        dataIndex: 'useraddress',
        width: 140
    },
    {
        header: 'Fecha Creación',
        dataIndex: 'creationdate',
        width: 50
    },
    {
        header: 'Activo',
        dataIndex: 'active',
        width: 40
    }
],
    enableColLock: false,
    height: 250
});

Ext.create('Ext.window.Window', {
    title: 'Usuarios',
    width: '100%',
    closable: false,
    draggable: false,
    items: usersGrid,
    layout: 'fit',
    autoShow: true,
    constrain: true,
    floating: false,
    renderTo: Ext.get('slot2')
});

function showNewUserPanel(){
    var panel = Ext.create('Ext.form.Panel', {        
        defaultType: 'textfield',
        width: 530,
        layout: {
            type: 'table',
            columns: 2,
            itemCls: 'left-space'
        },
        defaults: {
            // applied to each contained panel
            bodyStyle:'padding:20px'
        },
        items: [
            {
                fieldLabel: 'Nombre',
                allowBlank: false
            },
            {
                fieldLabel: 'Apellido',
                allowBlank: false
            },
            {
                fieldLabel: 'Usuario',
                allowBlank: false
            },
            {
                fieldLabel: 'Email',
                vtype: 'email',
                allowBlank: false
            },
            {
                fieldLabel: 'Teléfono Hogar'
            },
            {
                fieldLabel: 'Teléfono Trabajo'
            },
            {
                fieldLabel: 'Extension'
            },
            {
                fieldLabel: 'Teléfono Movil'
            }
        ]
    });
    Ext.create('Ext.window.Window', {
        title: 'Nuevo Usuario',
        layout: 'fit',
        items: panel,
        modal: true,
        bodyStyle: 'padding: 10px'
    }).show();
}