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
       {name: 'creationdate', type: 'date', dateFormat: 'Y-m-d H:i:s'},
       {name: 'active', type: 'int'},
       {name: 'userworkemail', type: 'string', vtype: 'email'},
       {name: 'position', type: 'string'},
       {name: 'boss', type: 'string'},
       {name: 'officenumber', type: 'string'}
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
        },
        writer: new Ext.data.JsonWriter()
    },
    pageSize: config.gridPageSize,
    autoLoad: true
});

var usersPagingBar = new Ext.PagingToolbar({  
    pageSize: config.gridPageSize,  
    store: usersDataStore,  
    displayInfo: true  
});

var buttonsBar = [
    {
        text: 'Nuevo',
        iconCls: 'add',
        handler: function(){
            newUser();
        }
    },
    {
        text: 'Editar',
        iconCls: 'edit',
        handler: function(){
            var rows = usersGrid.getSelectionModel().getSelection();
            if(rows.length === 0){
                return;
            }else{
                var sel = rows[0];
                alert(sel.data.iduser);
            }
        }
    },
    {
        text: 'Eliminar',
        iconCls: 'delete'
    }
];


var usersGrid = new Ext.grid.GridPanel({
    id: 'usersGrid',
    title: 'Usuarios',
    iconCls: 'users-admin',
    store: usersDataStore,
    bbar: usersPagingBar,
    tbar: buttonsBar,
    viewConfig: {
        forceFit: true
    },
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
        width: 120
    },
    {
        header: 'E-mail',
        dataIndex: 'useremail',
        width: 200
    },
    {
        header: 'Tel Hogar',
        dataIndex: 'userphonehome',
        width: 60
    },
    {
        header: 'Tel Movil',
        dataIndex: 'userphonemobile',
        width: 90
    },
    {
        header: 'Dirección',
        dataIndex: 'useraddress',
        width: 140
    },
    {
        header: 'Tel Trabajo',
        dataIndex: 'userphonework',
        width: 80
    },
    {
        header: 'Ext',
        dataIndex: 'userphoneworkext',
        width: 50
    },
    {
        header: 'Fecha Creación',
        dataIndex: 'creationdate',
        width: 50,
        hidden: true
    },
    {
        header: 'Cargo',
        dataIndex: 'position',
        width: 70
    },
    {
        header: 'E-mail laboral',
        dataIndex: 'userworkemail',
        width: 150
    },
    {
        header: 'Jefe directo',
        dataIndex: 'boss',
        width: 110
    },
    {
        header: 'Oficina',
        dataIndex: 'officenumber',
        width: 70
    },
    {
        header: 'Activo',
        dataIndex: 'active',
        width: 40
    }
],
    enableColLock: false,
    stripeRows: true,
    height: config.gridHeight,
    renderTo: Ext.get('slot1'),
    autoSizeColumns: true
});

/**
 * Datastore para el combo de tipo de identificacion
 */
Ext.define('Typeid', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idtypeid', type: 'int'},
        {name: 'typeid', type: 'string'}
    ]
});
var idtypeDataStore = Ext.data.Store({    
    model: 'Typeid',
    id: 'typeidDS',
    proxy: {
        type: 'ajax',
        url: '/typesid/gettypes',
        method: 'POST',
        reader: new Ext.data.JsonReader({
            fields: [
                'idtypeid',
                'typeid'
            ],
            root: 'data'
        })
    }
});

function newUser(){
    
    var userForm = Ext.create('Ext.form.FormPanel', {  
        id: 'user-form',
        defautType: 'textfield',
        url: '/admin/users/save',
        method: 'POST',
        frame: true,
        items: [
            {
                xtype: 'fieldset',
                collapsible: false,
                title: 'Información Personal',
                defaultType: 'textfield',
                defaults: {anchor: '100%'},
                itemCls: 'left-space',
                viewConfig: {
                    forceFit: true
                },
                layout: {
                    type: 'table',
                    columns: 2
                },
                items: [
                    {
                        fieldLabel: 'Nombre',
                        name: 'firstname',
                        allowBlank: false
                    },
                    {
                        fieldLabel: 'Apellido',
                        name: 'lastname',
                        allowBlank: false
                    },
                    {
                        fieldLabel: 'usuario',
                        name: 'username',
                        allowBlank: false
                    },
                    {
                        fieldLabel: 'E-mail',
                        name: 'useremail',
                        allowBlank: false,
                        vtype: 'email'
                    },
                    {
                        xtype: 'combo',
                        name: 'idtypeid',
                        fieldLabel: 'Tipo Ident',
                        store: idtypeDataStore,
                        mode: 'remote',
                        displayField: 'typeid',
                        valueField: 'idtypeid'
                    },
                    {
                        fieldLabel: 'Nun Ident',
                        name: 'usernumid',
                        vtype: 'numeric',
                        allowBlank: false
                    },
                    {
                        fieldLabel: 'Teléfono Hogar',
                        name: 'userphonehome',
                        allowBlank: false
                    }

                ]
            },
            {
                xtype: 'fieldset',
                collapsible: false,
                title: 'Información Laboral',
                defaultType: 'textfield',
                defaults: {anchor: '100%'},
                itemCls: 'left-space',
                viewConfig: {
                    forceFit: true
                },
                layout: {
                    type: 'table',
                    columns: 2
                },
                items: [
                    {
                        fieldLabel: 'Teléfono Trabajo',
                        name: 'userphonework',
                        allowBlank: false
                    },
                    {
                        fieldLabel: 'Extensión',
                        name: 'userphoneworkext',
                        allowBlank: true,
                        vtype: 'numeric'
                    },
                    {
                        fieldLabel: 'E-mail Laboral',
                        name: 'userworkemail',
                        allowBlank: true,
                        vtype: 'email'
                    },
                    {
                        fieldLabel: 'Jefe directo',
                        name: 'boss',
                        allowBlank: true
                    },
                    {
                        fieldLabel: 'Cargo',
                        name: 'position',
                        allowBlank: true
                    },
                    {
                        fieldLabel: 'Oficina',
                        name: 'office',
                        allowBlank: true
                    }
                ]
            }
        ],
        buttons: [
            {
                text: 'Cancelar',
                id: 'btn-cancel',
                iconCls: 'btn-cancel',
                handler: function(){
                    Ext.getCmp('newuser-win').close();
                }
            },
            {
                text: 'Guardar',
                iconCls: 'btn-save',
                handler: function(){                    
                    var frm = Ext.getCmp('user-form').getForm();
                    if(!frm.isValid())
                        return;
                    
                    frm.submit({
                        success: function(frm, request){
                            usersDataStore.load();
                            Ext.getCmp('newuser-win').close();
                        },
                        failure: function(frm, request){
                            var resp = request.response.responseText;
                            var obj = Ext.decode(resp);                            
                            Ext.Msg.show({
                                title: 'Error!!!',
                                msg: obj.msg,
                                buttons: Ext.Msg.OK
                            });
                        }
                    });
                }
            }
        ]

    });
    
    
    
    
    var userWind = Ext.create('Ext.window.Window', {
        id: 'newuser-win',
        title: 'Usuario',
        iconCls: 'user-profile',
        items: userForm,
        modal: true,
        width: 600,
        autoHeight: true,
        autoShow: true
    });
}