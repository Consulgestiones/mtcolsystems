Ext.QuickTips.init();
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
       {name: 'idtypeid', type: 'int'},
       {name: 'typeid', type: 'string'},
       {name: 'usernumid', type: 'int'},
       {name: 'useremail', type: 'string'},
       {name: 'userphonehome', type: 'string'},
       {name: 'userphonework', type: 'string'},
       {name: 'userphonemobile', type: 'string'},
       {name: 'userphoneworkext', type: 'string'},
       {name: 'useraddress', type: 'string'},
       {name: 'creationdate', type: 'date', dateFormat: 'Y-m-d H:i:s'},
       {name: 'isactive', type: 'string'},
       {name: 'active', type: 'int'},
       {name: 'userworkemail', type: 'string', vtype: 'email'},
       {name: 'position', type: 'string'},
       {name: 'boss', type: 'string'},
       {name: 'office', type: 'string'}
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
    pageSize: Mtc.config.gridPageSize,
    autoLoad: true
});

var usersPagingBar = new Ext.PagingToolbar({  
    pageSize: Mtc.config.gridPageSize,  
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
            editUser();
        }
    }/*,
    {
        text: 'Eliminar',
        iconCls: 'delete'
    }*/
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
        header: 'Tipo ID',
        dataIndex: 'typeid',
        width: 40
    },
    {
        header: 'Num ID',
        dataIndex: 'usernumid',
        width: 110
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
        dataIndex: 'office',
        width: 70
    },
    {
        header: 'Activo',
        dataIndex: 'isactive',
        width: 40
    }
],
    enableColLock: false,
    stripeRows: true,
    height: Mtc.config.gridHeight,
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



/**
 * Formulario para creación y edicion de usuarios
 */
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
                        id: 'firstname',
                        allowBlank: false
                    },
                    {
                        fieldLabel: 'Apellido',
                        name: 'lastname',
                        id: 'lastname',
                        allowBlank: false
                    },
                    {
                        fieldLabel: 'usuario',
                        name: 'username',
                        id: 'username',
                        allowBlank: false
                    },
                    {
                        fieldLabel: 'E-mail',
                        id: 'useremail',
                        name: 'useremail',
                        allowBlank: false,
                        vtype: 'email'
                    },
                    {
                        xtype: 'typeid'
                    },
                    {
                        fieldLabel: 'Nun Ident',
                        id: 'usernumid',
                        name: 'usernumid',
                        vtype: 'numeric',
                        allowBlank: false
                    },
                    {
                        fieldLabel: 'Teléfono Hogar',
                        id: 'userphonehome',
                        name: 'userphonehome',
                        allowBlank: false
                    },
                    {
                        fieldLabel: 'Teléfono Movil',
                        id: 'userphonemobile',
                        name: 'userphonemobile',
                        allowBlank: true
                    },
                    {
                        fieldLabel: 'Dirección',
                        id: 'useraddress',
                        name: 'useraddress',
                        allowBlank: true
                    },
                    {
                        xtype: 'combo',
                        fieldLabel: 'Estado',
                        name: 'active',
                        mode: 'local',
                        queryMode: 'local',
                        displayField: 'item',
                        valueField: 'active',
                        store: new Ext.data.SimpleStore({
                            id: 0,
                            fields: ['active', 'item'],
                            data: [
                                [1, 'Activo'],
                                [0, 'Inactivo']
                            ],
                            autoLoad: true
                        })
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
                        id: 'userphonework',
                        name: 'userphonework',
                        allowBlank: false
                    },
                    {
                        fieldLabel: 'Extensión',
                        id: 'userphoneworkext',
                        name: 'userphoneworkext',
                        allowBlank: true,
                        vtype: 'numeric'
                    },
                    {
                        fieldLabel: 'E-mail Laboral',
                        id: 'userworkemail',
                        name: 'userworkemail',
                        allowBlank: true,
                        vtype: 'email'
                    },
                    {
                        fieldLabel: 'Jefe directo',
                        id: 'boss',
                        name: 'boss',
                        allowBlank: true
                    },
                    {
                        fieldLabel: 'Cargo',
                        id: 'position',
                        name: 'position',
                        allowBlank: true
                    },
                    {
                        fieldLabel: 'Oficina',
                        id: 'office',
                        name: 'office',
                        allowBlank: true
                    }
                ]
            },
            {
                xtype: 'hidden',
                id: 'iduser',
                name: 'iduser',
                value: 0
            }
        ],
        buttons: [
            {
                text: 'Cancelar',
                id: 'btn-cancel',
                iconCls: 'btn-cancel',
                handler: function(){
                    Ext.getCmp('user-win').hide();
                }
            },
            {
                text: 'Guardar',
                iconCls: 'btn-save',
                handler: function(btn){
                    var win = btn.up('window');
                    var form = win.down('form');
                    var record = form.getRecord();
                    var values = form.getValues();
                    var frm = form.getForm();

                    if(!frm.isValid())
                        return;
                    
                    frm.submit({
                        success: function(frm, request){                            
                            if(formAction == 'create')
                                usersDataStore.load();
                            else{
                                tblrecord.set(record);
                                usersGrid.doLayout();
                            }
                                
                            Ext.getCmp('user-win').hide();
                        },
                        failure: function(frm, request){
//                            var resp = request.response.responseText;
//                            var obj = Ext.decode(resp);                            
                            Ext.Msg.show({
                                title: 'Error!!!',
                                msg: 'Error al crear el usuario.\nPor favor intente de nuevo mas tarde',
                                buttons: Ext.Msg.OK
                            });
                        }
                    });
                }
            }
        ]

    });
    
    
    
    
    var userWind = Ext.create('Ext.window.Window', {
        id: 'user-win',
        title: 'Usuario',
        iconCls: 'user-profile',
        closeAction: 'hide',
        items: userForm,
        modal: true,
        width: 600,
        autoHeight: true
    });
/**
 * Fin formulario
 */


function newUser(){
    formAction = 'create';
    userForm.getForm().reset();
    userWind.setTitle('Crear Usuario');
    userWind.show();    
}
function editUser(){
    formAction = 'edit';
    var rows = usersGrid.getSelectionModel().getSelection();
    if(rows.length === 0){
        return;
    }else{
        tblrecord = rows[0];                
        var idtypid = tblrecord.data.idtypeid;
        Ext.getCmp('idtypeid').setValue(idtypid);
        userForm.loadRecord(tblrecord);
        userWind.setTitle('Editar Usuario');
        userWind.show();
    }
}